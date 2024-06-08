const buyproduct = require("../schema/buyproductSchema");
const buyproductSchema = require("../schema/buyproductSchema");
const productsc = require("../schema/productschema");
const studentschemaexport = require("../schema/studentschema");
const producthistory = require("../schema/producthistory");

const buyproducthistory = async (req, res) => {
  try {
    console.log(req.body);
    let user = await studentschemaexport.findOne({ email: req.body.email });
    console.log(user);
    let username = user.username;

    let productId = await buyproductSchema.find({}).productId;
    let product = await productsc.findOne({ id: productId });
    let product_name = product.product_name;
    //     console.log(JSON.stringify(userId._id));
    const x = await producthistory.create({
      product_name,
      username,
    });

    let fulldata = await producthistory.find({});

    return res.json({
      status: true,
      data: fulldata,
      message: "historyyyyyy",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, product: [], message: error.message });
  }
};
module.exports = { buyproducthistory };
