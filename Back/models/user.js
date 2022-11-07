const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail, isStrongPassword } = require("validator");

const firstLetterUppercase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Le prénom est obligatoire"],
      trim: true,
      minlength: [2, "Le prénom doit faire au moins 2 caractères"],
      maxlength: [50, "Le prénom doit faire au plus 50 caractères"],
      set: firstLetterUppercase,
    },
    lastname: {
      type: String,
      required: [true, "Le nom est obligatoire"],
      trim: true,
      minlength: [2, "Le nom doit faire au moins 2 caractères"],
      maxlength: [50, "Le nom doit faire au plus 50 caractères"],
      uppercase: true,
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: [true, "L'email est déjà utilisé"],
      trim: true,
      validate: [isEmail, "Veuillez entrer un email valide"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est obligatoire"],
      trim: true,
      validate: [
        isStrongPassword,
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
      ],
    },
    picture: {
      type: String,
      default:
        "https://images.squarespace-cdn.com/content/v1/5c9f919e94d71a2bab6d18d8/1578604998045-HYULPFF63SR5H2OZSDQ3/portrait-placeholder.png",
    },
    bio: {
      type: String,
      maxlength: 250,
      default: "Cette personne n'a pas encore écrit de bio",
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
