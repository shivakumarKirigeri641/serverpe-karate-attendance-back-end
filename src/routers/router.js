const express=require('express');
const router=express.Router();

router.get("/test",(req,res)=>{
    res.send("Karate attendance api is working");
});



module.exports=router;