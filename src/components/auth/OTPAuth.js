import React, { useState, useEffect, useRef } from 'react';
import './OTPAuth.css';

const OTPAuth = ({ onLogin }) => {
  const [step, setStep] = useState('role');
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    businessName: '',
    businessType: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const otpInputs = useRef([]);

  const sendOTP = () => {
    console.log(`OTP sent to ${formData.phone}`);
    setTimer(60);
    setCanResend(false);
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputs.current[index + 1].focus();
    }

    if (newOtp.every(digit => digit !== '') && index === 5) {
      verifyOTP(newOtp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const verifyOTP = (enteredOtp) => {
    setTimeout(() => {
      if (enteredOtp === '123456') {
        setStep('complete');
        localStorage.setItem('userType', userType);
        localStorage.setItem('userData', JSON.stringify(formData));
        onLogin(userType, formData);
      } else {
        alert('Invalid OTP! Try 123456 for testing');
        setOtp(['', '', '', '', '', '']);
        otpInputs.current[0].focus();
      }
    }, 1000);
  };

  useEffect(() => {
    if (step === 'otp' && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, step]);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone) {
      alert('Phone number is required!');
      return;
    }
    if (formData.phone.length !== 10) {
      alert('Phone number must be 10 digits');
      return;
    }
    sendOTP();
    setStep('otp');
  };

  const renderRoleSelection = () => (
    <div className="role-selection">
      <h2>Join Live MART</h2>
      <p>Select your role to get started</p>
      
      <div className="role-cards">
        <div 
          className={`role-card ${userType === 'customer' ? 'selected' : ''}`}
          onClick={() => setUserType('customer')}
        >
          <div className="role-icon customer-icon">🛒</div>
          <h3>Customer</h3>
          <p>Shop for groceries and daily needs</p>
          <ul>
            <li>Browse local products</li>
            <li>Fast delivery</li>
            <li>Personalized recommendations</li>
          </ul>
        </div>

        <div 
          className={`role-card ${userType === 'retailer' ? 'selected' : ''}`}
          onClick={() => setUserType('retailer')}
        >
          <div className="role-icon retailer-icon">🏪</div>
          <h3>Retailer</h3>
          <p>Manage your store inventory</p>
          <ul>
            <li>Add/update products</li>
            <li>Track customer orders</li>
            <li>Order from wholesalers</li>
          </ul>
        </div>

        <div 
          className={`role-card ${userType === 'wholesaler' ? 'selected' : ''}`}
          onClick={() => setUserType('wholesaler')}
        >
          <div className="role-icon wholesaler-icon">📦</div>
          <h3>Wholesaler</h3>
          <p>Supply products to retailers</p>
          <ul>
            <li>Bulk inventory management</li>
            <li>Retailer order processing</li>
            <li>Price setting</li>
          </ul>
        </div>
      </div>

      <button 
        className="continue-btn"
        disabled={!userType}
        onClick={() => setStep('register')}
      >
        Continue
      </button>
    </div>
  );

  const renderRegistrationForm = () => (
    <form className="registration-form" onSubmit={handleRegisterSubmit}>
      <h2>Create your {userType} account</h2>
      
      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Enter your full name"
        />
      </div>

      <div className="form-group">
        <label>Email Address *</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="your.email@example.com"
          inputMode="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
        {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
          <span className="error-text">Please enter a valid email address</span>
        )}
      </div>

      <div className="form-group">
        <label>Phone Number *</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => {
            const numbersOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
            setFormData({...formData, phone: numbersOnly});
          }}
          placeholder="Enter 10-digit mobile number"
          pattern="[0-9]{10}"
          inputMode="numeric"
        />
        {formData.phone.length !== 10 && formData.phone.length > 0 && (
          <span className="error-text">Phone number must be 10 digits</span>
        )}
      </div>

      {(userType === 'retailer' || userType === 'wholesaler') && (
        <>
          <div className="form-group">
            <label>Business Name *</label>
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              placeholder="Enter your business name"
            />
          </div>

          <div className="form-group">
            <label>Business Type</label>
            <select
              value={formData.businessType}
              onChange={(e) => setFormData({...formData, businessType: e.target.value})}
            >
              <option value="">Select business type</option>
              <option value="grocery">Grocery Store</option>
              <option value="supermarket">Supermarket</option>
              <option value="kirana">Kirana Store</option>
              <option value="wholesaler">Wholesale Distributor</option>
            </select>
          </div>
        </>
      )}

      <div className="form-group">
        <label>Location *</label>
        <input
          type="text"
          required
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          placeholder="Enter your location"
        />
        <small>We'll use this to show nearby shops and local products</small>
      </div>

      <div className="form-actions">
        <button type="button" onClick={() => setStep('role')} className="back-btn">
          Back
        </button>
        <button type="submit" className="submit-btn">
          Send OTP
        </button>
      </div>
    </form>
  );

  const renderOTPVerification = () => (
    <div className="otp-verification">
      <h2>Verify Your Phone</h2>
      <p>We've sent a 6-digit OTP to {formData.phone}</p>
      
      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={el => otpInputs.current[index] = el}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 1);
              handleOtpChange(value, index);
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otp-digit"
            inputMode="numeric"
            pattern="[0-9]"
          />
        ))}
      </div>

      <div className="otp-timer">
        {timer > 0 ? (
          <p>Resend OTP in {timer}s</p>
        ) : (
          <button 
            className="resend-btn"
            onClick={sendOTP}
          >
            Resend OTP
          </button>
        )}
      </div>

      <div className="demo-note">
        <p>💡 <strong>Demo Tip:</strong> Use <code>123456</code> as OTP for testing</p>
      </div>

      <button 
        className="back-btn"
        onClick={() => setStep('register')}
      >
        Back to Registration
      </button>
    </div>
  );

  const renderCompletion = () => (
    <div className="completion-screen">
      <div className="success-icon">🎉</div>
      <h2>Welcome to Live MART!</h2>
      <p>Your {userType} account has been created successfully.</p>
      <button 
        className="dashboard-btn"
        onClick={() => window.location.href = `/${userType}-dashboard`}
      >
        Go to Dashboard
      </button>
    </div>
  );

  return (
    <div className={`otp-auth ${userType}-theme`}>
      <div className="auth-container">
        {step === 'role' && renderRoleSelection()}
        {step === 'register' && renderRegistrationForm()}
        {step === 'otp' && renderOTPVerification()}
        {step === 'complete' && renderCompletion()}
      </div>
    </div>
  );
};

export default OTPAuth;
