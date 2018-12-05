const {managers} = require('../mocks/Manager.mock');
const {Manager} = require('../models/Manager');

class ManagerController {

    findOne(id) {
        return managers.find(
            ({id: MId}) => MId === +id
        );
    }

    findByStatus(status) {
        let stat = status === 'true';
        return managers.filter(
            ({status: Mstatus}) => Mstatus === stat
        );
    }

    findFree() {
        let freeManagers = this.findByStatus(false);
        if (freeManagers.length >= 1) {
            return freeManagers[0];
        }
        return false;
    }

    getCefficient(managerID) {
        return this.findOne(managerID)
    }

    changeStatus(managerID) {
        this.findOne(managerID).status = !this.findOne(managerID).status;
    }

    create( {name, surname, coefficient} ) {
        let manager = new Manager(name, surname, coefficient);

        if(!managers.length) {
            manager.setID(1);
        } else {
            manager.setID(managers[managers.length-1].id + 1);
        }

        managers.push(manager);
    }

    updateOne(id, {name, surname, coefficient} ) {
        const index = managers.findIndex(obj => obj.id === +id);
        managers[index].name = name;
        managers[index].surname = surname;
        managers[index].coefficient = coefficient;
    }

    deleteOne(id) {
        const index = managers.findIndex(obj => obj.id === +id);
        managers.splice(index, 1);
    }

    getSalary() {
        let salary = 0;
        for(let manager of managers) {
            salary += Manager.SALARY[manager.status];
        }
        return salary;
    }
}

exports.managerController = new ManagerController();