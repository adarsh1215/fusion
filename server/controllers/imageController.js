import userModel from "../models/userModel.js"
import FormData from "form-data"
import axios from "axios"

const genImage = async(req, res) => {
    try {
        const {userId, prompt} = req.body
        const user = await userModel.findById(userId)
        if (!user || !prompt) {
            return res.json({success: false, message: "missing details"})
        }

        // if (user.creditBalance <= 0) {
        //     return res.json({success: false, message: "credit not sufficient"})
        // }

        const formData = new FormData()
        formData.append("prompt", prompt)

        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                "x-api-key": process.env.CLIPDROP_API_KEY,
            },
            responseType: "arraybuffer"
        })

        const base64Image = Buffer.from(data, "binary").toString("base64")
        const image = `data:image/png;base64,${base64Image}`
        await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1})

        res.json({success: true, message: "Image Generated", creditBalance: user.creditBalance - 1, image})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export default genImage