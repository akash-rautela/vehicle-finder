# MotoMatch Deployment Guide

This guide explains how to deploy your MotoMatch application (Backend and Database) to the internet.

## 1. Database: MongoDB Atlas (Cloud)

Instead of using MongoDB on your computer, you need a cloud database that stays online 24/7.

1.  **Sign Up**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2.  **Create a Cluster**: Choose the "Shared" (Free) tier. Select a region close to you (e.g., AWS / Mumbai).
3.  **Database Access**: Create a database user with a username and password. **Keep these safe.**
4.  **Network Access**: Click "Add IP Address" and select **"Allow Access From Anywhere"** (0.0.0.0/0). This is necessary for cloud hosting platforms like Render.
5.  **Get Connection String**: 
    *   Click "Connect" -> "Connect your application".
    *   Copy the connection string (looks like `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`).
    *   Replace `<password>` with the password you created in step 3.

## 3. Persistent Image Storage: Cloudinary (Free)

Since Render's free tier deletes uploaded files on restart, we use Cloudinary for permanent storage.

1.  **Sign Up**: Create a free account at [Cloudinary.com](https://cloudinary.com/).
2.  **Dashboard**: On your Dashboard, copy these 3 values:
    *   **Cloud Name**
    *   **API Key**
    *   **API Secret**
3.  **Local Setup**: Add these to your `.env` file in the `backend` folder to test locally.

---

## 4. Backend: Render.com

1.  **Preparation**: Push your code to GitHub.
2.  **Create Web Service**: Connect your repo on Render.
3.  **Environment Variables**: In Render, add these variables:
    *   `MONGODB_URI`: (Your MongoDB Atlas string)
    *   `JWT_SECRET`: (Your secret key)
    *   `CLOUDINARY_CLOUD_NAME`: (From Cloudinary)
    *   `CLOUDINARY_API_KEY`: (from Cloudinary)
    *   `CLOUDINARY_API_SECRET`: cloudinary api secret key
    *   `PORT`: `5000`
    *   `NODE_ENV`: `production`

---

## 5. Frontend: Linking to the API

1.  Open `src/lib/api.ts`.
2.  Update `baseURL` to your Render URL: `https://your-app.onrender.com/api`.
3.  Deploy frontend to Vercel/Netlify.
