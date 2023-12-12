const Timer = require('../models/timerModel');
const User = require('../models/userModel');

exports.listAllTimers = async (req,res) => {
    try {
        const timers = await Timer.find({post_id: req.params.id_user});
        res.status(200);
        res.json(timers);
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message:'Erreur serveur'});
    }
}


exports.createATimer = async (req, res) => {

    try {
        const timer = await Timer.findById(req.params.id_user);
        const newTimer = new Timer({...req.body, user_id: req.params.id_user});


        try{
            const timer = await newTimer.save();
            res.status(200);
            res.json(timer);
        }
        catch (error) {
            res.status(500);
            console.log(error);
            res.json({ message: 'Erreur serveur(db)' });
        }
    }catch(error){
        console.log(error);
        res.json({ message: 'Erreur serveur(post-id inexistant' });
    }
}



exports.deleteATimer = async(req, res) =>{

    try{
        const timer = await Comment.findByIdAndDelete(req.params.id_post, req.body, {new: true});
        res.status(200);
        res.json({ message : 'Supprimé'});
    }
    catch(error){
        res.status(500);
        console.log(error);
        res.json({ message : 'Erreur serveur'});
    }
}

exports.getATimer = async(req, res) =>{

    try{
        const comment =await Comment.findById(req.params.id_post);
        res.status(200);
        res.json(comment);
    }
    catch(error){
        res.status(500);
        console.log(error);
        res.json({ message : 'Erreur serveur'});
    }
}
