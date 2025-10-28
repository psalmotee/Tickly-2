Tickly - Simple Ticket Management System

Tickly is a lightweight, modern web application designed for managing support tickets. It features separate user and admin dashboards and uses client-side local storage for persistence, making it an excellent starting point for learning Vue 3 and TypeScript.

 Features

User Dashboard: Users can create, view, and track the status of their submitted tickets.

Admin Dashboard: Administrators can view all tickets, filter them, and manage ticket status (open, in-progress, closed).

Authentication (Simulated): Basic login/logout functionality handled via a simple store (Pinia/Local Storage).

Type Safety: Built entirely with TypeScript for robust, error-free development.

Responsive Design: Styled using Tailwind CSS for a modern, mobile-first experience.

 Tech Stack

Framework: Vue 3 

Language: TypeScript

Build Tool: Vite

Routing: Vue Router

Styling: Tailwind CSS

Data Persistence: Browser's Local Storage (for simplicity)

 Getting Started

Prerequisites

You need to have Node.js and npm (or yarn/pnpm) installed on your machine.

Installation

Clone the repository:

git clone [Your Repository URL]
cd tickly


Install dependencies:

npm install
# or yarn install


Run the development server:

npm run dev


The application will be available at http://localhost:5173/ (or similar port).

 Directory Structure

.

├── public 
├── src 
│   ├── assets 
│   ├── components
│   │   ├── AdminHeader.vue
│   │   ├── AdminStats.vue
│   │   ├── AdminTicketList.vue
│   │   ├── AdminUsersList.vue
│   │   ├── CreateTicketForm.vue
│   │   ├── DashboardHeader.vue
│   │   ├── DeleteConfirmationModal.vue
│   │   ├── EditTicketForm.vue
│   │   ├── FormError.vue
│   │   ├── FormSuccess.vue
│   │   ├── LoginForm.vue
│   │   ├── Modal.vue
│   │   ├── SignupForm.vue
│   │   ├── StatsCards.vue
│   │   ├── TicketCard.vue
│   │   └── TicketList.vue
│   ├── lib
│   │   ├── admin.ts
│   │   ├── auth.ts
│   │   ├── pinnaAuth.ts
│   │   ├── tickets.ts
│   │   └── validation.ts
│   ├── plugins
│   │   └── toast.ts
│   ├── router
│   │   └── index.ts
│   ├── views
│   │   ├── Admin
│   │   │   ├── AdminDashboard.vue
│   │   │   ├── AdminTicketsPage.vue
│   │   │   └── AdminUsersPage.vue
│   │   ├── Auth
│   │   │   ├── Login.vue
│   │   │   └── Signup.vue
│   │   ├── LandingPage
│   │   │   ├── CTA.vue
│   │   │   ├── Features.vue
│   │   │   ├── Footer.vue
│   │   │   ├── Header.vue
│   │   │   └── Hero.vue
│   │   └── Users
│   │       ├── TicketPage.vue
│   │       └── UsersDashboard.vue
│   ├── HomePage.vue
│   ├── App.vue
│   ├── main.ts
│   └── style.css
├── .gitignore 
├── index.html 
├── package-lock.json 
├── package.json 
├── README.md 
├── tsconfig.app.json 
├── tsconfig.json 
├── tsconfig.node.json 
└── vite.config.ts

## Usage

### Creating an Account

1. Click "Sign up" on the landing page
2. Fill in your name, email, and password
3. Confirm your password and submit
4. You'll be automatically logged in and redirected to the dashboard

### Logging In

1. Click "Log in" on the landing page
2. Enter your email and password
3. Click "Sign in" to access your dashboard

### Managing Tickets

1. From the dashboard, click "Go to Tickets" or navigate to the Tickets page
2. Click "New Ticket" to create a ticket
3. Fill in the title, description, and priority
4. Click "Create Ticket" to save
5. Edit tickets by clicking the edit icon
6. Delete tickets by clicking the delete icon
7. Update ticket status and priority from the edit form

### Dashboard

The dashboard displays:
- **Total Tickets**: Count of all your tickets
- **Open**: Tickets waiting to be started
- **In Progress**: Tickets currently being worked on
- **Closed**: Completed tickets

## Form Validation

All forms include comprehensive validation:

### Login Form
- Email must be a valid email address
- Password must be at least 6 characters

### Signup Form
- Name must be 2-100 characters
- Email must be a valid email address
- Password must be at least 6 characters
- Passwords must match

### Ticket Forms
- Title must be 3-200 characters
- Description must be 10-2000 characters
- Priority is required (Low, Medium, High)
- Status is required (Open, In Progress, Closed)

## Data Storage

This application uses browser localStorage for data persistence:
- User sessions are stored in `ticketflow_session`
- Tickets are stored in `ticketflow_tickets`

**Note**: Data is stored locally in the browser and will be lost if browser data is cleared.
## Styling

The application uses Tailwind CSS v4 with a custom design token system:

### Color Scheme
- **Primary**: Blue (#3b82f6) - Main brand color
- **Accent**: Purple (#8b5cf6) - Secondary accent
- **Status Colors**:
  - Open: Amber
  - In Progress: Blue
  - Closed: Green

### Design Tokens
All colors are defined as CSS variables in `style.css` for easy theming and consistency.

## Accessibility

The application includes:
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly forms

## Troubleshooting

### Lost Data After Refresh
Data is stored in localStorage. If you clear your browser data, all tickets and sessions will be lost.

### Can't Login
Make sure you've created an account first. Use the demo credentials (demo@example.com / demo123) to test.

### Form Validation Errors
Check the error messages displayed below each field. They indicate what needs to be corrected.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.
