let {projects} = require('../mocks/Project.mock');
const {managers} = require('../mocks/Manager.mock');
const {company} = require('../mocks/Company.mock');
const {Project} = require('../models/Project');
const {developerController} = require('./Developer.controller');
const {managerController} = require('./Manager.controller');

class ProjectController {

    findByStatus(status) {
        let stat = status === 'true';
        return projects.filter(
            ({status: Pstatus}) => Pstatus === stat
        );
    }

    create( {title, cost, developerQuantity, stringQuantity} ) {
        let project = new Project(title, cost, developerQuantity, stringQuantity);
        if(!projects.length) {
            project.setID(1);
        } else {
            project.setID(projects[projects.length-1].id + 1);
        }

        projects.push(project);
    }

    updateOne( id, {title, cost, developerQuantity, stringQuantity} ) {
        const index = projects.findIndex(obj => obj.id === +id);
        projects[index].title = title;
        projects[index].cost = cost;
        projects[index].developerQuantity = developerQuantity;
        projects[index].stringQuantity = stringQuantity;
    }

    deleteOne(id) {
        const index = projects.findIndex(obj => obj.id === +id);
        projects.splice(index, 1);
    }


    doProgress(id) {
        const index = projects.findIndex(obj => obj.id === id);
        projects[index].stringQuantity -=
            developerController.getCommonStrings(projects[index].developersID.map(a => a.id))
            * managerController.findOne(projects[index].managerID).coefficient;
    }

    checkProjects() {
        for (let project of projects) {

            if (project.status) {
                this.doProgress(project.id);
            }

            if (project.stringQuantity <= 0) {
                developerController.changeStatus(project.developersID.map(a => a.id));
                managerController.changeStatus(project.managerID);
                company.budget +=  +project.cost;
                this.deleteOne(project.id);
            }

            if (project.managerID === null && managerController.findFree()) {
                project.managerID = managerController.findFree().id;
                managerController.changeStatus(managerController.findFree().id);
            }

            let freeDevelopers = developerController.findFree(project.developerQuantity);
            if(project.developersID.length === 0 && freeDevelopers) {
                developerController.changeStatus(freeDevelopers.map( p => p.id));
                project.developersID = [...freeDevelopers];
            }

            if (project.managerID !== null && project.developersID.length > 0) {
                project.status = true;
            }

        }
    }
}

exports.projectController = new ProjectController();