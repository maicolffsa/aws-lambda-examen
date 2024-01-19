import express, { Router } from 'express';


import targetRouter from './target.routes';
import tokenRouter from './token.routes';
//import subcategoryRouter from '../../modules/public/routes/subcategory.public.routes.js';
//import location from '../../modules/public/routes/subcategory.public.routes.js';

const PublicRoutes: Router = express.Router();

PublicRoutes.use('/target/', targetRouter);
PublicRoutes.use('/token/', tokenRouter);
//PublicRoutes.use('/subcategory/', subcategoryRouter);
//PublicRoutes.use('/location/', location);

export default PublicRoutes