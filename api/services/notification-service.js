const axios = require('axios');

class NotifcationService {
    constructor() {
        this.fcmURL = "https://fcm.googleapis.com/fcm/send"
    }

    async sendNotification(__deviceID, __notification) {
        if (__deviceID) {
            try {
                await axios.post(this.fcmURL, {
                    to: __deviceID,
                    notification: __notification
                }, {
                    headers: {
                        "Authorization": `key=${process.env.SERVER_KEY}`
                    }
                })
            } catch (error) {
                console.log(error.message)
            }
        }
    }
}

module.exports = NotifcationService;