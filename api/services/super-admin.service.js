const repository = require("../repository/repository");

class SuperAdminService {
  constructor() {
    this.superAdminRepository = repository.profile;
  }

  async getSuperAdmin(__superAdminID) {
    const superAdmin = await this.superAdminRepository.findFirst({
      where: {
        id: __superAdminID,
        role: "sa",
      },
      select: {
        id: true,
        name: true,
        assignedFrom: true,
      },
    });
    return superAdmin;
  }
}

module.exports = SuperAdminService;
