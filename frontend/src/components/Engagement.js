import React, { useState, useEffect, useCallback } from 'react';
import './Engagement.css';

const Engagement = ({ postId }) => {
  const [engagement, setEngagement] = useState({
    likes: 0,
    comments: [],
    shares: 0
  });
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState({
    submitting: false,
    error: null,
    success: false
  });

  const fetchEngagement = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/engagement/${postId}`);
      const data = await response.json();
      
      // Calculate totals
      const likes = data.filter(e => e.type === 'like').length;
      const shares = data.filter(e => e.type === 'share').length;
      const comments = data.filter(e => e.type === 'comment').map(c => ({
        id: c._id,
        content: c.content,
        createdAt: new Date(c.createdAt)
      }));

      setEngagement({ likes, comments, shares });
    } catch (error) {
      console.error('Failed to fetch engagement:', error);
    }
  }, [postId]);

  useEffect(() => {
    fetchEngagement();
  }, [fetchEngagement]);

  const handleEngagement = async (type) => {
    setStatus({ submitting: true, error: null });
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/engagement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          type,
          content: type === 'comment' ? comment : undefined
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to record engagement');
      }

      // Refresh engagement data
      await fetchEngagement();
      
      // Clear comment if it was a comment submission
      if (type === 'comment') {
        setComment('');
      }
      
      setStatus({ submitting: false, error: null, success: true });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setStatus({ submitting: false, error: error.message, success: false });
    }
  };

  return (
    <div className="engagement-container">
      <div className="engagement-actions">
        <button 
          className="engagement-button like-button"
          onClick={() => handleEngagement('like')}
          disabled={status.submitting}
        >
          <span role="img" aria-label="like">👍</span>
          <span>{engagement.likes}</span>
        </button>
        
        <button 
          className="engagement-button share-button"
          onClick={() => handleEngagement('share')}
          disabled={status.submitting}
        >
          <span role="img" aria-label="share">🔗</span>
          <span>{engagement.shares}</span>
        </button>
      </div>

      <div className="comments-section">
        <h3>Comments ({engagement.comments.length})</h3>
        
        {status.error && (
          <div className="error-message">
            {status.error}
          </div>
        )}
        {status.success && (
          <div className="success-message">
            {comment ? 'Comment posted successfully!' : 'Thanks for engaging!'}
          </div>
        )}
        
        <div className="comment-form">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a comment..."
            disabled={status.submitting}
          />
          <button
            onClick={() => handleEngagement('comment')}
            disabled={!comment.trim() || status.submitting}
          >
            Post Comment
          </button>
        </div>

        {status.error && (
          <div className="error-message">
            {status.error}
          </div>
        )}

        <div className="comments-list">
          {engagement.comments.map(comment => (
            <div key={comment.id} className="comment">
              <p>{comment.content}</p>
              <span className="comment-date">
                {comment.createdAt.toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Engagement;
