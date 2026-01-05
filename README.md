# 🏡 Estate Agent Application

A modern, responsive React application for browsing, searching, and managing real estate property listings. Built with a focus on user experience, featuring advanced search filtering, drag-and-drop favourites, and interactive property details.

## ✨ Features

- **🔍 Advanced Property Search**: Filter properties by Location, Type (House/Flat), Price Range, Bedrooms, and Date Added.
- **🧩 Interactive Widgets**: 
  - Premium dropdowns powered by `react-select`.
  - Intuitive date selection using `react-datepicker`.
- **❤️ Drag-and-Drop Favourites**: Easily save properties by dragging them into your favourites list.
- **📄 Detailed Property Views**: Organized information using filtered tabs for Description, Floor Plans, and Google Maps (`react-tabs`).
- **📱 Fully Responsive**: Optimized layouts for Desktop, Tablet, and Mobile devices.

## 🛠️ Tech Stack

- **Core**: React 19, Vite
- **Routing**: React Router DOM
- **UI Libraries**: 
  - `react-select` (Dropdowns)
  - `react-datepicker` (Date Inputs)
  - `react-tabs` (Tabbed Content)
- **Testing**: Vitest, React Testing Library
- **Styling**: CSS3, Responsive Flexbox/Grid

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (or unzip the project):
   ```bash
   cd estate-agent
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will typically be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build:

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
├── Components/       # React Components
│   ├── FavoritesPage/    # Favourites management view
│   ├── Footer/           # Global footer
│   ├── Home/             # Landing page
│   ├── Navbar/           # Global navigation
│   ├── PropertyDetail/   # Individual property details (Tabs, Gallery)
│   └── PropertySearch/   # Search results & Filtering (Drag & Drop)
├── Data/             # Static property JSON data
├── App.jsx           # Main application layout & State management
└── main.jsx          # Entry point
```

## 🧪 Running Tests

Run the test suite using Vitest: created 5 test cases and use those testcases for testing.

```bash
npm test
```

## 📝 License

student id - w2120421
student name - RWWM Samitha Wijekoon
5COSC026C.1 Advanced Client-Side Development

