import Sequelize from "sequelize";

module.exports = class Notice extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        notice_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        views: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        create_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        adm_id: {
          type: Sequelize.STRING(45),
          defaultValue: null,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Notice",
        tableName: "notice",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_unicode_ci",
      }
    );
  }
  static associate(db) {}
};
