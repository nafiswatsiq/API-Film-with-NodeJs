'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('movie', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      id_movie: {
        type: Sequelize.STRING(25)
      },
      title: {
        type: Sequelize.STRING(225)
      },
      slug: {
        type: Sequelize.STRING(225)
      },
      description: {
        type: Sequelize.TEXT
      },
      duration: {
        type: Sequelize.INTEGER
      },
      viewers: {
        type: Sequelize.BIGINT,
        defaultValue: 0
      },
      thumbnail: {
        type: Sequelize.TEXT
      },
      link_movie: {
        type: Sequelize.TEXT
      },
      rating: {
        type: Sequelize.STRING(4)
      },
      type: {
        type: Sequelize.INTEGER,
        comment: '0 = movie, 1 = series'
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
    await queryInterface.dropTable('movie');
  }
};
