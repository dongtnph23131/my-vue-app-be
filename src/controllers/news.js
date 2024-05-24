const News = require("../models/news");

exports.create = async (req, res) => {
  try {
    const news = await News.create({ ...req.body, author_id: req.user._id });
    return res.status(200).json({
      message: "Tạo bài viết thành công",
      news,
    });
  } catch (error) {
    return res.status(201).json({
      message: error.message,
    });
  }
};
exports.getAllNews = async (req, res) => {
  try {
    const data = await News.find();
    const {
      _page = 1,
      _limit = data.length,
      _sort = "createdAt",
      _order = "desc",
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: { [_sort]: _order === "desc" ? -1 : 1 },
    };
    const result = await News.paginate(
      {},
      {
        ...options,
        populate: [{ path: "author_id", select: "-password" }],
      }
    );
    if (result.docs.length === 0) throw new Error("No products found");
    const response = {
      data: result.docs,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.totalDocs,
      },
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.getNewsByAcount = async (req, res) => {
  try {
    const user = req.user;
    const response = await News.find({ author_id: user._id }).sort({
      createdAt: "desc",
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate("author_id");
    return res.status(200).json(news);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.remove = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const newss = await News.find({ author_id: user, _id: id });
    if (newss.length === 0) {
      return res.status(201).json({
        messages: "Không tồn tại bài viết của bạn",
      });
    }
    await News.findByIdAndDelete(newss[0]._id);
    return res.status(200).json({
      message: "Xóa bài viết thành công",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.update = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const newss = await News.find({ author_id: user, _id: id });
    if (newss.length === 0) {
      return res.status(201).json({
        messages: "Không tồn tại bài viết của bạn",
      });
    }
    const response = await News.findByIdAndUpdate(newss[0]._id, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "Cập nhập bài viết thành công",
      response,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
