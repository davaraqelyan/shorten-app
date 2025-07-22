# URL Shortener Application

A full-stack URL shortener built with NestJS, Next.js, and PostgreSQL.

## 🎥 Demo Video

> ⚠️ **Video file is large (~3MB)** - Choose your preferred option:

### Option 1: Direct Download
[![Demo Video](https://img.shields.io/badge/📹_Download_Demo-Click_Here-red?style=for-the-badge&logo=download)](./demo.mp4)

### Option 2: View via GitHub
**[🎬 Open demo.mp4 in GitHub viewer](https://github.com/davaraqelyan/url-shortener/blob/main/demo.mp4)**

### Option 3: Alternative hosting
*If you have issues accessing the video above, please let me know and I can provide alternative hosting options (Google Drive, YouTube unlisted, etc.)*

**Complete walkthrough of the URL shortener application:**

**What you'll see:**

- ✅ User registration and authentication  
- ✅ Creating shortened URLs (with and without custom codes)
- ✅ Real-time analytics and click tracking
- ✅ Responsive design and user experience
- ✅ URL management and deletion

---

## 📸 Quick Preview (Screenshots)

*Visual overview of key features while the video loads:*

### 🏠 Landing Page & URL Shortening
```
🎯 Clean, modern interface for URL shortening
🔐 User authentication with registration/login
📱 Fully responsive design for all devices
```

### 📊 Analytics Dashboard  
```
📈 Real-time click tracking and statistics
📋 URL management with edit/delete options
🎨 Beautiful charts and metrics visualization
```

### 🔗 URL Management
```
✂️  Create shortened URLs with custom codes (optional)
👀 View detailed analytics for each URL
🗑️  Delete and manage your URLs
```

## 🚀 Features

- **User Authentication**: Secure JWT-based registration and login
- **URL Management**: Create, edit, and delete shortened URLs  
- **Analytics Dashboard**: Track clicks and view usage statistics
- **Responsive Design**: Mobile-first UI with modern components
- **Security**: Input validation, XSS prevention, and rate limiting

## 🛠️ Tech Stack

- **Backend**: NestJS, Prisma, PostgreSQL, JWT
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, React Query

## 🚀 Quick Start

### Prerequisites
- Node.js 18+, pnpm, PostgreSQL

### Setup & Run

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Environment variables**
   ```bash
   # api/.env
   DATABASE_URL="postgresql://user:password@localhost:5432/url_shortener"
   JWT_SECRET="your-secure-secret-key"
   NODE_ENV="development"
   CORS_ORIGIN="http://localhost:3000"
   
   # web/.env.local  
   NEXT_PUBLIC_API_URL="http://localhost:3001"
   ```

3. **Database setup**
   ```bash
   cd api
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Start servers**
   ```bash
   # Terminal 1 - API (port 3001)
   cd api && pnpm start:dev
   
   # Terminal 2 - Web (port 3000)  
   cd web && pnpm dev
   ```

## 📱 Demo Features

- User registration/login at http://localhost:3000
- URL shortening and management
- Analytics dashboard with click tracking  
- Mobile-responsive interface

## 🏗️ Project Structure

```
├── api/           # NestJS backend
│   ├── src/auth/  # Authentication
│   ├── src/url/   # URL management
│   └── prisma/    # Database
└── web/           # Next.js frontend
    └── src/       # Components & pages
```

## 🔒 Security

- JWT authentication with secure tokens
- Input validation with DTOs and Zod
- XSS prevention with DOMPurify
- CORS configuration and rate limiting
- Security headers with Helmet.js

## 📝 API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user  
- `POST /api/shorten` - Create short URL (auth required)
- `GET /my-urls` - Get user URLs (auth required)
- `GET /:shortCode` - Redirect to original URL
- `GET /api/health` - Health check

---

