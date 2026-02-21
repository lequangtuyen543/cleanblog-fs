import { Express } from 'express';
import { userRoutes } from './user.route';
import { postRoutes } from './post.route';
import { roleRoutes } from './roles.route';
import * as authMiddleware from "../middlewares/auth.middleware";

const mainV1Routes = (app: Express): void => {

  const version = "/api/v1";

  app.use(version + "/posts", postRoutes);
  app.use(version + "/users", userRoutes);
  app.use(version + "/roles", roleRoutes);
};

export default mainV1Routes