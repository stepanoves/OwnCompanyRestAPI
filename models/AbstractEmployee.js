const AbstractEntity = require('./AbstractEntity');

class AbstractEmployee extends AbstractEntity{

    constructor(name, surname) {
        super();
        this.name = name;
        this.surname = surname;
        this.projectID = null;
    }

    setProjectID(id) {
        this.projectID = id;
    }
}

module.exports = AbstractEmployee;