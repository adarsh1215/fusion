import jwt from "jsonwebtoken"

const userAuth = async (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json({success: false, message: "Not Authorized Login"})
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id
        } else {
            res.json({success: false, message: "Not Authorised Login"})
        }
        next()
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

export default userAuth