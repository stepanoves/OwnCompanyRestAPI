const {developers} = require('../mocks/Developer.mock');
const {Developer} = require('../models/Developer');

class DeveloperController {

    findOne(id) {
        return developers.find(
            ({id: DId}) => DId === +id
        );
    }

    findByStatus(status) {
        let stat = status == 'true';
        return developers.filter(
            ({status: Dstatus}) => Dstatus === stat
        );
    }

    findFree(quantity) {
        let freeDevelopers = this.findByStatus(false);
        if (freeDevelopers.length >= quantity) {
            freeDevelopers.length = quantity;
            return freeDevelopers;
        }
        return false;
    }

    changeStatus(developersID) {
        for (let developerID of developersID) {
            this.findOne(+developerID).status = !this.findOne(+developerID).status;
        }
    }

    create( {name, surname, position, stringQuantity} ) {
        let developer = new Developer(name, surname, position, +stringQuantity);
        if(!developers.length) {
            developer.setID(1);
        } else {
            developer.setID(developers[developers.length-1].id + 1);
        }

        developers.push(developer);
    }

    updateOne( id, {name, surname, position, stringQuantity}) {

        const index = developers.findIndex(obj => obj.id === +id);
        developers[index].name = name;
        developers[index].surname = surname;
        developers[index].position = position;
        developers[index].stringQuantity = stringQuantity;

    }

    deleteOne(id) {
        const index = developers.findIndex(obj => obj.id === +id);
        console
        developers.splice(index, 1);
    }

    deleteAll() {
        developers.lenght = 0;
    }

    getSalary() {
        let salary = 0;
        for(let developer of developers) {
            salary += Developer.SALARY[developer.status][developer.position];
        }
        return salary;
    }

    getCommonStrings(developersID) {
        let commonStrings = 0;
        for (let developerID of developersID) {
            commonStrings += this.findOne(+developerID).stringQuantity;
        }

        return commonStrings;
    }
}

exports.developerController = new DeveloperController();