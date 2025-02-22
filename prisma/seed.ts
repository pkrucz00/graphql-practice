import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.property.deleteMany();
    await prisma.weatherData.deleteMany();
    await prisma.coordinates.deleteMany();

    await prisma.property.create({
        data: {
            street: '123 Main St',
            city: 'San Francisco',
            state: 'CA',
            zip: '94105',
            coordinates: {
                create: {
                    latitude: 37.7749,
                    longitude: -122.4194
                }
            },
            weatherData: {
                create: {
                    observationTime: new Date().toISOString(),
                    temperature: 70,
                    weatherCode: 800,
                    weatherDescriptions: ['Clear sky'],
                    windSpeed: 5,
                    windDegree: 180,
                    windDir: 'S',
                    pressure: 1012,
                    precip: 0,
                    humidity: 50,
                    cloudcover: 0,
                    feelslike: 70,
                    uvIndex: 5,
                    visibility: 10,
                }
            },
            createdAt: new Date().toISOString(),
        },
    });

    await prisma.property.create({
        data: {
            street: '456 Elm St',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90001',
            coordinates: {
                create: {
                    latitude: 34.0522,
                    longitude: -118.2437
                }
            },
            weatherData: {
                create: {
                    observationTime: new Date().toISOString(),
                    temperature: 75,
                    weatherCode: 801,
                    weatherDescriptions: ['Few clouds'],
                    windSpeed: 3,
                    windDegree: 200,
                    windDir: 'SW',
                    pressure: 1015,
                    precip: 0,
                    humidity: 60,
                    cloudcover: 20,
                    feelslike: 75,
                    uvIndex: 6,
                    visibility: 10,
                }
            },
            createdAt: new Date().toISOString(),
        },
    });

    await prisma.property.create({
        data: {
            street: '789 Oak St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            coordinates: {
                create: {
                    latitude: 40.7128,
                    longitude: -74.0060
                }
            },
            weatherData: {
                create: {
                    observationTime: new Date().toISOString(),
                    temperature: 65,
                    weatherCode: 802,
                    weatherDescriptions: ['Partly cloudy'],
                    windSpeed: 10,
                    windDegree: 150,
                    windDir: 'SE',
                    pressure: 1018,
                    precip: 0,
                    humidity: 70,
                    cloudcover: 50,
                    feelslike: 65,
                    uvIndex: 4,
                    visibility: 10,
                }
            },
            createdAt: new Date().toISOString(),
        },
    });
}

main().then(() => {
    console.log('Seed data loaded');
    process.exit(0);
}
).catch((e) => {
    console.error(e);
    process.exit(1);
}
);