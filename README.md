# 🌿 R. K. Life Science - Premium Ecommerce Platform

![R. K. Life Science Logo](/client/public/images/logo.png)

A state-of-the-art ecommerce platform for **R. K. Life Science**, a leading wholesale distributor of nutraceutical and non-medicinal products. This solution features a modern UI, a robust admin dashboard, and a seamless shopping experience for both B2B and B2C customers.

---

## ✨ Key Features

### 🛍️ Customer Experience
- **Modern UI Design** — Clean, professional interface with subtle animations and thoughtful spacing
- **Product Catalog** — Advanced filtering, search, and pagination for easy product discovery
- **Shopping Cart** — Real-time cart updates, quantity management, and order summary
- **Secure Checkout** — Multiple payment options including eSewa and Cash on Delivery
- **User Dashboard** — Order history tracking and profile management
- **Real-time Notifications** — Instant feedback for cart actions, login, and order updates

### 🔧 Admin Dashboard
- **Analytics Overview** — Revenue charts, order statistics, and product metrics
- **Product Management** — Create, edit, and delete products with image uploads
- **Order Management** — View orders, update statuses, and export reports (Excel/PDF)
- **User Management** — Manage registered customers, block/unblock accounts
- **Real-time Updates** — Socket.io integration for live order notifications

### 🚀 Technical Highlights
- **Performance** — Server-side rendering with Next.js App Router
- **Responsive Design** — Fully mobile-optimized across all devices
- **Type Safety** — TypeScript throughout the codebase
- **Database** — PostgreSQL with Prisma ORM for reliable data management
- **Authentication** — JWT-based auth with protected routes

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 15+ | React framework with App Router |
| Tailwind CSS | Utility-first styling |
| TypeScript | Type safety |
| React Icons | Icon library |
| Chart.js | Admin dashboard charts |
| Socket.io Client | Real-time notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| PostgreSQL | Primary database |
| JWT | Authentication |
| Multer | File uploads |
| Nodemailer | Email services |
| Socket.io | Real-time events |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/rk-life-science.git
cd rk-life-science
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/rk_life_science

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Email (for OTP and notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# eSewa Payment Gateway
ESEWA_SECRET_KEY=8gBm/:&EnhH.1/q
FRONTEND_URL=http://localhost:3000
```

**Database Setup:**
```bash
# Create database
createdb rk_life_science

# Run migrations (if any)
npm run migrate
```

Start the backend server:
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file in the `client` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
# Application runs on http://localhost:3000
```

---

## 🚀 Deployment

### Build for Production

**Frontend:**
```bash
cd client
npm run build
npm start
```

**Backend:**
```bash
cd server
npm run build
npm start
```

### Environment Variables for Production
Make sure to set all environment variables on your hosting platform (Vercel, Netlify, Heroku, etc.).

---

## 📁 Project Structure

```
rk-life-science/
├── client/                     # Next.js frontend
│   ├── app/                    # App Router pages
│   │   ├── (user)/            # User-facing routes
│   │   │   ├── product/       # Product listing & details
│   │   │   ├── cart/          # Shopping cart
│   │   │   ├── checkout/      # Checkout flow
│   │   │   ├── profile/       # User profile
│   │   │   ├── auth/          # Login/Register/Forgot password
│   │   │   ├── about/         # About page
│   │   │   ├── contact/       # Contact page
│   │   │   ├── faq/           # FAQ page
│   │   │   └── privacy/       # Legal pages
│   │   └── (admin)/           # Admin routes
│   │       └── admin/
│   │           ├── dashboard/ # Analytics dashboard
│   │           ├── products/  # Product management
│   │           ├── orders/    # Order management
│   │           └── users/     # User management
│   ├── components/            # Reusable components
│   │   ├── ui/               # Button, Input, Container
│   │   ├── user/             # ProductCard, Navbar, Footer
│   │   └── admin/            # Sidebar, RevenueChart
│   ├── context/              # React contexts
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   ├── NotificationContext.tsx
│   │   └── SocketContext.tsx
│   ├── lib/                  # API client
│   └── public/               # Static assets
│
└── server/                   # Express backend
    ├── config/               # Database configuration
    ├── controllers/          # Route controllers
    ├── middleware/           # Auth, upload middleware
    ├── models/               # Database models
    ├── routes/               # API routes
    ├── uploads/              # Product images
    └── utils/                # Helper functions
```

---

## 💳 Payment Integration

The platform supports:
- **Cash on Delivery (COD)** — Pay when you receive your order
- **eSewa** — Digital wallet payment for Nepal

eSewa test mode is configured in development. For production, update the eSewa endpoint and credentials.

---

## 📄 API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password with OTP |

### Protected Endpoints (Requires Auth)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get user profile |
| PUT | `/api/user/profile` | Update profile |
| POST | `/api/orders` | Create order |
| GET | `/api/orders/:id` | Get order details |

### Admin Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Dashboard statistics |
| GET | `/api/admin/products` | Manage products |
| PUT | `/api/orders/:id/status` | Update order status |
| GET | `/api/auth/users` | Get all users |

---

## 🐛 Troubleshooting

### Common Issues

**Database connection error:**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists

**Image uploads not working:**
- Check that `server/uploads` directory exists
- Verify file permissions

**eSewa integration failing:**
- Use test credentials in development
- Verify secret key configuration

**Socket.io connection issues:**
- Ensure backend server is running
- Check CORS configuration

---

## 📝 License

© 2026 **R. K. Life Science**. All rights reserved.

---

## 👥 Contributors

- **Sahil Gupta** — Lead Developer
  - GitHub: [@sahiltechpreneur](https://github.com/sahiltechpreneur)
---

## 🙏 Acknowledgments

- Tailwind CSS for the utility-first styling
- Next.js team for the amazing framework
- All open-source contributors whose libraries made this project possible

---

*Built with ❤️ for healthcare distribution excellence*
```