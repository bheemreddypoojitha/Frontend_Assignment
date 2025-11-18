# 📦 Listings Manager

A responsive, accessible product catalog application built using React + TypeScript, based on the iGnosis Tech coding exercise.

## 💡 Key Features

### 🔍 Smart Search
* **Real-time search** with 300ms debouncing to reduce unnecessary API calls.
* **Clear button** for quick reset.
* **Accessible** with proper ARIA labels.

### 🏷️ Category Filtering
* Filter by **Electronics, Home, Clothing, Books**, or view all.
* Instant updates when selection changes.
* **Auto-reset**: Resets to page 1 automatically for better UX.

### 📊 Flexible Sorting
Four sorting options to help users find what they need:
* Name (A-Z / Z-A)
* Price (Low to High / High to Low)
* *Applied client-side for instant results.*

### 📄 Smart Pagination
* **Ellipsis display** for large page counts (prevents overcrowding).
* Previous/Next navigation.
* Direct page number access.
* **Smooth scroll** to top on page change.
* Fully keyboard accessible.

### 🎯 Product Details
* Clean, focused view of individual products.
* All information at a glance.
* Quick back navigation.
* Proper loading states so users never wonder what's happening.

### 🎨 Thoughtful UI States
* **Loading:** Spinner with helpful message.
* **Empty:** Context-aware messages ("No products found" vs "Try adjusting filters").
* **Error:** Clear error message with retry button.
* **Success:** Clean, readable product grid.

---

## 🏗️ Tech Stack

* **Core:** React + TypeScript
* **Build Tool:** Vite
* **Routing:** React Router
* **API Mocking:** MSW (Mock Service Worker)
* **Testing:** Vitest + Testing Library

---

## 📁 Project Structure

```bash
src/
├── features/
│   └── products/
│       ├── ProductList.tsx            # Main list component
│       ├── ProductList.css
│       ├── ProductList.test.tsx
│       ├── ProductDetails.tsx         # Detail view
│       ├── ProductDetails.css
│       ├── ProductDetails.test.tsx
│       └── components/                # Reusable components
│           ├── ProductCard.tsx
│           ├── Toolbar.tsx
│           ├── Pagination.tsx
│           ├── LoadingState.tsx
│           ├── EmptyState.tsx
│           └── ErrorState.tsx
├── mocks/
│   ├── handlers.ts                    # MSW API handlers
│   └── data/
│       └── products.json              # Mock data
├── types.ts                           # TypeScript types
└── App.tsx            
```

# Getting Started

Follow these steps to set up and run the project locally.

## 1. Install Dependencies
```bash
yarn install
```

## 2. One-time MSW Setup
Initialize the Mock Service Worker:
```bash
npx msw init public --save
```

## 3. Start the Application
Runs the app in development mode.  
Open http://localhost:5173 in your browser.
```bash
yarn dev
```

## 4. Run Tests
Launch the test runner in interactive watch mode.
```bash
yarn test
```

