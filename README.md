# 🌱 Nadi - Carbon Footprint Tracker

A modern, responsive carbon footprint tracking application that helps users monitor, reduce, and offset their environmental impact. Built with cutting-edge web technologies and designed for both mobile and desktop experiences.

## ✨ Features

### 🔐 Authentication & Onboarding
- **User Authentication**: Secure sign-in/sign-up with form validation
- **Onboarding Flow**: Personalized carbon footprint baseline setup
- **Profile Management**: User profile with customizable settings

### 📊 Carbon Tracking
- **Dashboard**: Real-time carbon footprint visualization
- **Data Insights**: Interactive charts and analytics
- **Progress Tracking**: Monitor reduction goals and achievements
- **AI-Powered Insights**: Smart recommendations for carbon reduction

### 🎨 User Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Dark/Light Mode**: Adaptive theming (coming soon)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with enhanced IDE support
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling

### UI Components
- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful, customizable icons
- **Recharts** - Composable charting library for data visualization
- **Sonner** - Toast notifications with smooth animations

### Backend & Services
- **Supabase** - Open-source Firebase alternative
  - Authentication & user management
  - PostgreSQL database
  - Real-time subscriptions
  - Row-level security

### Development Tools
- **ESLint** - Code linting and quality checks
- **PostCSS** - CSS processing and optimization
- **VS Code Integration** - Debugging and development support

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### 🚀 Quick Start

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd nadi
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

### 🏗️ Build Commands

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint checks
```

## 📁 Project Structure

```
nadi/
├── 📁 components/              # React components
│   ├── 📁 ui/                 # Reusable UI components (Radix UI)
│   ├── 📄 MainScreen.tsx      # Landing page with responsive design
│   ├── 📄 SignInScreenSimple.tsx   # Authentication screens
│   ├── 📄 SignUpScreenSimple.tsx   # Responsive sign-up form
│   ├── 📄 Dashboard.tsx       # Main dashboard with charts
│   ├── 📄 OnboardingFlow.tsx  # User onboarding experience
│   └── 📄 Profile.tsx         # User profile management
├── 📁 styles/                 # Global styles and utilities
│   └── 📄 globals.css         # Tailwind base + custom styles
├── 📁 .vscode/               # VS Code configuration
│   ├── 📄 launch.json        # Debug configurations
│   ├── 📄 tasks.json         # Build tasks
│   └── 📄 settings.json      # Editor settings
├── 📄 App.tsx                # Main app component with routing
├── 📄 main.tsx               # Application entry point
├── 📄 index.html             # HTML template
├── 📄 vite.config.ts         # Vite configuration
├── 📄 tailwind.config.js     # Tailwind CSS configuration
├── 📄 tsconfig.json          # TypeScript configuration
└── 📄 package.json           # Dependencies and scripts
```

## 🎨 Design System

### Responsive Breakpoints
- **Mobile**: `< 640px` - Touch-optimized interface
- **Tablet**: `640px - 1024px` - Scaled layouts
- **Desktop**: `1024px+` - Split-screen layouts with enhanced branding
- **Large Desktop**: `1280px+` - Maximum content width

### Color Palette
- **Primary**: Green (#22C31B) - Environmental theme
- **Secondary**: Blue gradients - Clean, modern feel
- **Neutral**: Grays and whites - Balanced contrast
- **Accent**: Green variations - Interactive elements

## 🔧 Development

### VS Code Integration
The project includes complete VS Code configuration:
- **Debugging**: Launch configurations for easy testing
- **Tasks**: Integrated build and dev commands
- **Settings**: Optimized for React/TypeScript development

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Comprehensive linting rules
- **Prettier**: Consistent code formatting (via VS Code)

## 🌍 Environment Setup

### Supabase Configuration
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Update the `.env.local` file with your credentials
4. The app handles authentication and data storage automatically

### Deployment
The app is ready for deployment on:
- **Vercel** (recommended for Vite projects)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Figma Design**: Original design concepts
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling approach
- **Supabase**: Backend-as-a-Service platform
