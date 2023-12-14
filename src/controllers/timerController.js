const Timer = require('../models/timerModel');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.listAllTimers = async (req, res) => {
    try {
        const timers = await Timer.find({ user_id: req.params.id_user });
        res.status(200);
        res.json(timers);
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: 'Erreur serveur' });
    }
}


exports.createATimer = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (token !== undefined) {
            const payload = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                });
            });
            req.user = payload;
            try {
                const timer = await Timer.findById(req.params.user_id);
                const newTimer = new Timer({ ...req.body, user_id: req.params.id_user });

                try {
                    const timer = await newTimer.save();
                    res.status(200);
                    res.json(timer);
                }
                catch (error) {
                    res.status(500);
                    console.log(error);
                    res.json({ message: 'Erreur serveur(db)' });
                }
            } catch (error) {
                console.log(error);
                res.json({ message: 'Erreur serveur(user-id inexistant' });
            }
        } else {
            res.status(403).status(403).json({ message: "Acces interdit: token manquant" });
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "Acces interdit : token invalide" });
    }
}



exports.getATimer = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (token !== undefined) {
            const payload = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                });
            });
            req.user = payload;
            try {
                const timer = await Timer.findById(req.params.id_user);
                res.status(200);
                res.json(timer);
            }
            catch (error) {
                res.status(500);
                console.log(error);
                res.json({ message: 'Erreur serveur' });
            }
        } else {
            res.status(403).status(403).json({ message: "Acces interdit: token manquant" });
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "Acces interdit : token invalide" });
    }

}


exports.calculateAvgTimer = async (res) => {

    try {
        const token = req.headers['authorization'];
        if (token !== undefined) {
            const payload = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                });
            });
            req.user = payload;
            try {
                // Récupérer tous les timers
                const allTimers = await Timer.find();

                // Créer un objet pour stocker la somme et le nombre d'occurrences par utilisateur
                const userStats = {};

                // Parcourir tous les timers et accumuler les données par utilisateur
                allTimers.forEach((timer) => {
                    if (!userStats[timer.user_id]) {
                        userStats[timer.user_id] = {
                            total: 0,
                            count: 0,
                        };
                    }

                    userStats[timer.user_id].total += timer.timer;
                    userStats[timer.user_id].count += 1;
                });

                // Calculer l'AvgTimer pour chaque utilisateur
                const avgTimers = {};
                for (const userId in userStats) {
                    avgTimers[userId] = userStats[userId].total / userStats[userId].count;
                }

                res.json(avgTimers);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Erreur lors du calcul de l\'AvgTimer' });
            }
        } else {
            res.status(403).status(403).json({ message: "Acces interdit: token manquant" });
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "Acces interdit : token invalide" });
    }
};   
