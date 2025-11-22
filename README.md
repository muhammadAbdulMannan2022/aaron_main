# Dashboard Application

A modern, feature-rich dashboard application built with React and Vite, designed for process efficiency tracking, KPI monitoring, and benchmarking.

## 🚀 Features

## 🚀 Features

### 📊 Advanced Dashboard
The core of the application is a powerful, interactive dashboard designed for deep process analysis and performance monitoring.

- **Process Efficiency Visualization**:
    - **Interactive Flowcharts**: Visualize actual process flows vs. "Happy Paths" using interactive node-based diagrams (powered by React Flow).
    - **Bottleneck Detection**: Automatically highlights process bottlenecks, dropouts, and loops with distinct visual indicators (red for bottlenecks, yellow for dropouts).
    - **Detailed Metrics**: Click on any process step to view granular data such as average duration, cost per hour, and occurrence counts.
    - **Path Filtering**: Filter the view to focus specifically on bottlenecks, loops, or the ideal process flow.

- **KPI Dashboard**:
    - **Customizable Widgets**: Build your own dashboard layout with drag-and-drop widgets including Line Charts, Bar Charts, Pie Charts, Progress Trackers, and Key Metrics cards.
    - **Dynamic Filtering**: Filter KPI data by date range, process variants, and cycle time to isolate specific performance periods or scenarios.
    - **Layout Management**: Create, save, and switch between multiple dashboard layouts tailored for different stakeholders or analysis goals.

- **Benchmark Analysis**:
    - **Project Comparison**: Compare your current project's performance against historical benchmarks or other related projects.
    - **Report Generation**: Generate detailed reports that highlight deviations and performance gaps.
    - **CSV Integration**: Upload external datasets (CSV) to run ad-hoc benchmark comparisons.

- **🤖 AI Support Assistant**:
    - **Process Simulation**: Simulate changes to your process flow (e.g., "What if we reduce the duration of step X?") and instantly see the projected impact on time and cost.
    - **Interactive Chat**: Chat with an AI assistant to get insights about your process flow, potential improvements, and simulation results.
    - **Cost & Time Estimation**: Get real-time estimates on cost savings and cycle time reduction based on simulated changes.

### 🔐 Authentication & User Management
- **Secure Access**: Full authentication suite including Login, Signup, and OTP verification.
- **Profile Management**: Manage user profiles and settings.
- **Password Recovery**: Secure "Forgot Password" and "Change Password" flows.

### 📁 Project Management
- **Centralized Hub**: View and manage all your analysis projects in one place.
- **Smart Filtering**: Filter projects by date, department, or team.
- **Data Import**: Easy CSV upload to start new analysis projects.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) (v19) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & RTK Query
- **Routing**: [React Router](https://reactrouter.com/) (v7)
- **Backend / Auth**: [Firebase](https://firebase.google.com/)
- **Visualization**:
    - [Recharts](https://recharts.org/) for charts
    - [React Flow](https://reactflow.dev/) for node-based diagrams
- **Animations**: [GSAP](https://greensock.com/gsap)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Utilities**: `react-toastify` for notifications, `flatpickr` for date picking.

## 📦 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd aaron_main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add necessary Firebase and API configuration keys.

### Running Development Server

Start the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

Build the application for production deployment:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```
src/
├── firebase/       # Firebase configuration and services
├── helpers/        # Helper functions and utilities
├── hooks/          # Custom React hooks
├── pages/          # Application pages and layout components
│   ├── Auth/       # Authentication related pages (Login, Signup, etc.)
│   ├── Dashboard/  # Dashboard views (KPIs, Benchmarks, etc.)
│   └── landing/    # Landing page components
├── redux/          # Redux store setup and API slices
│   ├── api/        # API definitions (RTK Query)
│   └── auth/       # Authentication state management
├── router/         # React Router configuration
└── utils/          # General utility functions
```

## 📜 Scripts

- `dev`: Starts the development server.
- `build`: Builds the app for production.
- `lint`: Runs ESLint to check for code quality issues.
- `preview`: Previews the production build.
