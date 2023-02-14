const repository = require("../repository/repository");

class VendorService {
  constructor() {
    this.vendorRepository = repository.profile;
  }

  async getvendors() {
    const vendors = await this.vendorRepository.findMany({
      where: {
        role: "vendor",
      },
      select: {
        id: true,
        name: true,
        vendorDevices: true,
        createdByID: true,
      },
    });
    return vendors;
  }

  async updateDeviceId(__deviceID, __vendorID) {
    const updatedDeviceId = await this.vendorRepository.update({
      where: {
          id: __vendorID,
        },
        data: {
          deviceID : __deviceID,
        },
    });
    return updatedDeviceId;
  }

  async getVendorsByCreatedByID(__createdByID) {
    const vendors = await this.vendorRepository.findMany({
      where: {
        role: "vendor",
        createdByID: __createdByID,
      },
      select: {
        id: true,
        name: true,
        vendorDevices: true,
      },
    });
    return vendors;
  }

  async getVendor(__vendorID) {
    const vendor = await this.vendorRepository.findUnique({
      where: {
        id: __vendorID,
      },
      select: {
        id: true,
        name: true,
        password: true,
        role: true,
        account: true,
        assignedTo: true,
        assignedFrom: true,
        vendorDevices: true,
        deviceID: true,
      },
    });
    return vendor;
  }

  async createVendor(__vendor) {
    const createdAdmin = await this.vendorRepository.create({
      data: __vendor,
    });
    return createdAdmin;
  }

  async updateVendor(__vendor) {
    await this.vendorRepository.update({
      where: {
        id: __vendor.id,
      },
      data: {
        password: __vendor.password,
        name: __vendor.name,
        role: __vendor.role,
        accountID: __vendor.accountID,
      },
    });
  }
}

module.exports = VendorService;
