import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './src/config/db';
import User from './src/models/User';
import Vehicle from './src/models/Vehicle';
import vehicles from './initialData'; 

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Vehicle.deleteMany();

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@motomatch.com',
      password: 'adminpassword123',
      role: 'admin',
    });

    console.log('Admin User Created');

    // Prepare vehicle data
    const preparedVehicles = vehicles.map((v: any) => {
      const { model, ...rest } = v;
      return { ...rest, vehicleModel: model };
    });

    await Vehicle.insertMany(preparedVehicles);

    console.log('Vehicles Seeded');
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error}`);
    process.exit(1);
  }
};

seedData();
