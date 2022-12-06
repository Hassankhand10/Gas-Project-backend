const { prisma } = require("@prisma/client");
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
}

module.exports = DeviceService;