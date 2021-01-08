const router = require("express").Router();
const Product = require("../models/product");

const upload = require("../middlwares/upload-photo");

/*title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
    rating: [Number]   //array of numbers
*/

//#region POST request - create a new product
router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let product = new Product();
    product.ownerID = req.body.ownerID;
    product.categoryID = req.body.categoryID;
    product.price = req.body.price;
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.location;
    product.stockQuantity = req.body.stockQuantity;

    await product.save(); // async

    res.json({
      status: true,
      message: "Successfully saved",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
//#endregion

//#region GET request - get all product
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find().populate("ownerID categoryID").exec();
    res.json({
      success: true,
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
//#endregion

//#region GET request - get a single product
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id }).populate("ownerID categoryID").exec();
    res.json({
      success: true,
      product: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//#endregion

//#region PUT request - Update a single product
router.put("/products/:id", upload.single("photo"), async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          category: req.body.categoryID,
          owner: req.body.ownerID,
          title: req.body.title,
          price: req.body.price,
          stockQuantity: req.body.stockQuantity,
          description: req.body.description,
          photo: req.file.location,
        },
      },
      { upsert: true }
    );

    res.json({
      success: true,
      UpdatedProduct: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
//#endregion

//#region DELETE request - delete a single product
router.delete("/products/:id", async (req, res) => {
  try {
    let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });
    if (deletedProduct) {
      res.json({
        status: true,
        message: "Successfully deleted",
      });
    }
  } catch (err) {
    res.status.json({
      status: false,
      message: err.message,
    });
  }
});
//#endregion
module.exports = router;
