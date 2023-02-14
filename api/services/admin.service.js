const repository = require("../repository/repository");

class AdminService {
    constructor() {
        this.adminRepository = repository.profile;
    }

    async getAdmins() {
        const admins = await this.adminRepository.findMany({
            where: {
                role: "admin"
            },
            select: {
                id: true,
                name: true,
                adminDevices: true
            }
        });
        return admins;
    }
 
    async getAdmin(__adminID) {
        const admin = await this.adminRepository.findUnique({
            where: {
                id:  __adminID
            },
            select: {
                id: true,
                name: true,
                role: true,
                account: true,
                assignedTo: true,
                assignedFrom: true,
                adminDevices: true,
                deviceID: true
            }
        })
        return admin;
    }

    async createAdmin(__admin) {
        const createdAdmin = await this.adminRepository.create({
            data: __admin
        })
        return createdAdmin;
    }

    async updateAdmin(__admin) {
        await this.adminRepository.update({
            where: {
                id: __admin.id
            },
            data: {
                password: __admin.password,
                name: __admin.name,
                role: __admin.role,
                accountID: __admin.accountID
            }
        })
    }
}

module.exports =  AdminService;