const user = require('../schema/userschema')


const getdata = async (req, res) => {
    try {
        const userData = await user.find({});
        res.send({ user: userData });
    } catch (error) {
        res.status(500).send("error to get data");
    }
};

const adddata = async (req, res) => {
    try {
        const get = await user.find({})
        const newObj = {
            ...req.body,
            // userId: get[get.length - 1].userId ? get[get.length - 1].userId +  1 : get.length + 1
        }
        const data = await user.create(newObj);
        return res.status(200).json({ user: data, status: 'insert success' });
    } catch (error) {
        res.status(500).send("error to insert data");
    }
};

const getonedata = async (req, res) => {
    try {
        const userData = await user.findOne({ _id: req.params.id });
        return res.status(200).json({ user: userData, status: 'success' });
    } catch (error) {
        res.status(500).send("Unable to get data");
    }
};
const editdata = async (req, res) => {
    try {
        const userData = await user.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        return res.status(200).json({ user: userData, status: 'success' });
    } catch (error) {
        res.status(500).send("Unable to get data");
    }
};
const deletedata = async (req, res) => {
    try {
        const userData = await user.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ user: userData, status: 'delete success' });
    } catch (error) {
        res.status(500).send("Unable to get data");
    }
};

module.exports = { getdata, adddata, getonedata, editdata, deletedata }