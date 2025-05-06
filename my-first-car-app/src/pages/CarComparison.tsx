import { useState } from 'react';
import { 
  PlusIcon,
  XMarkIcon,
  ArrowPathIcon,
  CheckIcon
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
  specs: {
    engine: string;
    horsepower: number;
    torque: number;
    mpg: {
      city: number;
      highway: number;
    };
    seating: number;
    cargo: string;
    safety: string[];
  };
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
    reliability: 4.8,
    specs: {
      engine: '2.0L 4-cylinder',
      horsepower: 158,
      torque: 138,
      mpg: {
        city: 30,
        highway: 38
      },
      seating: 5,
      cargo: '15.1 cu ft',
      safety: ['Lane Departure Warning', 'Forward Collision Warning', 'Adaptive Cruise Control']
    }
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
    reliability: 4.7,
    specs: {
      engine: '1.8L 4-cylinder',
      horsepower: 139,
      torque: 126,
      mpg: {
        city: 28,
        highway: 35
      },
      seating: 5,
      cargo: '13.1 cu ft',
      safety: ['Lane Departure Warning', 'Forward Collision Warning', 'Automatic Emergency Braking']
    }
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
    reliability: 4.5,
    specs: {
      engine: '2.0L 4-cylinder',
      horsepower: 147,
      torque: 132,
      mpg: {
        city: 31,
        highway: 41
      },
      seating: 5,
      cargo: '14.2 cu ft',
      safety: ['Lane Keeping Assist', 'Forward Collision Warning', 'Driver Attention Warning']
    }
  }
];

export default function CarComparison() {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [showCarSelector, setShowCarSelector] = useState(false);

  const handleAddCar = (car: Car) => {
    if (selectedCars.length < 3 && !selectedCars.find(c => c.id === car.id)) {
      setSelectedCars([...selectedCars, car]);
    }
    setShowCarSelector(false);
  };

  const handleRemoveCar = (carId: string) => {
    setSelectedCars(selectedCars.filter(car => car.id !== carId));
  };

  const handleResetComparison = () => {
    setSelectedCars([]);
  };

  const comparisonCategories = [
    {
      title: 'Basic Information',
      fields: [
        { key: 'make', label: 'Make' },
        { key: 'model', label: 'Model' },
        { key: 'year', label: 'Year' },
        { key: 'price', label: 'Price', format: (value: number) => `$${value.toLocaleString()}` },
        { key: 'mileage', label: 'Mileage', format: (value: number) => `${value.toLocaleString()} miles` }
      ]
    },
    {
      title: 'Performance',
      fields: [
        { key: 'specs.engine', label: 'Engine' },
        { key: 'specs.horsepower', label: 'Horsepower' },
        { key: 'specs.torque', label: 'Torque (lb-ft)' },
        { key: 'specs.mpg.city', label: 'City MPG' },
        { key: 'specs.mpg.highway', label: 'Highway MPG' }
      ]
    },
    {
      title: 'Features & Safety',
      fields: [
        { key: 'transmission', label: 'Transmission' },
        { key: 'fuelType', label: 'Fuel Type' },
        { key: 'specs.seating', label: 'Seating Capacity' },
        { key: 'specs.cargo', label: 'Cargo Space' },
        { key: 'rating', label: 'Rating' },
        { key: 'reliability', label: 'Reliability' }
      ]
    }
  ];

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Compare Cars
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Compare up to 3 cars side by side
          </p>
        </div>

        {/* Car Selection */}
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {selectedCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={car.imageUrl}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleRemoveCar(car.id)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    ${car.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            {selectedCars.length < 3 && (
              <button
                onClick={() => setShowCarSelector(true)}
                className="flex flex-col items-center justify-center h-48 bg-white rounded-lg shadow border-2 border-dashed border-gray-300 hover:border-indigo-500 hover:bg-gray-50"
              >
                <PlusIcon className="h-12 w-12 text-gray-400" />
                <span className="mt-2 text-sm font-medium text-gray-500">
                  Add Car to Compare
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Car Selector Modal */}
        {showCarSelector && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Select a Car to Compare
                  </h2>
                  <button
                    onClick={() => setShowCarSelector(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-6 grid gap-4">
                  {sampleCars
                    .filter(car => !selectedCars.find(c => c.id === car.id))
                    .map((car) => (
                      <button
                        key={car.id}
                        onClick={() => handleAddCar(car)}
                        className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <img
                          src={car.imageUrl}
                          alt={`${car.year} ${car.make} ${car.model}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="ml-4 text-left">
                          <h3 className="text-sm font-medium text-gray-900">
                            {car.year} {car.make} {car.model}
                          </h3>
                          <p className="text-sm text-gray-500">
                            ${car.price.toLocaleString()}
                          </p>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selectedCars.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-gray-900">
                Comparison Details
              </h2>
              <button
                onClick={handleResetComparison}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Reset Comparison
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg">
              {comparisonCategories.map((category) => (
                <div key={category.title} className="border-b last:border-b-0">
                  <div className="bg-gray-50 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {category.title}
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {category.fields.map((field) => (
                      <div
                        key={field.key}
                        className="grid grid-cols-4 divide-x divide-gray-200"
                      >
                        <div className="px-6 py-4 bg-gray-50">
                          <span className="text-sm font-medium text-gray-500">
                            {field.label}
                          </span>
                        </div>
                        {selectedCars.map((car) => (
                          <div key={car.id} className="px-6 py-4">
                            <span className="text-sm text-gray-900">
                              {field.format
                                ? field.format(getNestedValue(car, field.key))
                                : getNestedValue(car, field.key)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCars.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-500">
              Select cars to compare their features and specifications
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 