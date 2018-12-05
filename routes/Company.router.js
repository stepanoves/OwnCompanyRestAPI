const {companyController} = require('../controllers/Company.controller');
const {Router} = require('express');


class CompanyRouter {

    constructor() {
        this.__router = new Router();
        this.__configure();
    }

    getRoutes() {
        return this.__router;
    }

    __configure() {
        this.__router.get('/', (req, res) => {
            res.json(companyController.getCompany());
        });

        this.__router.post('/', (req, res) => {
            const {body} = req;
            console.log(body);
            companyController.create(body);
            res.status(201).end();
        });

        this.__router.put('/paysalary', (req, res) => {
            companyController.paySalary();
            res.status(201).end();
        });
    }
}

exports.companyRouter = new CompanyRouter();