# GadgetBazar Frontend

React.js frontend application for the GadgetBazar e-commerce platform.

## Features

- **Authentication**: Firebase Auth with Google OAuth
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Product Catalog**: Browse products by categories with search
- **Shopping Cart**: Add/remove items with quantity management
- **User Dashboard**: Order history and profile management
- **Admin Panel**: Product and order management (admin users)

## Tech Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling and responsive design
- **Firebase Auth** - Authentication and user management
- **React Router** - Client-side routing
- **React Testing Library** - Testing framework

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Authentication enabled

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Firebase configuration
```

3. Start development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Start development server
- `npm test` - Run test suite
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (not recommended)

## Project Structure

```
src/
├── components/
│   ├── auth/           # Login/Signup components
│   ├── common/         # Shared components (Header, Footer)
│   ├── home/           # Homepage components
│   └── ...
├── config/
│   └── firebase.js     # Firebase configuration
├── styles/
│   └── index.css       # Global styles and Tailwind imports
├── App.js              # Main app component
└── index.js            # Entry point
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# API Configuration
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage --watchAll=false
```

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `build/` directory.

## API Integration

The frontend communicates with the backend API according to the [API Contract](../API_CONTRACT.md). 

Key integration points:
- Authentication token management
- Product data fetching
- Cart and wishlist operations
- Order management

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and add tests
3. Ensure all tests pass: `npm test`
4. Submit a pull request

## Deployment

The frontend is automatically deployed when changes are merged to:
- `develop` branch → Staging environment
- `main` branch → Production environment

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting with React.lazy()
- Image optimization
- Bundle size monitoring
- Lighthouse performance scores > 90