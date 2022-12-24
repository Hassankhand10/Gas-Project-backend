-- CreateTable
CREATE TABLE "Profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "accountID" UUID,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountDetails" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountNumber" TEXT NOT NULL,
    "accountTitle" TEXT NOT NULL,
    "profileID" UUID NOT NULL,

    CONSTRAINT "AccountDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "assignedToAdmin" UUID,
    "assignedToVendor" UUID,
    "assignedToUser" UUID,
    "longitude" INTEGER NOT NULL DEFAULT 0,
    "latitude" INTEGER NOT NULL DEFAULT 0,
    "currentWeight" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "amount" INTEGER NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedToID" UUID NOT NULL,
    "assignedFromID" UUID NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_accountID_key" ON "Profile"("accountID");

-- CreateIndex
CREATE UNIQUE INDEX "AccountDetails_profileID_key" ON "AccountDetails"("profileID");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "AccountDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_assignedToAdmin_fkey" FOREIGN KEY ("assignedToAdmin") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_assignedToVendor_fkey" FOREIGN KEY ("assignedToVendor") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_assignedToUser_fkey" FOREIGN KEY ("assignedToUser") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_assignedToID_fkey" FOREIGN KEY ("assignedToID") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_assignedFromID_fkey" FOREIGN KEY ("assignedFromID") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
