import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plane, Clock, Calendar } from 'lucide-react';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    time: string;
    date: string;
  };
  duration: string;
  stops: number;
  price: number;
  currency: string;
}

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect }) => {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(price);
  };

  const getStopsText = (stops: number) => {
    if (stops === 0) return 'Nonstop';
    if (stops === 1) return '1 stop';
    return `${stops} stops`;
  };

  return (
    <Card className="hover:shadow-card transition-all duration-300 border-flight-border bg-flight-card">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Airline info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Plane className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">{flight.airline}</p>
                <p className="text-xs text-muted-foreground">{flight.flightNumber}</p>
              </div>
            </div>
          </div>

          {/* Flight times */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-2xl font-bold">{flight.departure.time}</p>
                <p className="text-sm text-muted-foreground">{flight.departure.airport}</p>
                <p className="text-xs text-muted-foreground">{flight.departure.date}</p>
              </div>
              
              <div className="flex-1 mx-4">
                <div className="relative">
                  <div className="h-px bg-border"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background px-2">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {flight.duration}
                        </p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {getStopsText(flight.stops)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold">{flight.arrival.time}</p>
                <p className="text-sm text-muted-foreground">{flight.arrival.airport}</p>
                <p className="text-xs text-muted-foreground">{flight.arrival.date}</p>
              </div>
            </div>
          </div>

          {/* Price and select */}
          <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-price-highlight">
                {formatPrice(flight.price, flight.currency)}
              </p>
              <p className="text-xs text-muted-foreground">per person</p>
            </div>
            <Button 
              onClick={() => onSelect(flight)}
              className="whitespace-nowrap"
            >
              Select Flight
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};