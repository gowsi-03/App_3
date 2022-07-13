const express = require("express");

const stControllers = require("../controllers/user");

const router = express.Router();

router.post("/", stControllers.create);
router.get("/", stControllers.getAll);
router.get("/:id", stControllers.findOne);
router.patch('/:id',stControllers.update)

module.exports = router;
