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

module.exports = router;
