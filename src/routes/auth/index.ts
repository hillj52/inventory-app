import { Router } from 'express';

import { signInRouter } from './sign-in';
import { signUpRouter } from './sign-up';
import { signOutRouter } from './sign-out';
import { currentUserRouter } from './current-user';

const router = Router();

router.use(signInRouter);
router.use(signUpRouter);
router.use(signOutRouter);
router.use(currentUserRouter);

export { router as authRouter };
