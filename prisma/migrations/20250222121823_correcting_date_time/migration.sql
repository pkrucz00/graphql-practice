/*
  Warnings:

  - The `observationTime` column on the `WeatherData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "WeatherData" DROP COLUMN "observationTime",
ADD COLUMN     "observationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
