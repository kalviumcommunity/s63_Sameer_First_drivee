import { useState } from 'react';
import { 
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  DocumentDuplicateIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface Document {
  id: string;
  title: string;
  description: string;
  required: boolean;
  status: 'pending' | 'completed' | 'not-applicable';
  tips: string[];
  downloadUrl?: string;
}

export default function Paperwork() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'Driver\'s License',
      description: 'A valid driver\'s license is required to test drive and purchase a vehicle.',
      required: true,
      status: 'pending',
      tips: [
        'Make sure your license is not expired',
        'If you\'re a new driver, you may need a learner\'s permit first',
        'Some states require a special license for certain vehicle types'
      ]
    },
    {
      id: '2',
      title: 'Proof of Insurance',
      description: 'You need to have auto insurance before driving your new car off the lot.',
      required: true,
      status: 'pending',
      tips: [
        'Shop around for the best rates',
        'Consider bundling with other insurance policies',
        'Make sure to get coverage before test driving'
      ]
    },
    {
      id: '3',
      title: 'Proof of Income',
      description: 'If financing, you\'ll need to prove your income to qualify for a loan.',
      required: true,
      status: 'pending',
      tips: [
        'Recent pay stubs (usually last 2-3 months)',
        'W-2 forms from the previous year',
        'Bank statements showing regular deposits'
      ]
    },
    {
      id: '4',
      title: 'Proof of Residence',
      description: 'A utility bill or lease agreement to verify your current address.',
      required: true,
      status: 'pending',
      tips: [
        'Utility bills are preferred (electric, water, gas)',
        'Must be dated within the last 30-60 days',
        'Must show your full name and current address'
      ]
    },
    {
      id: '5',
      title: 'Vehicle History Report',
      description: 'A report showing the car\'s accident history, maintenance records, and ownership history.',
      required: false,
      status: 'pending',
      tips: [
        'Use services like Carfax or AutoCheck',
        'Look for red flags like salvage titles or odometer discrepancies',
        'Consider purchasing a report for any used vehicle you\'re seriously considering'
      ]
    },
    {
      id: '6',
      title: 'Pre-Purchase Inspection Report',
      description: 'A professional inspection of the vehicle before purchase.',
      required: false,
      status: 'pending',
      tips: [
        'Recommended for all used vehicles',
        'Can be performed by a trusted mechanic',
        'May cost $100-200 but can save thousands in repairs'
      ]
    },
    {
      id: '7',
      title: 'Bill of Sale',
      description: 'A document that transfers ownership of the vehicle from the seller to you.',
      required: true,
      status: 'pending',
      tips: [
        'Should include the vehicle\'s VIN, make, model, and year',
        'Should specify the purchase price and payment method',
        'Both buyer and seller should sign and date'
      ]
    },
    {
      id: '8',
      title: 'Title Transfer',
      description: 'The process of transferring the vehicle\'s title from the seller to you.',
      required: true,
      status: 'pending',
      tips: [
        'Must be completed within a specific timeframe (varies by state)',
        'Requires a visit to the DMV in most cases',
        'You\'ll need to pay title transfer fees and taxes'
      ]
    }
  ]);

  const handleStatusChange = (id: string, newStatus: 'pending' | 'completed' | 'not-applicable') => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === id ? { ...doc, status: newStatus } : doc
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'not-applicable':
        return <XCircleIcon className="h-6 w-6 text-gray-400" />;
      default:
        return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'not-applicable':
        return 'Not Applicable';
      default:
        return 'Pending';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'not-applicable':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const completedCount = documents.filter(doc => doc.status === 'completed').length;
  const totalRequired = documents.filter(doc => doc.required).length;
  const progressPercentage = Math.round((completedCount / totalRequired) * 100);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Car Buying Paperwork Guide
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Track and manage all the necessary documents for your car purchase
          </p>
        </div>

        {/* Progress Section */}
        <div className="mt-12 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Document Checklist Progress</h2>
          </div>
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {completedCount} of {totalRequired} required documents completed
              </span>
              <span className="text-sm font-medium text-gray-700">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <ul className="divide-y divide-gray-200">
              {documents.map((document) => (
                <li key={document.id} className="px-6 py-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {getStatusIcon(document.status)}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {document.title}
                          {document.required && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Required
                            </span>
                          )}
                        </h3>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                            {getStatusText(document.status)}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {document.description}
                      </p>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Tips:</h4>
                        <ul className="mt-2 list-disc pl-5 space-y-1">
                          {document.tips.map((tip, index) => (
                            <li key={index} className="text-sm text-gray-500">
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <button
                          onClick={() => handleStatusChange(document.id, 'completed')}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          Mark as Completed
                        </button>
                        <button
                          onClick={() => handleStatusChange(document.id, 'not-applicable')}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <XCircleIcon className="h-4 w-4 mr-1" />
                          Not Applicable
                        </button>
                        <button
                          onClick={() => handleStatusChange(document.id, 'pending')}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                          Mark as Pending
                        </button>
                        {document.downloadUrl && (
                          <a
                            href={document.downloadUrl}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
                            Download Template
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Additional Resources</h2>
          </div>
          <div className="px-6 py-5">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 rounded-lg p-5">
                <DocumentTextIcon className="h-8 w-8 text-indigo-600" />
                <h3 className="mt-3 text-lg font-medium text-gray-900">DMV Forms</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Find all the necessary forms for vehicle registration and title transfer.
                </p>
                <a href="#" className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View Forms <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <ClipboardDocumentCheckIcon className="h-8 w-8 text-indigo-600" />
                <h3 className="mt-3 text-lg font-medium text-gray-900">Insurance Guide</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Learn about different types of auto insurance and what coverage you need.
                </p>
                <a href="#" className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Read Guide <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <DocumentDuplicateIcon className="h-8 w-8 text-indigo-600" />
                <h3 className="mt-3 text-lg font-medium text-gray-900">Financing Documents</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Understand the paperwork involved in auto loans and financing.
                </p>
                <a href="#" className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Learn More <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 