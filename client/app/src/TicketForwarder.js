import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import LoadingIndicator from './LoadingIndicator'; 

const TicketForwarder = () => {
  const navigate = useNavigate();
  const { fetchUserDetails } = useUser();
  const hasProcessedTicket = useRef(false);
  useEffect(() => {
    
    if (hasProcessedTicket.current) {
      return; // Exit if we've already processed the ticket
    }
    hasProcessedTicket.current = true;
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
            navigate('/ticketForwarder-authorization-failed', { state: { message: data.message } });
          }
        } catch (error) {  
          console.error('Error processing ticket:', error);
          navigate('/ticketForwarder-bad-ticket', { state: { message: error } });
        } finally { 
        }
      } else {
        navigate('/'); // No ticket found, navigate to home  
      }
    };

    processTicket();
  }, [navigate, fetchUserDetails]);

  // While the useEffect is running and processing, show the loading indicator
  return <LoadingIndicator />;
};

export default TicketForwarder;
 