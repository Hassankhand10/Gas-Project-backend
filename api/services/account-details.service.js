const repository = require("../repository/repository");

class AccountDetailsService {
    constructor() {
        this.accountDetailsRepository = repository.accountDetails;
    }
    
    async createAccountDetails(__accountDetails) {
        const accountDetails = await this.accountDetailsRepository.create({
            data: __accountDetails
        });
        return accountDetails;
    }

    async getAccountDetailsByProfileID(__profileID) {
        const accountDetails = await this.accountDetailsRepository.findFirst({
            where: {
                profileID: __profileID
            }
        });
        return accountDetails;
    }

    async deleteAccountDetails(__accountDetailsID) {
        await this.accountDetailsRepository.delete({
            where: {
                id: __accountDetailsID
            }
        })
    }
}

module.exports = AccountDetailsService;