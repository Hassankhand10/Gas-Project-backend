const router = require('express').Router();
const DeviceService =  require("../services/device.service");

const service = new  DeviceService();

router.post("/", async (request, response, next) => {
  const createdDevice = await service.createDevice(request.body);
  response.json({ createdDevice }); 
});

router.put("/stats", async (request, response, next) => {
  const deviceUpdatedStats = await service.updateDeviceStats(request.body);
  response.json({ deviceUpdatedStats })
});

router.put("/admin", async (request, response, next) => {
  const deviceUpdatedStats = await service.assignAdmin(request.body.deviceID, request.body.adminID);
  response.json({ deviceUpdatedStats })
});

router.put("/vendor", async (request, response, next) => {
  const deviceUpdatedStats = await service.assignVendor(request.body.deviceID, request.body.vendorID);
  response.json({ deviceUpdatedStats })
});

router.put("/user", async (request, response, next) => {
  const deviceUpdatedStats = await service.assignUser(request.body.deviceID, request.body.userID);
  response.json({ deviceUpdatedStats })
});


module.exports = router;
