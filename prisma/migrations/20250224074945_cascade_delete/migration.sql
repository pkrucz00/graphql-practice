-- DropForeignKey
ALTER TABLE "Coordinates" DROP CONSTRAINT "Coordinates_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "WeatherData" DROP CONSTRAINT "WeatherData_propertyId_fkey";

-- AddForeignKey
ALTER TABLE "WeatherData" ADD CONSTRAINT "WeatherData_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinates" ADD CONSTRAINT "Coordinates_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
