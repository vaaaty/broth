//GEMINI


import React, { useState } from 'react';
import './FeedbackSystem.css';

/**
 * FeedbackSystem component.
 * Allows users to rate products or services and leave comments.
 */
const FeedbackSystem = ({ orderId, productId, type = 'product' }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError('Please select a star rating before submitting.');
      return;
    }

    // Clear previous error
    setError(null);

    // Prepare feedback object
    const feedback = {
      id: Date.now(),
      orderId, // Optional, might be null
      productId, // Optional, might be null
      type, // 'product' or 'service'
      rating,
      comment: comment.trim(),
      date: new Date().toISOString()
    };

    try {
      // Save feedback to localStorage (used as mock persistent storage)
      const existingFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
      localStorage.setItem('feedback', JSON.stringify([...existingFeedback, feedback]));

      setSubmitted(true);
      // In a real application, you would make an API call here.
      console.log('Feedback submitted:', feedback);
    } catch (e) {
      console.error('Error saving feedback:', e);
      setError('Failed to submit feedback. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="feedback-success">
        <div className="success-icon">✅</div>
        <h3>Thank You!</h3>
        <p>Your feedback on the {type} has been submitted successfully.</p>
        <p className="success-detail">Your rating: {rating} stars</p>
      </div>
    );
  }

  const ratingLabels = {
    1: 'Poor (1/5)',
    2: 'Fair (2/5)',
    3: 'Good (3/5)',
    4: 'Very Good (4/5)',
    5: 'Excellent (5/5)'
  };

  return (
    <div className="feedback-system">
      <h3>{type === 'product' ? 'Rate this Product' : 'Rate Your Service Experience'}</h3>

      <form onSubmit={handleSubmit}>
        {/* Error Display */}
        {error && <div className="error-message">{error}</div>}

        {/* Star Rating */}
        <div className="rating-section">
          <label>How would you rate this {type}?</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                className={`star ${star <= rating ? 'active' : ''}`}
                onClick={() => {
                  setRating(star);
                  setError(null); // Clear error on successful rating
                }}
                aria-label={`${star} star rating`}
              >
                ⭐
              </button>
            ))}
          </div>
          <p className="rating-text">
            {rating === 0 ? 'Select a rating to continue' : ratingLabels[rating]}
          </p>
        </div>

        {/* Comment Section */}
        <div className="comment-section">
          <label>Your Comments (Optional, but highly appreciated)</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`Share your experience with this ${type}... What did you like or dislike?`}
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-feedback"
          disabled={rating === 0}
        >
          {rating === 0 ? 'Select Rating to Submit' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackSystem;
