-- CreateTable
CREATE TABLE "Airport" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "iataCode" TEXT NOT NULL,
    "airport" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Airport_uuid_key" ON "Airport"("uuid");
