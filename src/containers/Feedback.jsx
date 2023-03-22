import React, { useState } from 'react';
import { Button, Input, Rate } from 'antd';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    console.log(`Rating: ${rating}, Comment: ${comment}`);
  };

  return (
    <div className="max-w-lg mx-auto mt-4">
      <div className="text-center mb-4">
        <h2 className="text-lg font-medium">Give Feedback</h2>
        <p className="text-gray-600">Meeting ID: 123456789</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium">Rating:</span>
          <Rate value={rating} onChange={setRating} />
        </div>
        <div>
          <span className="text-gray-700 font-medium">Comment:</span>
          <Input.TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your feedback here"
            rows={4}
          />
        </div>
        <div className="text-center">
          <Button type="primary" onClick={handleSubmit}>
            Submit Feedback
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
