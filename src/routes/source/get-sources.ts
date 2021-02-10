import express, { Request, Response } from 'express';

import { Source } from '../../models/source';
import { Roles } from '../../models/user';
import { NotFoundError } from '../../errors/not-found-error';
import { requireRole } from '../../middlewares/require-role';

const router = express.Router();

router.get(
  '/api/sources/getSources',
  requireRole(Roles.VIEW_INVENTORY),
  async (req: Request, res: Response) => {
    const sources = await Source.find({});

    if (!sources) {
      throw new NotFoundError();
    }

    res.send(sources);
  }
);

export { router as getSourcesRouter };
