# PESU AYUSHMAAN - React Application

A comprehensive health assessment and monitoring system built with React.

## Features

- User selection and management
- Dashboard for user overview
- Multi-domain health assessments (Physical, Mental, Cognitive, Biomarkers)
- Comprehensive reporting with scores and recommendations
- Local storage for data persistence

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── DomainAssessment.jsx
├── pages/               # Page components
│   ├── UserSelect.jsx
│   ├── Dashboard.jsx
│   ├── Questionnaire.jsx
│   ├── PhysicalAssessment.jsx
│   ├── MentalAssessment.jsx
│   ├── CognitiveAssessment.jsx
│   ├── BiomarkersAssessment.jsx
│   └── Reports.jsx
├── utils/               # Utility functions
│   └── localStorage.js
├── App.jsx              # Main app component with routing
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Technologies Used

- React 18.2.0
- React Router DOM 6.20.0
- Vite 5.0.0

## Routes

- `/` - User selection page
- `/dashboard` - User dashboard
- `/questionnaire` - Assessment hub
- `/physical` - Physical health assessment
- `/mental` - Mental health assessment
- `/cognitive` - Cognitive health assessment
- `/biomarkers` - Biomarkers assessment
- `/reports` - Assessment reports

## Notes

- All data is stored in browser localStorage
- User information is passed via URL query parameters
- Logo image should be placed in `public/logo.png`

