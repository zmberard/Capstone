import styles from './ApplicationForm.module.css';
import React, { useState, useEffect, useContext } from 'react';  
import { useUser } from './UserContext'; 
import { Container, Row, Col, Form, Table, Alert } from 'react-bootstrap';
import LoadingIndicator from './LoadingIndicator'; 

//TODO: how to determin status? 
//TODO: vars needs that needs further consideration: name, GPA, status, advisor, [REC, LEC, QUIZ] classes
 
function ApplicationForm() {
    const { userData, loading } = useUser();
    const [courses, setCourses] = useState([]); // State to hold dynamic course data
    const name = userData.first_name + " " + userData.last_name;
    const hardcodedGPA = "3.5";
    const [loadingCourses, setLoadingCourses] = useState(false);
    // Fetch courses dynamically from the database
    useEffect(() => {
        if (userData.wid) {
            const fetchCourses = async () => {
                setLoadingCourses(true);
                try {
                    const response = await fetch(`http://localhost:3002/api/courses?id=${userData.wid}`);
                    const { courses } = await response.json();
                    setCourses(courses); 
                } catch (error) {
                    console.error('Failed to fetch courses:', error);
                } finally {
                    setLoadingCourses(false);
                }
            };
            fetchCourses();
        }
    }, [userData.wid]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Implementation 
    };
    
    const statusOptions = [
        { value: "Complete", label: "Complete" },
        { value: "In-Progress", label: "In Progress" }, //value need to match response from api
        { value: "transferred", label: "Transferred" },
        { value: "retaking", label: "Retaking" },
        { value: "waiver-requested", label: "Waiver Requested" },
      ];
      
    const gradeOptions = [
    { value: "n/a", label: "N/A" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "F", label: "F" },
    ];

    return (
        <Container className="mt-5">
            {loading || loadingCourses ? (
                <LoadingIndicator />
            ) : (
                <>
            <Alert variant="info">
                Application Submitted Tue Oct 17 2023 18:15:41 GMT-0500 (Central Daylight Time)
            </Alert>
            <div className={styles.appHeader}>
                <h1 className={styles.h1Style}>Computer Science Apps</h1>
                <h2 className={styles.h2Style}>Professional Program Application</h2>
            </div> 
            {userData.wid ? (
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Name:</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" value={name} readOnly />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>ID:</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" value={userData.wid} readOnly />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Advisor:</Form.Label>
                        <Col sm={10}>
                            <Form.Select value={userData.advisor}>
                                <option value="test">test</option>
                                <option value="Sheryl Cornell">Sheryl Cornell</option>
                                <option value="David Invergo">David Invergo</option>
                                {/* Additional advisor options can be added here */} 
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Row className="mb-3">
                        <Col>
                            <strong>GPA: </strong>{hardcodedGPA}
                        </Col>
                    </Row>
                    <div className={styles['custom-table-container']}> 
                        <table striped className={`${styles['custom-table']} ${styles['custom-table-striped']}`}>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Course ID</th>
                                    <th>Status</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course, index) => (
                                    <tr key={index}>
                                    <td className="align-middle">{course.class_descr}</td>
                                    <td className="align-middle">{`${course.class_subject} ${course.class_catalog}`}</td>
                                    <td className="align-middle">
                                        <Form.Select name={`${course.class_subject}${course.class_catalog}-status`} value={course.status}>
                                        {statusOptions.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                        </Form.Select>
                                    </td>
                                    <td className="align-middle">
                                        <Form.Select name={`${course.class_subject}${course.class_catalog}-grade`} value={course.grade}>
                                        {gradeOptions.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                        </Form.Select>
                                    </td>
                                    </tr>
                                ))}
                            </tbody> 
                        </table>
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Additional Information:</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Add comments or additional information here" />
                    </Form.Group>
                    <div className={styles['button-container']}> {/*stlyes['name-name'] format due to - causing syntax error*/}
                        <button className={styles['btn-submit']} type="submit">Submit Application</button>
                    </div>
                </Form>
            ) : (
                <h1>Please log in to view application information.</h1>
            )}
            </>
        )}
        </Container>
    );
}

export default ApplicationForm;
