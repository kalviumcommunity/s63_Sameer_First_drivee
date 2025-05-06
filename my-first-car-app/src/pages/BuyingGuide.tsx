import { useState } from 'react';
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LightBulbIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  HandRaisedIcon,
  DocumentCheckIcon,
  ClipboardDocumentIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: any;
  image: string;
  tips: string[];
  resources: Array<{ title: string; url: string }>;
  subItems?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

const initialChecklist: ChecklistItem[] = [
  {
    id: '1',
    title: 'Set Your Budget',
    description: 'Determine how much you can afford to spend on your first car.',
    completed: false,
    icon: CurrencyDollarIcon,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    tips: [
      'Include all costs: monthly payments, insurance, maintenance, and fuel',
      'Follow the 20/4/10 rule: 20% down, 4-year loan, 10% of income for payments',
      'Consider getting pre-approved for a car loan',
    ],
    resources: [
      { title: 'Car Payment Calculator', url: '#' },
      { title: 'Insurance Cost Estimator', url: '#' },
    ],
    subItems: [
      { id: '1-1', title: 'Calculate your monthly income and expenses', completed: false },
      { id: '1-2', title: 'Research car loan options and interest rates', completed: false },
      { id: '1-3', title: 'Consider insurance costs', completed: false },
      { id: '1-4', title: 'Factor in maintenance and fuel costs', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Research Car Types',
    description: 'Explore different car types that match your needs and lifestyle.',
    completed: false,
    icon: TruckIcon,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    tips: [
      'Consider your daily commute and parking situation',
      'Think about cargo space needs',
      'Research safety ratings and features',
    ],
    resources: [
      { title: 'Car Comparison Tool', url: '#' },
      { title: 'Safety Ratings Guide', url: '#' },
    ],
    subItems: [
      { id: '2-1', title: 'Determine your primary use for the car', completed: false },
      { id: '2-2', title: 'Compare different car body styles', completed: false },
      { id: '2-3', title: 'Research fuel efficiency', completed: false },
      { id: '2-4', title: 'Read reviews and reliability ratings', completed: false },
    ],
  },
  {
    id: '3',
    title: 'Create a Shortlist',
    description: 'Make a list of potential cars that meet your criteria.',
    completed: false,
    icon: ClipboardDocumentIcon,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    tips: [
      'Compare at least 3-5 different models',
      'Consider both new and used options',
      'Look at different trim levels within models',
    ],
    resources: [
      { title: 'Car Comparison Tool', url: '#' },
      { title: 'Vehicle History Reports', url: '#' },
    ],
    subItems: [
      { id: '3-1', title: 'List your must-have features', completed: false },
      { id: '3-2', title: 'Compare prices across different models', completed: false },
      { id: '3-3', title: 'Check availability in your area', completed: false },
    ],
  },
  {
    id: '4',
    title: 'Inspect and Test Drive',
    description: 'Thoroughly evaluate your potential choices.',
    completed: false,
    icon: MagnifyingGlassIcon,
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    tips: [
      'Test drive in various conditions (highway, city)',
      'Check all features and controls',
      'Listen for unusual noises',
      'Bring someone experienced with you',
    ],
    resources: [
      { title: 'Test Drive Checklist', url: '#' },
      { title: 'Vehicle Inspection Guide', url: '#' },
    ],
    subItems: [
      { id: '4-1', title: 'Schedule test drives', completed: false },
      { id: '4-2', title: 'Inspect the vehicle condition', completed: false },
      { id: '4-3', title: 'Get a vehicle history report', completed: false },
      { id: '4-4', title: 'Have a mechanic inspect the car', completed: false },
    ],
  },
  {
    id: '5',
    title: 'Negotiate and Purchase',
    description: 'Get the best deal on your chosen car.',
    completed: false,
    icon: HandRaisedIcon,
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    tips: [
      'Research market prices beforehand',
      'Get quotes from multiple dealers',
      'Be prepared to walk away',
      'Read all paperwork carefully',
    ],
    resources: [
      { title: 'Negotiation Tips', url: '#' },
      { title: 'Loan Calculator', url: '#' },
    ],
    subItems: [
      { id: '5-1', title: 'Research fair market value', completed: false },
      { id: '5-2', title: 'Prepare negotiation points', completed: false },
      { id: '5-3', title: 'Review all paperwork carefully', completed: false },
      { id: '5-4', title: 'Arrange financing if needed', completed: false },
    ],
  },
  {
    id: '6',
    title: 'Complete Post-Purchase Tasks',
    description: 'Take care of necessary paperwork and maintenance.',
    completed: false,
    icon: WrenchScrewdriverIcon,
    image: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    tips: [
      'Keep all purchase documentation',
      'Schedule initial maintenance',
      'Set up a maintenance schedule',
      'Learn about warranty coverage',
    ],
    resources: [
      { title: 'Registration Guide', url: '#' },
      { title: 'Maintenance Schedule', url: '#' },
    ],
    subItems: [
      { id: '6-1', title: 'Register the vehicle', completed: false },
      { id: '6-2', title: 'Get insurance coverage', completed: false },
      { id: '6-3', title: 'Schedule initial maintenance', completed: false },
      { id: '6-4', title: 'Keep all documentation organized', completed: false },
    ],
  },
];

export default function BuyingGuide() {
  const [checklist, setChecklist] = useState(initialChecklist);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleItemCompletion = (itemId: string, subItemId?: string) => {
    setChecklist(prev => prev.map(item => {
      if (subItemId) {
        if (item.id === itemId && item.subItems) {
          const updatedSubItems = item.subItems.map(subItem =>
            subItem.id === subItemId
              ? { ...subItem, completed: !subItem.completed }
              : subItem
          );
          const allSubItemsCompleted = updatedSubItems.every(subItem => subItem.completed);
          return {
            ...item,
            subItems: updatedSubItems,
            completed: allSubItemsCompleted,
          };
        }
        return item;
      }
      
      if (item.id === itemId) {
        const newCompleted = !item.completed;
        return {
          ...item,
          completed: newCompleted,
          subItems: item.subItems?.map(subItem => ({
            ...subItem,
            completed: newCompleted,
          })),
        };
      }
      return item;
    }));
  };

  const calculateProgress = () => {
    const totalItems = checklist.reduce(
      (acc, item) => acc + (item.subItems?.length || 1),
      0
    );
    const completedItems = checklist.reduce(
      (acc, item) => acc + (item.subItems?.filter(si => si.completed).length || (item.completed ? 1 : 0)),
      0
    );
    return Math.round((completedItems / totalItems) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-800 text-white">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover mix-blend-multiply filter brightness-50"
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Car buying guide hero"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            First-Time Car Buyer's Guide
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Follow our comprehensive step-by-step guide to make your first car purchase
            a smooth and informed experience.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
            <span className="text-2xl font-bold text-indigo-600">
              {calculateProgress()}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-8">
          {checklist.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 ${
                expandedItems.includes(item.id) ? 'scale-102' : ''
              }`}
            >
              {/* Header with Image */}
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg">
                      <item.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600">{item.description}</p>
                  <button
                    onClick={() => toggleItemExpansion(item.id)}
                    className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    {expandedItems.includes(item.id) ? (
                      <ChevronUpIcon className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </button>
                </div>

                {expandedItems.includes(item.id) && (
                  <div className="mt-6 space-y-6">
                    {/* Tips Section */}
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <h4 className="font-semibold text-indigo-900 mb-2">
                        Pro Tips
                      </h4>
                      <ul className="space-y-2">
                        {item.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <LightBulbIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-indigo-900">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Checklist Items */}
                    <div className="space-y-3">
                      {item.subItems?.map((subItem) => (
                        <div
                          key={subItem.id}
                          className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <button
                            onClick={() => toggleItemCompletion(item.id, subItem.id)}
                            className={`flex-shrink-0 p-1 rounded-full ${
                              subItem.completed
                                ? 'text-green-500 bg-green-100'
                                : 'text-gray-400 bg-gray-200'
                            }`}
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                          </button>
                          <span className="ml-3 text-gray-700">{subItem.title}</span>
                        </div>
                      ))}
                    </div>

                    {/* Resources */}
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Helpful Resources
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {item.resources.map((resource, index) => (
                          <a
                            key={index}
                            href={resource.url}
                            className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          >
                            <DocumentCheckIcon className="h-5 w-5 text-indigo-600 mr-2" />
                            <span className="text-sm text-gray-700">
                              {resource.title}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 