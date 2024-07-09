class LoggerMiddleware{
    static requestLogger(req,res,next){
        console.log(`${req.method} ${req.url}`)
        return next();
    }
}

module.exports = LoggerMiddleware