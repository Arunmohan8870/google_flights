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
import { AppBar, Box, Container, styled, Toolbar, Typography } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(4px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: 'none',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const Index = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();
  console.log(filteredFlights, "Filtered Flights")
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

      <StyledAppBar position="sticky" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <IconWrapper>
                <FlightTakeoffIcon sx={{ color: '#fff', fontSize: 28 }} />
              </IconWrapper>
              <Typography color="text.primary" variant="h5" fontWeight="bold">
                FlightSearch
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>


      <div className="container mx-auto px-4 py-8">

        <div className="mb-8">
          <FlightSearchForm onSearch={handleSearch} loading={loading} />
        </div>


        {hasSearched && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            <div className="hidden lg:block">
              <FlightFiltersComponent
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                maxPriceLimit={Math.max(...flights.map(f => f.price), 1000)}
                availableAirlines={availableAirlines}
              />
            </div>


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
                <Box textAlign="center" py={8}>
                  <FlightTakeoffIcon
                    sx={{
                      fontSize: 64,
                      color: 'text.secondary',
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" fontWeight="600" gutterBottom>
                    No flights found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your search criteria or dates
                  </Typography>
                </Box>
              ) : (
                <div className="text-center py-12">
                  {/* <p className="text-muted-foreground"> */}
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                  >
                    No flights match your current filters
                  </Typography>

                  {/* </p> */}
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


        {!hasSearched && (
          <Box textAlign="center" py={10}>
            <Container maxWidth="sm">
              <Box
                width={80}
                height={80}
                mx="auto"
                mb={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="50%"
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main + '1A',
                }}
              >
                <FlightTakeoffIcon sx={{ color: 'primary.main', fontSize: 40 }} />
              </Box>

              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Find Your Perfect Flight
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Search thousands of flights from airlines worldwide. Compare prices,
                times, and find the best deals for your next trip.
              </Typography>
            </Container>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Index;
