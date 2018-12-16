const Sequelize = require('sequelize');
const {SALARIES} = require('./SALARIES');
const db = require('../db/dbORMConfig');
const Developers = db.developers;
class DeveloperRepository {

    async create(developer) {
        return await Developers.create(developer);
    }

    async remove(id) {
        return await Developers.destroy(
            {where: {id: id}}
        );
    }

    async update(id, developer) {
        return await Developers.update(
            {name: developer.name, surname: developer.surname, position: developer.position, stringQuantity: developer.stringQuantity, status: developer.status},
            {where: {id: id}}
        );
    }

    async findAll() {
        return await Developers.findAll();
    }

    async findOne(id) {
        return await Developers.findById(id);
    }

    async findByStatus(status) {
        return await Developers.findAll(
            {where: {status: status === 'true'}}
        )
    }

    async getSalary(developers) {
        return await Developers.sum('salary', {});
    }

    async getCommonStringQuantity(developersId) {
        return await Developers.sum('stringQuantity',
            {
                where: {id: developersId.map(element => element.developerId)}
            }
        );
    }

    async changerStatus(status) {
        return
    }
}

exports.developerRepository = new DeveloperRepository();