import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

const App = () => {
  const [message, setMessage] = useState('');
  const [suggestionID, setSuggestionID] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [viewed, setViewed] = useState(null);
  const [error, setError] = useState('');

  // Submit the suggestion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/suggestions', { message });
      setSuggestionID(response.data.suggestionID);
      setStatusMessage(response.data.message);
      setMessage('');
      setError('');
    } catch (error) {
      console.error('Error submitting suggestion', error);
      setError('Error submitting suggestion');
    }
  };

  // Check if the suggestion has been viewed
  const checkStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/suggestions/${suggestionID}`);
      setViewed(response.data.viewed);
    } catch (error) {
      console.error('Error checking status', error);
      setError('Error checking status');
    }
  };

  return (
    <div className="App">
      <h1>Anonymous Suggestion Box</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your suggestion here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Submit Suggestion</button>
      </form>

      {statusMessage && <p>{statusMessage}</p>}
      {suggestionID && <p>Your Suggestion ID: {suggestionID}</p>}

      <div>
        <input
          type="text"
          placeholder="Enter Suggestion ID to Check Status"
          value={suggestionID}
          onChange={(e) => setSuggestionID(e.target.value)}
        />
        <button onClick={checkStatus}>Check if Viewed</button>
      </div>

      {viewed !== null && (
        <p>Status: {viewed ? 'Viewed by Admin' : 'Not yet viewed by Admin'}</p>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
