import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './ProfileForm.module.css'; 
import { useUser } from './UserContext';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3002';
//need dotenv and .env file to implement API_BASE_URL? 
//TODO: Fix API_BASE_URL not working, have to hard code address
//TODO: Instead of fetch, using only userContext unless we want to fetch data on each load. 
//TODO: impletemnt update button to update userContext 
function ProfilesForm() { 
    const { WId } = useUser();
    const [userData, setUserData] = useState({ wid: '', firstName: '', lastName: '' });
    
    useEffect(() => {
        if (WId) {
            fetch(`https://ominous-chainsaw-q57p5pjvvvr29vxj-3002.app.github.dev/api/profile?id=${WId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Data fetched:', data);
                const profileData = data[0]; // Access the first item of the array
                setUserData({ 
                    wid: profileData.wid || "000000000", 
                    firstName: profileData.firstName || "Could not fetch first name", // Provide default values
                    lastName: profileData.lastName || "Could not fetch last name" 
                });
            })
            .catch(error => console.error('Failed to fetch data:', error));
        }
    }, [WId]);

    console.log("USER DATA: " + userData.wid);
      
    return (
        <div className={styles.ProfilesForm}>
            {WId ? (
                <div>
                    <p>Profile information for WId: {WId}</p>
                    <input type="hidden" value={WId}></input>
                    
                    <Container role="main">
                        
                        <Row className="mb-4">
                            <Col xs={12}>
                                <h3 className={styles.topHeader}>Update your user profile:</h3>
                            </Col>
                        </Row>

                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="first_name">
                                <Form.Label column sm={2}>First Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" defaultValue={userData.firstName} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="last_name">
                                <Form.Label column sm={2}>Last Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" defaultValue={userData.lastName} />
                                </Col>
                            </Form.Group>

                            <Row className="mb-3">
                                <Col xs={12}>
                                    <Button variant="success">Update Profile</Button>
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
                                    <Form.Control type="text" disabled defaultValue="WillieWild@ksu.edu" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="wid">
                                <Form.Label column sm={2}>Wildcat ID</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" disabled value={userData.wid} /> 
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
