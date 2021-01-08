const router = require("express").Router();
const Category = require("../models/category");

//#region POST request - create a new category
router.post("/categories",async (req,res) =>{
    try{
        const category = new Category();
        category.type = req.body.type;

        await category.save();

        res.json({
            success: true,
            message: "Successfully created a new category"
        });
    }catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }    
});

//#endregion

//#region GET request - get all categories
router.get("/categories", async (req,res) =>{
    try{
        let categories = await Category.find();
        res.json({
            success: true,
            categories: categories
        });
    }catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})    
//#endregion GET request - get a single category

//#region PUT request - Update a single category

//#endregion 

//#region DELETE request - delete a single category
router.delete("/categories/:id", async (req,res) =>{
    try{
        let deletedCat = await Category.findOneAndDelete({_id:req.params.id});
        if (deletedCat){
            res.json({
                status: true,
                message: "Successfully deleted"
            })
        }
    }catch (err){
        res.status.json({
            status: false,
            message: err.message
        })
    }
})
//#endregion 

module.exports = router;