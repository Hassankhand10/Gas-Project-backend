const repository = require("../repository/repository");

class UserService {
  constructor() {
    this.userRepository = repository.profile;
  }
  async getUsers() {
    const users = await this.userRepository.findMany({
      where: {
        role: "user",
      },
      select: {
        id: true,
        name: true,
        userDevices: true,
        createdBy: true,
      },
    });
    return users;
  }
  
  async getUsersByCreatedByID(__createdByID) {
    const users = await this.userRepository.findMany({
      where: {
        role: "user" ,
        createdByID : __createdByID,
      },
      select : {
        id : true, 
        name: true , 
        userDevices: true
      }
    })
    return users;
  }

  async getUsersByCreatedByIDs(__createdByIDs) {
    const users = await this.userRepository.findMany({
      where: {
        role: "user",
        createdByID: {
          in: __createdByIDs
        }
      },
      select: {
        id: true,
        name: true,
        userDevices: true,
        createdByID: true
      }
    })
    return users;
  }

  async getUser(__userID) {
    const user = await this.userRepository.findUnique({
      where: {
        id: __userID,
      },
      select: {
        id: true,
        name: true,
        password: true,
        role: true,
        assignedTo: true,
        userDevices: true,
        assignedTo: true,
        deviceID: true,
      },
    });
    return user;
  }

  async createUser(__user) {
    const createdUser = await this.userRepository.create({
      data: __user,
    });
    return createdUser;
  }

  async updateUser(__user) {
    await this.userRepository.update({
      where: {
        id: __user.id,
      },
      data: {
        password: __user.password,
        name: __user.name,
        role: __user.role,
      },
    });
  }
}

module.exports = UserService;
