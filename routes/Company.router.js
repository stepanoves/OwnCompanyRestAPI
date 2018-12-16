const {Router} = require('express');
const {companyController} = require('../controllers/Company.controller');


class CompanyRouter {

    constructor() {
        this.__router = new Router();
        this.__configure();
    }

    getRoutes() {
        return this.__router;
    }

    __configure() {

        this.__router.get('/', async(req, res) => {
            res.json(
                await companyController.find()
            );
        });

        this.__router.get('/budget/:title', async(req, res) => {
            const {title} = req.params;
            res.json(
                await companyController.getBudget(title)
            );
        });

        this.__router.post('/', async (req, res) => {
            const {body} = req;
            await companyController.create(body);
            res.status(201).end();
        });

        this.__router.delete('/:id', async(req, res) => {
            const {id} = req.params;

            await companyController.remove(id);
            res.status(200).end();
        });

        this.__router.put('/:title/:budget', async(req, res) => {
            const {title} = req.params;
            const {budget} = req.params;

            console.log(title);
            console.log(budget);

            await companyController.paySalary(title, budget);
            res.status(201).end();
        });


    }
}

exports.companyRouter = new CompanyRouter();