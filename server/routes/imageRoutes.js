import express from "express"
import genImage from "../controllers/imageController.js"
import userAuth from "../middelwares/auth.js"

const imageRouter = express.Router()

imageRouter.post("/generate-image", userAuth, genImage)

export default imageRouter