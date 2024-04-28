import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './ProfileForm.module.css'; 
import { useUser } from './UserContext';
import LoadingIndicator from './LoadingIndicator'; 


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3002';
//need dotenv and .env file to implement API_BASE_URL? 
//TODO: Fix API_BASE_URL not working, have to hard code address
//TODO: Instead of fetch, using only userContext unless we want to fetch data on each load. 
//TODO: impletemnt update button to update userContext 
function ProfilesForm() { 
    const { userData, handleUpdateProfile, loading } = useUser(); 
    const [firstName, setFirstName] = useState(userData.first_name || '');
    const [lastName, setLastName] = useState(userData.last_name || '')

    const updateProfileOnClick = (event) => { 
        event.preventDefault(); 
        handleUpdateProfile(userData.eid, firstName, lastName);
    };

    if (loading) {
        return <LoadingIndicator />; // Or replace with a spinner/loading icon
    }


    return (
        <div className={styles.ProfilesForm}>
            {userData.wid ? (
                <div>
                    {/* <p>Profile information for WId: {userData.wid}</p> */}
                    <input type="hidden" value={userData.wid}></input>
                    
                    <Container role="main">
                        
                        <Row className="mb-4">
                            <Col xs={12}>
                                <h3 className={styles.h3Style}>Update your user profile:</h3>
                            </Col>
                        </Row>

                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="first_name">
                                <Form.Label column sm={2}>First Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" defaultValue={userData.first_name} onChange={(e) => setFirstName(e.target.value)} style={{ backgroundColor: '#d1d1d1' }} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="last_name">
                                <Form.Label column sm={2}>Last Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" defaultValue={userData.last_name} onChange={(e) => setLastName(e.target.value)} style={{ backgroundColor: '#d1d1d1' }} />
                                </Col>
                            </Form.Group>

                            <Row className="mb-3">
                                <Col xs={12}> 
                                    <button className={styles['btn-update']} onClick={updateProfileOnClick}>Update Profile</button>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col xs={12}>
                                    <h4>Contact your advisor or department to update these items if they are incorrect</h4>
                                </Col>
                            </Row>

                            <Form.Group as={Row} className="mb-3" controlId="email">
                                <Form.Label column sm={2}>Email Address</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" disabled defaultValue={userData.email} style={{ backgroundColor: '#d1d1d1' }} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="wid">
                                <Form.Label column sm={2}>Wildcat ID</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" disabled defaultValue={userData.wid} style={{ backgroundColor: '#d1d1d1' }} /> 
                                </Col>
                            </Form.Group>
                        </Form>
                    </Container>
                </div>
            ) : (
                <h1>Please log in to view profile information.</h1>
            )}
             
            <footer className={styles.footer}>
                <Container>
                    <p>CS Applications - Contact webmaster@cs.ksu.edu for help</p>
                </Container>
            </footer>
        </div>
    );
}

export default ProfilesForm;
