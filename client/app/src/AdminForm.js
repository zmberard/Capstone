import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import LoadingIndicator from './LoadingIndicator'; 
import styles from './AdminForm.module.css';
import { unparse } from 'papaparse';
 
function AdminForm() {
    const [applications, setApplications] = useState([]);  
    const [checkedStates, setCheckedStates] = useState({});  
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('info');
    const [showAlert, setShowAlert] = useState(false); 

    const handleCheckAllChange = (isChecked) => {  
        const newCheckedStates = applications.reduce((acc, app) => {
            acc[app.wid] = isChecked;  
            return acc;
        }, {});
        setCheckedStates(newCheckedStates);
    };

    const handleCheckboxChange = (appId, isChecked) => {  
        setCheckedStates(prevStates => ({ ...prevStates, [appId]: isChecked }));
    }; 
    function handleDisable() {
        const disabledIds = Object.entries(checkedStates).filter(([id, isChecked]) => isChecked).map(([id]) => id); 
        setIsLoading(true); // Start loading
        fetch('http://localhost:3002/api/disable-applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: disabledIds })
        })
        .then(response => response.json())
        .then(data => {
            if (data.disabledIds && data.disabledIds.length > 0) {
                setStatusMessage(`The following applications have been disabled successfully, wid(s): ${data.disabledIds.join(', ')}`);  
                setAlertStatus('success');
                setShowAlert(true);
                fetchApplications();
            }
            
        })
        .catch((error) => {
            console.error('Error:', error);
            setStatusMessage('Failed to disable applications.');
            setAlertStatus('danger');
            setShowAlert(true);
        })
        .finally(() => {
            setIsLoading(false);  
        });
    }
    

    function handleDownloadSelected(applications, checkedStates) {
        // Filter applications to include only those that are checked
        const filteredApps = applications.filter(app => checkedStates[app.wid]);
    
        // exclude 'Review' and 'Edit' columns
        const data = filteredApps.map(app => ({
            "First Name": app.first_name,
            "Last Name": app.last_name,
            "EID": app.eid,
            "Email": app.email,
            "WID": app.wid,
            "Advisor": app.advisor,
            "Semester": app.semester,
            "Waiver": app.waiver ? "Yes" : "No",
            "Status": app.status,
            "Admin Notes": app.notes,
            "DARS Update": formatDate(app.d_update)  
        }));
    
        // Convert data to CSV
        const csv = unparse(data);
    
        // Create a blob link to download
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'download.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    function handleEmailSelected() {
        const emailIds = Object.entries(checkedStates).filter(([id, isChecked]) => isChecked).map(([id]) => id);
    
        setIsLoading(true); // Start loading
        fetch('http://localhost:3002/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: emailIds })
        })
        .then(response => response.json())
        .then(data => {
            setStatusMessage('Emails have been sent successfully.');
            setAlertStatus('success');
            setShowAlert(true);
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            setStatusMessage(`Failed to send emails: ${error.message}`);
            setAlertStatus('danger');
            setShowAlert(true);
        })
        .finally(() => {
            setIsLoading(false);  
        });
    } 

    function handleReview(appId) {
        alert(`Reviewing application ID: ${appId}`);
    }
    
    function handleEdit(appId) {
        alert(`Editing application ID: ${appId}`);
    }
    
    function handleViewNotes(appId, notes) {
        alert(`Notes for application ID: ${appId}: ${notes}`);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', dateOptions);
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
        return `${formattedDate} at ${formattedTime}`;
    }

    const fetchApplications = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3002/api/applications');
            const data = await response.json();
            setApplications(data);
        } catch (error) {
            console.log("Error fetching applications: ", error);
        } finally {
            setIsLoading(false);
        }
        
      };

    useEffect(() => { 
      fetchApplications();
    }, []);

    const advisorOptions = Array.from(new Set(applications.map(app => app.advisor)));
    const semesterOptions = Array.from(new Set(applications.map(app => app.semester)));

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); 
    const [filters, setFilters] = useState({
        firstName: "",
        lastName: "",
        eid: "",
        email: "",
        wid: "",
        advisor: "All",
        semester: "All",
        waiver: "Both",
        status: "All"
      });


    
    function substringSearch(fullString, searchTerm) {
        if (typeof fullString === 'number') {
          fullString = fullString.toString();
        }
        return fullString.toLowerCase().includes(searchTerm.toLowerCase());
      }
      
      const filteredApplications = applications.filter(app => {
        return (filters.firstName === "" || substringSearch(app.first_name, filters.firstName)) &&
               (filters.lastName === "" || substringSearch(app.last_name, filters.lastName)) &&
               (filters.eid === "" || substringSearch(app.eid, filters.eid)) &&
               (filters.email === "" || substringSearch(app.email, filters.email)) &&
               (filters.wid === "" || substringSearch(app.wid.toString(), filters.wid)) && // Ensure wid is a string
               (filters.advisor === "All" || app.advisor === filters.advisor) &&
               (filters.semester === "All" || app.semester === filters.semester) &&
               (filters.waiver === "Both" || (filters.waiver === "Yes" ? app.waiver : !app.waiver)) &&
               (filters.status === "All" || app.status === filters.status);
      });

    function handleChangeItemsPerPage(event) {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);  
    }

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    function handleFilterChange(e) {
        const { name, value } = e.target;
        setCurrentPage(1);
        setFilters(prevFilters => ({
          ...prevFilters,
          [name]: value
        })); 
    } 

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' }); 
    function handleSort(key) {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
    }

    const sortedApplications = React.useMemo(() => {
        let sortableItems = [...filteredApplications];
        if (sortConfig !== null) {
          sortableItems.sort((a, b) => {
            let itemA = a[sortConfig.key];
            let itemB = b[sortConfig.key];

             // Ensure all values are strings for consistent comparison
             itemA = typeof itemA === 'string' ? itemA.toLowerCase() : itemA;
             itemB = typeof itemB === 'string' ? itemB.toLowerCase() : itemB;
 
             // Special handling for 'Admin Notes' and DARS_UPDATE
 
             
            if (itemA < itemB) {
              return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (itemA > itemB) {
              return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
          });
        }
        return sortableItems;
      }, [filteredApplications, sortConfig]); 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage); 
    const currentItems = sortedApplications.slice(indexOfFirstItem, indexOfLastItem);
    

    return(
        
        <div className={styles.AdminForm}>
            {isLoading ? (
                <LoadingIndicator />
            ) : ( <> 
            <Container role="main"> 
                {showAlert && (
                    <Alert variant={alertStatus} onClose={() => setShowAlert(false)} dismissible>
                        {statusMessage}
                    </Alert>
                )}
                <Row>
                    <Col xs={12}>
                        <h3 className={styles.h3StyleTop}>Review Applications</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}> 
                        <h3 className={styles.h3StyleBot}>Total Applications: {applications.length}</h3>  
                    </Col>
                </Row>   
                <Row>
                    <Col xs={12} className={styles['button-container']}>  
                        <Button variant="dark" onClick={() => setSortConfig({ key: null, direction: 'ascending' })}>
                            Reset Sort
                        </Button> 
                        <div>
                            <Button onClick={handleDisable} type="button" id="disable_application" variant="danger" style={{ marginRight: '8px' }} disabled={Object.values(checkedStates).every(isChecked => !isChecked)}>
                                Disable Application(s)
                            </Button>
                            <Button onClick={() => handleDownloadSelected(applications, checkedStates)} type="button" id="download_selected" variant="success" style={{ marginRight: '8px' }} disabled={Object.values(checkedStates).every(isChecked => !isChecked)}>
                                Download Selected
                            </Button>
                            <Button onClick={handleEmailSelected} type="button" id="email_selected" variant="secondary" style={{ marginRight: '8px' }} disabled={Object.values(checkedStates).every(isChecked => !isChecked)}>
                                Email Selected
                            </Button> 
                        </div>
                    </Col>
                </Row> 
                <Row>
                    <div className={styles['custom-table-container']}> 
                        <table className={`${styles['custom-table']} ${styles['custom-table-striped']}`}> 
                            <thead>
                                <tr>
                                <th><input className={styles['filter-input']} type="checkbox" id="checkAll" onChange={handleCheckAllChange} checked={filteredApplications.length > 0 && filteredApplications.every(app => checkedStates[app.wid])}/></th>
                                <th>
                                    <div className={styles.sortHeaderContainer}>
                                    <div className={styles.sortHeaderTop}>
                                        First Name
                                        <div className={`${styles.sortHeader} ${ sortConfig.key === 'first_name' ? sortConfig.direction === 'ascending' ? styles.sortAsc : styles.sortDesc : '' }`}
                                            onClick={() => handleSort('first_name')}
                                        ></div>
                                    </div>
                                    <input className={styles['filter-input']} type="text" name="firstName" placeholder="First Name" onChange={handleFilterChange} value={filters.firstName} />
                                    </div>
                                </th>

                                <th>
                                    <div className={styles.sortHeaderContainer}>
                                        <div className={styles.sortHeaderTop}>
                                            Last Name
                                            <div className={`${styles.sortHeader} ${ sortConfig.key === 'last_name' ? sortConfig.direction === 'ascending' ? styles.sortAsc : styles.sortDesc : '' }`}
                                                onClick={() => handleSort('last_name')}
                                            ></div>
                                        </div>
                                        <input className={styles['filter-input']} type="text" name="lastName" placeholder="Last Name" onChange={handleFilterChange} value={filters.lastName} />
                                    </div>
                                </th>

                                <th>
                                    <div className={styles.sortHeaderContainer}>
                                        <div className={styles.sortHeaderTop}>
                                            EID
                                            <div className={`${styles.sortHeader} ${
                                                sortConfig.key === 'eid' 
                                                    ? sortConfig.direction === 'ascending' 
                                                    ? styles.sortAsc 
                                                    : styles.sortDesc 
                                                    : ''  }`}  onClick={() => handleSort('eid')} ></div>
                                        </div>
                                        <input className={styles['filter-input']} type="text" name="eid" placeholder="EID" onChange={handleFilterChange} value={filters.eid} />
                                    </div>
                                </th>

                                <th>
                                    <div className={styles.sortHeaderContainer}>
                                        <div className={styles.sortHeaderTop}>
                                            Email
                                            <div className={`${styles.sortHeader} ${
                                                sortConfig.key === 'email' 
                                                    ? sortConfig.direction === 'ascending' 
                                                    ? styles.sortAsc 
                                                    : styles.sortDesc 
                                                    : '' }`} onClick={() => handleSort('email')} ></div>
                                        </div>
                                        <input className={styles['filter-input-email']} type="text" placeholder="Email" onChange={handleFilterChange} value={filters.email} />
                                    </div>
                                </th>

                                <th>
                                    <div className={styles.sortHeaderContainer}>
                                        <div className={styles.sortHeaderTop}>
                                            WID
                                            <div className={`${styles.sortHeader} ${
                                                sortConfig.key === 'wid' 
                                                    ? sortConfig.direction === 'ascending' 
                                                    ? styles.sortAsc 
                                                    : styles.sortDesc 
                                                    : ''
                                                }`} onClick={() => handleSort('wid')} ></div>
                                        </div>
                                        <input className={styles['filter-input']} type="text" name="wid" placeholder="WID" onChange={handleFilterChange} value={filters.wid} />
                                    </div>
                                </th>
                                
                                <th>
                                    Advisor
                                    <select name="advisor" onChange={handleFilterChange} value={filters.advisor}>
                                        <option value="All">All</option>
                                        {advisorOptions.map((advisor, index) => (
                                            <option key={index} value={advisor}>{advisor}</option>
                                        ))}
                                    </select>
                                </th>
                                <th>
                                    Semester
                                    <select name="semester" onChange={handleFilterChange} value={filters.semester}>
                                        <option value="All">All</option>
                                        {semesterOptions.map((semester, index) => (
                                            <option key={index} value={semester}>{semester}</option>
                                        ))}
                                    </select>
                                </th>
                                <th>
                                    Waiver
                                    <select name="waiver" onChange={handleFilterChange} value={filters.waiver}>
                                        <option value="Both">Both</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </th>
                                <th>
                                    Status
                                    <select name="status" onChange={handleFilterChange} value={filters.status}>
                                        <option value="All">All</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Pending/Exception">Pending/Exception</option>
                                        <option value="Pending/Dismissed">Pending/Dismissed</option>
                                        <option value="Pending/Reinstated">Pending/Reinstated</option>
                                        <option value="Pending(All)">Pending(All)</option>
                                        <option value="Declined">Declined</option>
                                        <option value="Declined/Exception">Declined/Exception</option>
                                        <option value="Withdrawn">Withdrawn</option>
                                    </select>
                                </th>
                                <th>Review</th>
                                <th>Edit</th>
                                <th>Admin Notes
                                    <div className={`${styles.sortHeader} ${
                                        sortConfig.key === 'admin_notes' ? sortConfig.direction === 'ascending' ? styles.sortAsc : styles.sortDesc : ''
                                    }`} onClick={() => handleSort('admin_notes')}></div>
                                </th>
                                <th>DARS Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((app, index) => (
                                    <tr key={index}> 
                                        <td><input id={app.wid + "_checked"} type="checkbox"
                                            checked={!!checkedStates[app.wid]}
                                            onChange={e => handleCheckboxChange(app.wid, e.target.checked)}
                                        /></td>
                                        <td>{app.first_name}</td>
                                        <td>{app.last_name}</td>
                                        <td>{app.eid}</td>
                                        <td>{app.email}</td>
                                        <td>{app.wid}</td>
                                        <td>{app.advisor}</td>
                                        <td>{app.semester}</td>
                                        <td>{app.waiver ? "Yes" : "No"}</td>
                                        <td>{app.status}</td>
                                        <td><Button onClick={() => handleReview(app.wid)} type="button" variant="primary" id={app.wid + "_review_btn"}>Review</Button> </td>
                                        <td><Button onClick={() => handleEdit(app.wid)} type="button" variant="warning" id={app.wid + "_edit_btn"}>Edit</Button> </td> 
                                        <td>{app.notes?(<Button onClick={() => handleViewNotes(app.wid)} type="button" variant="info" id={app.wid + "_notes_btn"}>View Notes</Button>):("")}</td>
                                        <td>{formatDate(app.d_update)}</td> 
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> 
                </Row>  
                <Row>
                    {/* Pagination Controls */}
                    <Col xs={2}>
                        <p >Applications Per Page: </p>
                    </Col>
                    <Col xs={1}> 
                        <select value={itemsPerPage} onChange={handleChangeItemsPerPage} style={{ marginLeft: '-50px' }} >
                            {[5, 10, 15, 20, 25, 50, 100].map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </Col>
                    <Col xs={8}>
                    <div>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button key={number} onClick={() => handlePageChange(number)} disabled={currentPage === number}>
                            {number}
                        </button>
                        ))}
                    </div>
                    
                    </Col>
                </Row>
            </Container>
            </>  )}
        </div>  
    );

    
}

export default AdminForm;