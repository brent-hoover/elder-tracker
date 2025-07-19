# Elder Tracker Frontend

Vue 3 + TypeScript frontend application for the Elder Tracker system.

## Features

- Vue 3 with Composition API
- TypeScript for type safety
- Vue Router for navigation
- Pinia for state management
- Tailwind CSS for styling
- Axios for API calls
- Vite for fast development

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure the backend is running on http://localhost:3000

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:3001

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## Project Structure

```
src/
├── api/          # API service modules
├── assets/       # Static assets
├── components/   # Reusable Vue components
├── composables/  # Vue composables
├── router/       # Vue Router configuration
├── stores/       # Pinia stores
├── types/        # TypeScript type definitions
├── views/        # Page components
├── App.vue       # Root component
├── main.ts       # Application entry point
└── style.css     # Global styles with Tailwind
```

## Key Features

- **Authentication**: JWT-based authentication with login/register
- **Dashboard**: Overview of elders and recent status updates
- **Elder Management**: View and manage elderly individuals
- **Status Updates**: Create and view status updates for elders
- **Role-Based Access**: Admin users can manage users and elders
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS