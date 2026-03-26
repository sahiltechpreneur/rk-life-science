# R. K. Life Science - Premium Ecommerce Platform

![R. K. Life Science Logo](/client/public/images/logo.png)

A state-of-the-art, premium ecommerce solution for **R. K. Life Science**, a leading wholesale distributor of nutraceutical and non-medicinal products. This platform features a high-end **Glassmorphic UI**, a robust **Admin Suite**, and a seamless shopping experience.

---

## ✨ Key Features

### 💎 Premium User Experience
- **Modern Glassmorphic Design**: A stunning, high-contrast UI with vibrant gradients, blurred backdrops (Glassmorphism), and smooth micro-animations.
- **Dynamic Hero Section**: Interactive elements and floating decorative accents for a premium first impression.
- **Responsive Product Suite**: Unified product cards, advanced sidebar filters, and a streamlined 2-column checkout flow.
- **Account Management**: Elegant user profile with integrated order history and real-time status tracking.
- **Multi-Channel Support**: Dedicated FAQ, About, and Contact pages with interactive components.

### 🛠️ Advanced Admin Suite
- **Intelligent Dashboard**: Real-time business analytics with **Weekly Revenue** tracking and interactive charts.
- **Streamlined Product Management**: Overhauled product catalog with modal-based entry, image previews, and automated status handling.
- **Order & Export Engine**: 
    - Full order lifecycle management (Pending, Dispatched, Delivered).
    - **Data Exports**: Download order reports in **Excel** or **PDF**.
    - **Date Range Filters**: Precise reporting based on custom date selections.
- **User Directory**: Centralized management of registered customers with role-based badges.

### 🏗️ Simplified Architecture
- **No Categories**: Product management simplified—no more complex category trees to manage.
- **Payment Flexibility**: Integrated with **eSewa** and **Cash on Delivery (COD)**.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15+, React, Tailwind CSS, Lucide/React-Icons.
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL (Primal connection via `pg-pool`).
- **Real-time**: Socket.io for live order notifications.
- **Styling**: Vanilla CSS + Tailwind for maximum visual excellence.

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running locally.

### 2. Backend Configuration
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:<your_password>@localhost:5432/rk_life_science
JWT_SECRET=<your_secret_key>
EMAIL_USER=<your_email>
EMAIL_PASS=<your_app_password>
ESEWA_SECRET_KEY=8gBm/:&EnhH.1/q
FRONTEND_URL=http://localhost:3000
```
*Note: SSL is automatically disabled for local development in `config/db.js`.*

### 3. Frontend Configuration
```bash
cd client
npm install
```
Create a `.env.local` file in the `client` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Run the Application
Start the backend:
```bash
# In /server
npm run dev
```
Start the frontend:
```bash
# In /client
npm run dev
```

---

## 📝 Important Notes
- **Database**: Ensure the `rk_life_science` database exists before running the server.
- **Product Images**: Uploaded images are stored in `server/uploads`. Ensure this directory exists.
- **Cleanup**: Redundant debug and migration scripts have been removed for a cleaner production-ready codebase.

---
© 2026 **R. K. Life Science**. All rights reserved.
