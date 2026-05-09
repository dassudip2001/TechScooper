# TechScooper - E-Commerce Application

A full-stack e-commerce platform featuring product catalog, recommendation engine, and comprehensive logging system.

## 📋 Features

### 1. **Home Page & Product Catalog**

- Browse all available products
- Filter by categories
- Product details view
- Add to cart functionality

### 2. **Recommendation Engine**

- AI-powered product recommendations
- Based on user browsing history
- Similar product suggestions
- Personalized recommendations

### 3. **User Authentication**

- Sign Up / Registration
- Sign In / Login
- Role-based access control (User, Admin)
- Session management

### 4. **Admin Dashboard**

- Manage products (Create, Read, Update, Delete)
- Category management
- View user activity logs
- Track operations via MongoDB

## 🏗️ Architecture & Flow

### Authentication Flow

```
┌─────────────┐         ┌─────────────┐         ┌──────────────┐
│   Sign Up   │────────▶│  Validate   │────────▶│   Create     │
│             │         │  & Hash     │         │   User       │
└─────────────┘         └─────────────┘         └──────────────┘
                                                        │
                                                        ▼
┌─────────────┐         ┌─────────────┐         ┌──────────────┐
│   Sign In   │────────▶│  Verify     │────────▶│   Generate   │
│             │         │  Credentials│         │   JWT Token  │
└─────────────┘         └─────────────┘         └──────────────┘
                                                        │
                                                        ▼
                                                ┌──────────────┐
                                                │   Access     │
                                                │   Protected  │
                                                │   Routes     │
                                                └──────────────┘
```

### Product Management Flow

```
┌────────────────┐
│  Home Page     │
│  Show Products │
└────────────────┘
         │
         ▼
┌────────────────┐
│  Category      │
│  Filter        │
└────────────────┘
         │
         ▼
┌────────────────┐
│  Product       │
│  Catalog       │
└────────────────┘
         │
         ▼
┌────────────────┐
│  Product       │
│  Details       │
└────────────────┘
         │
         ▼
┌────────────────┐
│  Add to Cart / │
│  Recommendation│
└────────────────┘
```

### Recommendation Engine Flow

```
┌─────────────────────┐
│  User Browsing      │
│  History            │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│  Analyze Patterns   │
│  & Preferences      │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│  Generate Similar   │
│  Product Suggestions│
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│  Personalized       │
│  Recommendations    │
└─────────────────────┘
```

## 🛠️ Tech Stack

### Frontend

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling

### Backend

- **Express.js** - API server
- **Node.js** - Runtime
- **TypeScript** - Type safety
- **Prisma ORM** - Database management

### Database

- **MySQL** - Primary database
  - User management
  - Products & Categories
  - Orders & Cart
- **MongoDB** - Activity logging
  - Product create/update/delete logs
  - User action tracking
  - System events

### Admin Panel

- **React + TypeScript + Vite**
- Dashboard for operations
- Real-time data management

## 📁 Project Structure

```
assignment/
├── admin/                    # Admin dashboard
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── backend/                  # Express server
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   ├── routes/           # API endpoints
│   │   ├── services/         # Database services
│   │   ├── middleware/       # Auth & logging
│   │   ├── schemas/          # Validation
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── client/                   # React client
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
└── docker/
    └── db-docker-compose.yml # Database setup
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Docker & Docker Compose
- MySQL
- MongoDB

### Installation

#### 1. Clone Repository

```bash
git clone https://github.com/dassudip2001/TechScooper.git
cd assignment
```

#### 2. Database Setup

```bash
cd docker
docker-compose -f db-docker-compose.yml up -d
```

#### 3. Backend Setup

```bash
cd ../backend
npm install
# Create .env file
npx prisma migrate dev
npm run dev
```

#### 4. Client Setup

```bash
cd ../client
npm install
npm run dev
```

#### 5. Admin Setup

```bash
cd ../admin
npm install
npm run dev
```

## 📡 API Endpoints

### Authentication

- `POST /api/users/signup` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)

### Recommendations

- `GET /api/recommendations` - Get personalized recommendations
- `GET /api/recommendations/similar/:productId` - Get similar products

### Logs

- `GET /api/logs` - Get activity logs (Admin)
- `GET /api/logs/products` - Get product operation logs

## 🔐 Authentication & Authorization

### JWT Implementation

- Tokens stored in HTTP-only cookies
- Role-based access control (RBAC)
- Protected routes on frontend & backend

### Middleware

- `authMiddleware` - Verify JWT tokens
- `roleMiddleware` - Check user permissions
- `logMiddleware` - Log all operations

## 📝 Logging System

### MongoDB Collections

```javascript
// Product Logs
{
  action: "create|update|delete",
  productId: String,
  userId: String,
  timestamp: Date,
  details: Object,
  changes: {
    before: Object,
    after: Object
  }
}

// Activity Logs
{
  userId: String,
  action: String,
  resource: String,
  timestamp: Date,
  ipAddress: String,
  details: Object
}
```

## 🎯 Key Features Implementation

### Product Catalog

- Display products with pagination
- Category-based filtering
- Search functionality
- Product detail views

### Recommendation Engine

```typescript
// Algorithm
1. Collect user browsing history
2. Analyze product categories & attributes
3. Calculate similarity scores
4. Rank products by relevance
5. Return top N recommendations
```

### User Management

- Secure password hashing (bcrypt)
- Email verification
- Profile management
- Order history

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd ../client
npm run test

# E2E tests
npm run test:e2e
```

## 📦 Environment Variables

### Backend (.env)

```
DATABASE_URL=mysql://user:password@localhost:3306/techscooper
MONGODB_URI=mongodb://localhost:27017/techscooper_logs
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=TechScooper
```

## 🚢 Deployment

### Docker Build

```bash
docker build -t techscooper-backend ./backend
docker build -t techscooper-client ./client
```

### Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificates configured
- [ ] CORS properly configured
- [ ] Logging enabled
- [ ] Error tracking setup
- [ ] Performance monitoring

## 📊 Database Schema

### Users Table

- id (Primary Key)
- email (Unique)
- password (Hashed)
- firstName
- lastName
- role (user, admin)
- createdAt
- updatedAt

### Products Table

- id (Primary Key)
- name
- description
- price
- categoryId (Foreign Key)
- image
- stock
- createdAt
- updatedAt

### Categories Table

- id (Primary Key)
- name
- description
- createdAt

### Orders Table

- id (Primary Key)
- userId (Foreign Key)
- totalPrice
- status
- createdAt

## 🐛 Troubleshooting

### Common Issues

**Tooltip Provider Error**

- Solution: Ensure `TooltipProvider` wraps components in root
- File: `admin/src/main.tsx`

**Database Connection Error**

- Check MongoDB & MySQL are running
- Verify connection strings in `.env`

**CORS Error**

- Update CORS configuration in Express
- Verify frontend URL in backend config

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Prisma ORM](https://www.prisma.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 👥 Contributors

- [@dassudip2001](https://github.com/dassudip2001)

## 📄 License

MIT License - See LICENSE file for details

## 📞 Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Last Updated**: May 9, 2026
