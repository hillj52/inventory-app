import { Router } from 'express';

import { addBrandRouter } from './add-brand';
import { getBrandRouter } from './get-brand';
import { getBrandsRouter } from './get-brands';

const router = Router();

router.use(addBrandRouter);
router.use(getBrandRouter);
router.use(getBrandsRouter);

export { router as brandRouter };
