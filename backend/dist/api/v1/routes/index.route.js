"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = require("./user.route");
const post_route_1 = require("./post.route");
const role_route_1 = require("./role.route");
const mainV1Routes = (app) => {
    const version = "/api/v1";
    app.use(version + "/posts", post_route_1.postRoutes);
    app.use(version + "/users", user_route_1.userRoutes);
    app.use(version + "/roles", role_route_1.roleRoutes);
};
exports.default = mainV1Routes;
