const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3002';

// async function fetchUserDetails(eid) {
//     const response = await fetch(`${API_BASE_URL}/api/getUserDetail?id=${eid}`);
//     if (!response.ok) throw new Error('Failed to fetch user details');
//     return response.json();
// }


async function fetchUserDetailsForApplication (eid) { 
    const response = await fetch(`${API_BASE_URL}/api/getUserDetail?id=${eid}`);
    if (!response.ok) throw new Error('Failed to fetch user details'); 
    const data = await response.json(); 
    return data[0];
  };


async function fetchCourses(wid) {
    const response = await fetch(`${API_BASE_URL}/api/courses?id=${wid}`);
    if (!response.ok) throw new Error('Failed to fetch courses');
    return response.json();
}

async function updateAdvisor(eid, newAdvisor) {
    const response = await fetch(`${API_BASE_URL}/api/updateAdvisor?eid=${eid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newAdvisor })
    });
    if (!response.ok) throw new Error('Failed to update advisor');
    return response.json();
}

async function submitApplication(studentData, additionalInfo, courses) {
    const response = await fetch(`${API_BASE_URL}/api/submitApplication`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentData, additionalInfo, courses })
    });
    if (!response.ok) throw new Error('Failed to submit application');
    return response.json();
}

export { 
    fetchUserDetailsForApplication,
    fetchCourses,
    updateAdvisor,
    submitApplication
};