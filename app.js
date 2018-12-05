const express = require('express');
const bodyParser = require('body-parser');

const {developerRouter} = require('./routes/Developer.router');
const {managerRouter} = require('./routes/Manager.router');
const {projectRouter} = require('./routes/Project.router');
const {companyRouter} = require('./routes/Company.router');

const app = express();

app.use(bodyParser.json());
app.use('/developers', developerRouter.getRoutes());
app.use('/managers', managerRouter.getRoutes());
app.use('/projects', projectRouter.getRoutes());
app.use('/company', companyRouter.getRoutes());
app.use('/', express.static('www'));



app.listen('3000', () => console.log('Start'))