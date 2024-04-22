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

    const [courseUpdates, setCourseUpdates] = useState({});

    const [loadingCourses, setLoadingCourses] = useState(false);

    const [statusMessage, setStatusMessage] = useState(''); 
    const [alertStatus, setAlertStatus] = useState('info'); 
    const [showAlert, setShowAlert] = useState(false);

    const [submitting, setSubmitting] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState('');

    // Fetch courses dynamically from the database
    useEffect(() => {
        if (userData.wid) {
            const fetchCourses = async () => {
                setLoadingCourses(true);
                try {
                    const response = await fetch(`http://localhost:3002/api/courses?id=${userData.wid}`);
                    const { courses } = await response.json();
                    setCourses(courses); 
                    const updates = {};
                    courses.forEach(course => {
                        updates[`${course.class_subject}-${course.class_catalog}`] = {
                            status: course.status,
                            grade: course.grade
                        };
                    });
                    setCourseUpdates(updates);
                } catch (error) {
                    console.error('Failed to fetch courses:', error);
                } finally {
                    setLoadingCourses(false);
                }
            };
            fetchCourses();
        }
    }, [userData.wid]);

    const handleCourseChange = (courseKey, field, value) => {
        setCourseUpdates(prev => ({
            ...prev,
            [courseKey]: { ...prev[courseKey], [field]: value }
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('http://localhost:3002/api/submitApplication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userData, additionalInfo, courses: courseUpdates}),
            });
            const result = await response.json();
            setStatusMessage(result.message);
            setAlertStatus('warning');
            setShowAlert(true);
        } catch (error) {
            console.error('Submission failed:', error);
            setStatusMessage('Failed to submit application. Please try again.');
            setAlertStatus('danger');
            setShowAlert(true);
        } finally {
            setSubmitting(false);
        }
    };

    const handleAdditionalInfoChange = (event) => {
        setAdditionalInfo(event.target.value);
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
            {showAlert && (
                <Alert variant={alertStatus} onClose={() => setShowAlert(false)} dismissible>
                    {statusMessage}
                </Alert>
            )}
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
                    <Row className='mb-3'>
                        <Col>
                            <div className={styles['custom-message-1']}>
                            <p>To be accepted to the Computer Science Professional Program, you must complete the following Pre-Professional Courses <em>with a grade of C or better</em> and <em>with a 2.3 cumulative</em> GPA <strong>within these courses</strong>.</p>
                            <p>Any courses you are currently taking can be marked as <em>In Progress</em>. Any courses that you do not plan on taking need to be marked <em>Waiver Requested</em> and the reasons you are asking for the waiver must be explained below.</p>
                            </div>
                        </Col>
                    </Row>
                    <div className={styles['custom-table-container']}> 
                        <table striped hover className={`${styles['custom-table']} ${styles['custom-table-striped']}`}>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Course ID</th>
                                    <th>Status</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course, index) => {
                                    const courseKey = `${course.class_subject}-${course.class_catalog}`;
                                    const courseUpdate = courseUpdates[courseKey] || {};

                                    return (
                                        <tr key={index}>
                                            <td className="align-middle">{course.class_descr}</td>
                                            <td className="align-middle">{`${course.class_subject} ${course.class_catalog}`}</td>
                                            <td className="align-middle">
                                                <Form.Select
                                                    name={`${courseKey}-status`}
                                                    value={courseUpdate.status || ''}
                                                    onChange={e => handleCourseChange(courseKey, 'status', e.target.value)}
                                                >
                                                    {statusOptions.map(option => (
                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                    ))}
                                                </Form.Select>
                                            </td>
                                            <td className="align-middle">
                                                <Form.Select
                                                    name={`${courseKey}-grade`}
                                                    value={courseUpdate.grade || ''}
                                                    onChange={e => handleCourseChange(courseKey, 'grade', e.target.value)}
                                                >
                                                    {gradeOptions.map(option => (
                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                    ))}
                                                </Form.Select>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody> 
                        </table>
                    </div>
                    <Form.Group className="mb-3">
                        <div className={styles['custom-message-1']}>
                           <p> Please use this space to add any comments that should be made regarding these classes.</p>  
                           <p> If you requested a waiver for any of these classes, please explain in detail the reasons you are requesting a waiver for meeting all of the requirements for entrance into the Computer Science Professional Program. 
                            You may also be required to meet with the curriculum committee to evaluate the waiver request.</p> 
                        </div>  
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Add comments or additional information here" 
                            value={additionalInfo}
                            onChange={handleAdditionalInfoChange} />
                    </Form.Group>
                    <div className={styles['button-container']}>
                        <button className={styles['btn-submit']} type="submit" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Application'}
                        </button>
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
