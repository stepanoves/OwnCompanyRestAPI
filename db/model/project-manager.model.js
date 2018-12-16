module.exports = (sequelize, Sequelize) => {
    const ProjectManager = sequelize.define('ProjectManager', {});

    return ProjectManager;
};