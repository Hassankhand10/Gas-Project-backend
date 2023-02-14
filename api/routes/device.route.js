const router = require("express").Router();
const VendorService = require("../services/vendor.service");
const UserService = require("../services/user.service");
const DeviceService = require("../services/device.service");
const InvoiceService = require("../services/invoice.service");
const NotifcationService = require("../services/notification-service");
const { errorHandler } = require("../middleware/errorhandler");

const deviceService = new DeviceService();
const invoiceService = new InvoiceService();
const vendorService = new VendorService();
const userService = new UserService();
const notifcationService = new NotifcationService();

router.get("/:id", errorHandler ( async (request, response, next) => {
  const device = await deviceService.getDeviceByID(request.params.id);
  response.json({ device });
}));

router.post("/", errorHandler (async (request, response, next) => {
  const createdDevice = await deviceService.createDevice(request.body);
  response.json({ createdDevice });
}));

router.get("/", errorHandler (async (request, response, next) => {
  const devices = await deviceService.getdevices();
  response.json({ devices });
}));

router.put("/stats", errorHandler (async (request, response, next) => {
  const deviceUpdatedStats = await deviceService.updateDeviceStats(
    request.body
  );
  const vendor = await vendorService.getVendor(
    deviceUpdatedStats.assignedToVendor
  );
  const user = await userService.getUser(deviceUpdatedStats.assignedToUser);

  if (request.body.shouldGenerateGasAlert) {
    await notifcationService.sendNotification(vendor.deviceID, {
      title: "Gas Leakage!",
      body: `Your cylinder with device: ${request.body.id} is leaking gas. Please check.`,
    });
    await notifcationService.sendNotification(user.deviceID, {
      title: "Gas Leakage!",
      body: "Your cylinder is leaking gas. Please check.",
    });
  }
  if (request.body.shouldGenerateWeightAlert) {
    await notifcationService.sendNotification(vendor.deviceID, {
      title: "Weight Alert!",
      body: `Your weight for device: ${request.body.id} is under 1Kg, kindly refill it.`,
    });
    await notifcationService.sendNotification(vendor.deviceID, {
      title: "Weight Alert!",
      body: "Your weight is under 1Kg, kindly refill it.",
    });
  }

  response.json({ deviceUpdatedStats });
}));

router.put("/:id/refill", errorHandler (async (request, response, next) => {
  const deviceUpdatedStats = await invoiceService.createInvoice(request.body.invoice);
  response.json({ deviceUpdatedStats });
}));

router.put("/admin", errorHandler (async (request, response, next) => {
  const updatedDevices = [];
  request.body.deviceIDs.map(async (deviceID) => {
    const deviceUpdatedStats = await deviceService.assignAdmin(
      deviceID,
      request.body.adminID
    );
    updatedDevices.push(deviceUpdatedStats);
  });
  await invoiceService.createInvoice(request.body.invoice);
  response.json({ updatedDevices });
}));

router.put("/vendor", errorHandler (async (request, response, next) => {
  const updatedDevices = [];
  request.body.deviceIDs.map(async (deviceID) => {
    const deviceUpdatedStats = await deviceService.assignVendor(
      deviceID,
      request.body.vendorID
    );
    updatedDevices.push(deviceUpdatedStats);
  });
  await invoiceService.createInvoice(request.body.invoice);
  response.json({ updatedDevices });
}));

router.put("/user", errorHandler (async (request, response, next) => {
  const updatedDevices = [];
  request.body.deviceIDs.map(async (deviceID) => {
    const deviceUpdatedStats = await deviceService.assignUser(
      deviceID,
      request.body.userID
    );
    updatedDevices.push(deviceUpdatedStats);
  });
  await invoiceService.createInvoice(request.body.invoice);
  response.json({ updatedDevices });
}));

router.delete("/:id", errorHandler( async (request, response, next) => {
  await deviceService.deleteDevice(request.params.id);
  response.json({ message: `${request.body.id} successfully deleted.` });
}));

module.exports = router;
