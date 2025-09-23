# Task-Dash – SaaS Task Management Dashboard

## ⏱️ Development Time

Total time spent: **7 hours 30 minutes**

Time breakdown:

- Initial setup and project structure: 1h
- Core functionality and state management: 2h
- UI Components and styling: 2h 30m
- Authentication and user management: 1h
- Testing and bug fixes: 1h

## 🏗️ Getting Started

1. Install dependencies:

```bash
# Using Yarn (recommended)
yarn install


```

2. Run the development server:

```bash
# Using Yarn (recommended)
yarn dev


```

The application will be available at `http://localhost:3000`

This is a **Next.js 15** project built with modern frontend tooling (React, Tailwind CSS, Zustand, and shadcn/ui).  
It implements a task management dashboard with authentication, protected routes, CRUD operations, and role-based UI.

---

## 🚀 Features

- **Authentication**

  - Login page with mock API authentication
  - Protected routes (redirects to login if not logged in)
  - Persistent auth state (Zustand + localStorage)

- **Dashboard**

  - Fetches mock API data
  - Displays key metrics with charts and tables (Recharts)
  - Responsive layout with sidebar navigation

- **CRUD**

  - Create, Read, Update, Delete operations for **Users** (mock data store)
  - Instant UI updates using Zustand state management

- **Table with Filters**

  - Search, filter, and sort user data
  - Responsive and keyboard accessible

- **Profile Page**

  - Editable user profile (name, email, bio)
  - Optimistic UI updates with toast notifications

- **Bonus**
  - **Role-based UI** – Admin vs Normal User see different navigation and pages

---

## 🛠️ Tech Stack

- **Next.js 15 (App Router)**
- **React 18**
- **TypeScript**
- **Tailwind CSS** (utility-first styling)
- **shadcn/ui** (accessible headless components)
- **Zustand** (global state management)
- **Recharts** (charts & graphs)
- **Sonner** (toast notifications)

---

## 📝 Additional Notes

- Built with modern best practices and TypeScript
- Fully responsive design for all screen sizes
- Role-based access control for admin and user views
- Optimistic UI updates for better UX
- Comprehensive error handling and loading states
- Accessible components following WCAG guidelines
