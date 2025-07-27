# Enterprise App

A full-stack enterprise application built with a modern monorepo architecture featuring web and mobile applications with shared packages.

## 🏗️ Architecture

This monorepo contains:

- **Web App** (`apps/web`) - Next.js application with TypeScript
- **Mobile App** (`apps/mobile`) - React Native/Expo application
- **Shared Packages**:
  - `@enterprise/ui` - Shared UI components built with shadcn/ui
  - `@enterprise/db` - Database schema and client (Drizzle ORM)
  - `@enterprise/trpc` - Type-safe API layer
  - `@enterprise/eslint-config` - Shared ESLint configuration
  - `@enterprise/typescript-config` - Shared TypeScript configuration

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm

### Installation

```bash
# Clone and install dependencies
pnpm install

# Set up the database
pnpm db:setup
```

### Development

```bash
# Start all development servers
pnpm dev

# Start specific applications
pnpm --filter @enterprise/web dev    # Web app
pnpm --filter @enterprise/mobile dev # Mobile app
```

## 📱 Applications

### Web Application
- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Port**: http://localhost:3000

### Mobile Application
- **Framework**: React Native + Expo
- **Navigation**: Expo Router
- **Features**: Cross-platform iOS/Android support

## 📦 Available Scripts

### Root Level Commands

```bash
# Development
pnpm dev              # Start all development servers
pnpm build            # Build all applications
pnpm test             # Run all tests
pnpm test:watch       # Run tests in watch mode

# Database
pnpm db:setup         # Initialize database
pnpm db:push          # Push schema changes
pnpm db:studio        # Open Drizzle Studio
pnpm db:generate      # Generate database migrations

# Code Quality
pnpm lint             # Lint all packages
pnpm format           # Format code with Prettier
pnpm typecheck        # Type check all packages

# Storybook
pnpm storybook        # Start Storybook for all packages
pnpm storybook:web    # Web Storybook
pnpm storybook:ui     # UI package Storybook

# Utilities
pnpm clean            # Clean node_modules and build artifacts
pnpm add-component    # Add shadcn/ui component to web app
```

## 🎨 UI Components

### Adding Components

Add shadcn/ui components to your web app:

```bash
pnpm add-component button
# or from root:
pnpm dlx shadcn@latest add button -c apps/web
```

Components are automatically placed in `packages/ui/src/components` and can be shared across applications.

### Using Components

Import components from the shared UI package:

```tsx
import { Button } from "@enterprise/ui/components/button"
import { Card, CardContent } from "@enterprise/ui/components/card"

export function MyComponent() {
  return (
    <Card>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## 🔧 Development Tools

- **Turborepo** - Build system and task runner
- **TypeScript** - Type safety across all packages
- **ESLint** - Code linting with shared configuration
- **Prettier** - Code formatting
- **Jest** - Unit testing
- **Storybook** - Component development and documentation

## 📁 Project Structure

```
enterprise-app/
├── apps/
│   ├── web/          # Next.js web application
│   └── mobile/       # React Native/Expo mobile app
├── packages/
│   ├── ui/           # Shared UI components (shadcn/ui)
│   ├── auth/         # Authentication utilities
│   ├── db/           # Database schema and client
│   ├── trpc/         # API layer
│   ├── env/          # Environment validation
│   ├── eslint-config/    # Shared ESLint config
│   └── typescript-config/ # Shared TypeScript config
└── package.json      # Root package.json with workspace scripts
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `pnpm test`
4. Check linting: `pnpm lint`
5. Format code: `pnpm format`
6. Submit a pull request

## 📄 License

This project is private and proprietary.
