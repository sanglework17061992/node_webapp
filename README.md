admin123# Node Web App - Full Stack Application

A complete full-stack web application built with NestJS (backend), Next.js (frontend), MySQL database, and Prisma ORM. Features include user authentication, role-based authorization (Admin/Manager/User/Anonymous), and full CRUD operations for user management.

## 🚀 Features

- **Authentication & Authorization**
  - User registration and login with JWT tokens
  - Role-based access control (Admin, Manager, User, Anonymous)
  - Secure password hashing with bcrypt
  - Protected routes and API endpoints

- **User Management**
  - CRUD operations for users (Admin only)
  - User listing and viewing (Admin & Manager)
  - User profile management
  - Active/Inactive status management

- **Tech Stack**
  - **Backend**: NestJS, Prisma ORM, MySQL, JWT, Passport
  - **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Zustand
  - **Database**: MySQL

## 📋 Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
cd node_webapp
```

### 2. Setup MySQL Database

Create a new MySQL database:

```sql
CREATE DATABASE node_webapp;
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Edit .env file and update database credentials
# DATABASE_URL="mysql://root:your_password@localhost:3306/node_webapp"

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database with initial users
npm run prisma:seed

# Start backend server
npm run start:dev
```

The backend will run on `http://localhost:3001`

### 4. Open Prisma Studio (Optional - Visual Database Browser)

Open a new terminal:

```bash
cd backend

# Start Prisma Studio
npm run prisma:studio
```

Prisma Studio will run on `http://localhost:5555`

This provides a visual interface to:
- View and edit database records
- Browse all tables
- Filter and search data
- Manage relationships

### 5. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🌐 Running Services

Once everything is set up, you'll have these services running:

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Next.js web application |
| Backend API | http://localhost:3001/api | NestJS REST API |
| Swagger Docs | http://localhost:3001/api/docs | Interactive API documentation |
| Prisma Studio | http://localhost:5555 | Visual database browser |

## 👥 Default Users (After Seeding)

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | ADMIN |
| manager@example.com | manager123 | MANAGER |
| user@example.com | user123 | USER |

## 📁 Project Structure

```
node_webapp/
├── backend/                 # NestJS Backend
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Database seeding
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management module
│   │   ├── prisma/         # Prisma service
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── config/         # Configuration files
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env                # Environment variables
│   └── package.json
│
└── frontend/               # Next.js Frontend
    ├── src/
    │   ├── app/            # Next.js app directory
    │   │   ├── login/      # Login page
    │   │   ├── register/   # Registration page
    │   │   ├── dashboard/  # User dashboard
    │   │   └── admin/      # Admin panel
    │   ├── components/     # React components
    │   ├── services/       # API services
    │   ├── store/          # Zustand state management
    │   ├── types/          # TypeScript types
    │   └── lib/            # Utility functions
    ├── .env.local          # Environment variables
    └── package.json
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users (Protected)
- `GET /api/users` - Get all users (Admin & Manager)
- `GET /api/users/:id` - Get user by ID (Admin & Manager)
- `POST /api/users` - Create user (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

**📖 Interactive API Documentation:**
Visit http://localhost:3001/api/docs to access Swagger UI where you can:
- View all endpoints with detailed descriptions
- Test API requests directly from the browser
- See request/response schemas
- Authenticate with JWT tokens
- Try out all CRUD operations

## 🎨 Frontend Routes

- `/` - Home (redirects to login or dashboard)
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - User dashboard (protected)
- `/admin/users` - User management (Admin & Manager only)

## 🔐 Role Permissions

| Action | Admin | Manager | User | Anonymous |
|--------|-------|---------|------|-----------|
| Register | ✅ | ✅ | ✅ | ✅ |
| Login | ✅ | ✅ | ✅ | ❌ |
| View Dashboard | ✅ | ✅ | ✅ | ❌ |
| View Users List | ✅ | ✅ | ❌ | ❌ |
| Create User | ✅ | ❌ | ❌ | ❌ |
| Update User | ✅ | ❌ | ❌ | ❌ |
| Delete User | ✅ | ❌ | ❌ | ❌ |

## 🧪 Testing the Application

1. **View API documentation with Swagger**
   - Navigate to `http://localhost:3001/api/docs`
   - Try the `/api/auth/login` endpoint
   - Click "Authorize" and enter the JWT token
   - Test protected endpoints

2. **View database with Prisma Studio**
   - Navigate to `http://localhost:5555`
   - Browse the users table
   - View all seeded users

3. **Register a new user**
   - Navigate to `http://localhost:3000/register`
   - Fill in the registration form
   - Submit to create a new user account

4. **Login with seeded admin**
   - Navigate to `http://localhost:3000/login`
   - Email: `admin@example.com`
   - Password: `admin123`

5. **Manage users**
   - After logging in as admin, click "Manage Users"
   - Create, edit, or delete users
   - Change user roles and status
   - See changes reflected in real-time in Prisma Studio

## 📝 Development Commands

### Backend

```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod

# Prisma commands
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run migrations
npm run prisma:studio      # Open Prisma Studio (Visual DB browser at http://localhost:5555)
npm run prisma:seed        # Seed database
```

### Frontend

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Linting
npm run lint
```

## 🔧 Configuration

### Backend Environment Variables (.env)

```env
NODE_ENV=development
PORT=3001
DATABASE_URL="mysql://root:your_password@localhost:3306/node_webapp"
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

### Frontend Environment Variables (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🚀 Deployment

### Backend Deployment

1. Set up MySQL database on your hosting provider
2. Update environment variables for production
3. Run migrations: `npm run prisma:migrate`
4. Build the application: `npm run build`
5. Start the server: `npm run start:prod`

### Frontend Deployment

1. Update `NEXT_PUBLIC_API_URL` with your production API URL
2. Build the application: `npm run build`
3. Deploy to Vercel, Netlify, or any Node.js hosting

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control (RBAC)
- Protected API routes with guards
- Input validation with class-validator
- CORS configuration
- Environment variable protection

## 📚 Technologies Used

### Backend
- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **MySQL** - Relational database
- **Passport JWT** - JWT authentication
- **Bcrypt** - Password hashing
- **Class Validator** - DTO validation

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Hook Form** - Form validation
- **Axios** - HTTP client

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@example.com or create an issue in the repository.
