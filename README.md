# 🏎️ MotoMatch

<p align="center">
  <b>Stop searching. Start matching your perfect ride.</b><br/>
  Intelligent vehicle recommendations for bikes & cars 🚀
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Vite-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/TypeScript-Essential-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
</p>

---

## 📋 Table of Contents

- [About](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [How It Works](#-how-it-works)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Screenshots](#-screenshots)
- [Live Demo](#-live-demo)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ About the Project

**MotoMatch** is a modern, intelligent web application that helps users discover their perfect vehicle match. Whether you're looking for a **2-wheeler 🏍️** or **4-wheeler 🚗**, our smart recommendation system takes the guesswork out of vehicle selection.

Simply answer a few questions about your budget, preferences, and usage needs, and let MotoMatch suggest the best options tailored just for you.

---

## 🚀 Features

- 🔍 **Smart Recommendation System** - AI-powered suggestions based on user preferences
- 💸 **Budget-Based Filtering** - Find vehicles within your price range
- 🏍️ **Comprehensive Database** - 2-wheeler and 4-wheeler options
- ⚡ **Lightning-Fast Performance** - Optimized with Vite for rapid load times
- 🎨 **Beautiful UI** - Clean, modern design with Tailwind CSS
- 📱 **Fully Responsive** - Perfect experience on mobile, tablet, and desktop
- 🌙 **Dark Mode Support** - Easy on the eyes in any lighting condition
- ♿ **Accessibility First** - Built with accessibility standards in mind
- 🔄 **Vehicle Comparison** - Compare multiple vehicles side by side

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| ⚛️ React | Frontend UI Framework | 18+ |
| ⚡ Vite | Lightning-fast build tool | Latest |
| 🎨 Tailwind CSS | Utility-first styling | 3+ |
| 📘 TypeScript | Type-safe JavaScript | Latest |
| 🍃 MongoDB Atlas | Cloud NoSQL Database | Cloud |
| ☁️ Cloudinary | Media Management & Storage | Cloud |
| 🚀 Render | Backend Cloud Hosting | Cloud |
| 🔒 JWT | Secure Authentication | - |

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- A modern web browser

To check your Node.js installation:
```bash
node --version
npm --version
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/akash-rautela/vehicle-finder.git
cd vehicle-finder
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables (if needed)

Create a `.env.local` file in the root directory (if applicable):

```env
VITE_API_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

### Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

---

## 🧠 How It Works

**MotoMatch** uses a conversational approach to recommend vehicles:

1. **User Persona Analysis** - Answer intuitive questions about budget, vehicle category, and lifestyle.
2. **Real-time Processing** - The engine cross-references your profile with our curated cloud database.
3. **Smart Matching** - An advanced algorithm ranks vehicles based on power, efficiency, and cost compatibility.
4. **Interactive Discovery** - Browse personalized matches with high-fidelity visuals and detailed specifications.
5. **Direct Comparison** - Use the comparison engine to weigh pros and cons of your top choices.

### Core Metrics
- **Budget Precision**: Matches within your specified price range.
- **Usage Alignment**: Identifies if a vehicle is for daily commute, sports, or adventure.
- **Powertrain Filtering**: Supports Petrol, Diesel, Electric, and Hybrid variants.

---

## 📁 Project Structure

```
├── backend/               # Node.js Express Backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API route definitions
│   │   ├── middleware/    # Auth & security middleware
│   │   ├── config/        # DB & Cloudinary config
│   │   └── index.ts       # Server entry point
│   └── initialData.ts     # Database seeding data
├── src/                   # React Frontend
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # API (Axios) & Utils
│   ├── App.tsx            # Main routes
│   └── index.css          # Premium styles (Glassmorphism)
└── SYNOPSIS.md            # Detailed project documentation
```

---

## 🔗 Pages & Routes

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Landing page with questionnaire |
| Browse | `/browse` | Browse all vehicles |
| Compare | `/compare` | Compare multiple vehicles |
| About | `/about` | Learn about the project |
| Contact | `/contact` | Get in touch |

---

---

## 📸 Screenshots

![MotoMatch Hero](./screenshots/home.png)

---

## 🌐 Live Demo

👉 **[Visit MotoMatch Live](https://vehicle-finder-gie7.onrender.com)**

---

## ⚙️ Environment Configuration

To run MotoMatch locally, you'll need to set up the following environment variables in your `backend/.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secure_random_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

---

---

## 🤝 Contributing

We welcome contributions from the community!

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/new-design`)
3. **Commit** your changes (`git commit -m 'Add premium feature'`)
4. **Push** to the branch (`git push origin feature/new-design`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 💡 Author

**Akash Rautela**

* GitHub: [akash-rautela](https://github.com/akash-rautela)
* LinkedIn: [Akash Singh Rautela](https://www.linkedin.com/in/akash-singh-rautela)

---

## ⭐ Support

If you find MotoMatch useful, please consider giving the repository a **Star ⭐**!

<p align="center">
  Made with ❤️ by Akash
</p>
