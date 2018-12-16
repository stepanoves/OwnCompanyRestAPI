const dbProperties = require('../db.json');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbProperties.database, dbProperties.user, dbProperties.password, {
    host: dbProperties.host,
    dialect: dbProperties.dialect,
    operatorsAliases: false,

    pool: {
        max: dbProperties.pool.max,
        min: dbProperties.pool.min,
        acquire: dbProperties.pool.acquire,
        idle: dbProperties.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.company = require('./model/company.model')(sequelize, Sequelize);
db.developers = require('./model/developer.model')(sequelize, Sequelize);
db.managers = require('./model/manager.model')(sequelize, Sequelize);
db.projects = require('./model/project.model')(sequelize, Sequelize);
db.projectDeveloper = require('./model/project-developer.model')(sequelize, Sequelize);
db.projectManager = require('./model/project-manager.model')(sequelize, Sequelize);


db.projects.belongsToMany(db.developers, { through: db.projectDeveloper})
db.developers.belongsToMany(db.projects, { through: db.projectDeveloper});

db.projects.belongsToMany(db.managers, { through: db.projectManager})
db.managers.belongsToMany(db.projects, { through: db.projectManager});

module.exports = db;