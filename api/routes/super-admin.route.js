const router = require("express").Router();
const { errorHandler } = require("../middleware/errorhandler");
const SuperAdminService = require("../services/super-admin.service");

const superAdminService = new SuperAdminService();

router.get("/:id", errorHandler( async (request, response, next) => {
    const superAdmin = await superAdminService.getSuperAdmin(request.params.id);
    response.json({ superAdmin });
}));

module.exports = router;