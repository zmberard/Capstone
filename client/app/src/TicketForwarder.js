import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const TicketForwarder = () => {
  const navigate = useNavigate();
  const { fetchUserDetails } = useUser();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ticket = params.get('ticket');
    console.log(encodeURIComponent(ticket));
    if (ticket) {
      fetch(`http://localhost:3002/api/ticket?ticket=${ticket}`, {credentials: 'include'}) 
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            fetchUserDetails(data.EId); 
            console.log("RedirectedURL: " + data.redirectUrl);
            // Use the redirectUrl from the server response
            navigate(data.redirectUrl);
          } else {
            // Handle authorization failure or other non-success cases
            console.error('Authorization failed:', data.message);
            navigate('/error'); // Or your error handling route
          }
        })
        .catch((error) => {
          console.error('Error processing ticket:', error);
          navigate('/error');
        });
    } else {
      navigate('/'); // No ticket found, navigate to home or login page
    }
  }, [navigate]);

  return null; // Or a loading indicator as appropriate
};

export default TicketForwarder;
 