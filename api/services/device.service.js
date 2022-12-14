const repository = require("../repository/repository");

class DeviceService {
    constructor() {
        this.deviceRepository = repository.device;
    }

    async createDevice(__device) {
        const createdDevice = await this.deviceRepository.create({
            data: __device
        });
        return createdDevice;
    }

    async updateDeviceStats(__device) {
        const updatedDevice = await this.deviceRepository.update({
            where: {
                id: __device.id 
            },
            data: {
                latitude: __device.latitude,
                longitude: __device.longitude,
                currentWeight: __device.currentWeight
            } 
        })
        return updatedDevice;
    }

    async assignAdmin(__deviceID, __adminID) {
        const assignedDevice = await this.deviceRepository.update({
            where: {
                id: __deviceID
            },
            data: {
                assignedToAdmin: __adminID
            }
        });
        return assignedDevice;
    }

    async assignVendor(__deviceID, __vendorID) {
        const assignedDevice = await this.deviceRepository.update({
            where: {
                id: __deviceID
            },
            data: {
                assignedToVendor: __vendorID
            }
        });
        return assignedDevice;
    }

    async assignUser(__deviceID, __userID) {
        const assignedDevice = await this.deviceRepository.update({
            where: {
                id: __deviceID
            },
            data: {
                assignedToUser: __userID
            }
        });
        return assignedDevice;
    }
}

module.exports = DeviceService;