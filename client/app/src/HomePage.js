import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './HomePage.module.css'; // Import the module CSS

function HomePage() {
  return (
    <div className={styles.HomePage}>
      <Container>
        <div className="jumbotron">
          <h1>CS Applications</h1>
          <p>Welcome to the CS Applications System</p>
        </div>
      </Container>

      <Container>
        <Row>
          <Col md={6} > {/* Bootstrap's is made up of Grid which contains Row and Col, each row have 12 cols,
                                  md={6} means screen size >=768px will have Requirements and Apply side by side
                                  screen size < 768px will have Requirements and Apply vertically stacked
                                  This is because col default to 12 when the case is not specified, in this case
                                  is sm and xs */}
            <h2>Requirements</h2>
            <p>In order to be considered for admission to the professional program, a student must have:</p>
            <ol className={styles.customList}>
              <li>Passed all pre-professional program courses with a C or better</li>
              <li>Achieved at least a 2.3 GPA on all pre-professional courses (including transfer courses)</li>
            </ol>
          </Col>
          <Col md={6}>
            <h2>Apply</h2>
            <p>When you are ready to apply, click here!</p>
            <Link to="/Apply">
              <Button variant="primary">Apply!</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
