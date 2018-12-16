const db = require('../db/dbORMConfig')
const Projects = db.projects;
const Managers = db.managers;
const Developers = db.developers;
const ProjectManager = db.projectManager;
const ProjectDeveloper = db.projectDeveloper;
const {managerRepository} = require('../repositories/ManagerRepository');
const {developerRepository} = require('../repositories/DeveloperRepository');
const {projectDeveloperRepository} = require('../repositories/ProjectDeveloperRepository');
const {projectManagerRepository} = require('../repositories/ProjectManagerRepository');


class ProjectsRepository {

    async create(project) {
        return await Projects.create(project);
    }

    async remove(id) {
        return await Projects.destroy(
            {where: {id: id}}
        );
    }

    async update(id, project) {
            return await Projects.update(
            {title: project.title, cost: project.cost, developerQuantity: project.developerQuantity, stringQuantity: project.stringQuantity, status: project.status},
            {where: {id: id}}
        );
    }

    async findAll() {
        return await Projects.findAll();
    }

    async findOne(id) {
        return await Projects.findById(id);
    }

    async findByStatus(status) {
        return await Projects.findAll(
            {where: {status: status === 'true'}}
        )
    }

    async doProgress(id) {
        console.log('do progress');
        const project = await this.findOne(id);
        const developersId = await projectDeveloperRepository.findDevelopersByProjectID(id);
        const commonStrings = await developerRepository.getCommonStringQuantity(developersId);
        const managerId = await projectManagerRepository.findManagerByProjectID(id);
        console.log(managerId);
        const manager = await managerRepository.findOne(managerId.managerId);

        project.stringQuantity -= commonStrings * manager.coefficient;

        await this.update(project.id, project);
    }

    async checkProjects() {
        const projects = await this.findAll();

        console.log('check start');

        for (let project of projects) {
            if (project.status) {
                await this.doProgress(project.id);
            }

            if (project.stringQuantity <= 0) {
                console.log('check end');
                const developersId = await projectDeveloperRepository.findDevelopersByProjectID(project.id);
                for (let developerId of developersId) {
                    const developer = await developerRepository.findOne(developerId.developerId);
                    developer.status = false;
                    console.log(developer);
                    await developerRepository.update(developerId.developerId, developer);
                }

                const managerId = await projectManagerRepository.findManagerByProjectID(id);
                const manager = await managerRepository.findOne(managerId.managerId);
                manager.status = true;
                await managerRepository.update(managerId.managerId, manager);

                await projectManagerRepository.removeProject(project.id);
                await projectDeveloperRepository.removeProject(project.id);
                await this.remove(project.id);
            }

            let developers =  await developerRepository.findByStatus(false);
            let manager = await managerRepository.findByStatus(false);
            if (!project.status && developers.length >= project.developerQuantity && manager.length) {
                developers = developers.slice(0, project.developerQuantity);
                manager = manager.slice(0, 1);

                for (let i of developers) {
                    i.status = true;
                    await developerRepository.update(i.id, i);
                    await projectDeveloperRepository.create(project, i);
                }
                for (let i of manager) {
                    i.status = true;
                    await managerRepository.update(i.id, i);
                    await projectManagerRepository.create(project, i);
                }

                project.status = true;
                await this.update(project.id, project);
            }
        }
    }



}

exports.projectRepository = new ProjectsRepository();