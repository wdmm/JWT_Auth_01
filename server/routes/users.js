const router = require("express").Router();
const {User, validateUser} = require('../models/user');
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const {error} = validateUser(req.body);
        if (error) {
            return res.status(400).send({message: error.details[0].message});
        }

        const user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(409).send({message: "User with such email already exist"});
        }

        const passwordSalt = await bcrypt.genSalt(Number(process.env.PASSWORDSALT));
        const passwordHash = await bcrypt.hash(req.body.password, passwordSalt);

        await new User({...req.body, password: passwordHash}).save();
        res.status(201).send({message: "User created successfully"});
    } catch (error) {
        res.status(500).send({message: `Server error: ${error}`});
    }
});

module.exports = router;