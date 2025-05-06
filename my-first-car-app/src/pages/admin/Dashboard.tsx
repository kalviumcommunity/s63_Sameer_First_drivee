import { useState } from 'react';
import {
  UsersIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  FlagIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

interface DashboardStat {
  name: string;
  value: number;
  change: number;
  icon: any;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'resolved' | 'flagged';
}

const stats: DashboardStat[] = [
  {
    name: 'Total Users',
    value: 2457,
    change: 12,
    icon: UsersIcon,
  },
  {
    name: 'Forum Posts',
    value: 856,
    change: 7,
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Car Listings',
    value: 324,
    change: -3,
    icon: DocumentTextIcon,
  },
  {
    name: 'Active Sessions',
    value: 145,
    change: 15,
    icon: ChartBarIcon,
  },
];

const recentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'User Report',
    description: 'Spam content reported in forum thread #1234',
    timestamp: '2024-03-15T10:30:00Z',
    status: 'pending',
  },
  {
    id: '2',
    type: 'New Registration',
    description: 'New dealer account registration pending approval',
    timestamp: '2024-03-15T09:45:00Z',
    status: 'pending',
  },
  {
    id: '3',
    type: 'Content Flag',
    description: 'Inappropriate content flagged in car listing #5678',
    timestamp: '2024-03-15T08:15:00Z',
    status: 'resolved',
  },
  {
    id: '4',
    type: 'System Alert',
    description: 'High server load detected',
    timestamp: '2024-03-15T07:30:00Z',
    status: 'flagged',
  },
];

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Monitor and manage your platform's performance, users, and content.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change >= 0 ? '+' : ''}
                {stat.change}%
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`${
              selectedTab === 'overview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedTab('users')}
            className={`${
              selectedTab === 'users'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Users
          </button>
          <button
            onClick={() => setSelectedTab('content')}
            className={`${
              selectedTab === 'content'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Content
          </button>
          <button
            onClick={() => setSelectedTab('reports')}
            className={`${
              selectedTab === 'reports'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Reports
          </button>
        </nav>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <li key={activity.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {activity.type === 'User Report' ? (
                        <FlagIcon className="h-5 w-5 text-yellow-500" />
                      ) : activity.type === 'System Alert' ? (
                        <ShieldCheckIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                      )}
                      <p className="ml-2 truncate text-sm font-medium text-gray-900">
                        {activity.type}
                      </p>
                    </div>
                    <div className="ml-2 flex flex-shrink-0">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          activity.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : activity.status === 'resolved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <time dateTime={activity.timestamp}>
                      {new Date(activity.timestamp).toLocaleString()}
                    </time>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 