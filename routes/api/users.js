const express = require("express");

const ctrl = require("../../controllers/users");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.patch("/:id/subscription", authenticate, ctrl.updateSubscription);

module.exports = router;
