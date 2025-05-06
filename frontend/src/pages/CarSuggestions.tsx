import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

// Mock data for car suggestions
const mockCars = [
  {
    id: 1,
    name: 'Toyota Corolla',
    year: 2023,
    price: 22500,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG95b3RhJTIwY29yb2xsYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Sedan',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    mpg: 32,
    features: ['Bluetooth', 'Backup Camera', 'Apple CarPlay', 'Android Auto'],
    rating: 4.5,
    description: 'The Toyota Corolla is a reliable, fuel-efficient compact sedan with a comfortable ride and good safety features.',
  },
  {
    id: 2,
    name: 'Honda Civic',
    year: 2023,
    price: 23800,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG95b3RhJTIwY29yb2xsYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Sedan',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    mpg: 36,
    features: ['Bluetooth', 'Backup Camera', 'Apple CarPlay', 'Android Auto', 'Lane Departure Warning'],
    rating: 4.7,
    description: 'The Honda Civic offers excellent fuel economy, a spacious interior, and advanced safety features.',
  },
  {
    id: 3,
    name: 'Hyundai Kona',
    year: 2023,
    price: 24200,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG95b3RhJTIwY29yb2xsYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'SUV',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    mpg: 28,
    features: ['Bluetooth', 'Backup Camera', 'Apple CarPlay', 'Android Auto', 'Heated Front Seats'],
    rating: 4.3,
    description: 'The Hyundai Kona is a stylish subcompact SUV with good handling and a comfortable ride.',
  },
  {
    id: 4,
    name: 'Mazda CX-5',
    year: 2023,
    price: 26900,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG95b3RhJTIwY29yb2xsYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'SUV',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    mpg: 26,
    features: ['Bluetooth', 'Backup Camera', 'Apple CarPlay', 'Android Auto', 'Leather Seats', 'Sunroof'],
    rating: 4.6,
    description: 'The Mazda CX-5 offers a premium feel with excellent handling and a comfortable interior.',
  },
  {
    id: 5,
    name: 'Kia Forte',
    year: 2023,
    price: 20500,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG95b3RhJTIwY29yb2xsYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Sedan',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    mpg: 31,
    features: ['Bluetooth', 'Backup Camera', 'Apple CarPlay', 'Android Auto', 'Wireless Charging'],
    rating: 4.2,
    description: 'The Kia Forte is an affordable compact sedan with good fuel economy and a generous warranty.',
  },
  {
    id: 6,
    name: 'Nissan Rogue',
    year: 2023,
    price: 28900,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG95b3RhJTIwY29yb2xsYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'SUV',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    mpg: 27,
    features: ['Bluetooth', 'Backup Camera', 'Apple CarPlay', 'Android Auto', 'ProPilot Assist', 'Power Liftgate'],
    rating: 4.4,
    description: 'The Nissan Rogue is a popular compact SUV with a comfortable ride and good cargo space.',
  },
];

interface Car {
  id: number;
  name: string;
  year: number;
  price: number;
  image: string;
  category: string;
  fuelType: string;
  transmission: string;
  mpg: number;
  features: string[];
  rating: number;
  description: string;
}

export default function CarSuggestions() {
  const [budget, setBudget] = useState<number>(25000);
  const [category, setCategory] = useState<string>('all');
  const [fuelType, setFuelType] = useState<string>('all');
  const [transmission, setTransmission] = useState<string>('all');
  const [savedCars, setSavedCars] = useState<number[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  // Filter cars based on user preferences
  useEffect(() => {
    let filtered = [...mockCars];
    
    // Filter by budget
    filtered = filtered.filter(car => car.price <= budget);
    
    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(car => car.category === category);
    }
    
    // Filter by fuel type
    if (fuelType !== 'all') {
      filtered = filtered.filter(car => car.fuelType === fuelType);
    }
    
    // Filter by transmission
    if (transmission !== 'all') {
      filtered = filtered.filter(car => car.transmission === transmission);
    }
    
    setFilteredCars(filtered);
  }, [budget, category, fuelType, transmission]);

  const toggleSaveCar = (carId: number) => {
    setSavedCars(prev => {
      if (prev.includes(carId)) {
        return prev.filter(id => id !== carId);
      } else {
        return [...prev, carId];
      }
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Car Suggestions
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Find the perfect car based on your budget and preferences.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filter Options</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                Budget (Max Price)
              </label>
              <div className="mt-1">
                <input
                  type="range"
                  id="budget"
                  name="budget"
                  min="15000"
                  max="50000"
                  step="1000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="mt-1 text-sm text-gray-500">{formatPrice(budget)}</div>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Categories</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Van">Van</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">
                Fuel Type
              </label>
              <select
                id="fuelType"
                name="fuelType"
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Fuel Types</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">
                Transmission
              </label>
              <select
                id="transmission"
                name="transmission"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Transmissions</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {filteredCars.length} Cars Found
          </h2>
          
          {filteredCars.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No cars match your current filters. Try adjusting your preferences.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCars.map((car) => (
                <div key={car.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="relative h-48">
                    <img
                      src={car.image}
                      alt={`${car.year} ${car.name}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggleSaveCar(car.id)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-80"
                    >
                      {savedCars.includes(car.id) ? (
                        <StarIcon className="h-6 w-6 text-yellow-400" />
                      ) : (
                        <StarOutlineIcon className="h-6 w-6 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {car.year} {car.name}
                        </h3>
                        <p className="text-sm text-gray-500">{car.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{formatPrice(car.price)}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < Math.floor(car.rating) ? (
                                <StarIcon className="h-4 w-4 text-yellow-400" />
                              ) : (
                                <StarOutlineIcon className="h-4 w-4 text-gray-300" />
                              )}
                            </span>
                          ))}
                          <span className="ml-1 text-xs text-gray-500">({car.rating})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Fuel Type</p>
                        <p className="font-medium">{car.fuelType}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Transmission</p>
                        <p className="font-medium">{car.transmission}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">MPG</p>
                        <p className="font-medium">{car.mpg} city/highway</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Features</p>
                        <p className="font-medium">{car.features.length} included</p>
                      </div>
                    </div>
                    
                    <p className="mt-4 text-sm text-gray-500 line-clamp-2">{car.description}</p>
                    
                    <div className="mt-6 flex space-x-3">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 