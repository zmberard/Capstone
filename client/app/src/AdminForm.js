import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import styles from './AdminForm.module.css';

function onClick(){
    alert("Button clicked");
}


function AdminForm() {
    const [applications, setApplications] = useState([]);
  
    useEffect(() => {
      const fetchApplications = async () => {
        const response = await fetch('http://localhost:3002/api/applications');
        const data = await response.json();
        setApplications(data);
      };
  
      fetchApplications();
    }, []);
  
    return(
        <div className={styles.AdminForm}>
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
                        <Button onClick={onClick} type="button" class="btn btn-space">Disable Applications</Button>
                        <input id="disable_application" class="btn btn-space" type="button"/>
                        <Button onClick={onClick} type="button" class="btn btn-space">Download Selected</Button>
                        <input id="download_selected" class="btn btn-space" type="button"/>
                        <Button onClick={onClick} type="button" class="btn btn-space">Email Selected</Button>
                        <input id="email_selected" class="btn btn-space" type="button"/>
                        <p></p>
                    </Col>
                </Row>
                <Row>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1" checked/>
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
                            <td><input type="checkbox" /></td>
                            <td>{app.first_name}</td>
                            <td>{app.last_name}</td>
                            <td>{app.eid}</td>
                            <td>{app.email}</td>
                            <td>{app.wid}</td>
                            <td>{app.advisor}</td>
                            <td>{app.semester}</td>
                            <td>{app.Eid}</td>
                            <td>{app.status}</td>
                            <td>{app.Eid}</td>
                            <td>{app.Eid}</td>
                            <td>{app.notes}</td>
                            {/* Add other fields as needed */}
                            </tr>
                        ))}
                        </tbody>
                    </Table>
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
            
        </div>
    );

    
}

export default AdminForm;