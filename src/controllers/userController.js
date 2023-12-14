const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;
console.log('Secret Key:', secretKey);


// Enregistrement d'un nouvel utilisateur
exports.register = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();

        res.status(201).json({ message: `Utilisateur créé: ${user.email}` });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Requête invalide" });
    }
};

exports.listAllUsers = async (req, res) => {


    try {
        const users = await User.find({});
        res.status(200);
        res.json(users);
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: 'Erreur serveur' });
    }
}

// Connexion d'un utilisateur
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
                email: user.email
            };
            const token = jwt.sign({ _id: user._id }, secretKey);
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: "mdp incorrect" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "une erreur s'est produite" })
    }
}

// Mettre à jour un utilisateur
exports.updateAUser = async (req, res) => {
    try {
        // Mettre à jour l'utilisateur par son ID
        const user = await User.findByIdAndUpdate(req.params.id_user, req.body, { new: true });

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Supprimer un utilisateur
exports.deleteAUser = async (req, res) => {
    try {
        // Supprimer l'utilisateur par son ID
        await User.findByIdAndDelete(req.params.id_user);

        res.status(200).json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
