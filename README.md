# CS Professional Applications System
Welcome to the Professional Applications System, a capstone project developed by [Jake Houghton](https://github.com/J-Houghton), [Josh Munda](https://github.com/josh-munda), [Nathan York](https://github.com/nafemage), and [Zach Berard](https://github.com/zmberard).  

## Table of Contents

* [Getting Started](#getting-started)
* [Description](#description)
* [Features](#features)
* [Contributing](#contributing)
* [License](#license)

## Getting Started

**Prerequisites** 
* Software required
    * Node.js (version 16/18 or higher)

**Running the Project** 
1. Client Side
    * Install Client packages: ```cd client/app && npm install```
    * Starting Client: ```npm start``` 
2. Server Side
    * Install Server packages: ```cd server && npm install```
    * Update [.env](server/.env) file
    * Start the Server: ```node server.js```

## Description
 This applicaiton will keep track of an individual student’s pre-professional and professional program GPA and the status of the student’s professional program application. It will have information about the student’s advisor, how far along they are in their degree program, and allow the student to fill out the professional program application automatically. After project completion, it will be maintained by CIS faculty and staff. 

 The Client side is built using React JS, in the backend the application is using Express and using Postgresql database. [Link to Database Tables](server/dbtables.txt)

# Features
## System Features
  - Intergrated KSU Single Sign-On/Central Authencation System to ensure seamless intergration and enhanced security.  
 - CORS Protection
 - Page Authorization Protection 
 - SQL Injection Protection 

## Admin Features
  - Customized tables for better readability and functionality: 
    - Sortable Columns
    - Filterable Columns
    - Item per page
    - Pagination
  - Modal components with student specific data  
  - Data export
  - Email with template


## Student Features 
  - Auto Populating student data to mininze input
  - Added Name update feature.  
  - Animated background and loading page to enhance UX 

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

The routes of this project are heavily influenced from Russell Feldhausen. Mr. Feldhausen allowed us to use inspiration from 'officehours-node' program to complete with the routes.

## License

Copyright © Microsoft Corporation All rights reserved.<br />
Licensed under the MIT License. See LICENSE in the project root for license information.
