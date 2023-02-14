const repository = require("../repository/repository");

class DeviceService {
  constructor() {
    this.deviceRepository = repository.device;
  }

  async getDeviceByID(__deviceID) {
    const device = await this.deviceRepository.findUnique({
      where: {
        id: __deviceID
      },
      select: {
        id: true,
        latitude: true,
        longitude: true,
        currentWeight: true,
        assignedToVendor: true,
        assignedToUser: true
      }
    });
    return device;
  }

  async getdevices() {
    const getdevices = await this.deviceRepository.findMany({
      select: {
        id: true,
        longitude: true,
        latitude: true,
        currentWeight: true,
        assignedToAdmin: true,
        assignedToVendor: true,
        assignedToUser: true,
      },
    });
    return getdevices;
  }

  async getDevicesByAdminID(__adminID) {
    const devices = await this.deviceRepository.findMany({
      where: {
        assignedToAdmin: __adminID,
      },
      select: {
        id: true , 
        longitude: true, 
        latitude : true ,
        currentWeight :true,
        assignedToVendor: true,
      },
    });
    return devices;
  }

  async getDevicesByVendorID(__vendorID){
    const devices = await this.deviceRepository.findMany({
      where: {
        assignedToVendor : __vendorID
      },
      select :  {
        id: true , 
        longitude: true, 
        latitude : true ,
        currentWeight :true,
        assignedToUser: true,
      },
    });
    return devices;
  }

  async createDevice(__device) {
    const createdDevice = await this.deviceRepository.create({
      data: __device,
    });
    return createdDevice;
  }

  async updateDeviceStats(__device) {
    const updatedDevice = await this.deviceRepository.update({
      where: {
        id: __device.id,
      },
      data: {
        latitude: __device.latitude,
        longitude: __device.longitude,
        currentWeight: __device.currentWeight,
      },
      select: {
        assignedToVendor: true,
        assignedToUser: true,
      },
    });
    return updatedDevice;
  }

  async assignAdmin(__deviceID, __adminID) {
    const assignedDevice = await this.deviceRepository.update({
      where: {
        id: __deviceID,
      },
      data: {
        assignedToAdmin: __adminID,
      },
    });
    return assignedDevice;
  }

  async assignVendor(__deviceID, __vendorID) {
    const assignedDevice = await this.deviceRepository.update({
      where: {
        id: __deviceID,
      },
      data: {
        assignedToVendor: __vendorID,
      },
    });
    return assignedDevice;
  }

  async assignUser(__deviceID, __userID) {
    const assignedDevice = await this.deviceRepository.update({
      where: {
        id: __deviceID,
      },
      data: {
        assignedToUser: __userID,
      },
    });
    return assignedDevice;
  }

  async deleteDevice(__deviceID) {
    await this.deviceRepository.delete({
      where: {
        id: __deviceID,
      },
    });
  }
}

module.exports = DeviceService;
