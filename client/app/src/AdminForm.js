import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './AdminForm.module.css';
import Table from 'react-bootstrap/Table';

function onClick(){
    alert("button clicked");
}



function AdminForm(){
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
                        <h3 className={styles.topHeader}>Total Applications: x</h3>
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
                            <tr>
                                <td>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customCheck2" false/>
                                    </div>
                                </td>
                                <td>Test</td>
                                <td>User</td>
                                <td>testcas</td>
                                <td>testcas@ksu.edu</td>
                                <td>123456789</td>
                                <td>Sheryll Cornell</td>
                                <td>Fall</td>
                                <td>No?</td>
                                <td>
                                   <select>
                                    <option value="accepted">Accepted</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Pending/Exception">Pending/Exception</option>
                                    <option value="Pending/Dismissed">Pending/Dismissed</option>
                                    <option value="Pending/Reinstated">Pending/Reinstated</option>
                                    <option value="Pending(All)">Pending(All)</option>
                                    <option value="Declined">Declined</option>
                                    <option value="Declined/Exception">Declined/Exception</option>
                                    <option value="Withdrawn">Withdrawn</option>
                                   </select>
                                   
                                    {/* <div class="dropdown show">
                                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Change?
                                        </a>
                                        
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            <a class="dropdown-item" href="#">Accepted</a>
                                            <a class="dropdown-item" href="#">Declined</a>
                                            <a class="dropdown-item" href="#">Pending</a>
                                        </div>
                                    </div> */}
                                </td>
                                <td>
                                    <Button type="button" class="btn btn-review">review</Button>
                                </td>
                                <td>
                                    <Button type="button" class="btn btn-edit">edit</Button>
                                </td>
                                <td>Notes Test</td>
                                <td>???</td>
                            </tr>
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