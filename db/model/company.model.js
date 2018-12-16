module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define('company', {
        title: {
            type: Sequelize.STRING
        },
        budget: {
            type: Sequelize.INTEGER
        }
    });

    return Company;
};