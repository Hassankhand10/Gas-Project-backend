const { PrismaClient } = require('@prisma/client');
const repository  = new PrismaClient();
module.exports = repository;