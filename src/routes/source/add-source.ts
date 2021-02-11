import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Source } from '../../models/source';
import { Roles } from '../../models/user';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { requireLogin } from '../../middlewares/require-login';
import { requireRole } from '../../middlewares/require-role';

const router = express.Router();

router.post(
  '/api/sources',
  currentUser,
  requireLogin,
  requireRole(Roles.EDIT_INVENTORY),
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Source name is required')
      .escape(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const existingSource = await Source.findOne({
      name,
    }).exec();
    if (existingSource) {
      throw new BadRequestError('Source with that name already exists', 'name');
    }

    const source = Source.build({ name });
    await source.save();

    res.status(201).send(source);
  }
);

export { router as addSourceRouter };
