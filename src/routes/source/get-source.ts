import express, { Request, Response } from 'express';

import { Source } from '../../models/source';
import { Roles } from '../../models/user';
import { NotFoundError } from '../../errors/not-found-error';
import { requireRole } from '../../middlewares/require-role';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/api/sources/getSource/:sourceId',
  requireRole(Roles.VIEW_INVENTORY),
  async (req: Request, res: Response) => {
    const { sourceId } = req.params;
    if (!sourceId || !mongoose.Types.ObjectId.isValid(sourceId)) {
      throw new NotFoundError();
    }

    const source = await Source.findById(sourceId);

    if (!source) {
      throw new NotFoundError();
    }

    res.send(source);
  }
);

export { router as getSourceRouter };
