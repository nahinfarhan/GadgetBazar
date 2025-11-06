# GadgetBazar - E-commerce Platform

A modern e-commerce platform for electronics and gadgets targeting the Bangladeshi market.

## Team Structure

- **Frontend Developer**: React.js application with Firebase authentication
- **Backend Developer**: API development and database management  
- **QA/Testing**: Automated and manual testing
- **DevOps**: CI/CD, deployment, and infrastructure

## Project Structure

```
gadgetbazar/
├── .github/workflows/     # CI/CD workflows
├── frontend/             # React.js application
├── backend/              # API server
├── docs/                 # Project documentation
├── API_CONTRACT.md       # API specification
└── README.md            # This file
```

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

### Backend Setup

```bash
cd backend
# Backend setup instructions will be added by backend developer
```

### Full Development Setup

1. Clone the repository:
```bash
git clone https://github.com/nahinfarhan/GadgetBazar.git
cd GadgetBazar
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
# Backend setup commands
```

4. Set up environment variables:
```bash
# Copy example files and fill in your values
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

5. Start development servers:
```bash
# Terminal 1 - Frontend
cd frontend && npm start

# Terminal 2 - Backend  
cd backend && npm start
```

## Development Workflow

### GitHub Flow Process

1. **Create Issue**: Create a GitHub issue for your task
2. **Create Branch**: `git checkout -b feature/your-feature-name`
3. **Develop**: Write code and commit regularly
4. **Push**: `git push origin feature/your-feature-name`
5. **Pull Request**: Open PR and request review
6. **Review**: Team member reviews and approves
7. **Merge**: Merge to main branch
8. **Deploy**: Automatic deployment (if configured)

### Branch Naming Convention

- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Critical production fixes
- `docs/documentation-update` - Documentation changes

### Commit Message Format

```
type(scope): description

Examples:
feat(auth): add Google OAuth login
fix(cart): resolve quantity update bug
docs(api): update authentication endpoints
test(user): add user registration tests
```

## Technology Stack

### Frontend
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Routing**: React Router
- **Testing**: Jest + React Testing Library
- **Build Tool**: Create React App

### Backend
- **Runtime**: Node.js (to be confirmed by backend developer)
- **Database**: PostgreSQL (as per SRS requirements)
- **Authentication**: Firebase Admin SDK
- **API Documentation**: Swagger/OpenAPI

### DevOps
- **CI/CD**: GitHub Actions
- **Hosting**: TBD
- **Monitoring**: TBD

## API Integration

Before starting development, ensure you review the [API Contract](./API_CONTRACT.md) for endpoint specifications and data formats.

## Testing Strategy

- **Unit Tests**: Each component/function
- **Integration Tests**: API endpoints and user flows
- **E2E Tests**: Critical user journeys
- **Manual Testing**: QA validation

## Contributing

1. Check existing issues or create a new one
2. Fork the repository (for external contributors)
3. Create a feature branch
4. Make your changes
5. Add tests for new functionality
6. Ensure all tests pass
7. Submit a pull request

## Environment Variables

### Frontend (.env)
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

### Backend (.env)
```
# To be defined by backend developer
```

## Deployment

- **Frontend**: Deployed to [Platform TBD]
- **Backend**: Deployed to [Platform TBD]
- **Database**: [Platform TBD]

## Support

For questions or issues:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Contact team members via [communication channel]

## License

This project is private and proprietary.