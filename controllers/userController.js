const User = require("../models/User");
const errorHandler = require("../middleware/errorMiddleware");

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
           errorHandler.notFound();
           return;
        }
        res.json(user);
    }catch(err){
        next(err);
    }
}



