const { PrismaClient } = require('@prisma/client'); // Import Prisma Client
const fs = require('fs'); // Import file system module

const prisma = new PrismaClient();

async function loadJSONData() {
  // Read the JSON file (make sure the path is correct)
  const data = fs.readFileSync('ongkir.json', 'utf-8');
  return JSON.parse(data); // Parse the JSON data into JavaScript objects
}

async function insertData() {
  const jsonData = await loadJSONData(); // Load the JSON data

  // Use Prisma to insert data into the rajaongkir table
  await prisma.rajaOngkir.createMany({
    data: jsonData, // Insert the array of objects
  });

  console.log('Data inserted successfully!');
}

// Run the insertData function
insertData()
  .catch((e) => {
    console.error('Error inserting data:', e); // Handle errors
  })
  .finally(async () => {
    await prisma.$disconnect(); // Disconnect from the database when done
  });
