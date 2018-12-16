const {managerRepository} = require('../repositories/ManagerRepository')

class ManagerController {

    async create(manager) {
        return await managerRepository.create(manager);
    }

    async remove(id) {
        return await managerRepository.remove(id);
    }

    async update(id, manager) {
        return await managerRepository.update(id, manager);
    }

    async findAll() {
        return await managerRepository.findAll();
    }

    async findOne(id) {
        return await managerRepository.findOne(id);
    }

    async findByStatus(status) {
        return await managerRepository.findByStatus(status);
    }

    async getSalary() {
        return await managerRepository.getSalary();
    }

}

exports.managerController = new ManagerController();