# EcommerceApp

A modern, scalable e-commerce application built with Angular 19, featuring a clean architecture, state management with NgRx, and a comprehensive design system.

## Features

- **Product Catalog**: Browse products with filtering and pagination
- **Product Details**: View detailed product information with quantity selection
- **Shopping Cart**: Add/remove items, adjust quantities, and view cart totals
- **Authentication**: User login with JWT-based authentication
- **Responsive Design**: Mobile-first, responsive UI across all devices
- **Real-time Cart Updates**: Cart state synchronized across the application
- **Breadcrumb Navigation**: Context-aware navigation throughout the app

## Architecture

### Domain-Driven Design (DDD)

The application follows DDD principles with a clear separation of concerns. The codebase is organized into bounded contexts:

- **Features**: Independent domain modules (auth, products-list, product-details, cart)
- **Core**: Shared business logic, API infrastructure, guards, and base facades
- **Shared**: Reusable UI components and utilities
- **Common**: Application-wide constants and helper functions

Each feature module contains:
- **data-access**: NgRx store, services, repositories, models, and endpoints
- **components**: Feature-specific UI components
- **routes**: Feature routing configuration

### Design Patterns

#### 1. Facade Pattern
- Simplifies interaction with NgRx store
- Provides a clean API for components
- Encapsulates complex state management logic
- Each feature has its own facade exposing observables and action methods

#### 2. Repository Pattern
- Abstracts data access logic
- Provides a consistent interface for data operations
- Uses class-transformer for DTO mapping
- Separates data fetching from business logic

#### 3. Singleton Services
- Services provided at root level for application-wide state
- Ensures single instance across the application
- Used for shared functionality like authentication and HTTP services

#### 4. Smart/Dumb Components
- **Smart components** (pages): Manage state and business logic
- **Dumb components**: Pure presentation components with inputs/outputs
- Clear separation of concerns for better testability

### State Management with NgRx

The application uses NgRx for predictable state management with a global store containing:
- **auth**: Authentication state
- **products**: Product list state
- **cart**: Shopping cart state
- **productDetails**: Product details state

#### Key Concepts

- **Actions**: Type-safe action creators for all state changes
- **Reducers**: Pure functions that handle state updates
- **Effects**: Handle side effects like API calls and localStorage operations
- **Selectors**: Memoized state queries for optimal performance
- **DevTools Integration**: Redux DevTools for debugging and time-travel

The flow follows a unidirectional data pattern: Component → Facade → Action → Effect → API → Action → Reducer → Selector → Component

### Styling Architecture

#### BEM (Block Element Modifier)

All components follow BEM naming convention for maintainable and scalable CSS:
- **Block**: Independent component (e.g., `.product-card`)
- **Element**: Part of a block (e.g., `.product-card__title`)
- **Modifier**: Variation of a block (e.g., `.product-card--featured`)

#### OOCSS (Object-Oriented CSS)

Separation of structure and skin through:
- **Structure classes**: Layout and positioning (e.g., `.counter`, `.layout`)
- **Utility classes**: Visual styling (e.g., `.text-gray-600`, `.bg-gray-50`, `.fw-bold`)
- Promotes reusability and reduces CSS duplication

#### Design System

Centralized design tokens organized in the styles folder:
- **Colors**: CSS custom properties for consistent color palette
- **Z-indexes**: Predefined z-index scale for layering
- **Components**: Global component styles for buttons and form elements

### Code Quality Practices

- **TypeScript Strict Mode**: Full type safety across the codebase
- **OnPush Change Detection**: Optimized performance with immutable state
- **Signals**: Modern reactive primitives for local component state
- **Path Aliases**: Clean imports using `@/` prefix
- **Standalone Components**: Modern Angular architecture without NgModules
- **Semantic HTML**: Proper use of semantic elements for accessibility and SEO

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## Building

To build the project:

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

## Tech Stack

- **Framework**: Angular 19
- **State Management**: NgRx (Store, Effects, Entity)
- **UI Components**: Angular Material
- **Styling**: SCSS with BEM + OOCSS methodologies
- **HTTP Client**: Angular HttpClient with interceptors
- **Routing**: Angular Router with guards
- **Forms**: Reactive Forms
- **Data Transformation**: class-transformer
- **Change Detection**: OnPush with Signals

## Additional Resources

- [Angular CLI Overview](https://angular.dev/tools/cli)
- [NgRx Documentation](https://ngrx.io)
- [Angular Material](https://material.angular.io)
- [BEM Methodology](http://getbem.com/)

