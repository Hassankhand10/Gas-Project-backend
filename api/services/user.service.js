const repository = require("../repository/repository");

class UserService {
    constructor() {
        this.userRepository = repository.profile;
    }

    async getUser(__userID) {
        const user = await this.userRepository.findUnique({
            where: {
                id:  __userID
            },
            select: {
                id: true,
                name: true,
                role: true,
                assignedTo: true,
                userDevices: true,
                assignedTo: true
            }
        })
        return user;
    }

    async createUser(__user) {
        const createdUser = await this.userRepository.create({
            data: __user
        })
        return createdUser;
    }

    async updateUser(__user) {
        await this.userRepository.update({
            where: {
                id: __user.id
            },
            data: {
                password: __user.password,
                name: __user.name,
                role: __user.role,
            }
        })
    }
}

module.exports =  UserService;