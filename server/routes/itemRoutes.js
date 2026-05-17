const express = require("express");

const router = express.Router();

const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

const protect = require("../middleware/authMiddleware");


// GET ALL ITEMS + CREATE ITEM
router
  .route("/")
  .get(getItems)
  .post(protect, createItem);


// GET SINGLE ITEM + UPDATE + DELETE
router
  .route("/:id")
  .get(getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem);


module.exports = router;