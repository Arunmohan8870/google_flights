# FlightSearch - Google Flights Clone

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
- **Styling**: Tailwind CSS + shadcn/ui components
- **UI Components**: Material-UI icons, Lucide React
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

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd flight-search
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional for production)
   ```bash
   VITE_RAPIDAPI_KEY=your_sky_scrapper_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 API Integration

The app is configured to work with Sky Scrapper API. To use real flight data:

1. Sign up for [RapidAPI](https://rapidapi.com/)
2. Subscribe to [Sky Scrapper API](https://rapidapi.com/apiheya/api/sky-scrapper/)
3. Add your API key to environment variables
4. The app will automatically switch from mock data to real API calls

### Mock Data

For development and testing, the app includes realistic mock flight data that simulates the API response structure.

## 🎨 Design System

The app uses a sky-blue themed design system inspired by travel and aviation:

- **Primary Colors**: Sky blue gradients (#3B82F6 variations)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Consistent spacing, shadows, and animations
- **Responsive**: Mobile-first design with desktop enhancements

## 🧪 Testing Ideas

- **Unit Tests**: Component rendering, API service functions
- **Integration Tests**: Search flow, filter interactions
- **E2E Tests**: Complete user journey from search to selection
- **Performance Tests**: API response times, component rendering

## 🪝 Reusable Hooks Suggestions

- `useFlightSearch`: Encapsulate search logic and state
- `useFlightFilters`: Manage filter state and application
- `useLocalStorage`: Persist user preferences
- `useDebounce`: Optimize search input handling
- `useFavorites`: Save and manage favorite flights

## 🔮 Future Enhancements

- **User Authentication**: Save searches and preferences
- **Price Alerts**: Notify users of price changes
- **Multi-city Trips**: Support complex itineraries
- **Seat Selection**: Visual seat maps
- **Booking Integration**: Complete purchase flow
- **Loyalty Programs**: Integrate airline reward systems

## 📱 Mobile Features

- Touch-optimized interactions
- Swipe gestures for flight cards
- Mobile-specific filters drawer
- Optimized performance on slower connections

## 🚀 Deployment

Deploy easily with:

- **Vercel**: `npm run build` + Vercel deployment
- **Netlify**: Direct GitHub integration
- **AWS/Azure**: Standard React deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.
