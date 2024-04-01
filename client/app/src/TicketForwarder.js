import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import LoadingIndicator from './LoadingIndicator'; 

const TicketForwarder = () => {
  const navigate = useNavigate();
  const { fetchUserDetails } = useUser();

  useEffect(() => {
    const processTicket = async () => {
      const params = new URLSearchParams(window.location.search);
      const ticket = params.get('ticket');
      console.log("Ticket: ", encodeURIComponent(ticket));

      if (ticket) {
        try {
          const response = await fetch(`http://localhost:3002/api/ticket?ticket=${encodeURIComponent(ticket)}`, {credentials: 'include'});
          const data = await response.json();
          console.log("API Ticket Verification Response: ", data);

          if (data.success) {
            console.log("Fetching User Details for EId: ", data.EId);
            await fetchUserDetails(data.EId);  

            console.log("Redirecting to URL: ", data.redirectUrl);
            navigate(data.redirectUrl);
          } else { //TODO: Something is returning /ticketForwardMisc before data.redirectURL
            console.error('Authorization failed:', data.message);
            navigate('/ticketForwardMisc');
          }
        } catch (error) {
          console.error('Error processing ticket:', error);
          navigate('/ticketForwardMisc');
        }
      } else {
        navigate('/'); // No ticket found, navigate to home or login page
      }
    };

    processTicket();
  }, [navigate, fetchUserDetails]);

  // While the useEffect is running and processing, show the loading indicator
  return <LoadingIndicator />;
};

export default TicketForwarder;
 