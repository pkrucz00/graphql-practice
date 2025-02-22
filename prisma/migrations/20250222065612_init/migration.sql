-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "coordinatesId" INTEGER,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherData" (
    "id" SERIAL NOT NULL,
    "observationTime" TEXT NOT NULL,
    "temperature" INTEGER NOT NULL,
    "weatherCode" INTEGER NOT NULL,
    "weatherIcons" TEXT[],
    "weatherDescriptions" TEXT[],
    "windSpeed" INTEGER NOT NULL,
    "windDegree" INTEGER NOT NULL,
    "windDir" TEXT NOT NULL,
    "pressure" INTEGER NOT NULL,
    "precip" DOUBLE PRECISION NOT NULL,
    "humidity" INTEGER NOT NULL,
    "cloudcover" INTEGER NOT NULL,
    "feelslike" INTEGER NOT NULL,
    "uvIndex" INTEGER NOT NULL,
    "visibility" INTEGER NOT NULL,
    "propertyId" INTEGER NOT NULL,

    CONSTRAINT "WeatherData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinates" (
    "_id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "propertyId" INTEGER NOT NULL,

    CONSTRAINT "Coordinates_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeatherData_propertyId_key" ON "WeatherData"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "Coordinates_propertyId_key" ON "Coordinates"("propertyId");

-- AddForeignKey
ALTER TABLE "WeatherData" ADD CONSTRAINT "WeatherData_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinates" ADD CONSTRAINT "Coordinates_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
