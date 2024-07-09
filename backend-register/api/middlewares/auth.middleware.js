const jwt = require(`jsonwebtoken`);

class AuthMiddleware {
    static authorization(req,res,next) {
        try {
            //detach "Bearer" from "Authorization" header
            const authHeader = req.headers.authorization
            if (!authHeader) {
                res.send(401, {
                    error: true,
                    message: 'No token provided.'
                });
                return next(false);
            }

            const token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.send(401, {
                        error: true,
                        message: 'Failed to authenticate token.'
                    });
                    return next(false);
                }
        
                req.user = decoded;
                
                return next();
            });
        } catch (error) {
            console.log(error);
            res.send(400, {
                error: true,
                message: error.message
            });
            return next(false);
        }
    }
}


module.exports = AuthMiddleware