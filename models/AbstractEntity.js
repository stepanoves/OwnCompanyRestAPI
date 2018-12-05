class AbstractEntity {
    constructor() {
        this.id;
        this.status = false;
    }

    setID(id) {
        this.id = id;
    }
}

module.exports = AbstractEntity;