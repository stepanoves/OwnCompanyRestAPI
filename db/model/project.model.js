
module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define('project', {
        title: {
            type: Sequelize.STRING
        },
        cost: {
            type: Sequelize.INTEGER
        },
        developerQuantity: {
            type: Sequelize.INTEGER
        },
        stringQuantity: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

    });

    return Project;
};