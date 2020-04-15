// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Scorecard = sequelize.define("Scorecard", {
    // The email cannot be null, and must be a proper email before creation

    
  });

  Scorecard.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Scorecard.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Scorecard.hasMany(models.UserTask, {
        foreignKey: {
          allowNull: false
        }
      })
  };

  return Scorecard;
};
