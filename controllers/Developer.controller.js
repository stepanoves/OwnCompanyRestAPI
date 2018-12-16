const {developerRepository} = require('../repositories/DeveloperRepository')

class DeveloperController {

    async create(developer) {
        return await developerRepository.create(developer);
    }

    async remove(id) {
        return await developerRepository.remove(id);
    }

    async update(id, developer) {
        return await developerRepository.update(id, developer);
    }

    async findAll() {
        return await developerRepository.findAll();
    }

    async findOne(id) {
        return await developerRepository.findOne(id);
    }

    async findByStatus(status) {
        return await developerRepository.findByStatus(status);
    }

    async getSalary() {
        return await developerRepository.getSalary();
    }

    async getCommonStringQuantity(developersID) {
        return await developerRepository.getCommonStringQuantity(developersID);
    }

}

exports.developerController = new DeveloperController();