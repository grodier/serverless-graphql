// started building and learning with https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// additional insight: https://www.robinwieruch.de/mongodb-express-setup-tutorial/
// password handling: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Message = require('./message');

function isStringNotEmpty(str) {
  return str ? true : false;
}

function isEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

const notEmptyValidator = {
  validator: isStringNotEmpty,
  message: function(props) {
    return `${props.path} must not be empty, got '${props.value}'`;
  }
};

const isEmailValidator = {
  validator: isEmail,
  message: function(props) {
    return `${props.path} is not valid. Got '${props.value}'`;
  }
};

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    validate: notEmptyValidator,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [notEmptyValidator, isEmailValidator]
  },
  password: {
    type: String,
    unique: true,
    required: true,
    validate: notEmptyValidator,
    min: 8
  }
});

UserSchema.post('remove', async function(doc, next) {
  console.log('REMOVVINNGG');
  await Message.deleteMany({ user: doc._id }).exec();
  next();
});

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.validatePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.statics.findByLogin = async function(login) {
  let user = await this.findOne({
    username: login
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
