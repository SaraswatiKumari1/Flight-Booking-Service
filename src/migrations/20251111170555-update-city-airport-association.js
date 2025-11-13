'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports', {
      type: 'foreign key',
      fields: ['cityId'],
      name: 'fk_airport_cityId',
      references: {
        table: 'Cities',
        field: 'id'
      },
      onDelete: 'CASCADE',
      //onUpdate: 'CASCADE'
    })  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports', 'fk_airport_cityId');
  }
};
