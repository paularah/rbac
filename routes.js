 import {Router} from "express"

const router = Router()

router.get("/resource1", async(req, res) => {
    res.status(200).json({
        success:true,
        message:"resource1 returned"
    })

})
router.post("/resource1", async(req, res) => {
    res.status(201).json({
        success:true,
        message:"resource1 created"
    })

})

router.get("/resource2", async(req, res) => {
    res.status(200).json({
        success:true,
        message:"resource1 returned"
    })

})

router.post("/resource2", async(req, res) => {
    res.status(201).json({
        success:true,
        message:"resource2 created"
    })

})

router.get("/resource3", async(req, res) => {
    res.status(200).json({
        success:true,
        message:"resource1 returned"
    })

})


router.post("/resource3", async(req, res) => {
    res.status(201).json({
        success:true,
        message:"resource3 created"
    })

})

export default router