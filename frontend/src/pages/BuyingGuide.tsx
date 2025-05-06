import { useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  subItems?: ChecklistItem[];
}

const initialChecklist: ChecklistItem[] = [
  {
    id: 1,
    title: 'Research and Planning',
    description: 'Determine your needs, budget, and preferences',
    completed: false,
    subItems: [
      {
        id: 101,
        title: 'Set your budget',
        description: 'Calculate how much you can afford including down payment, monthly payments, insurance, and maintenance',
        completed: false,
      },
      {
        id: 102,
        title: 'Determine your needs',
        description: 'Consider factors like passenger capacity, cargo space, fuel efficiency, and safety features',
        completed: false,
      },
      {
        id: 103,
        title: 'Research car models',
        description: 'Read reviews, compare features, and check reliability ratings',
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Vehicle Selection',
    description: 'Find the right car that meets your needs and budget',
    completed: false,
    subItems: [
      {
        id: 201,
        title: 'New vs. Used decision',
        description: 'Weigh the pros and cons of buying new versus used',
        completed: false,
      },
      {
        id: 202,
        title: 'Test drive candidates',
        description: 'Schedule test drives of your top choices',
        completed: false,
      },
      {
        id: 203,
        title: 'Vehicle inspection',
        description: 'Have a trusted mechanic inspect the vehicle if buying used',
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: 'Financing',
    description: 'Secure the best financing options for your purchase',
    completed: false,
    subItems: [
      {
        id: 301,
        title: 'Check your credit score',
        description: 'Know your credit score and take steps to improve it if needed',
        completed: false,
      },
      {
        id: 302,
        title: 'Shop for loans',
        description: 'Compare rates from banks, credit unions, and dealerships',
        completed: false,
      },
      {
        id: 303,
        title: 'Get pre-approved',
        description: 'Obtain pre-approval to know your budget and strengthen your negotiating position',
        completed: false,
      },
    ],
  },
  {
    id: 4,
    title: 'Insurance',
    description: 'Secure appropriate auto insurance coverage',
    completed: false,
    subItems: [
      {
        id: 401,
        title: 'Research insurance options',
        description: 'Compare quotes from multiple insurance providers',
        completed: false,
      },
      {
        id: 402,
        title: 'Understand coverage options',
        description: 'Learn about different types of coverage and what you need',
        completed: false,
      },
      {
        id: 403,
        title: 'Get insurance quotes',
        description: 'Request quotes for the specific vehicles you\'re considering',
        completed: false,
      },
    ],
  },
  {
    id: 5,
    title: 'Negotiation and Purchase',
    description: 'Negotiate the best deal and complete the purchase',
    completed: false,
    subItems: [
      {
        id: 501,
        title: 'Research fair market value',
        description: 'Know the fair price for the vehicle you want',
        completed: false,
      },
      {
        id: 502,
        title: 'Negotiate price',
        description: 'Negotiate the purchase price, trade-in value, and financing terms',
        completed: false,
      },
      {
        id: 503,
        title: 'Review paperwork',
        description: 'Carefully review all documents before signing',
        completed: false,
      },
    ],
  },
  {
    id: 6,
    title: 'Registration and Documentation',
    description: 'Complete all necessary paperwork and registration',
    completed: false,
    subItems: [
      {
        id: 601,
        title: 'Transfer title',
        description: 'Ensure proper title transfer to your name',
        completed: false,
      },
      {
        id: 602,
        title: 'Register vehicle',
        description: 'Register the vehicle with your state DMV',
        completed: false,
      },
      {
        id: 603,
        title: 'Obtain license plates',
        description: 'Get license plates and display them properly',
        completed: false,
      },
    ],
  },
];

export default function BuyingGuide() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  const [expandedItems, setExpandedItems] = useState<number[]>([1]); // Start with first item expanded

  const toggleItemCompletion = (id: number, isSubItem: boolean = false) => {
    setChecklist((prevChecklist) => {
      if (isSubItem) {
        // Handle sub-item completion
        return prevChecklist.map((item) => {
          if (item.subItems) {
            const updatedSubItems = item.subItems.map((subItem) => {
              if (subItem.id === id) {
                return { ...subItem, completed: !subItem.completed };
              }
              return subItem;
            });
            
            // Check if all sub-items are completed to update parent
            const allSubItemsCompleted = updatedSubItems.every((subItem) => subItem.completed);
            
            return {
              ...item,
              completed: allSubItemsCompleted,
              subItems: updatedSubItems,
            };
          }
          return item;
        });
      } else {
        // Handle main item completion
        return prevChecklist.map((item) => {
          if (item.id === id) {
            const newCompleted = !item.completed;
            
            // If completing a main item, complete all sub-items
            if (newCompleted && item.subItems) {
              return {
                ...item,
                completed: newCompleted,
                subItems: item.subItems.map((subItem) => ({ ...subItem, completed: true })),
              };
            }
            
            // If uncompleting a main item, uncomplete all sub-items
            if (!newCompleted && item.subItems) {
              return {
                ...item,
                completed: newCompleted,
                subItems: item.subItems.map((subItem) => ({ ...subItem, completed: false })),
              };
            }
            
            return { ...item, completed: newCompleted };
          }
          return item;
        });
      }
    });
  };

  const toggleExpanded = (id: number) => {
    setExpandedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const calculateProgress = () => {
    const totalItems = checklist.reduce((count, item) => {
      return count + 1 + (item.subItems ? item.subItems.length : 0);
    }, 0);
    
    const completedItems = checklist.reduce((count, item) => {
      const subItemsCompleted = item.subItems
        ? item.subItems.filter((subItem) => subItem.completed).length
        : 0;
      return count + (item.completed ? 1 : 0) + subItemsCompleted;
    }, 0);
    
    return Math.round((completedItems / totalItems) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Car Buying Guide
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Follow this step-by-step checklist to navigate the car buying process with confidence.
          </p>
          
          <div className="mt-8">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {progress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {checklist.map((item) => (
            <div key={item.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div
                className="px-4 py-5 sm:px-6 cursor-pointer"
                onClick={() => toggleExpanded(item.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleItemCompletion(item.id);
                      }}
                      className="mr-3"
                    >
                      {item.completed ? (
                        <CheckCircleSolidIcon className="h-6 w-6 text-green-500" />
                      ) : (
                        <CheckCircleIcon className="h-6 w-6 text-gray-400" />
                      )}
                    </button>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <svg
                      className={`h-5 w-5 text-gray-400 transform ${
                        expandedItems.includes(item.id) ? 'rotate-180' : ''
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
              
              {expandedItems.includes(item.id) && item.subItems && (
                <div className="border-t border-gray-200">
                  <dl>
                    {item.subItems.map((subItem) => (
                      <div
                        key={subItem.id}
                        className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                      >
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <button
                            onClick={() => toggleItemCompletion(subItem.id, true)}
                            className="mr-3"
                          >
                            {subItem.completed ? (
                              <CheckCircleSolidIcon className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircleIcon className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                          {subItem.title}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {subItem.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 