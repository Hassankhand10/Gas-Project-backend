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

    async getInvoice(__invoiceID) {
        const invoice = await this.invoiceRepository.findUnique({
            where: {
                id: __invoiceID
            }
        });
        return invoice;
    }
    
    async approveInvoice(__invoiceID) {
        const updatedInvoice = await this.invoiceRepository.update({
            where: {
                id: __invoiceID
            },
            data: {
                isPaid: true
            }
        });

        return updatedInvoice;
    }

    async updateReceiptUrl(__invoiceID, __receiptUrl) {
        const updatedInvoice = await this.invoiceRepository.update({
            where: {
                id: __invoiceID,
            },
            data: {
                receiptUrl: __receiptUrl
            }
        })

        return updatedInvoice;
    }

    async getInvoicesByAssignedToID(__assignedToID) {
        const invoices = await this.invoiceRepository.findMany({
            where: {
                assignedToID: __assignedToID
            },
            include: {
                assignedFrom: {
                    include: {
                        account: true
                    }
                }
            }
        })

        return invoices;
    }
}

module.exports = InvoiceService;