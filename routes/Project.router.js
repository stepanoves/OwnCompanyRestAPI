const {Router} = require('express');
const {projectController} = require('../controllers/Project.controller');

class ProjectRouter {
    constructor() {
        this.__router = new Router();
        this.__configure();
    }

    getRoutes() {
        return this.__router;
    }

    __configure() {

        this.__router.get('/:status', (req, res) => {
            const {status} = req.params;
            res.json(projectController.findByStatus(status));
        });

        this.__router.post('/', (req, res) => {
            const {body} = req;
            projectController.create(body);
            res.status(201).end();
        });

        this.__router.put('/checkprojects', (req, res) => {
            projectController.checkProjects();
            res.status(201).end();
        });

        this.__router.delete('/delete/:id', (req, res) => {
            const {id} = req.params;
            projectController.deleteOne(id);
            res.status(200).end();
        });
    }
}

exports.projectRouter = new ProjectRouter();