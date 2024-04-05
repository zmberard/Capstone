import React from 'react';
import { useLocation } from 'react-router-dom';

function ErrorPage() {
  const location = useLocation();
  const message = location.state?.message || 'An unknown error occurred';

  return (
    <div>
      <h1>Error Page</h1>
      <p>{message}</p>
      
      <img src="https://media.gettyimages.com/id/50467803/photo/tv-painting-instructor-artist-bob-ross-jubiantly-holding-up-paint-pallette-brushes-as-he-stands.jpg?s=612x612&w=0&k=20&c=LMajXi9w9M1LnnNfBcaIbiXZb6dICIQq48hS8Mo-xWQ=" alt="Bob Ross"></img>
    </div>
  );
}

export default ErrorPage;
