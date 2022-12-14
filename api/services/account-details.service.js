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
}

module.exports = AccountDetailsService;