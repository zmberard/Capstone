import React from 'react';
import { Container, Row, Col, Form, Button, Panel } from 'react-bootstrap';
import styles from './ProfileForm.module.css'; 

function ProfilesForm() {
    return (
        <div className={styles.ProfilesForm}>
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
                            <Form.Control type="text" defaultValue="Test" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="last_name">
                        <Form.Label column sm={2}>Last Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" defaultValue="User" />
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
                            <Form.Control type="text" disabled defaultValue="testcase@ksu.edu" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="wid">
                        <Form.Label column sm={2}>Wildcat ID</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" disabled defaultValue="000000000" />
                        </Col>
                    </Form.Group>
                </Form>
            </Container>

            <footer className={styles.footer}>
                <Container>
                    <p>CS Applications - Contact webmaster@cs.ksu.edu for help</p>
                </Container>
            </footer>
        </div>
    );
}

export default ProfilesForm;
