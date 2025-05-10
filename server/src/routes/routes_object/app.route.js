import express from 'express'
const router = express.Router();

import UserAuhtRoute from './app/userAuth.route.js'
import userProfileRoute from './app/userProfile.route.js';

UserAuhtRoute(router);

userProfileRoute(router);





export default router;