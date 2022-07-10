const User = require('../models/user');
require('dotenv').config();

exports.userlist_get = (req, res, next) => {
  User.find()
    .populate('friends', { firstname: 1, surname: 1, avatar_URL: 1 })
    .sort([['surname', 'descending']])
    .exec((err, allUsers) => {
      if (err) {
        return next(err);
      }
      // Successful, so send results
      return res.json(allUsers);
    });
};
