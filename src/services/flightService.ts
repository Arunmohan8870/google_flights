// src/services/FlightService.ts
import { useEffect } from "react";
import mockData from "../data/flights.json";

const api = () => {
  useEffect(() => {
    const response = fetch(
      "https://api.aviationstack.com/v1/flights?access_key=3fc6207d36d250f12cff2ab5567578af"
    );
  }, []);
};

export class FlightService {
  // Simulate API search
  static async searchFlights(searchData) {
    try {
      const date = searchData.departureDate.toISOString().split("T")[0];


      const results = mockData.filter((flight) => {
        const departureCity = flight.from?.toLowerCase();
        const arrivalCity = flight.to?.toLowerCase();
        const flightDate = flight.departureDate?.split("T")[0];
        console.log(departureCity);

        return (
          departureCity?.includes(searchData.origin.toLowerCase()) &&
          arrivalCity?.includes(searchData.destination.toLowerCase()) &&
          flightDate === date
        );
      });
      console.log(results);

      const transformed = this.transformApiResponse(results);

      return {
        success: true,
        data: transformed,
      };
    } catch (error) {
      console.error("Error in flight search:", error);
      return {
        success: false,
        error: "Failed to fetch flights",
      };
    }
  }

  static transformApiResponse(data) {
    return data.map((flight) => ({
      id: flight.id,
      price: flight.price,
      airline: flight.airline,
      stops: flight.stops || 0,
      duration: flight.duration,
      departure: {
        airport: flight.from,
        time: flight.departureTime,
        date: flight.departureDate,
      },
      arrival: {
        airport: flight.to,
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
