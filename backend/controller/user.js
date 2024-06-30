const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        return res.json({ msg: "SignIn successfull" });
    } catch (err) {
        res.status(500).send('Server error');
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' }, (err, token) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Login failed" });
            }
            return res.json({ token, user, msg: "Login successful" });
        });


    } catch (err) {
        res.status(500).send('Server error');
    }
}


module.exports = { signup, login };