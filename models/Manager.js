const AbstractEmployee = require('./AbstractEmployee');

class Manager extends AbstractEmployee{

    constructor(name, surname, coefficient) {
        super(name, surname);
        this.coefficient = coefficient;
    }

}

Manager.SALARY = {
    false: 2000,
    true: 3000
}
exports.Manager = Manager;
