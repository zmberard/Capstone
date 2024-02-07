import "./AppForm.css";
import React, {useState }from 'react';  
import Button from 'react-bootstrap/Button'; 

function ApplicationForm() {
    const [formData, setFormData] = useState({
        name: '',
        eid: '',
        wid: '',
        advisor: 'test',
        // Add other form fields here such as list of courses
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value
        }));
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('/api/submit-application', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            console.log('Application submitted successfully'); 
          } else {
            console.log('Failed to submit application'); 
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
    
    return (
        //<form onSubmit={handleSubmit}>
        <div className="ApplicationForm">
        <div class="container" role="main">
            <div id="message"></div>
            <div id="root">
                <div class="app">
                    <header class="app-header">
                        
                        <h1>
                            Computer Science Apps
                            <br/><small>Professional Program Application</small>
                        </h1>
                        
                    </header>
                    <div class="application-form">
                        <div class="status-message pending">
                            Application Submitted Tue Oct 17 2023 18:15:41 GMT-0500 (Central Daylight Time)
                        </div>
                        <h1>Application Form</h1>
                        <div class="input-group">
                            <label>Name:</label>
                            <input type="text" value="Test User" wid></input>
                        </div>
                        <div class="input-group">
                            <label>ID:</label>
                            <input type="text" value="Test User"></input>
                        </div>
 
                        <div class="input-group">
                            <label>Advisor:</label>
                            <select name="advisor">
                                <option value="test">test</option> 
                            </select>
                        </div>
                        <div class="info">
                            <p>
                                To be accepted to the Computer Science Professional Program, you must complete the following Pre-Professional Courses
                                <i> with a grade of C or better </i>
                                  and
                                <i> with a 2.3 cumulative GPA</i>
                                <strong> within these courses.</strong>
                            </p>
                            <p>
                                Any courses you are currently taking can be marked as 
                                <i> In Progress</i>
                                .  Any courses that you do not plan on taking need to be marked"
                                <i> Waiver Requested </i>
                                 and the reasons you are asking for the waiver must be explained below.
                            </p>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Status</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                        <tbody>
                            <tr>
                                <td>CIS 015</td>
                                <td>
                                <select name="cis015">
                                    <option value="complete">Complete</option>
                                    <option value="in-progress">In-Progress</option>
                                    <option value="transferred">Transferred</option>
                                    <option value="retaking">Retaking</option>
                                    <option value="waiver-requested">Waiver Requested</option>
                                </select>
                                </td>
                                <td>
                                    <select name="cis015">
                                        <option value="n/a">N/A</option>
                                        <option value="4">A</option>
                                        <option value="3">B</option>
                                        <option value="2">C</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>CIS 115</td>
                                <td>
                                <select name="cis115">
                                    <option value="complete">Complete</option>
                                    <option value="in-progress">In-Progress</option>
                                    <option value="transferred">Transferred</option>
                                    <option value="retaking">Retaking</option>
                                    <option value="waiver-requested">Waiver Requested</option>
                                </select>
                                </td>
                                <td>
                                    <select name="cis115">
                                        <option value="n/a">N/A</option>
                                        <option value="4">A</option>
                                        <option value="3">B</option>
                                        <option value="2">C</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>CIS 200</td>
                                <td>
                                <select name="cis200">
                                    <option value="complete">Complete</option>
                                    <option value="in-progress">In-Progress</option>
                                    <option value="transferred">Transferred</option>
                                    <option value="retaking">Retaking</option>
                                    <option value="waiver-requested">Waiver Requested</option>
                                </select>
                                </td>
                                <td>
                                    <select name="cis200">
                                        <option value="n/a">N/A</option>
                                        <option value="4">A</option>
                                        <option value="3">B</option>
                                        <option value="2">C</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>CIS 300</td>
                                <td>
                                <select name="cis300">
                                    <option value="complete">Complete</option>
                                    <option value="in-progress">In-Progress</option>
                                    <option value="transferred">Transferred</option>
                                    <option value="retaking">Retaking</option>
                                    <option value="waiver-requested">Waiver Requested</option>
                                </select>
                                </td>
                                <td>
                                    <select name="cis300">
                                        <option value="n/a">N/A</option>
                                        <option value="4">A</option>
                                        <option value="3">B</option>
                                        <option value="2">C</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>CIS 301</td>
                                <td>
                                <select name="cis301">
                                    <option value="complete">Complete</option>
                                    <option value="in-progress">In-Progress</option>
                                    <option value="transferred">Transferred</option>
                                    <option value="retaking">Retaking</option>
                                    <option value="waiver-requested">Waiver Requested</option>
                                </select>
                                </td>
                                <td>
                                    <select name="cis301">
                                        <option value="n/a">N/A</option>
                                        <option value="4">A</option>
                                        <option value="3">B</option>
                                        <option value="2">C</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>ECE 241</td>
                                <td>
                                <select name="ece241">
                                    <option value="complete">Complete</option>
                                    <option value="in-progress">In-Progress</option>
                                    <option value="transferred">Transferred</option>
                                    <option value="retaking">Retaking</option>
                                    <option value="waiver-requested">Waiver Requested</option>
                                </select>
                                </td>
                                <td>
                                    <select name="ece241">
                                        <option value="n/a">N/A</option>
                                        <option value="4">A</option>
                                        <option value="3">B</option>
                                        <option value="2">C</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>MATH 220</td>
                                <td>
                                <select name="math220">
                                    <option value="complete">Complete</option>
                                    <option value="in-progress">In-Progress</option>
                                    <option value="transferred">Transferred</option>
                                    <option value="retaking">Retaking</option>
                                    <option value="waiver-requested">Waiver Requested</option>
                                </select>
                                </td>
                                <td>
                                    <select name="math220">
                                        <option value="n/a">N/A</option>
                                        <option value="4">A</option>
                                        <option value="3">B</option>
                                        <option value="2">C</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>MATH 221</td>
                                <td>
                                <select name="math221">
                                    <option value="complete">Complete</option>
                                    <option value="in-progress">In-Progress</option>
                                    <option value="transferred">Transferred</option>
                                    <option value="retaking">Retaking</option>
                                    <option value="waiver-requested">Waiver Requested</option>
                                </select>
                                </td>
                                <td>
                                    <select name="math221">
                                        <option value="n/a">N/A</option>
                                        <option value="4">A</option>
                                        <option value="3">B</option>
                                        <option value="2">C</option>
                                    </select>
                                </td>
                            </tr>

                        </tbody>
                        </table>
                        <p>
                            Cumulative Pre-Professional GPA:
                            <strong>4</strong>
                        </p>
                        <div>
                            <div class="info">
                                <p>Please use this space to add any comments that should be made regarding these classes. </p>
                                <p>
                                    If you requested a waiver for any of these classes, please explain in detail the reasons you are requesting a waiver for meeting all of the requirements for entrance into the Computer Science Professional Program. You may also be required to meet with the curriculum committee to evaluate the waiver request.
                                </p>

                            </div>
                            <textarea name="waiverText"></textarea>

                        </div> 
                        <Button variant="success">Submit Application</Button>
                        
                        
                    </div>
                </div>
            </div>
            <input type="hidden" id="wid" value="000112222"></input>
            <input type="hidden" id="eid" value="testcas"></input>
            <input type="hidden" id="name" value="Test User"></input>
            <input type="hidden" id="admin" value="0"></input>
        </div>
        <footer class="footer">
            <div class="container">
                <p class="text-muted">CS Applications - Contact   for help</p>
            </div>
        </footer>
        </div>


    );
    
}

export default ApplicationForm;