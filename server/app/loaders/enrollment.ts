import { Enrollment } from '../models';
import { Op } from 'sequelize';

export const batch = async (keys: number[]) => {
  const results = await Enrollment.findAll({
    where: {
      id: {
        [Op.in]: keys,
      },
    },
  });

  return keys.map((key) => results.find((u) => u.id === key));
};
