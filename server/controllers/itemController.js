const Item = require("../models/Item");

const generateAISummary = require("../utils/aiService");


// CREATE ITEM
const createItem = async (req, res) => {

  console.log("CREATE ITEM ROUTE HIT");

  try {

    // GENERATE AI RESPONSE
    const aiResult = await generateAISummary(req.body);

    console.log(
      "AI RAW RESPONSE:",
      aiResult
    );

    let parsedAI = {};

    try {

      if (aiResult) {

        parsedAI = JSON.parse(aiResult);
      }

    } catch (error) {

      console.log(
        "AI Parsing Error:",
        error.message
      );

      parsedAI = {};
    }

    // SAFETY FALLBACK
    if (!parsedAI) {
      parsedAI = {};
    }

    const item = await Item.create({

      ...req.body,

      owner: req.user._id,

      aiSummary:
        parsedAI?.summary || "",

      aiKeywords:
        parsedAI?.keywords || [],

      aiUrgency:
        parsedAI?.urgency || "Low",

      aiTags:
        parsedAI?.tags || [],
    });

    res.status(201).json(item);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};



// GET ALL ITEMS
const getItems = async (req, res) => {

  try {

    const items = await Item.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(items);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// GET SINGLE ITEM
const getItemById = async (req, res) => {

  try {

    const item = await Item.findById(req.params.id)
      .populate("owner", "name email");

    if (!item) {

      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json(item);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// UPDATE ITEM
const updateItem = async (req, res) => {

  try {

    const item = await Item.findById(req.params.id);

    if (!item) {

      return res.status(404).json({
        message: "Item not found",
      });
    }

    // OWNER CHECK
    if (
      item.owner.toString() !==
      req.user._id.toString()
    ) {

      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updatedItem =
      await Item.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(updatedItem);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// DELETE ITEM
const deleteItem = async (req, res) => {

  try {

    const item = await Item.findById(req.params.id);

    if (!item) {

      return res.status(404).json({
        message: "Item not found",
      });
    }

    // OWNER CHECK
    if (
      item.owner.toString() !==
      req.user._id.toString()
    ) {

      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      message: "Item deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};