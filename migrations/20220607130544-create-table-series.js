'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('list_series', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      id_series: {
        type: Sequelize.STRING(25)
      },
      id_movie: {
        type: Sequelize.STRING(25)
      },
      episode: {
        type: Sequelize.STRING(225)
      },
      link_series: {
        type: Sequelize.TEXT
      },
      createAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updateAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('list_series');
  }
};
