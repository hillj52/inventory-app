import express, { Request, Response } from 'express';

import { Source } from '../../models/source';
import { Roles } from '../../models/user';
import { NotFoundError } from '../../errors/not-found-error';
import { currentUser } from '../../middlewares/current-user';
import { requireLogin } from '../../middlewares/require-login';
import { requireRole } from '../../middlewares/require-role';

const router = express.Router();

router.get(
  '/api/sources',
  currentUser,
  requireLogin,
  requireRole(Roles.VIEW_INVENTORY),
  async (req: Request, res: Response) => {
    const sources = await Source.find({}).exec();

    if (!sources) {
      throw new NotFoundError();
    }

    res.send(sources);
  }
);

export { router as getSourcesRouter };
