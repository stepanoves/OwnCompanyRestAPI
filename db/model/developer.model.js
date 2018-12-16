
module.exports = (sequelize, Sequelize) => {
    const Developer = sequelize.define('developer', {
        name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        position: {
            type: Sequelize.STRING
        },
        stringQuantity: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

    });

    return Developer;
};