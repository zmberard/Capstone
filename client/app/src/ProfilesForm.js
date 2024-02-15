import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './ProfileForm.module.css'; 
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3002';

function ProfilesForm() {
    const [data, setData] = useState([]);

    useEffect(() => { 
        //fetch(`${API_BASE_URL}/api/profile`)
        fetch(`https://ominous-chainsaw-q57p5pjvvvr29vxj-3002.app.github.dev/api/profile`)
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Failed to fetch data:', error));
      }, []);

      
    return (

        <div className={styles.ProfilesForm}>
            <div>
                <h2>Data from Database</h2>
                <table>
                    <thead>
                    <tr>
                        {data.length > 0 && Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                        {Object.values(row).map((val, i) => <td key={i}>{val}</td>)}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
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
