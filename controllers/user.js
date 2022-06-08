const seedData = require("../helper/seed");
const createError = require('http-errors');

const User = require("../models/users");


module.exports = {
    getAllUsers: async (req, res, next) => {
        let current_page = req.query.page || 0;

        if(current_page > 0){
            current_page -= 1;
        }
        try {
            await User.deleteMany({});
            await User.insertMany(seedData);
            const count = await User.find({}, { __v: 0 }).count();
            const results = await User.find({}, { __v: 0 }).skip(current_page * 5).limit(5);
            const response = {
                count,
                results,
            }

            res.send(response);
        } catch (error) {
            console.log(error.message);
        }
    },

    findUsersByTerm: async (req, res, next) => {
        const term = req.query.term;
        let current_page = req.query.page || 0;

        if(current_page > 0){
            current_page -= 1;
        }

        try {
            const queryRegx = new RegExp("^" + term.toLowerCase(),"i");
            console.log("query",queryRegx);
            const count =  await User.find({
                $or: [
                    { name: { $regex: queryRegx } },
                    { location: { $regex: queryRegx } },
                    { email: { $regex: queryRegx } },

                ],
            }).count();

            const results = await User.find({
                    $or: [
                        { name: { $regex: queryRegx } },
                        { location: { $regex: queryRegx } },
                        { email: { $regex: queryRegx } },
                    ],
                }).skip(current_page * 5).limit(5);

            // const User = await User.findOne({ _id: id });
            if (!results) {
                throw createError(404, 'User does not exist.');
            }

            const response = {
                count,
                results,
            }
            res.send(response);
        } catch (error) {
            console.log(error.message);

        }
    },


};