const {developerController} = require('../controllers/Developer.controller');
const {Router} = require('express');

class DeveloperRouter {
    constructor() {
        this.__router = new Router();
        this.__configure();
    }

    getRoutes() {
        return this.__router;
    }

    __configure() {

        this.__router.get('/getstrings', (req, res) => {
            const {body} = req;
            res.json(developerController.getCommonStrings(body));
        });

        this.__router.get('/:status', (req, res) => {
            const {status} = req.params;
            res.json(developerController.findByStatus(status));
        });

        this.__router.get('/salary/all', (req, res) => {
            res.json(developerController.getSalary());
        });

        this.__router.get('/findfree/:quantity', (req, res) => {
            const {quantity} = req.params;
            res.json(developerController.findFree(+quantity));
        });


        this.__router.post('/', (req, res) => {
            const {body} = req;
            developerController.create(body);
            res.status(201).end();
        });

        this.__router.put('/changestatus', (req, res) => {
            const {body} = req;
            developerController.changeStatus(body);
            res.status(201).end();
        });

        this.__router.put('/:id', (req, res) => {
            const {body} = req;
            const {id} = req.params;

            developerController.updateOne(+id, body);

            res.status(201).end();
        });

        this.__router.delete('/delete/:id', (req, res) => {
            const {id} = req.params;
            developerController.deleteOne(id);

            res.status(200).end();
        });

    }
}

exports.developerRouter = new DeveloperRouter();