-- CreateTable
CREATE TABLE "Flights" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "airline" TEXT NOT NULL,
    "flightNumber" INTEGER NOT NULL,
    "tailNumber" TEXT NOT NULL,
    "originAirport" TEXT NOT NULL,
    "destinationAirport" TEXT NOT NULL,
    "scheduledDeparture" INTEGER NOT NULL,
    "departureTime" INTEGER NOT NULL,
    "departureDelay" INTEGER NOT NULL,
    "taxiOut" INTEGER NOT NULL,
    "wheelsOff" INTEGER NOT NULL,
    "scheduledTime" INTEGER NOT NULL,
    "elapsedTim" INTEGER NOT NULL,
    "airTime" INTEGER NOT NULL,
    "distance" INTEGER NOT NULL,
    "wheelsOn" INTEGER NOT NULL,
    "taxiIn" INTEGER NOT NULL,
    "scheduledArrival" INTEGER NOT NULL,
    "arrivalTime" INTEGER NOT NULL,
    "arrivalDelay" INTEGER NOT NULL,
    "diverted" INTEGER NOT NULL,
    "cancelled" INTEGER NOT NULL,
    "cancellationReason" TEXT NOT NULL,
    "airSystemDelay" INTEGER NOT NULL,
    "securityDelay" INTEGER NOT NULL,
    "airlainDelay" INTEGER NOT NULL,
    "lateAircraftDelay" INTEGER NOT NULL,
    "weatherDelay" INTEGER NOT NULL,

    CONSTRAINT "Flights_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Flights_uuid_key" ON "Flights"("uuid");
