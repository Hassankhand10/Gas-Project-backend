const router = require("express").Router();
const InvoiceService = require("../services/invoice.service");
const FileUploadService = require("../services/file-upload.service");
const createError = require("http-errors");

const invoiceService = new InvoiceService();
const fileUploadService = new FileUploadService();

router.get("/:id/receipt", async (request, response, next) => {
    const invoice = await invoiceService.getInvoice(request.params.id);
    response.download(invoice.receiptUrl);
});

router.patch("/:id/receipt", async (request, response, next) => {
    try {
        const receiptUrl = await fileUploadService.uploadReceipt(request.files.receipt);
        const updatedInvoice = await invoiceService.updateReceiptUrl(request.params.id, receiptUrl);
        response.json({ message: "Receipt successfully uploaded.", updatedInvoice });
    } catch (error) {
        next(createError(500, error.message));
    }
});

router.patch("/:id", async (request, response, next) => {
    const approvedInvoice = await invoiceService.approveInvoice(request.params.id);
    response.json({ approvedInvoice });
});



module.exports = router;