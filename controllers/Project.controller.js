const {projectRepository} = require('../repositories/ProjectRepository')

class ProjectController {

    async create(project) {
        return await projectRepository.create(project);
    }

    async remove(id) {
        return await projectRepository.remove(id);
    }

    async update(id, project) {
        return await projectRepository.update(id, project);
    }

    async findAll() {
        return await projectRepository.findAll();
    }

    async findOne(id) {
        return await projectRepository.findOne(id);
    }

    async findByStatus(status) {
        return await projectRepository.findByStatus(status);
    }

    async checkProjects() {
        await projectRepository.checkProjects();
    }

}

exports.projectController = new ProjectController();