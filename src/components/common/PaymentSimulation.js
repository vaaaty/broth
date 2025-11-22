import React, { useState } from 'react';
import './PaymentSimulation.css';

const PaymentSimulation = ({ orderTotal, onPaymentSuccess, onPaymentFailure }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate
      
      if (isSuccess) {
        onPaymentSuccess({
          transactionId: 'TXN' + Date.now(),
          method: paymentMethod,
          amount: orderTotal,
          timestamp: new Date().toISOString()
        });
      } else {
        onPaymentFailure('Payment failed. Please try again.');
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, '').slice(0, 16);
    return numbersOnly.replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <div className="payment-simulation">
      <div className="payment-header">
        <h3>Payment Details</h3>
        <p>Complete your purchase securely</p>
      </div>

      <div className="payment-methods">
        <label className="payment-method">
          <input
            type="radio"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="method-icon">💳</span>
          <span className="method-text">Credit/Debit Card</span>
        </label>
        
        <label className="payment-method">
          <input
            type="radio"
            value="upi"
            checked={paymentMethod === 'upi'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="method-icon">📱</span>
          <span className="method-text">UPI Payment</span>
        </label>
        
        <label className="payment-method">
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="method-icon">💰</span>
          <span className="method-text">Cash on Delivery</span>
        </label>
      </div>

      {paymentMethod === 'card' && (
        <div className="card-details">
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={(e) => {
                const formatted = formatCardNumber(e.target.value);
                setCardDetails({...cardDetails, number: formatted});
              }}
              inputMode="numeric"
              maxLength="19"
              className="card-input"
            />
          </div>
          
          <div className="form-group">
            <label>Cardholder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
              className="card-input"
            />
          </div>
          
          <div className="row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                  if (value.length > 2) {
                    setCardDetails({...cardDetails, expiry: value.slice(0,2) + '/' + value.slice(2)});
                  } else {
                    setCardDetails({...cardDetails, expiry: value});
                  }
                }}
                inputMode="numeric"
                maxLength="5"
                className="card-input"
              />
            </div>
            
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) => {
                  const numbersOnly = e.target.value.replace(/\D/g, '').slice(0, 3);
                  setCardDetails({...cardDetails, cvv: numbersOnly});
                }}
                inputMode="numeric"
                maxLength="3"
                className="card-input"
              />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'upi' && (
        <div className="upi-details">
          <div className="form-group">
            <label>UPI ID</label>
            <input
              type="text"
              placeholder="yourname@upi"
              value={cardDetails.number}
              onChange={(e) => {
                const upiValue = e.target.value.toLowerCase();
                setCardDetails({...cardDetails, number: upiValue});
              }}
              inputMode="email"
              pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              className="card-input"
            />
            {cardDetails.number && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(cardDetails.number) && (
              <span className="error-text">Please enter a valid UPI ID</span>
            )}
          </div>
          <p className="upi-note">You will be redirected to your UPI app for payment</p>
        </div>
      )}

      {paymentMethod === 'cod' && (
        <div className="cod-details">
          <div className="cod-info">
            <div className="cod-icon">💰</div>
            <p>Pay when your order is delivered</p>
            <p className="cod-subtext">Cash accepted: Exact change preferred</p>
            <p className="cod-warning">Order total: ₹{orderTotal}</p>
          </div>
        </div>
      )}

      <div className="payment-summary">
        <div className="summary-line">
          <span>Amount to pay:</span>
          <span className="amount">₹{orderTotal}</span>
        </div>
      </div>

      <button 
        className={`pay-now-btn ${isProcessing ? 'processing' : ''}`}
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <div className="processing-spinner"></div>
            Processing...
          </>
        ) : (
          `Pay ₹${orderTotal}`
        )}
      </button>

      <div className="security-note">
        <span className="lock-icon">🔒</span>
        Your payment is secure and encrypted
      </div>

      <div className="test-details">
        <h4>Demo Payment Details</h4>
        <p><strong>Test Card:</strong> 4111 1111 1111 1111</p>
        <p><strong>Expiry:</strong> 12/25 | <strong>CVV:</strong> 123</p>
        <p><strong>Test UPI:</strong> success@upi (always works)</p>
      </div>
    </div>
  );
};

export default PaymentSimulation;
