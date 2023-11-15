/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

const express = require('express');

// default environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
	res.send('Hello remote world!\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);



app.get('/apply', require('./endpoints/apply/show-application.js'))
app.post('/apply', require('./endpoints/apply/process-application.js'))
  
app.get('/email', require('./endpoints/email/send-email.js'))
app.post('/email', require('./endpoints/email/process-email.js'))

app.get('/login', require('./endpoints/login/show-login.js'))
app.post('/login', require('./endpoints/login/process-login.js'))

app.get('/profile', require('./endpoints/profile/student-profile.js'))
app.post('/profile', require('./endpoints/profile/process-profile.js'))