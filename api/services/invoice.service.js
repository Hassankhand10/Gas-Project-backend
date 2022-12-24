const repository = require("../repository/repository");

class InvoiceService {
    constructor() {
        this.invoiceRepository = repository.invoice;
    }

    async createInvoice(__invoice) {
        const createdInvoice = await this.invoiceRepository.create({
            data: __invoice
        });
        return createdInvoice;
    }
}

module.exports = InvoiceService;