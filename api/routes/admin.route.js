const router = require("express").Router();
const { errorHandler } = require("../middleware/errorhandler");
const AccountDetailsService = require("../services/account-details.service");
const AdminService = require("../services/admin.service");
const DeviceService = require("../services/device.service");
const InvoiceService = require("../services/invoice.service");
const UserService = require("../services/user.service");
const VendorService = require("../services/vendor.service");

const adminService = new AdminService();
const accountDetailsService =  new AccountDetailsService();
const vendorService = new VendorService();
const deviceService = new DeviceService();
const invoiceService = new InvoiceService();
const userService = new UserService();


router.get("/", errorHandler( async (request, response, next) => {
    const admins = await adminService.getAdmins();
    response.json({ admins });
}));

router.get("/:id/vendor" , errorHandler ( async(request,response , next) => {
    const vendors = await vendorService.getVendorsByCreatedByID(request.params.id);
    response.json({vendors});
}))

router.get("/:id/device" , errorHandler (async(request,response , next) => {
    const devices = await deviceService.getDevicesByAdminID(request.params.id);
    response.json({devices});
}))

router.get("/:id", errorHandler( async (request, response, next) => {
    const admin = await adminService.getAdmin(request.params.id);
    response.json({ admin });
}));

router.post("/", errorHandler( async (request, response, next) => {
    const createdAdmin = await adminService.createAdmin(request.body);
    response.json({ createdAdmin });
}));

router.post("/account-details", errorHandler (async (request, response, next) => {
    const accountDetails = await accountDetailsService.createAccountDetails(request.body);
    const admin = await adminService.getAdmin(request.body.profileID);
    admin.accountID = accountDetails.id;
    adminService.updateAdmin(admin);
    response.json({ accountDetails });
}));

router.put("/:id", errorHandler (async (request, response, next) => {
    const updatedAdmin = await adminService.updateAdmin({ id: request.params.id, ...request.body });
    response.json({ updatedAdmin });
}));

router.get("/:id/invoice", errorHandler (async (request, response, next) => {
    const invoices = await invoiceService.getInvoicesByAssignedToID(request.params.id);
    response.json({ invoices });
}));

router.get("/:id/user", errorHandler (async (request, response, next) => {
    const vendors = await vendorService.getVendorsByCreatedByID(request.params.id);
    const users = await userService.getUsersByCreatedByIDs(vendors.map(vendor => vendor.id));
    response.json({ users });
}));

module.exports =  router;


