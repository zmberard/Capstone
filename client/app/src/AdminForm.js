import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import LoadingIndicator from './LoadingIndicator'; 
import styles from './AdminForm.module.css';

function onClick(){
    alert("Button clicked");
}


function AdminForm() {
    const [applications, setApplications] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(false); 
    const [checkedStates, setCheckedStates] = useState({}); 

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

    useEffect(() => {
      const fetchApplications = async () => {
        try {
            setLoadingCourses(true);
            const response = await fetch('http://localhost:3002/api/applications');
            const data = await response.json();
            setApplications(data);
        } catch (error) {
            console.log("Error fetching applications: ", error);
        } finally {
            setLoadingCourses(false);
        }
        
      };
  
      fetchApplications();
    }, []);
  
    return(
        
        <div className={styles.AdminForm}>
            {loadingCourses ? (
                <LoadingIndicator />
            ) : ( <> 
            <Container role="main">
                <Row className="review">
                    <Col xs={12}>
                        <h3 className={styles.topHeader}>Review Applications</h3>
                    </Col>
                </Row>
                <Row className="total">
                    <Col xs={12}>

                        <h3 className={styles.topHeader}>Total Applications: {applications.length}</h3>

                        <p></p>
                        <Button onClick={onClick} type="button" class="btn btn-space" id="disable_application" style={{ marginRight: '8px' }}>Disable Applications</Button> 
                        <Button onClick={onClick} type="button" class="btn btn-space" id="download_selected" style={{ marginRight: '8px' }}>Download Selected</Button> 
                        <Button onClick={onClick} type="button" class="btn btn-space" id="email_selected" style={{ marginRight: '8px' }}>Email Selected</Button> 
                        <p></p>
                    </Col>
                </Row>
                <Row>
                    <div className={styles['custom-table-container']}>

                    
                    <table striped className={`${styles['custom-table']} ${styles['custom-table-striped']}`}>
                        <thead>
                            <tr>
                                <th>
                                    <div className="custom-control custom-checkbox"> 
                                        <input type="checkbox"
                                            className="custom-control-input"
                                            id="checkAll"
                                            onChange={e => handleCheckAllChange(e.target.checked)}
                                            checked={applications.length > 0 && applications.every(app => checkedStates[app.wid])}
                                        />
                                    </div>
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
                            <td>{app.Eid}</td>
                            <td>{app.status}</td>
                            <td><Button onClick={onClick} type="button" class="btn btn-space" id={app.wid + "_review_btn"}>Review</Button> </td>
                            <td><Button onClick={onClick} type="button" class="btn btn-space" id={app.wid + "_edit_btn"}>Edit</Button> </td> 
                            <td>{app.notes}</td>
                            <td></td>
                            {/* Add other fields as needed */}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                    <nav aria-label="TableFooter">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span class="sr-only">Previous</span>
                                </a>
                            </li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </Row>
                
            </Container>
            </>  )}
        </div>  
    );

    
}

export default AdminForm;