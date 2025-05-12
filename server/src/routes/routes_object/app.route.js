import express from 'express'
const router = express.Router();

import UserAuhtRoute from './app/userAuth.route.js'
import userProfileRoute from './app/userProfile.route.js';
import userPostRoute from './app/userPost.route.js';

UserAuhtRoute(router);

userProfileRoute(router);

userPostRoute(router);



export default router;