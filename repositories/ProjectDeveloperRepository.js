const db = require('../db/dbORMConfig')
const ProjectDeveloper = db.projectDeveloper;

class ProjectDeveloperRepository {

    async create(project, developer) {
        return await ProjectDeveloper.create(
            {
                'projectId' : project.id,
                'developerId': developer.id
            }
        );
    }

    async findDevelopersByProjectID(projectId) {
        return await ProjectDeveloper.findAll(
            {
                attributes: ['developerId'], where: {projectId: +projectId}
            }
        )
    }

    async findByDeveloperID(developerId) {
        return await ProjectDeveloper.findAll(
            {
                where: {developerId: +developerId}
            }
        )
    }

    async removeProject(projectId) {
        return await ProjectDeveloper.destroy(
            {
                where: {projectId: +projectId}
            }
        )
    }
}

exports.projectDeveloperRepository = new ProjectDeveloperRepository();