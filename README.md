# FlightSearch - Google Flights

A responsive flight search application built with React, TypeScript, and Tailwind CSS. Search, filter, and compare flights with a modern, intuitive interface.

## ✈️ Features

- **Smart Flight Search**: Search flights by origin, destination, and travel dates
- **One-way & Round-trip**: Toggle between trip types with ease
- **Advanced Filtering**: Filter by price range, number of stops, airlines, and departure time
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Real-time Loading**: Beautiful loading states and error handling
- **Sky Scrapper API Integration**: Ready for real flight data integration

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + components
- **UI Components**: Material-UI icons,
- **API**: Sky Scrapper API (RapidAPI)
- **Build Tool**: Vite
- **State Management**: React hooks

## 📁 Project Structure

```
src/
├── components/
│   ├── flights/
│   │   ├── FlightSearchForm.tsx    # Main search form
│   │   ├── FlightCard.tsx          # Individual flight display
│   │   └── FlightFilters.tsx       # Filter sidebar
│   └── ui/                         # Reusable UI components
├── services/
│   └── flightService.ts           # API service layer
├── pages/
│   └── Index.tsx                  # Main page
└── hooks/                         # Custom React hooks
```

## 🛠️ Setup & Installation

1. **Install dependencies**
   ```bash
   npm install
   ```


2. **Start development server**
   ```bash
   npm run dev
   ```

### Mock Data

For development and testing, the app includes realistic mock flight data that simulates the API response structure.

## 🎨 Design System

The app uses a sky-blue themed design system inspired by travel and aviation:

- **Primary Colors**: Sky blue gradients (#3B82F6 variations)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Consistent spacing, shadows, and animations
- **Responsive**: Mobile-first design with desktop enhancements

## 🪝 Reusable Hooks Suggestions

- `useFlightSearch`: Encapsulate search logic and state
- `useFlightFilters`: Manage filter state and application
- `useDebounce`: Optimize search input handling
- `useFavorites`: Save and manage favorite flights

## 🔮 Future Enhancements

- **Price Alerts**: Notify users of price changes
- **Multi-city Trips**: Support complex itineraries

## 📱 Mobile Features

- Touch-optimized interactions
- Swipe gestures for flight cards
- Mobile-specific filters drawer
- Optimized performance on slower connections
