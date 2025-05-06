import { useState } from 'react';
import { 
  AdjustmentsHorizontalIcon,
  CurrencyDollarIcon,
  TruckIcon,
  BoltIcon,
  ShieldCheckIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  features: string[];
  imageUrl: string;
  rating: number;
  reliability: number;
}

// Sample data - replace with API call
const sampleCars: Car[] = [
  {
    id: '1',
    make: 'Honda',
    model: 'Civic',
    year: 2020,
    price: 18500,
    mileage: 35000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    features: ['Bluetooth', 'Backup Camera', 'Cruise Control', 'Air Conditioning'],
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738',
    rating: 4.5,
    reliability: 4.8
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'Corolla',
    year: 2019,
    price: 16500,
    mileage: 42000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    features: ['Bluetooth', 'Backup Camera', 'Lane Departure Warning', 'Apple CarPlay'],
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb',
    rating: 4.4,
    reliability: 4.7
  },
  {
    id: '3',
    make: 'Hyundai',
    model: 'Elantra',
    year: 2021,
    price: 19500,
    mileage: 25000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    features: ['Bluetooth', 'Backup Camera', 'Android Auto', 'LED Headlights'],
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8',
    rating: 4.3,
    reliability: 4.5
  }
];

export default function CarSuggestions() {
  const [budget, setBudget] = useState<number>(20000);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('price');
  const [cars, setCars] = useState<Car[]>(sampleCars);

  const availableFeatures = [
    'Bluetooth',
    'Backup Camera',
    'Cruise Control',
    'Air Conditioning',
    'Lane Departure Warning',
    'Apple CarPlay',
    'Android Auto',
    'LED Headlights'
  ];

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSort = (criteria: string) => {
    setSortBy(criteria);
    const sortedCars = [...cars].sort((a, b) => {
      switch (criteria) {
        case 'price':
          return a.price - b.price;
        case 'year':
          return b.year - a.year;
        case 'mileage':
          return a.mileage - b.mileage;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    setCars(sortedCars);
  };

  const filteredCars = cars.filter(car => {
    const withinBudget = car.price <= budget;
    const hasSelectedFeatures = selectedFeatures.length === 0 ||
      selectedFeatures.every(feature => car.features.includes(feature));
    return withinBudget && hasSelectedFeatures;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Find Your Perfect First Car
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Browse through our curated selection of reliable first cars
          </p>
        </div>

        {/* Filters Section */}
        <div className="mt-12 bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                onClick={() => {
                  setBudget(20000);
                  setSelectedFeatures([]);
                  setSortBy('price');
                }}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Reset Filters
              </button>
            </div>

            {/* Budget Slider */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Maximum Budget
              </label>
              <div className="mt-2 flex items-center space-x-4">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="1000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-500">
                  ${budget.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Features Selection */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Features
              </label>
              <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {availableFeatures.map((feature) => (
                  <label
                    key={feature}
                    className="relative flex items-start"
                  >
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        checked={selectedFeatures.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="price">Price (Low to High)</option>
                <option value="year">Year (Newest First)</option>
                <option value="mileage">Mileage (Low to High)</option>
                <option value="rating">Rating (Highest First)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={car.imageUrl}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <span className="text-lg font-bold text-indigo-600">
                    ${car.price.toLocaleString()}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <TruckIcon className="h-5 w-5 mr-2" />
                    {car.mileage.toLocaleString()} miles
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <BoltIcon className="h-5 w-5 mr-2" />
                    {car.transmission} • {car.fuelType}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <StarIcon className="h-5 w-5 mr-2" />
                    {car.rating} / 5.0
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ShieldCheckIcon className="h-5 w-5 mr-2" />
                    Reliability: {car.reliability} / 5.0
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {car.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {feature}
                      </span>
                    ))}
                    {car.features.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        +{car.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-500">No cars match your current filters.</p>
            <button
              onClick={() => {
                setBudget(20000);
                setSelectedFeatures([]);
                setSortBy('price');
              }}
              className="mt-4 text-indigo-600 hover:text-indigo-500"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 