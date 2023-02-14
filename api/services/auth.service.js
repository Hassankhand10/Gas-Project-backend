const repository = require("../repository/repository");

class AuthService {
    constructor() {
        this.profileRepositotry = repository.profile;
    }

    async login(__profile) {
        let profile = null;
        try {
            profile = await this.profileRepositotry.findUnique({
                where: {
                    id: __profile.id,
                }   
            })
        } catch (error) {
            console.log(error)
            throw new Error("Could not find profile with specified id");
        }

        if(profile.password != __profile.password) {
            throw new Error("Password doesnot match");
        }

        const { password, ...profileToReturn } = profile;

        return profileToReturn;
    }
    
}

module.exports = AuthService;