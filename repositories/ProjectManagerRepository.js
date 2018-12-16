const db = require('../db/dbORMConfig')
const ProjectManager = db.projectManager;

class ProjectManagerRepository {

    async create(project, manager) {
        return await ProjectManager.create(
            {
                'projectId' : project.id,
                'managerId': manager.id
            }
        );
    }

    async findManagerByProjectID(projectId) {
        let managerID = await ProjectManager.findAll(
            {
                attributes: ['managerId'], where: {projectId: +projectId}
            });
        return managerID[0];

    }

    async findByManagerID(managerId) {
        return await ProjectManager.findAll(
            {
                where: {managerId: +managerId}
            }
        )
    }

    async removeProject(projectId) {
        return await ProjectManager.destroy(
            {
                where: {projectId: +projectId}
            }
        )
    }
}

exports.projectManagerRepository = new ProjectManagerRepository();