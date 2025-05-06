import { DocumentTextIcon } from '@heroicons/react/24/outline';

const sections = [
  {
    title: 'Acceptance of Terms',
    content: [
      'By accessing and using My First Car, you agree to be bound by these Terms of Service',
      'If you disagree with any part of these terms, you may not access the platform',
      'We reserve the right to modify these terms at any time',
      'Your continued use of the platform after changes constitutes acceptance of the new terms',
    ],
  },
  {
    title: 'User Accounts',
    content: [
      'You must be at least 18 years old to create an account',
      'You are responsible for maintaining the confidentiality of your account',
      'You must provide accurate and complete information when creating an account',
      'You are responsible for all activities that occur under your account',
      'We reserve the right to terminate accounts that violate these terms',
    ],
  },
  {
    title: 'User Content',
    content: [
      'You retain ownership of content you post on the platform',
      'You grant us a license to use, modify, and display your content',
      'You are responsible for the content you post',
      'Content must not violate any laws or infringe on others\' rights',
      'We may remove content that violates these terms',
    ],
  },
  {
    title: 'Prohibited Activities',
    content: [
      'Posting false or misleading information',
      'Harassing or abusing other users',
      'Spamming or unauthorized advertising',
      'Attempting to access restricted areas of the platform',
      'Using the platform for illegal purposes',
    ],
  },
  {
    title: 'Intellectual Property',
    content: [
      'The platform and its content are protected by copyright and other laws',
      'You may not copy or reproduce platform content without permission',
      'Our trademarks and logos may not be used without authorization',
      'You may not reverse engineer or attempt to extract source code',
    ],
  },
  {
    title: 'Disclaimer of Warranties',
    content: [
      'The platform is provided "as is" without warranties of any kind',
      'We do not guarantee the accuracy of car information or recommendations',
      'We are not responsible for any decisions made based on platform content',
      'We do not guarantee uninterrupted or error-free service',
    ],
  },
  {
    title: 'Limitation of Liability',
    content: [
      'We shall not be liable for any indirect, incidental, or consequential damages',
      'Our liability is limited to the amount paid by you for the service',
      'We are not liable for any loss of data or business interruption',
      'Some jurisdictions may not allow these limitations',
    ],
  },
];

export default function TermsOfService() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-indigo-600" />
            <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="mt-12 space-y-12">
            <div className="prose prose-indigo prose-lg mx-auto">
              <p>
                Please read these Terms of Service carefully before using My First Car. By using our
                platform, you agree to these terms and conditions.
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
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@myfirstcar.com" className="text-indigo-600 hover:text-indigo-500">
                  legal@myfirstcar.com
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