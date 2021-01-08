const router = require("express").Router();
const Owner = require("../models/owner");
const upload = require("../middlwares/upload-photo")

//#region POST request - create a new owner
router.post("/owners",upload.single("photo"), async (req,res) =>{
    const owner = new Owner();
    
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = req.file.location;

    await owner.save();
    try{
        res.json({
            success: true,
            meesage: "Successfully created a new owner"
        })
    }catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        })           
    }
    
})
//#endregion

//#region GET request - get all owners
router.get("/owners",async (req,res) =>{
    try{
        const owners = await Owner.find();
        res.json({
            success: true,
            owners: owners
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})
//#endregion

//#region GET request - get a single owner
router.get("/owners/:id", async (req,res) =>{
    try{
        let owner = await Owner.findOne({_id:req.params.id});

        res.json({
            status: true,
            owner: owner
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})
//#endregion

//#region PUT request - Update a single owner
router.put("/owners/:id", upload.single("photo"), async (req,res) =>{
    try{
        let owner = await Owner.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set:{
                    name: req.body.name,
                    about: req.body.about,
                    photo: req.file.location
                }            
            },
            {upsert: true}
        );

        res.json({
            success: true,
            UpdatedProduct: owner
        })
    }catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }    
})
//#endregion 

//#region DELETE request - delete a single owner
router.delete("/owners/:id", async (req,res) =>{
    try{
        let deletedOwner = await Owner.findOneAndDelete({_id:req.params.id});
        if (deletedOwner){
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