import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Brand } from '../../models/brand';
import { Roles } from '../../models/user';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { requireLogin } from '../../middlewares/require-login';
import { requireRole } from '../../middlewares/require-role';

const router = express.Router();

router.post(
  '/api/brands',
  currentUser,
  requireLogin,
  requireRole(Roles.EDIT_INVENTORY),
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Brand name is required')
      .escape(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const existingBrand = await Brand.findOne({
      name,
    }).exec();
    if (existingBrand) {
      throw new BadRequestError('Brand with that name already exists', 'name');
    }

    const brand = Brand.build({ name });
    await brand.save();

    res.status(201).send(brand);
  }
);

export { router as addBrandRouter };
