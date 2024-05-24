const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    featured_image: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
newsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model("News", newsSchema);
