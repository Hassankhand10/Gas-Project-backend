require('dotenv').config();

class FileUploadService {
    async uploadReceipt(__receipt) {
        const fileNameWithPath = 
        process.env.RECEIPT_DIRECTORY 
        + crypto.randomUUID() 
        + "." 
        +__receipt.name.split(".")[1];

        try {
            await __receipt.mv(fileNameWithPath);
            return fileNameWithPath
        } catch (error) {
            throw new Error("File upload failed");
        }
    }
}

module.exports = FileUploadService;