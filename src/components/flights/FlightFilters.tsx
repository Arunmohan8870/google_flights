import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
// import moreData from "../../data/filter.json/newData.json"

export interface FlightFilters {
  maxPrice: number;
  stops: number[];
  airlines: string[];
  timeOfDay: string[];
}

interface FlightFiltersProps {
  filters: FlightFilters;
  onFiltersChange: (filters: FlightFilters) => void;
  onClearFilters: () => void;
  maxPriceLimit?: number;
  availableAirlines?: string[];
}

export const FlightFiltersComponent: React.FC<FlightFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  maxPriceLimit = 2000,
  availableAirlines = [],
}) => {
  const handleStopsChange = (stops: number, checked: boolean) => {
    const newStops = checked
      ? [...filters.stops, stops]
      : filters.stops.filter(s => s !== stops);
    onFiltersChange({ ...filters, stops: newStops });
  };

  const handleAirlineChange = (airline: string, checked: boolean) => {
    const newAirlines = checked
      ? [...filters.airlines, airline]
      : filters.airlines.filter(a => a !== airline);
    onFiltersChange({ ...filters, airlines: newAirlines });
  };

  const handleTimeChange = (time: string, checked: boolean) => {
    const newTimes = checked
      ? [...filters.timeOfDay, time]
      : filters.timeOfDay.filter(t => t !== time);
    onFiltersChange({ ...filters, timeOfDay: newTimes });
  };
  // console.log(moreData,"MoreData")

  const stopOptions = [
    { value: 0, label: 'Nonstop' },
    { value: 1, label: '1 Stop' },
    { value: 2, label: '2+ Stops' },
  ];

  const timeOptions = [
    { value: 'morning', label: 'Morning (6AM - 12PM)' },
    { value: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
    { value: 'evening', label: 'Evening (6PM - 12AM)' },
    { value: 'night', label: 'Night (12AM - 6AM)' },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
     
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Price Range</h3>
            <Badge variant="outline">
              ${filters.maxPrice}
            </Badge>
          </div>
          <Slider
            value={[filters.maxPrice]}
            onValueChange={(value) => 
              onFiltersChange({ ...filters, maxPrice: value[0] })
            }
            max={maxPriceLimit}
            min={0}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>${maxPriceLimit}</span>
          </div>
        </div>

        <Separator />

        
        <div className="space-y-3">
          <h3 className="font-medium">Stops</h3>
          <div className="space-y-3">
            {stopOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`stops-${option.value}`}
                  checked={filters.stops.includes(option.value)}
                  onCheckedChange={(checked) => 
                    handleStopsChange(option.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={`stops-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

      
        {availableAirlines.length > 0 && (
          <>
            <div className="space-y-3">
              <h3 className="font-medium">Airlines</h3>
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {availableAirlines.map((airline) => (
                  <div key={airline} className="flex items-center space-x-2">
                    <Checkbox
                      id={`airline-${airline}`}
                      checked={filters.airlines.includes(airline)}
                      onCheckedChange={(checked) => 
                        handleAirlineChange(airline, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`airline-${airline}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {airline}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        
        
      </CardContent>
    </Card>
  );
};