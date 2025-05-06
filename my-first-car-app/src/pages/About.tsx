import { 
  UserGroupIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  HeartIcon,
  ChartBarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Expert Guidance',
    description: 'Access comprehensive guides and expert advice to make informed decisions about your first car purchase.',
    icon: LightBulbIcon,
  },
  {
    name: 'Community Support',
    description: 'Join a community of first-time car buyers and experienced owners to share knowledge and experiences.',
    icon: UserGroupIcon,
  },
  {
    name: 'Trusted Information',
    description: 'Get reliable, up-to-date information about cars, prices, and market trends from trusted sources.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Personalized Experience',
    description: 'Receive personalized car recommendations based on your budget, needs, and preferences.',
    icon: HeartIcon,
  },
  {
    name: 'Data-Driven Insights',
    description: 'Make decisions backed by real data, including price comparisons, reliability ratings, and ownership costs.',
    icon: ChartBarIcon,
  },
  {
    name: 'Global Perspective',
    description: 'Access information about cars and markets from around the world to make well-informed choices.',
    icon: GlobeAltIcon,
  },
];

const team = [
  {
    name: 'John Smith',
    role: 'Founder & CEO',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Sarah Johnson',
    role: 'Head of Product',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Michael Brown',
    role: 'Lead Developer',
    imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emily Davis',
    role: 'Content Strategist',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About My First Car
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            We're on a mission to help first-time car buyers make informed decisions and find their perfect vehicle.
            Our platform combines expert guidance, community support, and data-driven insights to simplify the car buying journey.
          </p>
        </div>
      </div>

      {/* Mission section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Our Mission</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Empowering First-Time Car Buyers
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            We believe that buying your first car should be an exciting and informed experience.
            Our platform provides the tools, resources, and support you need to make confident decisions.
          </p>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Features</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Everything You Need
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Our platform offers comprehensive tools and resources to guide you through your car buying journey.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                      <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Our Team</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            Meet the People Behind My First Car
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            We're a team of car enthusiasts, developers, and industry experts passionate about helping first-time buyers.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <div key={person.name} className="text-center">
                <div className="space-y-4">
                  <img
                    className="mx-auto h-20 w-20 rounded-full"
                    src={person.imageUrl}
                    alt={person.name}
                  />
                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3>{person.name}</h3>
                      <p className="text-indigo-600">{person.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-indigo-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to start your car buying journey?</span>
            <span className="block text-indigo-600">Join our community today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 