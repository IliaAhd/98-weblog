# 98 Weblog

**98 Weblog** is a retro-style blogging platform where users can publish and share posts, inspired by the classic Windows 98 look using [98.css](https://98.css/). Think of it as Twitter for blogs, but with a nostalgic 90s UI.

---

## Features

- **User Authentication** – Secure login and registration powered by NextAuth.js and Prisma.
- **Publish Blogs** – Create, edit, and delete posts dynamically.
- **Retro Design** – Classic Windows 98 styling using 98.css.
- **Dynamic Routes** – Each post has a unique URL.
- **API Routes** – Full RESTful API support for post management.

---

## Tech Stack

- **Framework:** Next.js 15
- **Frontend:** React 19
- **Styling:** 98.css
- **Backend:** Next.js API routes
- **Database:** Prisma (with @auth/prisma-adapter)
- **Authentication:** NextAuth.js
- **Form Handling:** react-hook-form

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/98-weblog.git
cd 98-weblog

# Database URL for Prisma
DATABASE_URL="your_prisma_database_url"

# Secret key for NextAuth.js
NEXTAUTH_SECRET="your_random_secret_key_here"

# Google OAuth credentials (if using Google login)
AUTH_GOOGLE_ID="your_google_client_id_here"
AUTH_GOOGLE_SECRET="your_google_client_secret_here"

npm install
npm run dev
```
