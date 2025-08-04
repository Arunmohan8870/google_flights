import React, { useState } from 'react';
import { FlightSearchForm, FlightSearchData } from '@/components/flights/FlightSearchForm';
import { FlightCard, Flight } from '@/components/flights/FlightCard';
import { FlightFiltersComponent, FlightFilters } from '@/components/flights/FlightFilters';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorMessage } from '@/components/ui/error-message';
import { FlightService } from '@/services/flightService';
import { useToast } from '@/hooks/use-toast';
import { Plane, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Index = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();
console.log(filteredFlights,"Filtered Flights")
  const [filters, setFilters] = useState<FlightFilters>({
    maxPrice: 1000,
    stops: [],
    airlines: [],
    timeOfDay: [],
  });

  const handleSearch = async (searchData: FlightSearchData) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await FlightService.searchFlights(searchData);
      
      if (response.success && response.data) {
        setFlights(response.data);
        setFilteredFlights(response.data);
        
        // Reset filters for new search
        const maxPrice = Math.max(...response.data.map(f => f.price));
        setFilters({
          maxPrice: maxPrice,
          stops: [],
          airlines: [],
          timeOfDay: [],
        });

        toast({
          title: "Flights found!",
          description: `Found ${response.data.length} flights for your search.`,
        });
      } else {
        setError(response.error || 'Failed to find flights');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: FlightFilters) => {
    setFilters(newFilters);
    const filtered = FlightService.filterFlights(flights, newFilters);
    setFilteredFlights(filtered);
  };

  const handleClearFilters = () => {
    const maxPrice = Math.max(...flights.map(f => f.price));
    const clearedFilters = {
      maxPrice: maxPrice,
      stops: [],
      airlines: [],
      timeOfDay: [],
    };
    setFilters(clearedFilters);
    setFilteredFlights(flights);
  };

  const handleFlightSelect = (flight: Flight) => {
    toast({
      title: "Flight selected!",
      description: `You selected ${flight.airline} flight ${flight.flightNumber}`,
    });
  };

  const availableAirlines = FlightService.getAvailableAirlines(flights);

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">FlightSearch</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search form */}
        <div className="mb-8">
          <FlightSearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results section */}
        {hasSearched && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters sidebar - desktop */}
            <div className="hidden lg:block">
              <FlightFiltersComponent
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                maxPriceLimit={Math.max(...flights.map(f => f.price), 1000)}
                availableAirlines={availableAirlines}
              />
            </div>

            {/* Mobile filters */}
            <div className="lg:hidden mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <FlightFiltersComponent
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onClearFilters={handleClearFilters}
                    maxPriceLimit={Math.max(...flights.map(f => f.price), 1000)}
                    availableAirlines={availableAirlines}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Flight results */}
            <div className="lg:col-span-3 space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <LoadingSpinner size="lg" className="mx-auto mb-4" />
                    <p className="text-lg font-medium">Searching for flights...</p>
                    <p className="text-muted-foreground">This may take a few moments</p>
                  </div>
                </div>
              ) : error ? (
                <div className="py-12">
                  <ErrorMessage
                    message={error}
                    onRetry={() => window.location.reload()}
                  />
                </div>
              ) : filteredFlights.length > 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      {filteredFlights.length} flight{filteredFlights.length !== 1 ? 's' : ''} found
                    </h2>
                  </div>
                  {filteredFlights.map((flight) => (
                    <FlightCard
                      key={flight.id}
                      flight={flight}
                      onSelect={handleFlightSelect}
                    />
                  ))}
                </>
              ) : hasSearched && flights.length === 0 ? (
                <div className="text-center py-12">
                  <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No flights found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or dates
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No flights match your current filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="mt-4"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!hasSearched && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plane className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Find Your Perfect Flight</h2>
              <p className="text-muted-foreground mb-6">
                Search thousands of flights from airlines worldwide. Compare prices, 
                times, and find the best deals for your next trip.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
