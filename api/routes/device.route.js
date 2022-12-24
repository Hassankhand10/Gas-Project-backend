const router = require('express').Router();
const DeviceService =  require("../services/device.service");
const InvoiceService = require("../services/invoice.service");

const deviceService = new DeviceService();
const invoiceService = new InvoiceService();

router.post("/", async (request, response, next) => {
  const createdDevice = await deviceService.createDevice(request.body);
  response.json({ createdDevice }); 
});

router.put("/stats", async (request, response, next) => {
  const deviceUpdatedStats = await deviceService.updateDeviceStats(request.body);
  response.json({ deviceUpdatedStats })
});

router.put("/admin", async (request, response, next) => {
  const deviceUpdatedStats = await deviceService.assignAdmin(
    request.body.deviceID,
    request.body.adminID);
  await invoiceService.createInvoice(request.body.invoice);
  response.json({ deviceUpdatedStats })
});

router.put("/vendor", async (request, response, next) => {
  const deviceUpdatedStats = await deviceService.assignVendor(
    request.body.deviceID, 
    request.body.vendorID);
  await invoiceService.createInvoice(request.body.invoice);
  response.json({ deviceUpdatedStats })
});

router.put("/user", async (request, response, next) => {
  const deviceUpdatedStats = await deviceService.assignUser(
    request.body.deviceID,
    request.body.userID);
  await invoiceService.createInvoice(request.body.invoice);
  response.json({ deviceUpdatedStats })
});


module.exports = router;
