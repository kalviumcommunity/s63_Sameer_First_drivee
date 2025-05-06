import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const sections = [
  {
    title: 'Information We Collect',
    content: [
      'Personal information (name, email, contact details)',
      'Vehicle preferences and search history',
      'User-generated content (forum posts, comments)',
      'Usage data and analytics',
      'Device and browser information',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'To provide personalized car recommendations',
      'To improve our services and user experience',
      'To communicate with you about your account',
      'To send relevant updates and newsletters',
      'To ensure platform security and prevent fraud',
    ],
  },
  {
    title: 'Information Sharing',
    content: [
      'We do not sell your personal information',
      'We may share data with trusted partners who assist in providing our services',
      'We may disclose information if required by law',
      'We may share anonymized data for analytics purposes',
    ],
  },
  {
    title: 'Data Security',
    content: [
      'We implement industry-standard security measures',
      'Your data is encrypted during transmission',
      'Regular security audits and updates',
      'Limited employee access to personal data',
    ],
  },
  {
    title: 'Your Rights',
    content: [
      'Access your personal information',
      'Request corrections to your data',
      'Delete your account and associated data',
      'Opt-out of marketing communications',
      'Export your data in a portable format',
    ],
  },
  {
    title: 'Cookies and Tracking',
    content: [
      'We use cookies to improve user experience',
      'You can control cookie preferences in your browser',
      'We use analytics tools to understand usage patterns',
      'Third-party cookies are used for specific features',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <ShieldCheckIcon className="mx-auto h-12 w-12 text-indigo-600" />
            <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="mt-12 space-y-12">
            <div className="prose prose-indigo prose-lg mx-auto">
              <p>
                At My First Car, we take your privacy seriously. This policy explains how we collect,
                use, and protect your personal information when you use our platform.
              </p>
            </div>

            {sections.map((section) => (
              <div key={section.title} className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-indigo-500">•</span>
                      <span className="ml-3 text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="prose prose-indigo prose-lg mx-auto">
              <h2>Contact Us</h2>
              <p>
                If you have any questions about our privacy policy or how we handle your data,
                please contact our privacy team at{' '}
                <a href="mailto:privacy@myfirstcar.com" className="text-indigo-600 hover:text-indigo-500">
                  privacy@myfirstcar.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 