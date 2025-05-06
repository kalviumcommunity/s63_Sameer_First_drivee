import { Link } from 'react-router-dom';
import {
  BookOpenIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ArrowsRightLeftIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Buying Guide',
    description: 'Step-by-step guide to help you make informed decisions throughout your car buying journey.',
    icon: BookOpenIcon,
    href: '/buying-guide',
  },
  {
    name: 'Car Suggestions',
    description: 'Get personalized car recommendations based on your budget and preferences.',
    icon: CurrencyDollarIcon,
    href: '/car-suggestions',
  },
  {
    name: 'Car Comparison',
    description: 'Compare different car models side by side to find the best match for your needs.',
    icon: ArrowsRightLeftIcon,
    href: '/car-comparison',
  },
  {
    name: 'Paperwork Guide',
    description: 'Navigate through all the necessary documentation and legal requirements.',
    icon: DocumentTextIcon,
    href: '/paperwork',
  },
  {
    name: 'Community Forum',
    description: 'Connect with other first-time car buyers and share experiences.',
    icon: UserGroupIcon,
    href: '/forum',
  },
  {
    name: 'Checklist',
    description: 'Stay organized with our comprehensive car buying checklist.',
    icon: ClipboardDocumentCheckIcon,
    href: '/buying-guide#checklist',
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Your Journey to Your First Car Starts Here
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  We're here to guide you through every step of buying your first car. From setting a budget to
                  signing the papers, we've got you covered.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    to="/buying-guide"
                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Get started
                  </Link>
                  <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Complete Car Buying Companion
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We provide all the tools and resources you need to make your first car purchase with confidence.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <Link
                      to={feature.href}
                      className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 