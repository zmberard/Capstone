import React from 'react';
import { Container, Row, Col, Form, Button, Panel } from 'react-bootstrap';
import styles from './AdminForm.module.css';
import Table from 'react-bootstrap/Table';

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
                                    <input type="checkbox" class="custom-control-input" id="customCheck2" checked/>
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
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Change?
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">Accepted</a>
                                        <a class="dropdown-item" href="#">Declined</a>
                                        <a class="dropdown-item" href="#">Pending</a>
                                    </div>
                                </div>
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
            </Container>
            
        </div>
    );
}