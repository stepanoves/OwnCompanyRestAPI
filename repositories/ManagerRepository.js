const Sequelize = require('sequelize');
const {SALARIES} = require('./SALARIES');
const db = require('../db/dbORMConfig')
const Managers = db.managers;

class ManagerRepository {

    async create(manager) {
        return await Managers.create(manager);
    }

    async remove(id) {
        return await Managers.destroy(
            {where: {id: id}}
        );
    }

    async update(id, manager) {
        return await Managers.update(
            {name: manager.name, surname: manager.surname, position: manager.coefficient, status: manager.status},
            {where: {id: id}}
        );
    }

    async findAll() {
        return await Managers.findAll();
    }

    async findOne(id) {
        return await Managers.findById(id);
    }


    async getSalary(managers) {
        return await Managers.sum('salary', {});
    }

    async findByStatus(status) {
        return await Managers.findAll(
            {where: {status: status === 'true'}}
        )
    }
}

exports.managerRepository = new ManagerRepository();
