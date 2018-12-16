const Sequelize = require('sequelize');

const db = require('../db/dbORMConfig')
const {SALARIES} = require('./SALARIES');
const Company = db.company;
const Managers = db.managers;
const Developers = db.developers;

class CompanyRepository {

    async find() {
        return await Company.findAll();
    }

    async getBudget(title) {
        return await Company.findAll(
            {attributes: ['budget'], where: {title: title}}
        );
    }

    async create(company) {
        return await Company.create(company);
    }

    async remove(id) {
        return await Company.destroy( {where: {id: id} } );
    }

    async update(title, budget) {
        return await Company.update(
            {title: title, budget: budget},
            {where: {title: title}}
        );
    }

    async paySalary(title, budget) {
        const managers = await Managers.findAll();
        const developers = await Developers.findAll();
        let salary = 0;

        salary += managers.reduce((accumulator, element) => {
            return accumulator + SALARIES.MANAGER[element.status];
        }, 0);

        salary += developers.reduce((accumulator, element) => {
            return accumulator + SALARIES.DELEVELOPER[element.status][element.position];
        }, 0);

        return await this.update(title, budget - salary);
    }

}

exports.companyRepository = new CompanyRepository();