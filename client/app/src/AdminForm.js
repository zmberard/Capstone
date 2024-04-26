import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import LoadingIndicator from './LoadingIndicator'; 
import styles from './AdminForm.module.css';
import { unparse } from 'papaparse';
 
function AdminForm() {
    const [applications, setApplications] = useState([]);  
    const [checkedStates, setCheckedStates] = useState({});  
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('info');
    const [showAlert, setShowAlert] = useState(false);

    const handleCheckAllChange = (isChecked) => {  
        const newCheckedStates = applications.reduce((acc, app) => {
            acc[app.wid] = isChecked;  
            return acc;
        }, {});
        setCheckedStates(newCheckedStates);
    };

    const handleCheckboxChange = (appId, isChecked) => {  
        setCheckedStates(prevStates => ({ ...prevStates, [appId]: isChecked }));
    }; 
    function handleDisable() {
        const disabledIds = Object.entries(checkedStates).filter(([id, isChecked]) => isChecked).map(([id]) => id); 
        setIsLoading(true); // Start loading
        fetch('http://localhost:3002/api/disable-applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: disabledIds })
        })
        .then(response => response.json())
        .then(data => {
            if (data.disabledIds && data.disabledIds.length > 0) {
                setStatusMessage(`The following applications have been disabled successfully, wid(s): ${data.disabledIds.join(', ')}`);  
                setAlertStatus('success');
                setShowAlert(true);
                fetchApplications();
            }
            
        })
        .catch((error) => {
            console.error('Error:', error);
            setStatusMessage('Failed to disable applications.');
            setAlertStatus('danger');
            setShowAlert(true);
        })
        .finally(() => {
            setIsLoading(false);  
        });
    }
    

    function handleDownloadSelected(applications, checkedStates) {
        // Filter applications to include only those that are checked
        const filteredApps = applications.filter(app => checkedStates[app.wid]);
    
        // exclude 'Review' and 'Edit' columns
        const data = filteredApps.map(app => ({
            "First Name": app.first_name,
            "Last Name": app.last_name,
            "EID": app.eid,
            "Email": app.email,
            "WID": app.wid,
            "Advisor": app.advisor,
            "Semester": app.semester,
            "Waiver": app.waiver ? "Yes" : "No",
            "Status": app.status,
            "Admin Notes": app.notes,
            "DARS Update": formatDate(app.d_update)  
        }));
    
        // Convert data to CSV
        const csv = unparse(data);
    
        // Create a blob link to download
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'download.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    function handleEmailSelected() {
        const emailIds = Object.entries(checkedStates).filter(([id, isChecked]) => isChecked).map(([id]) => id);
    
        setIsLoading(true); // Start loading
        fetch('http://localhost:3002/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: emailIds })
        })
        .then(response => response.json())
        .then(data => {
            setStatusMessage('Emails have been sent successfully.');
            setAlertStatus('success');
            setShowAlert(true);
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            setStatusMessage(`Failed to send emails: ${error.message}`);
            setAlertStatus('danger');
            setShowAlert(true);
        })
        .finally(() => {
            setIsLoading(false);  
        });
    } 

    function handleReview(appId) {
        alert(`Reviewing application ID: ${appId}`);
    }
    
    function handleEdit(appId) {
        alert(`Editing application ID: ${appId}`);
    }
    
    function handleViewNotes(appId, notes) {
        alert(`Notes for application ID: ${appId}: ${notes}`);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', dateOptions);
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
        return `${formattedDate} at ${formattedTime}`;
    }

    const fetchApplications = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3002/api/applications');
            const data = await response.json();
            setApplications(data);
        } catch (error) {
            console.log("Error fetching applications: ", error);
        } finally {
            setIsLoading(false);
        }
        
      };

    useEffect(() => { 
      fetchApplications();
    }, []);
  
    return(
        
        <div className={styles.AdminForm}>
            {isLoading ? (
                <LoadingIndicator />
            ) : ( <> 
            <Container role="main"> 
                {showAlert && (
                    <Alert variant={alertStatus} onClose={() => setShowAlert(false)} dismissible>
                        {statusMessage}
                    </Alert>
                )}
                <Row>
                    <Col xs={12}>
                        <h3 className={styles.h3StyleTop}>Review Applications</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}> 
                        <h3 className={styles.h3StyleBot}>Total Applications: {applications.length}</h3>  
                    </Col>
                </Row>   
                <Row>
                    <Col xs={12} className={styles['button-container']}>
                            <Button onClick={handleDisable} type="button" id="disable_application" variant="danger" style={{ marginRight: '8px' }} disabled={Object.values(checkedStates).every(isChecked => !isChecked)}>
                                Disable Application(s)
                            </Button> 
                            <Button onClick={() => handleDownloadSelected(applications, checkedStates)} type="button" id="download_selected" variant="success" style={{ marginRight: '8px' }} disabled={Object.values(checkedStates).every(isChecked => !isChecked)}>
                                Download Selected
                            </Button> 
                            <Button onClick={handleEmailSelected} type="button" id="email_selected" variant="secondary" style={{ marginRight: '8px' }} disabled={Object.values(checkedStates).every(isChecked => !isChecked)}>
                                Email Selected
                            </Button> 
                    </Col>
                </Row>
                
                <Row>
                    <div className={styles['custom-table-container']}> 
                        <table striped className={`${styles['custom-table']} ${styles['custom-table-striped']}`}>
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" 
                                                    id="checkAll"
                                                    onChange={e => handleCheckAllChange(e.target.checked)}
                                                    checked={applications.length > 0 && applications.every(app => checkedStates[app.wid])}
                                        /> 
                                    </th>
                                    <th scope="Col">First Name</th>
                                    <th scope="Col">Last Name</th>
                                    <th scope="Col">EID</th>
                                    <th scope="Col">Email</th>
                                    <th scope="Col">WID</th>
                                    <th scope="Col">Advisor</th>
                                    <th scope="Col">Semester</th>
                                    <th scope="Col">Waiver?</th>
                                    <th scope="Col">Status</th>
                                    <th scope="Col">Review</th>
                                    <th scope="Col">Edit</th>
                                    <th scope="Col">Admin Notes</th>
                                    <th scope="Col">DARS Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app, index) => (
                                    <tr key={index}> 
                                        <td><input id={app.wid + "_checked"} type="checkbox"
                                            checked={!!checkedStates[app.wid]}
                                            onChange={e => handleCheckboxChange(app.wid, e.target.checked)}
                                        /></td>
                                        <td>{app.first_name}</td>
                                        <td>{app.last_name}</td>
                                        <td>{app.eid}</td>
                                        <td>{app.email}</td>
                                        <td>{app.wid}</td>
                                        <td>{app.advisor}</td>
                                        <td>{app.semester}</td>
                                        <td>{app.waiver ? "Yes" : "No"}</td>
                                        <td>{app.status}</td>
                                        <td><Button onClick={() => handleReview(app.wid)} type="button" variant="primary" id={app.wid + "_review_btn"}>Review</Button> </td>
                                        <td><Button onClick={() => handleEdit(app.wid)} type="button" variant="warning" id={app.wid + "_edit_btn"}>Edit</Button> </td> 
                                        <td>
                                            {app.notes ? (
                                                <Button onClick={() => handleViewNotes(app.wid)} type="button" variant="info" id={app.wid + "_notes_btn"}>View Notes</Button>
                                            ) : (
                                                ""
                                            )}    
                                        </td>
                                        <td>{formatDate(app.d_update)}</td> 
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> 
                </Row>  
            </Container>
            </>  )}
        </div>  
    );

    
}

export default AdminForm;