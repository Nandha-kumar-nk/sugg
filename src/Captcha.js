
import React, { useState } from 'react';
import axios from 'axios';



const ReCAPTCHA = () => {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('General');
  const [isConstructive, setIsConstructive] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      return alert('Please complete the CAPTCHA.');
    }

    try {
      const response = await axios.post('http://localhost:5000/api/complaints', {
        message,
        category,
        isConstructive,
      });
      setFeedback(response.data.message);
      setMessage('');
      setIsConstructive(false);
      setCaptchaToken(null);
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  return (
    <div className="App">
      <h1>Anonymous Suggestion Box</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your complaint here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="General">General</option>
          <option value="Facilities">Facilities</option>
          <option value="Academic">Academic</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={isConstructive}
            onChange={() => setIsConstructive(!isConstructive)}
          />
          Is this feedback constructive?
        </label>
        <ReCAPTCHA
          sitekey="your_site_key" // Replace with actual site key
          onChange={(token) => setCaptchaToken(token)}
        />
        <button type="submit">Submit Complaint</button>
      </form>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default ReCAPTCHA;


