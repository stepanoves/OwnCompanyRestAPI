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

        this.__router.get('/', async(req, res) => {
            res.json(
                await developerController.findAll()
            )
        });

        this.__router.get('/salary', async (req, res) => {
            res.json(await developerController.getSalary());
        });

        this.__router.get('/commonstrings', async(req, res) => {
            const {body} = req;
            res.json(
                await developerController.getCommonStringQuantity(body)
            )
        });

        this.__router.get('/:id', async(req, res) => {
            const {id} = req.params;
            res.json(
                await developerController.findOne(id)
        )
        });

        this.__router.get('/status/:status', async(req, res) => {
            const {status} = req.params;
            res.json(
                await developerController.findByStatus(status)
            )
        });



        this.__router.post('/', async(req, res) => {
            const {body} = req;

            await developerController.create(body);
            res.status(201).end();
        })

        this.__router.put('/:id', async(req, res) => {
            const {id} = req.params;
            const {body} = req;

            await developerController.update(id, body);
            res.status(201).end();
        });

        this.__router.delete('/:id', async(req, res) => {
            const {id} = req.params;

            await developerController.remove(id);
            res.status(200).end();
        })

    }
}

exports.developerRouter = new DeveloperRouter();