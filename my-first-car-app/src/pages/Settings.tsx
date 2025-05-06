import { useState } from 'react';
import { 
  Cog6ToothIcon,
  LanguageIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

interface Settings {
  language: string;
  currency: string;
  region: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showPhone: boolean;
  };
  terms: {
    accepted: boolean;
    lastAccepted: string | null;
  };
}

export default function Settings() {
  const [settings, setSettings] = useState<Settings>({
    language: 'en',
    currency: 'USD',
    region: 'US',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    },
    terms: {
      accepted: true,
      lastAccepted: '2024-03-15'
    }
  });

  const handleNotificationChange = (type: keyof Settings['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handlePrivacyChange = (setting: keyof Settings['privacy'], value: any) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would make an API call to update settings
    alert('Settings saved successfully!');
  };

  const sections = [
    {
      id: 'general',
      name: 'General Settings',
      icon: Cog6ToothIcon,
      description: 'Configure your basic application settings'
    },
    {
      id: 'notifications',
      name: 'Notification Preferences',
      icon: BellIcon,
      description: 'Manage how you receive updates and alerts'
    },
    {
      id: 'privacy',
      name: 'Privacy Settings',
      icon: ShieldCheckIcon,
      description: 'Control your privacy and data sharing preferences'
    },
    {
      id: 'legal',
      name: 'Legal & Terms',
      icon: DocumentTextIcon,
      description: 'View and accept terms of service and privacy policy'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Settings
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Configure your application preferences
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {/* General Settings */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center">
                <Cog6ToothIcon className="h-6 w-6 text-gray-400 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Configure your basic application settings
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={settings.language}
                    onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    value={settings.currency}
                    onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    Region
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={settings.region}
                    onChange={(e) => setSettings(prev => ({ ...prev, region: e.target.value }))}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center">
                <BellIcon className="h-6 w-6 text-gray-400 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Manage how you receive updates and alerts
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.notifications.email}
                    className={`${
                      settings.notifications.email ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    onClick={() => handleNotificationChange('email')}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        settings.notifications.email ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
                    <p className="text-sm text-gray-500">Receive updates via push notifications</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.notifications.push}
                    className={`${
                      settings.notifications.push ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    onClick={() => handleNotificationChange('push')}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        settings.notifications.push ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">Receive updates via SMS</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.notifications.sms}
                    className={`${
                      settings.notifications.sms ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    onClick={() => handleNotificationChange('sms')}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        settings.notifications.sms ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center">
                <ShieldCheckIcon className="h-6 w-6 text-gray-400 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Privacy Settings</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Control your privacy and data sharing preferences
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="profileVisibility" className="block text-sm font-medium text-gray-700">
                    Profile Visibility
                  </label>
                  <select
                    id="profileVisibility"
                    name="profileVisibility"
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Show Email Address</h4>
                    <p className="text-sm text-gray-500">Display your email address on your profile</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.privacy.showEmail}
                    className={`${
                      settings.privacy.showEmail ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    onClick={() => handlePrivacyChange('showEmail', !settings.privacy.showEmail)}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        settings.privacy.showEmail ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Show Phone Number</h4>
                    <p className="text-sm text-gray-500">Display your phone number on your profile</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.privacy.showPhone}
                    className={`${
                      settings.privacy.showPhone ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    onClick={() => handlePrivacyChange('showPhone', !settings.privacy.showPhone)}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        settings.privacy.showPhone ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Legal & Terms */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center">
                <DocumentTextIcon className="h-6 w-6 text-gray-400 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Legal & Terms</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                View and accept terms of service and privacy policy
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Terms of Service</h4>
                    <p className="text-sm text-gray-500">
                      Last accepted: {settings.terms.lastAccepted || 'Never'}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Terms
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Privacy Policy</h4>
                    <p className="text-sm text-gray-500">Read our privacy policy</p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Policy
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveSettings}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 