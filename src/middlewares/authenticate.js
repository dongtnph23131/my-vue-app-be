const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.authenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(201).json({
        message: "Bạn cần đăng nhập !",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, "123456");
    console.log(id);
    const user = await User.findById(id);
    if (!user) {
      return res.status(201).json({
        message: "Không tìm thấy người dùng",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(203).json({
      message: error.message,
    });
  }
};
