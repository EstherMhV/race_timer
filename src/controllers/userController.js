const User = require('../models/userModel');


exports.register = async (req, res) => {
    try {
        let newUser = new User(req.body);
        let user = await newUser.save();
        res.status(201).json({ message: `Utilisateur cree: ${user.email}` });
    } catch (erreur) {
        console.log(erreur);
        res.status(401).json({ message: "Requete invalide" });
    }
}
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(500).json({ message: "Utilisateur non trouvé" });
            return;
        }
        if (user.email === req.body.email && user.password === req.body.password) {
            const userData = {
                id: user._id,
                email: user.email,
                role: "user"
            };
        } else {
            res.status(401).json({ message: "mdp incorrect" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "une erreur s'est produite" })
    }
}
