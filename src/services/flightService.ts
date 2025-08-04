
const API_URL = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails';
const HEADERS:any = {
  'X-Rapidapi-Key': import.meta.env.VITE_RAPIDAPI_KEY,
  'X-Rapidapi-Host': 'sky-scrapper.p.rapidapi.com',
};


export class FlightService {
 static async searchFlights(searchData) {
    try {
      const date = searchData.departureDate.toISOString().split("T")[0];

      const legs = encodeURIComponent(
        JSON.stringify([
          {
            origin: searchData.origin,     
            destination: searchData.destination,  
            date: date,            
          },
        ])
      );

      const params = new URLSearchParams({
        legs: legs,
        adults: "1",
        currency: "USD",
        locale: "en-US",
        market: "en-US",
        cabinClass: "economy",
        countryCode: "US",
      });

      const res = await fetch(`${API_URL}?${params}`, {
        method: 'GET',
        headers: HEADERS,
      });

      if (!res.ok) {
        throw new Error("Failed to fetch flights");
      }

      const json = await res.json();
      const flights = json.flights || [];

      const transformed = this.transformApiResponse(flights);

      return {
        success: true,
        data: transformed,
      };
    } catch (error) {
      console.error("Flight API Error:", error);
      return {
        success: false,
        error: "Unable to fetch flights at the moment.",
      };
    }
  }

  static transformApiResponse(data) {
    return data.map((flight, index) => ({
      id: index,
      price: flight.price || 0,
      airline: flight.airlineName || 'Unknown',
      stops: flight.stops || 0,
      duration: flight.duration || '',
      departure: {
        airport: flight.departureCity,
        time: flight.departureTime,
        date: flight.departureDate,
      },
      arrival: {
        airport: flight.arrivalCity,
        time: flight.arrivalTime,
        date: flight.arrivalDate,
      },
    }));
  }

  static filterFlights(flights, filters) {
    if (!flights || !Array.isArray(flights)) return [];

    return flights.filter((flight) => {
      const withinPrice = !filters.maxPrice || flight.price <= filters.maxPrice;
      const matchesStops =
        !filters.stops ||
        filters.stops.length === 0 ||
        filters.stops.includes(flight.stops);
      const matchesAirlines =
        !filters.airlines ||
        filters.airlines.length === 0 ||
        filters.airlines.includes(flight.airline);
      return withinPrice && matchesStops && matchesAirlines;
    });
  }

  static getAvailableAirlines(flights) {
    if (!flights || !Array.isArray(flights)) return [];
    return [...new Set(flights.map((f) => f.airline).filter(Boolean))];
  }
}
