const router = require("express").Router();
const UserService = require("../services/user.service");

const userService = new UserService();

router.get("/:id", async (request, response, next) => {
    const user = await userService.getUser(request.params.id);
    response.json({ user });
});

router.post("/", async (request, response, next) => {
    const createdUser = await userService.createUser(request.body);
    response.json({ createdUser });
});

module.exports = router;