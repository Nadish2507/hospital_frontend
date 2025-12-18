# Hospital Management System - Frontend

A React-based frontend application for the Hospital Management System built with Vite.

## Features

- **Patient Dashboard**: Book appointments, view medical history, manage profile
- **Doctor Dashboard**: View appointments, manage patient records
- **Admin Dashboard**: Manage doctors, patients, and pharmacy
- **Authentication**: Secure login and registration system
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React 18
- Vite
- React Router
- Context API for state management
- CSS3 for styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Nadish2507/Hospital_Management_frontend.git
cd Hospital_Management_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React Context providers
├── pages/          # Page components
│   ├── admin/      # Admin dashboard pages
│   ├── auth/       # Authentication pages
│   ├── doctor/     # Doctor dashboard pages
│   └── patient/    # Patient dashboard pages
├── routes/         # Route protection components
├── services/       # API and service functions
└── mock/           # Mock data for development
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.