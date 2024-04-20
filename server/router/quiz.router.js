const express = require("express");
const router = express.Router();
const data = require("../data/data");
const answerData = require("../demo");

router.get("/questions", async (req, res) => {
  try {
    if (!data) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/questions/:id",async(req,res)=>{
  try{
    const id= Number(req.params.id)
    const aid = Number(req.body.aid);

    const filterData = data.filter((data)=>{
      if(id===data._id) return data;
    })
    console.log(filterData[0].correctAnswer===aid);
    if(filterData[0].correctAnswer===aid) {
      return res.status(200).json({data:true})
    }
    res.status(200).json({data:false,message:filterData[0].feedback})
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"Internal server error"});
  }
})


module.exports = router;
