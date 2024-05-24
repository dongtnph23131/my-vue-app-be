const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(201).json({
      messages: ["Email đã tồn tại"],
    });
  }

  const hashedPassword = await bcryptjs.hash(password, 12);
  const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

  const user = await User.create({
    ...req.body,
    password: hashedPassword,
    role,
  });

  return res.status(200).json({
    message: "Đăng ký tài khoản thành công",
    user,
  });
};
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(201).json({
      messages: ["Email không tồn tại"],
    });
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res.status(201).json({
      messages: ["Mật khẩu không chính xác"],
    });
  }
  const token = jwt.sign({ id: user._id }, "123456", {
    expiresIn: "365d",
  });
  return res.status(200).json({
    message:'Đăng nhập thành công',
    user,
    token,
  });
};
