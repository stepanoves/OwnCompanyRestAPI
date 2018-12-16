const {companyRepository} = require('../repositories/CompanyRepository');

class CompanyController {

    async find() {
        return await companyRepository.find();
    }

    async getBudget(title) {
        return await companyRepository.getBudget(title);
    }

    async create(company) {
        return await companyRepository.create(company);
    }

    async remove(id) {
        return await companyRepository.remove(id);
    }

    async update(title, budget) {
        return await companyRepository.update(title, budget);
    }

    async paySalary(title, budget) {
        return await companyRepository.paySalary(title, budget);
    }
}


exports.companyController = new CompanyController();