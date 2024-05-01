import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/ErrorPage.css'

function ErrorPage() {
  const location = useLocation();
  const message = location.state?.message || 'A Happy Little Accident(unknown error occurred)';

  return (
    <div>
      <h1 className='h1-label'>Error Page</h1>
      <p>{message}</p>
      
      <img src="https://media.gettyimages.com/id/50467803/photo/tv-painting-instructor-artist-bob-ross-jubiantly-holding-up-paint-pallette-brushes-as-he-stands.jpg?s=612x612&w=0&k=20&c=LMajXi9w9M1LnnNfBcaIbiXZb6dICIQq48hS8Mo-xWQ=" alt="Bob Ross"></img>
    </div>
  );
}

export default ErrorPage;
