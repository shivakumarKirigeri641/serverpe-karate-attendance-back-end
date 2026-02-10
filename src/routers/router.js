const express=require('express');
const router=express.Router();
const repo = require("../repository/repo");
const { validateKarateBranchesRequest } = require('../validations/validateRequests');
router.get("/test",(req,res)=>{
    res.send("Karate attendance api is working");
});

router.get("/karate-branches",async(req,res)=>{
    try {
        const student_id=1001;
        //const result=await repo.getKarateBranches(req.query.studentId);
        //await validateKarateBranchesRequest(req);
        const result=await repo.getKarateBranches(student_id);
        res.json(result);
    } catch (error) {
        const status = error.statusCode || 500;
        res.status(status).json({
            error: error.message,
            code: error.code || "INTERNAL_ERROR",
        });
    }
});


module.exports=router;