import { Router } from 'express';

import { addSourceRouter } from './add-source';
import { getSourceRouter } from './get-source';
import { getSourcesRouter } from './get-sources';

const router = Router();

router.use(addSourceRouter);
router.use(getSourceRouter);
router.use(getSourcesRouter);

export { router as sourceRouter };
