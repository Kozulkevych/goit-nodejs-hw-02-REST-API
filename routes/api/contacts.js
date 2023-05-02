const express = require("express");

const ctrl = require("../../controllers/contacts");

const { authenticate, validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.createContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
