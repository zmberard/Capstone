function showApplication(req, res){
    /*
        step 1 fetch course data from database
    */

    // step 2 calcualte the pre-professional gpa    
    const preprofessionalGPA = 3.5;

    // step 3 populate a application object
    var form = {
        eid:"Willie",
        preprofessionalGPA: preprofessionalGPA,
        courses:[
            {
                name:"CIS115",
                grade:4,
                hours:3
            },
            {
                name:"CIS200",
                grade:3,
                hours:3
            }
        ]
    }

    // Step 4 send the application object to the client
    res.json(form);
}

module.exports = showApplication