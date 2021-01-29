import {
  Sequelize,
  Model,
  DataTypes,
  Association,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from 'sequelize';

import Message from './message';

interface UserAttributes {
  id: number,
  first: string,
  last: string,
  preferred: string,
};

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "preferred"> {};

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public first!: string;
  public last!: string;
  public preferred: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public get name() {
    return `${this.first} ${this.last}`;
  }

  public get sortable_name() {
    return `${this.last} ${this.first}`;
  }

  public readonly messages?: Message[];

  public getMessages!: HasManyGetAssociationsMixin<Message>;
  public addMessage!: HasManyAddAssociationMixin<Message, number>;
  public hasMessage!: HasManyHasAssociationMixin<Message, number>;

  public countMessages!: HasManyCountAssociationsMixin;
  public createMessage!: HasManyCreateAssociationMixin<Message>;

  public static associations: {
    messages: Association<User, Message>;
  };

  public static deferredInit(sequelize: Sequelize) {
    User.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        first: { type: DataTypes.STRING, allowNull: false },
        last: { type: DataTypes.STRING, allowNull: false },
        preferred: { type: DataTypes.STRING, allowNull: true },
      }, {
        tableName: 'users',
        sequelize,
      }
    );
  }

  public static postInit(sequelize: Sequelize) {
    console.log('post init');
    User.hasMany(sequelize.models.Message, { sourceKey: 'id', foreignKey: 'user_id', as: 'messages' });
  };
}

export default User;
