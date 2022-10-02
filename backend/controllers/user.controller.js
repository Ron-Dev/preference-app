const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
});

const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send('Email or password is wrong');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong');

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.send({ token, preferredColor: user.preferredColor });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error in login' });
  }
};

const updatePreferredColor = async (req, res) => {
  try {
    await User.findOneAndUpdate({ id: req.user.id }, { preferredColor: req.body.preferredColor });
    res.send({ message: 'preferredColor updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error in Updating' });
  }
};

module.exports = {
  login,
  updatePreferredColor
};
