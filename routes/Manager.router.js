const {Router} = require('express');
const {managerController} = require('../controllers/Manager.controller');

class ManagerRouter {
    constructor(){
        this.__router = new Router();
        this.__configure();
    }

    getRoutes() {
        return this.__router;
    }

    __configure() {
        this.__router.get('/getcoef/:id', (req, res) => {
            const {id} = req.params;
            res.json(managerController.getCoefficient(+id));
        });

        this.__router.get('/findfree', (req, res) => {
            res.json(managerController.findFree());
        });

        this.__router.get('/salary', (req, res) => {
            const {id} = req.params;
            res.json(managerController.getSalary());
        });

        this.__router.get('/:status', (req, res) => {
            const {status} = req.params;
            res.json(managerController.findByStatus(status));
        });

        this.__router.post('/', (req, res) => {
            const {body} = req;
            managerController.create(body);
            res.status(201).end();
        });

        this.__router.put('/changestatus/:id', (req, res) => {
            const {id} = req.params;
            managerController.changeStatus(id);
            res.status(201).end();
        });

        this.__router.put('/:id', (req, res) => {
            const {id} = req.params;
            const {body} = req;
            managerController.updateOne(id, body);
            res.status(201).end();
        });

        this.__router.delete('/delete/:id', (req, res) => {
            const {id} = req.params;
            managerController.deleteOne(id);
            res.status(200).end();
        });

    }
}

exports.managerRouter = new ManagerRouter();