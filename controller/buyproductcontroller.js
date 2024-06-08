const buyproduct = require("../schema/buyproductSchema");
const studentschemaexport = require("../schema/studentschema");

const buyproductdata = async (req, res) => {
  try {
    console.log(req.body);
    let userId = await studentschemaexport.findOne({ email: req.body.email });
    console.log(JSON.stringify(userId._id));
    const x = await buyproduct.create({
        productId: req.body.productId,
        studentId: JSON.stringify(userId._id),
    });

    return res.json({
      status: true,
      data: [x],
      message: "signup successfully",
    });
  }
  
  catch (error) {
    return res
      .status(500)
      .json({ status: false, product: [], message: error.message });
  }
};
module.exports = { buyproductdata };
