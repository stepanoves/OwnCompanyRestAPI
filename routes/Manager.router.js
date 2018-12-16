const {managerController} = require('../controllers/Manager.controller');
const {Router} = require('express');

class ManagerRouter {
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
                await managerController.findAll()
            )
        });

        this.__router.get('/salary', async(req, res) => {
            res.json(await managerController.getSalary());
        });

        this.__router.get('/:id', async(req, res) => {
            const {id} = req.params;
            res.json(
                await managerController.findOne(id)
            )
        });

        this.__router.get('/status/:status', async(req, res) => {
            const {status} = req.params;
            console.log(status);
            res.json(
                await managerController.findByStatus(status)
            )
        });

        this.__router.post('/', async(req, res) => {
            const {body} = req;

            await managerController.create(body);
            res.status(201).end();
        })

        this.__router.put('/:id', async(req, res) => {
            const {id} = req.params;
            const {body} = req;

            await managerController.update(id, body);
            res.status(201).end();
        });

        this.__router.delete('/:id', async(req, res) => {
            const {id} = req.params;

            await managerController.remove(id);
            res.status(200).end();
        })

    }
}

exports.managerRouter = new ManagerRouter();