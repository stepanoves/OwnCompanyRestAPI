module.exports = (sequelize, Sequelize) => {
    const Manager = sequelize.define('manager', {
        name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        coefficient: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

    });

    return Manager;
};