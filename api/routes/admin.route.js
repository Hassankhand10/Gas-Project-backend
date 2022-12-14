const router = require("express").Router();
const AccountDetailsService = require("../services/account-details.service");
const AdminService = require("../services/admin.service");

const adminService = new AdminService();
const accountDetailsService =  new AccountDetailsService();

router.get("/:id", async (request, response, next) => {
    const admin = await adminService.getAdmin(request.params.id);
    response.json({ admin });
});

router.post("/", async (request, response, next) => {
    const createdAdmin = await adminService.createAdmin(request.body);
    response.json({ createdAdmin });
});

router.post("/account-details", async (request, response, next) => {
    const accountDetails = await accountDetailsService.createAccountDetails(request.body);
    const admin = await adminService.getAdmin(request.body.profileID);
    admin.accountID = accountDetails.id;
    adminService.updateAdmin(admin);
    response.json({ accountDetails });
});

module.exports =  router;