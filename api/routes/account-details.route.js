const router = require("express").Router();
const { errorHandler } = require("../middleware/errorhandler");
const AccountDetailsService = require("../services/account-details.service");

const accountDetailsService = new AccountDetailsService();

router.get("/profile/:profileID", errorHandler (async (request, response) => {
    const accountDetails = await accountDetailsService
    .getAccountDetailsByProfileID(request.params.profileID);
    response.json({ accountDetails });
}));

router.delete("/:id", errorHandler (async(request, response, next) => {
    await accountDetailsService.deleteAccountDetails(request.params.id);
    response.json({ message: `${request.params.id} successfully deleted.` });
}))


module.exports = router;