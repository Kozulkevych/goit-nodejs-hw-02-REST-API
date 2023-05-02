const express = require("express");

const ctrl = require("../../controllers/auth");

const { authenticate, validateBody } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();
// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
// signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/:id/subscription", authenticate, ctrl.updateSubscription);

module.exports = router;
