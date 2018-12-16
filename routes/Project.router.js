const {projectController} = require('../controllers/Project.controller');
const {Router} = require('express');

class ProjectRouter {
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
                await projectController.findAll()
            )
        });

        this.__router.get('/:id', async(req, res) => {
            const {id} = req.params;
            res.json(
                await projectController.findOne(id)
            )
        });

        this.__router.get('/status/:status', async(req, res) => {
            const {status} = req.params;
            res.json(
                await projectController.findByStatus(status)
            )
        });

        this.__router.post('/', async(req, res) => {
            const {body} = req;

            await projectController.create(body);
            res.status(201).end();
        })

        this.__router.put('/checkprojects', async(req, res) => {

            await projectController.checkProjects();
            res.status(201).end();
        });

        this.__router.put('/:id', async(req, res) => {
            const {id} = req.params;
            const {body} = req;

            await projectController.update(id, body);
            res.status(201).end();
        });

        this.__router.delete('/:id', async(req, res) => {
            const {id} = req.params;
            console.log(id);
            await projectController.remove(id);
            res.status(200).end();
        })

    }
}

exports.projectRouter = new ProjectRouter();