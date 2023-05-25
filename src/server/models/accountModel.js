// IMPORTS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Account Schema for User on sign up
const accountSchema = new Schema(
  {
    // profile picture functionality can be changed later to uploading from local machine rather than url
    profilePicUrl: {
      type: String,
      // default val in case url not provided
      default:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png',
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    // unique account identifier along with Account._id
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    biography: { type: String, default: '...' },
    // received as an array from spotify api (from front end) stored as a string bc less memory expensive
    topSongs: { type: String, required: false },
    // metric will be used to match users with one another (matches user with others on minimum number of common artists)
    matchPreference: { type: Number, required: true, default: 1 },
    username: {type: String, required: true },
  },
  // explicitly name collection so no pluralization bullshit
  { collection: 'accounts' }
);
// runs before saving any new Account to 'accounts' collections
accountSchema.pre('save', async function (next) {
  const user = this;
  // password hashing logic
  if (user.isModified('password') || user.isNew) {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
      return next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
});

// password validation with bcrypt
accountSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

// export the "Account" schema
module.exports = mongoose.model('Account', accountSchema);
