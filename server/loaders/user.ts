import { User } from '../models';
import { Op } from 'sequelize';

export const batch = async (keys: number[]) => {
  const users = await User.findAll({
    where: {
      id: {
        [Op.in]: keys,
      },
    },
  });

  return keys.map((key) => users.find((u) => u.id === key));
};
