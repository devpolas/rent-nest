# 🏠 Rent Nest

**Rent Nest** is a modern full-stack property rental platform designed to connect tenants and landlords through a clean, scalable, and secure rental experience.

The platform allows tenants to discover properties, view detailed property information, submit rental requests, manage payments, and leave reviews. Landlords can create and manage properties, upload property images, manage rental requests, and monitor their listings.

The project is built with **Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Zustand, Zod**, and a dedicated REST API backend.

---

## ✨ Features

### 🏘️ Property Discovery

- Browse available rental properties
- Property search and filtering
- Filter by:
  - Location
  - Rent range
  - Area
  - Bedrooms
  - Bathrooms
  - Amenities
  - Features
  - Rules
  - Rating
  - Availability
- Property sorting
- Pagination
- Detailed property pages
- Property image galleries
- Property categories
- Property ratings and review counts

### 👤 Authentication & Authorization

- User registration and login
- JWT-based authentication
- Access and refresh token handling
- Cookie-based session management
- Google OAuth authentication
- Protected routes
- Automatic token refresh
- Logout from current device
- Logout from other sessions
- Role-based access control

Supported roles:

| Role       | Responsibilities                                             |
| ---------- | ------------------------------------------------------------ |
| `TENANT`   | Browse properties, submit rental requests, make payments     |
| `LANDLORD` | Create properties, manage properties, manage rental requests |
| `ADMIN`    | Manage users, properties, and system resources               |

---

## 🏡 Property Management

Landlords can:

- Create properties
- Update property information
- Manage property availability
- Manage property status
- Add amenities
- Add features
- Define property rules
- Upload property images
- Edit/crop property images
- Manage property galleries
- Monitor rental requests

Property information can include:

- Title
- Description
- Rent
- Security deposit
- Bedrooms
- Bathrooms
- Area
- Location
- Category
- Availability
- Property status
- Amenities
- Features
- Rules
- Images
- Ratings
- Reviews

---

## 📸 Image Management

Rent Nest uses **Cloudinary** for property image storage and delivery.

The image workflow supports:

- Multiple image uploads
- Image validation
- JPEG
- PNG
- WebP
- AVIF
- File-size restrictions
- Cloudinary storage
- Image cropping
- Image preview
- Property image galleries
- Image management

The frontend uses `react-easy-crop` for client-side image cropping.

---

## 📝 Rental Requests

Tenants can submit rental requests for properties.

The rental workflow supports:

1. Tenant discovers a property
2. Tenant views property details
3. Tenant submits a rental request
4. Landlord reviews the request
5. Landlord accepts or rejects the request
6. Tenant proceeds with payment when applicable
7. Rental/payment information is recorded

---

## 💳 Payments

Rent Nest integrates payment processing through **Stripe**.

Payment functionality includes:

- Stripe Checkout
- Payment verification
- Transaction tracking
- Payment status handling
- Rental-request/payment relationship
- Duplicate payment protection
- Payment history

---

## ⭐ Reviews & Ratings

Tenants can review properties after eligible rental activity.

The review system maintains:

- Rating
- Review content
- Total rating
- Average rating
- Review count
- Property-level rating statistics

---

# 🛠️ Technology Stack

## Frontend

| Technology         | Purpose                                 |
| ------------------ | --------------------------------------- |
| **Next.js 16**     | React framework and application routing |
| **React 19**       | UI library                              |
| **TypeScript**     | Type-safe development                   |
| **Tailwind CSS 4** | Styling                                 |
| **shadcn/ui**      | UI components                           |
| **Radix UI**       | Accessible UI primitives                |
| **Lucide React**   | Icons                                   |
| **React Icons**    | Additional icons                        |

## State & Data Management

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| **TanStack Query** | Server state and API data |
| **TanStack Table** | Advanced data tables      |
| **TanStack Store** | Reactive state utilities  |
| **Zustand**        | Client/application state  |
| **Immer**          | Immutable state updates   |

## Forms & Validation

| Technology              | Purpose                 |
| ----------------------- | ----------------------- |
| **React Hook Form**     | Form management         |
| **Zod**                 | Schema validation       |
| **@hookform/resolvers** | Form/schema integration |
| **libphonenumber-js**   | Phone number validation |

## API & Authentication

| Technology     | Purpose                   |
| -------------- | ------------------------- |
| **Axios**      | HTTP client               |
| **JWT**        | Authentication tokens     |
| **Nodemailer** | Email functionality       |
| **dotenv**     | Environment configuration |

## Media & UI

| Technology          | Purpose                        |
| ------------------- | ------------------------------ |
| **Cloudinary**      | Image storage and optimization |
| **next-cloudinary** | Cloudinary integration         |
| **react-easy-crop** | Image cropping                 |
| **Embla Carousel**  | Image/content carousels        |
| **Recharts**        | Data visualization             |
| **Sonner**          | Toast notifications            |
| **next-themes**     | Theme management               |
| **date-fns**        | Date manipulation              |

---

# 🏗️ Project Architecture

Rent Nest follows a modular Next.js App Router architecture.

```text
rent-nest/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── properties/
│   ├── property/
│   ├── ...
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── navbar/
│   ├── footer/
│   ├── property/
│   ├── properties/
│   ├── dashboard/
│   └── ...
│
├── hooks/
│   ├── use-properties.ts
│   ├── use-property.ts
│   ├── use-auth.ts
│   └── ...
│
├── actions/
│   ├── auth/
│   ├── property/
│   └── ...
│
├── lib/
│   ├── axios.ts
│   ├── auth/
│   ├── utils.ts
│   └── ...
│
├── stores/
│   └── auth-store.ts
│
├── schemas/
│   └── ...
│
├── types/
│   ├── property.ts
│   ├── review.ts
│   ├── rental-request.ts
│   ├── payment.ts
│   └── ...
│
├── proxy.ts
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

> The exact directory structure may evolve as the application grows.

---

# 🔄 Data Flow

Rent Nest separates UI, client state, server state, validation, and API communication.

```text
                    ┌─────────────────────┐
                    │      Next.js UI     │
                    │ React + Tailwind    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     React Hooks     │
                    │   TanStack Query    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Axios        │
                    │     API Client     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Rent Nest Backend   │
                    │ Express + Prisma    │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
          PostgreSQL       Cloudinary         Stripe
```

---

# 🔐 Authentication Architecture

Authentication uses access and refresh tokens with protected application routes.

The frontend authentication flow includes:

```text
User
 │
 ▼
Sign In / Sign Up
 │
 ▼
Backend Authentication
 │
 ▼
Access + Refresh Tokens
 │
 ▼
HTTP Cookies
 │
 ▼
Next.js Proxy
 │
 ├── Valid Token ──────► Continue
 │
 ├── Expired Token ────► Refresh Token
 │
 └── Invalid Session ──► Sign In
```

The application also supports Google OAuth.

---

# 🧩 Backend

Rent Nest uses a separate backend API responsible for business logic, authentication, database operations, payments, and media management.

The backend is built with:

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- Zod
- JWT
- Stripe
- Cloudinary

### API Modules

```text
/api/v1
├── auth
├── users
├── profiles
├── properties
├── locations
├── property-images
├── rental-requests
├── categories
├── amenities
├── features
├── rules
├── social-profiles
├── payments
└── reviews
```

Backend repository:

**Rent Nest Backend API**

`https://github.com/devpolas/rent-nest-backend-api`

---

# 🗄️ Core Domain Models

The backend uses Prisma for database access.

Core entities include:

```text
User
 │
 ├── Profile
 ├── Social Profiles
 └── Rental Requests
        │
        ▼
     Property
        │
        ├── Location
        ├── Category
        ├── Images
        ├── Amenities
        ├── Features
        ├── Rules
        ├── Reviews
        └── Payments
```

The property domain is the central part of the application.

---

# 📊 Property Query System

The property API supports advanced filtering and querying.

Examples include:

```text
Location
Rent
Security Deposit
Area
Bedrooms
Bathrooms
Availability
Status
Amenities
Features
Rules
Rating
```

The frontend sends validated query parameters to the backend, while the backend converts them into Prisma database queries.

This keeps filtering logic centralized and scalable.

---

# 📋 Dashboard

The dashboard provides role-specific functionality.

### Tenant Dashboard

```text
Tenant
├── Profile
├── Rental Requests
├── Payment History
├── Reviews
└── Account Settings
```

### Landlord Dashboard

```text
Landlord
├── Properties
├── Property Images
├── Rental Requests
├── Property Analytics
└── Account Settings
```

### Admin Dashboard

```text
Admin
├── Users
├── Properties
├── Rental Requests
├── System Management
└── Administration
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

- Node.js 20+
- npm
- Git
- A running Rent Nest backend API

You will also need access to:

- PostgreSQL
- Cloudinary
- Stripe
- Google OAuth credentials if Google authentication is enabled

---

## Installation

Clone the repository:

```bash
git clone <your-frontend-repository-url>
cd rent-nest
```

Install dependencies:

```bash
npm install
```

---

# ⚙️ Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

> Use the exact environment variable names expected by the current application configuration. Never commit secrets, API keys, private keys, or production credentials to Git.

---

# 💻 Development

Start the development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:3000
```

---

# 🏭 Production Build

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# 🔍 Linting

Run ESLint:

```bash
npm run lint
```

---

# 📜 Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm start`     | Start the production server  |
| `npm run lint`  | Run ESLint                   |

---

# 🎨 UI & Design System

Rent Nest uses a modern component-driven UI architecture based around:

- Tailwind CSS
- shadcn/ui
- Radix UI
- Base UI
- Lucide icons
- Responsive layouts
- Accessible components
- Dark/light theme support
- Reusable form components
- Reusable table components
- Toast notifications

The UI is designed to maintain consistent spacing, typography, colors, interactions, and responsive behavior throughout the platform.

---

# 📱 Responsive Design

The application is designed for:

- 📱 Mobile
- 📱 Tablet
- 💻 Laptop
- 🖥️ Desktop

Layouts use responsive Tailwind utilities and reusable components rather than device-specific implementations.

---

# ⚡ Performance

Rent Nest focuses on performance through:

- Next.js App Router
- Server-side rendering where appropriate
- Client components only where interaction is required
- TanStack Query caching
- Optimized API requests
- Cloudinary image optimization
- Lazy-loaded UI where appropriate
- Reusable components
- Memoized derived state where beneficial
- Pagination for large datasets
- Optimized database queries on the backend

---

# 🛡️ Security

Security considerations include:

- JWT authentication
- HTTP cookie-based token handling
- Protected routes
- Role-based authorization
- Server-side validation
- Zod schemas
- API request validation
- File type validation
- File size restrictions
- OAuth state validation
- Payment verification
- Protected backend endpoints

Never expose private credentials through:

```text
NEXT_PUBLIC_*
```

Only values that are safe to expose to the browser should use the `NEXT_PUBLIC_` prefix.

---

# 🧪 Development Principles

The project follows several principles:

### Type Safety

TypeScript is used throughout the application to reduce runtime errors and improve developer experience.

### Reusable Components

Common UI patterns are extracted into reusable components instead of being duplicated across pages.

### Schema Validation

Zod is used to validate important application data and form input.

### Server State Management

TanStack Query handles API/server state, caching, loading states, and mutations.

### Client State Management

Zustand is used for application-level client state such as authentication/session state.

### Separation of Concerns

The application separates:

```text
UI
↓
Components
↓
Hooks
↓
Actions / API Client
↓
Backend API
↓
Database
```

---

# 📦 Main Dependencies

Some of the major dependencies used by the project:

```text
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
TanStack Query
TanStack Table
Zustand
Immer
Axios
Zod
React Hook Form
JWT
Cloudinary
Stripe
Recharts
React Easy Crop
Lucide React
```

---

# 🌐 Deployment

The frontend can be deployed to platforms that support Next.js applications.

Before deploying, configure production environment variables for:

- Backend API
- Cloudinary
- Stripe
- Google OAuth
- Authentication/session configuration

The backend API and frontend should use the correct production domains and HTTPS configuration.

---

# 🗂️ Recommended Git Workflow

Create a feature branch:

```bash
git checkout -b feature/property-search
```

Commit changes:

```bash
git add .
git commit -m "feat: improve property search"
```

Push the branch:

```bash
git push origin feature/property-search
```

Recommended commit prefixes:

```text
feat:
fix:
refactor:
perf:
style:
docs:
test:
chore:
```

---

# 🤝 Contributing

Contributions are welcome.

Before submitting a pull request:

1. Create a dedicated branch.
2. Keep changes focused.
3. Follow the existing TypeScript and component patterns.
4. Run linting.
5. Verify the production build.
6. Test affected functionality.
7. Write a clear commit message.
8. Open a pull request with a concise description of the changes.

---

# 🛣️ Roadmap

Potential future improvements include:

- [ ] Advanced property recommendations
- [ ] Map-based property discovery
- [ ] Real-time rental-request notifications
- [ ] Real-time messaging between tenants and landlords
- [ ] Saved/favorite properties
- [ ] Advanced landlord analytics
- [ ] Property comparison
- [ ] Improved search ranking
- [ ] Notification center
- [ ] More advanced payment management
- [ ] Automated rental/lease workflows
- [ ] Mobile application

---

# 📸 Project Screenshots

Add application screenshots here as the UI becomes finalized.

Recommended screenshots:

```text
Home Page
Property Listing
Property Details
Property Gallery
Tenant Dashboard
Landlord Dashboard
Admin Dashboard
Authentication
Payment
```

Example:

```md
![Rent Nest Home](./docs/screenshots/home.png)
```

---

# 📄 License

This project is currently private and intended for development and educational purposes.

Add an appropriate open-source license here if the repository becomes public for external contributions.

---

# 👨‍💻 Author

**Polas Chandra Barmon**

Full-stack developer building **Rent Nest** with modern TypeScript technologies.

### Built With

```text
Next.js + React + TypeScript
        +
Tailwind CSS + shadcn/ui
        +
TanStack Query + Zustand
        +
Express + Prisma + PostgreSQL
        +
Cloudinary + Stripe
```

---

## ⭐ Rent Nest

> **Find a place. Find your next home.**

Built with ❤️ using modern web technologies.
