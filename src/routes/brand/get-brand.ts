import express, { Request, Response } from 'express';
import { Brand } from '../../models/brand';
import { Roles } from '../../models/user';
import { NotFoundError } from '../../errors/not-found-error';
import { currentUser } from '../../middlewares/current-user';
import { requireLogin } from '../../middlewares/require-login';
import { requireRole } from '../../middlewares/require-role';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/api/brands/:id',
  currentUser,
  requireLogin,
  requireRole(Roles.VIEW_INVENTORY),
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundError();
    }

    const brand = await Brand.findById(id).exec();

    if (!brand) {
      throw new NotFoundError();
    }

    res.send(brand);
  }
);

export { router as getBrandRouter };
