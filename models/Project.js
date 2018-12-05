const AbstractEntity = require('./AbstractEntity');

class Project extends AbstractEntity {

    constructor(title, cost, developerQuantity, stringQuantity) {
        super();
        this.title = title;
        this.cost = cost;
        this.developerQuantity = developerQuantity;
        this.stringQuantity = stringQuantity;
        this.managerID = null;
        this.developersID = [];
    }
}

exports.Project = Project;