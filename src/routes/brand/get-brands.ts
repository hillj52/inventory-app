import express, { Request, Response } from 'express';

import { Brand } from '../../models/brand';
import { Roles } from '../../models/user';
import { NotFoundError } from '../../errors/not-found-error';
import { currentUser } from '../../middlewares/current-user';
import { requireLogin } from '../../middlewares/require-login';
import { requireRole } from '../../middlewares/require-role';

const router = express.Router();

router.get(
  '/api/brands',
  currentUser,
  requireLogin,
  requireRole(Roles.VIEW_INVENTORY),
  async (req: Request, res: Response) => {
    const brands = await Brand.find({}).exec();

    if (!brands) {
      throw new NotFoundError();
    }

    res.send(brands);
  }
);

export { router as getBrandsRouter };
