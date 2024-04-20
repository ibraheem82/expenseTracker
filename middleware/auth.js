const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {

    
    try{
        const accessToken = req.headers.authorization.replace("Bearer ", "") // Getting the token.
        const jwt_payload = jsonwebtoken.verify(accessToken, process.env.jwt_salt); // verifying the token with the secret key.

        req.user = jwt_payload // associating the payload to the user.: This is a property that the code adds to the req object, assigns the decoded JWT payload (jwt_payload) to a property named user on the request object, which mean req.user is just been created, to store the user information.
        // console.log(jwt_payload)


    } catch(e){
        res.status(401).json({
            status:"failed",
            message: "Unauthorized!"
        });
        return;
    }
    next();
}

module.exports = auth;