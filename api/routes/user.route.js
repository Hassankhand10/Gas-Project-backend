const router = require("express").Router();
const { errorHandler } = require("../middleware/errorhandler");
const UserService = require("../services/user.service");

const userService = new UserService();

router.get("/" , errorHandler( async (request , response , next) => {
    const users = await userService.getUsers();
    response.json({users})
}))
router.get("/:id", errorHandler (async (request, response, next) => {
    const user = await userService.getUser(request.params.id);
    response.json({ user });
}));

router.post("/", errorHandler( async (request, response, next) => {
    const createdUser = await userService.createUser(request.body);
    response.json({ createdUser });
}));

router.put("/:id", errorHandler (async (request, response, next) => {
    const updatedUser = await userService.updateUser({ id: request.params.id, ...request.body });
    response.json({ updatedUser });
}));

module.exports = router;