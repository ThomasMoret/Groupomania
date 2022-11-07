const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    message: { type: String, required: true, maxlength: 500, minlength: 1 },
    picture: { type: String },
    likers: { type: [String] },
    likes: { type: Number, default: 0 },
    comments: {
      type: [
        {
          commenterId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
          },
          text: { type: String, required: true, maxlength: 500, minlength: 1 },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
