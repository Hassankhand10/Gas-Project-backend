const router = require("express").Router();
const AccountDetailsService = require("../services/account-details.service");
const VendorService = require("../services/vendor.service");
const UserService = require("../services/user.service");
const DeviceService = require("../services/device.service");
const { errorHandler } = require("../middleware/errorhandler");
const InvoiceService = require("../services/invoice.service");

const vendorService = new VendorService();
const accountDetailsService = new AccountDetailsService();
const userService = new UserService();
const deviceService = new DeviceService();
const invoiceService = new InvoiceService();

router.get("/", errorHandler (async (request, response, next) => {
  const vendors = await vendorService.getvendors();
  response.json({ vendors });
}));

router.patch("/:id/deviceID", errorHandler (async (request, response, next) => {
  const updatedDeviceId = await vendorService.updateDeviceId(
    request.body.deviceID,
    request.params.id
  );
  response.json({ updatedDeviceId });
}));

router.get("/:id/vendorDevice", errorHandler (async (request, response, next) => {
  const devices = await deviceService.getDevicesByVendorID(request.params.id);
  response.json({ devices });
}));

router.get("/:id/user", errorHandler (async (request, response, next) => {
  const users = await userService.getUsersByCreatedByID(request.params.id);
  response.json({ users });
}));

router.get("/:id", errorHandler (async (request, response, next) => {
  const vendor = await vendorService.getVendor(request.params.id);
  response.json({ vendor });
}));
router.get("/:id/invoice", errorHandler (async (request, response, next) => {
    const invoices = await invoiceService.getInvoicesByAssignedToID(request.params.id);
    response.json({ invoices });
}));

router.post("/account-details", errorHandler (async (request, response, next) => {
    const accountDetails = await accountDetailsService.createAccountDetails(request.body);
    const vendor = await vendorService.getVendor(request.body.profileID);
    vendor.accountID = accountDetails.id;
    vendorService.updateVendor(vendor);
    response.json({ accountDetails });
}));

router.post("/", errorHandler (async (request, response, next) => {
  const createdVendor = await vendorService.createVendor(request.body);
  response.json({ createdVendor });
}));

router.post("/account-details", errorHandler( async (request, response, next) => {
  const accountDetails = await accountDetailsService.createAccountDetails(
    request.body
  );
  const vendor = await vendorService.getVendor(request.body.profileID);
  vendor.accountID = accountDetails.id;
  vendorService.updateVendor(vendor);
  response.json({ accountDetails });
}));

router.put("/:id", errorHandler (async (request, response, next) => {
  const updatedVendor = await vendorService.updateVendor({
    id: request.params.id,
    ...request.body,
  });
  response.json({ updatedVendor });
}));

module.exports = router;
