const express = require("express");
const {
  create,
  getAllNews,
  getNewsByAcount,
  getNewsById,
  remove,
  update,
} = require("../controllers/news");
const { authenticate } = require("../middlewares/authenticate");

const router = express.Router();

router.post("/create-news", authenticate, create);
router.get("/get-all-news", getAllNews);
router.get("/get-news-by-acount", authenticate, getNewsByAcount);
router.get("/newss/:id", getNewsById);
router.delete('/newss/:id', authenticate, remove)
router.patch('/newss/:id/edit',authenticate,update)
module.exports = router;
