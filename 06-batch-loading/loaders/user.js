import { User } from '../models';
import { Op } from 'sequelize';

export const batchUsers = async (keys) => {
  console.log(keys);
  const users = await User.findAll({
    where: {
      id: {
        [Op.in]: keys,
      },
    },
  });

  return keys.map((key) => users.find((u) => u.id === key));
};
