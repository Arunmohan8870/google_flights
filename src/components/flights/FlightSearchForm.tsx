import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, ArrowLeftRight, Plane } from 'lucide-react';
import { Autocomplete, Box, IconButton, styled, TextField } from '@mui/material';
import { cn } from '@/lib/utils';
import newData from "../../data/filter";

interface FlightSearchFormProps {
  onSearch: (searchData: FlightSearchData) => void;
  loading?: boolean;
}
const SwapButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'rotate(90deg)'
  },
  transition: 'all 0.3s ease'
}));

export interface FlightSearchData {
  origin: string;
  destination: string;
  departureDate: Date;
  returnDate?: Date;
  isRoundTrip: boolean;
}

export const FlightSearchForm: React.FC<FlightSearchFormProps> = ({ onSearch, loading = false }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const airportOptions = newData.map((item) => item.from);
  const airportOptions2 = newData.map((item) => item.to);
  const [data, setData] = useState([])



  // useEffect(() => {
  //   const fetchFlights = async () => {
  //     try {
  //       const res = await fetch("http://api.aviationstack.com/v1/flights?access_key=3fc6207d36d250f12cff2ab5567578af");
  //       const json = await res.json();
  //       setData(json.data);
  //       console.log(json, "json");
  //     } catch (error) {
  //       console.error("Error fetching flight data:", error);
  //     }
  //   };

  //   fetchFlights();
  // }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !departureDate) return;

    onSearch({
      origin,
      destination,
      departureDate,
      returnDate: isRoundTrip ? returnDate : undefined,
      isRoundTrip,
    });
  };

  const swapAirports = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 rounded-2xl overflow-hidden">
      <CardContent className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-100 rounded-full">
            <Plane className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Find Your Perfect Flight</h2>
          <div className="ml-auto flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm">
            {/* <Label htmlFor="trip-type" className="text-sm font-medium text-gray-600">
              Round trip
            </Label>
            <Switch
              id="trip-type"
              checked={isRoundTrip}
              onCheckedChange={setIsRoundTrip}
              className="data-[state=checked]:bg-blue-500"
            /> */}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

            <div className="md:col-span-3 space-y-2">

              <Autocomplete
                options={airportOptions}
                value={origin}
                onChange={(_, newValue) => setOrigin(newValue || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="City or airport"
                    label="From"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        height: '48px',
                        fontSize: '13px',
                        backgroundColor: 'white',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#3b82f6',
                        },
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: '13.5px',
                      }
                    }}
                  />
                )}
              />
            </div>
            <Box gridColumn={{ md: 'span 1' }} display="flex" alignItems="center" justifyContent="center">
              <SwapButton className="h-10 w-10 rounded-full bg-white border-gray-300 shadow-sm hover:bg-gray-50 hover:border-blue-300 transition-all"
                onClick={swapAirports}>
                <ArrowLeftRight className="h-4 w-4 text-gray-600" />

                {/* <SwapHoriz color="primary" /> */}
              </SwapButton>
            </Box>

            {/* <div className="md:col-span-1 flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-white border-gray-300 shadow-sm hover:bg-gray-50 hover:border-blue-300 transition-all"
                onClick={swapAirports}
              >
                <ArrowLeftRight className="h-4 w-4 text-gray-600" />
              </Button>
            </div> */}


            <div className="md:col-span-3 space-y-2">
              {/* <Label className="text-sm font-medium text-gray-600">To</Label> */}
              <Autocomplete
                options={airportOptions2}
                value={destination}
                onChange={(_, newValue) => setDestination(newValue || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="City or airport"
                    label="Destination"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        height: '48px',
                        fontSize: '13px',
                        backgroundColor: 'white',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#3b82f6',
                        },
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: '13.5px',
                      }
                    }}
                  />
                )}
              />
            </div>


            <div className="md:col-span-2 space-y-2">
              <Label className="text-sm font-medium text-gray-600">Departure</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-12 w-full justify-start text-left font-normal bg-white",
                      !departureDate && "text-gray-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                    {departureDate ? format(departureDate, "MMM dd") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 shadow-lg rounded-xl border border-gray-200">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>
            </div>


            {isRoundTrip && (
              <div className="md:col-span-2 space-y-2">
                <Label className="text-sm font-medium text-gray-600">Return</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 w-full justify-start text-left font-normal bg-white",
                        !returnDate && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                      {returnDate ? format(returnDate, "MMM dd") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 shadow-lg rounded-xl border border-gray-200">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      disabled={(date) => date < (departureDate || new Date())}
                      initialFocus
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}


            <div className="md:col-span-1 flex items-end h-full">
              <Button
                type="submit"
                disabled={loading || !origin || !destination || !departureDate}
                className="h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : (
                  'Search'
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};