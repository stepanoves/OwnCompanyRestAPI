const {company} = require('../mocks/Company.mock');
const {managerController} = require('./Manager.controller');
const {developerController} = require('./Developer.controller');

class CompanyController {

    create({title, budget}) {
        company.title = title;
        company.budget = +budget;
    }

    getCompany() {
        return company;
    }

    paySalary() {
        company.budget -= managerController.getSalary() + developerController.getSalary();
    }

}

exports.companyController = new CompanyController();