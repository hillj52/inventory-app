import express, { Request, Response } from 'express';
import { Source } from '../../models/source';
import { Roles } from '../../models/user';
import { NotFoundError } from '../../errors/not-found-error';
import { currentUser } from '../../middlewares/current-user';
import { requireLogin } from '../../middlewares/require-login';
import { requireRole } from '../../middlewares/require-role';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/api/sources/:id',
  currentUser,
  requireLogin,
  requireRole(Roles.VIEW_INVENTORY),
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundError();
    }

    const source = await Source.findById(id).exec();

    if (!source) {
      throw new NotFoundError();
    }

    res.send(source);
  }
);

export { router as getSourceRouter };
