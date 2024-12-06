import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/ShareFileModal.css'; // Import the CSS for the modal

const ShareFileModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState('');

  const handleShare = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUploading(true);
    setTimeout(() => {
      console.log("Sharing file with:", email);
      console.log("Selected file:", file);
      console.log("Message:", message);
      console.log("Subject:", subject);
      setIsLoading(false);
      setUploading(false);
      onClose();
    }, 2000);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  if (!isOpen) return null;

  return (
    <div className="share-file-modal">
      <div className="share-file-modal-content">
        <div className="modal-header">
          <h2 className="share-file-modal-title">Share Your File</h2>
        </div>
        <div className="modal-body">
          {isLoading && (
            <div className="loader-overlay">
              <div className="loader"></div>
            </div>
          )}
          <form onSubmit={handleShare}>
            <div className="email-input-container">
              <label className="email-label">Send To</label>
              <input
                type="email"
                placeholder="Enter recipient's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="share-file-modal-email"
              />
            </div>
            <div className="subject-input-container">
              <label className="subject-label">Subject</label>
              <input
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="share-file-modal-subject"
              />
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="share-file-modal-input-area"
            />
            
            <textarea
              placeholder="Write a message to accompany your file..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="share-file-modal-textarea"
              rows="4"
            />
          </form>
        </div>
        <div className="modal-footer">
          <button type="submit" className="share-file-modal-button" onClick={handleShare} disabled={uploading}>
            {uploading ? 'Sharing...' : 'Share'}
          </button>
          <button className="share-file-modal-close-button" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

ShareFileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShareFileModal; 