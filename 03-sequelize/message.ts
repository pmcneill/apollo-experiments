import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
} from 'sequelize';

interface MessageAttributes {
  id: number,
  text: string,
  user_id: number,
};

interface MessageCreationAttributes extends Optional<MessageAttributes, "id"> {};

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public text!: string;
  public user_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static deferredInit(sequelize: Sequelize) {
    Message.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        text: { type: DataTypes.STRING, allowNull: false },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
      }, {
        tableName: 'messages',
        sequelize,
      }
    );

    Message.belongsTo(sequelize.models.User, { targetKey: 'id' });
  }

  public static postInit(_sequelize: Sequelize) {
  }
}

export default Message;
