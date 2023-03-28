const cookieController = {};

// set up cookies
cookieController.setCookies = (req, res, next) => {
    // if we already have cookies no need to set them
    // otherwise use the userID to set the cookies :)
    try {
        if (!req.cookies) return next();

        res.cookie("cookieID", res.locals.cookieID);
        return next();
    } catch (e) {
        return next(e);
    }
};

module.exports = cookieController;
