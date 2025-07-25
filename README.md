# 📝 Medium Clone Backend (WIP)

This is a **Work-In-Progress (WIP)** backend for a Medium-like blogging platform, built using **Cloudflare Workers**, **Hono**, and **Prisma ORM**.

## 🚀 Tech Stack

- 🟦 **TypeScript** – Strongly typed programming language that builds on JavaScript
- ⚡ **Cloudflare Workers** – Serverless compute at the edge
- 🔥 **Hono** – Ultra-fast, lightweight web framework for building APIs
- 💾 **Prisma ORM** – Type-safe database access
- 🐘 **PostgreSQL** – Relational database
- 🚀 **Prisma Accelerate** – Accelerated global edge deployments for Prisma
- ☁️ **Cloudinary** – For image/file uploads
- 🔐 **JWT Authentication**

---

## 📦 Features (Implemented / In Progress)

- ✅ Signup & Login with JWT Auth
- ✅ Cookie-based auth (Secure + HttpOnly)
- ✅ Database integration with Prisma + PostgreSQL
- ⚙️ File upload integration with Cloudinary _(WIP)_
- ✍️ CRUD for posts _(Planned)_
- 🗂️ Tagging & Filtering _(Planned)_
- 🧑‍🤝‍🧑 Followers system _(Planned)_

---

## 📁 Project Structure

src/
│
├── routes/ # Route handlers (auth, posts, users, etc.)
├── middlewares/ # Middleware (auth validation, error handling, etc.)
├── controllers/ # Controllers (user, posts, etc.)
├── validation/ # Zod Validation (e.g., user/post schema validation)
├── utils/ # Utility functions (e.g., error functions, body validation, etc.)
├── config/ # App config, cloudinary, prisma
└── index.ts # App entry point

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/medium-clone-backend.git
cd medium-clone-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup your environment variables
```
.env
DATABASE_URL=your_db_url

wrangler.jsonc
"vars"={
"vars"={
    "DATABASE_URL": "your_db_url",
    "JWT_SECRET": "your_jwt_secret",
    "CLOUDINARY_API_KEY": "your_api_key",
    "CLOUDINARY_API_SECRET": "your_api_secret",
    "CLOUDINARY_NAME": "your_cloudinary_name"
}
}
```

### 4. Setup Prisma
```
npx prisma migrate dev --name Initial
npx prisma generate
```

### 5. Start the dev server
```
npm run dev
```