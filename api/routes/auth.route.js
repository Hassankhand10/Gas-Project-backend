const router = require("express").Router();
const createError = require("http-errors");
const { errorHandler } = require("../middleware/errorhandler");
const AuthService = require("../services/auth.service");


const authService = new AuthService();

router.post("/login", errorHandler (async (request, response, next) => {
    try {
        const profile = await authService.login(request.body);
        response.json({ profile });
    } catch (error) {
        console.log(error)
        next(createError(401, error.message));
    }
}));


module.exports = router;