const router = require("express").Router();
const AccountDetailsService = require("../services/account-details.service");
const VendorService = require("../services/vendor.service");

const vendorService = new VendorService();
const accountDetailsService =  new AccountDetailsService();

router.get("/:id", async (request, response, next) => {
    const vendor = await vendorService.getVendor(request.params.id);
    response.json({ vendor });
});

router.post("/", async (request, response, next) => {
    const createdVendor = await vendorService.createVendor(request.body);
    response.json({ createdVendor });
});

router.post("/account-details", async (request, response, next) => {
    const accountDetails = await accountDetailsService.createAccountDetails(request.body);
    const vendor = await vendorService.getVendor(request.body.profileID);
    vendor.accountID = accountDetails.id;
    vendorService.updateVendor(vendor);
    response.json({ accountDetails });
});

module.exports =  router;