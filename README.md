# R. K. Life Science Ecommerce System

An advanced **Ecommerce Platform** for **R. K. Life Science**, a wholesale distributor of nutraceutical products (multivitamins, tabs, capsules, and non-medicinal products).  
This system includes a **user-facing storefront**, **admin panel**, **real-time features**, and **full backend integration** using Next.js, Node.js, PostgreSQL, and Socket.io.

---

## 🚀 Features

### User Side
- **Homepage**: Hero section, services, featured products, newsletter signup  
- **Product List**: Pagination, filters by price and stars  
- **Product Details**: Name, image, description, similar products  
- **Cart & Checkout**: Add/remove products, order placement  
- **User Profile**: Update info, change password, view order history  
- **Authentication**: Login, register, forgot password  
- **Contact & About Pages**: Contact form, company info, developer section  

### Admin Side
- **Dashboard**: Overview of total products, users, orders, revenue  
- **Product Management**: Add, edit, delete products, image upload, categories  
- **Order Management**: View, update order status (pending, dispatched, delivered)  
- **User Management**: View users, delete suspicious accounts  
- **Reports**: Export reports in PDF/Excel with date range filters  
- **Admin Authentication**: Secure login/logout  
- **Sidebar**: Fixed sidebar with navigation and logout  

### Common Features
- **Payment Integration**: eSewa, Stripe, Cash on Delivery  
- **Responsive Design**: Works on desktop, tablet, mobile  
- **Smooth Scrolling & Hover Effects**  
- **Form Validation**: Email, phone (10 digits, starts with 98 or 97), password confirmation  
- **Real-time Updates**: Socket.io for live order notifications (future enhancement)  
- **Color Scheme**: White and Green theme  

---

## 🗂️ Folder Structure

```

rk-life-science/
│
├── client/                 # Next.js frontend
│   ├── app/                # Pages & layouts
│   │   ├── (user)/         # User pages
│   │   └── (admin)/        # Admin pages (no navbar/footer)
│   ├── components/         # React components
│   │   ├── admin/          # Admin sidebar, buttons
│   │   └── user/           # Navbar, footer, product cards
│   └── lib/                # API calls, helpers
│
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── routes/             # Express routes
│   ├── middleware/         # Multer, auth, validations
│   ├── uploads/            # Uploaded product images
│   └── config/             # DB connection, environment config
│
├── docs/                   # Documentation, diagrams
└── README.md               # Project README

````

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, Tailwind CSS, React |
| Backend | Node.js, Express.js, Socket.io |
| Database | PostgreSQL (locally hosted) |
| Payments | eSewa, Stripe, Cash on Delivery |
| Deployment | (Optional) Vercel / Heroku / DigitalOcean |

---

## 🔧 Setup Instructions

### 1. Clone the Project
```bash
git clone https://github.com/sahiltechpreneur/rk-life-science.git
cd rk-life-science
````

### 2. Backend Setup

```bash
cd server
npm install
```

* Create `.env` file with:

```
PORT=5000
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=<your-db-password>
PGDATABASE=rk_life_science
PGPORT=5432
```

* Start backend:

```bash
npm run dev
```

* Ensure **uploads folder exists**:

```bash
mkdir uploads
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

* Open in browser: `http://localhost:3000`
* Admin login: `http://localhost:3000/admin/login`

---

## 💡 Notes

* Product images are stored in `server/uploads` and served via `/uploads` route.
* Phone number validation: 10 digits starting with `98` or `97`.
* Admin sidebar is **fixed**, user pages have **navbar/footer**.
* Uses **FormData** for image uploads and product updates.
* Search & pagination implemented for admin product list.

---

## 📌 Next Steps / Enhancements

* Add **real-time notifications** via Socket.io for new orders.
* Implement **category dropdown** instead of manually entering ID.
* Add **confirmation modal** before deleting a product or user.
* Integrate **advanced reporting** with charts using Chart.js or Recharts.
* Deploy to a **production server** with SSL and secure environment variables.
