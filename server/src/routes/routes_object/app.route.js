import express from 'express'
const router = express.Router();

import UserAuhtRoute from '../routes_object/app/userAuth.route.js'

UserAuhtRoute(router);





export default router;