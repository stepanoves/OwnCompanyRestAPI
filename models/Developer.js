const AbstractEmployee = require('./AbstractEmployee');

class Developer extends AbstractEmployee{

    constructor(name, surname, position, stringQuantity) {
        super(name, surname);
        this.position = position;
        this.stringQuantity = stringQuantity;
    }
}

Developer.SALARY = {
    false: {
        JUNIOR: 1000,
        MIDDLE: 1500,
        SENIOR: 2000
    },
    true: {
        JUNIOR: 1500,
        MIDDLE: 2000,
        SENIOR: 2500
    },
}

exports.Developer = Developer;