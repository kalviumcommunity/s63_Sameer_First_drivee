import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChatBubbleLeftIcon,
  ClockIcon,
  UserIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  replies: number;
  views: number;
  tags: string[];
}

const samplePosts: Post[] = [
  {
    id: 1,
    title: 'Best first car under $15,000?',
    content: 'Looking for recommendations for a reliable first car with good fuel economy...',
    author: 'JohnDoe',
    createdAt: '2024-03-15T10:30:00Z',
    replies: 12,
    views: 156,
    tags: ['first-car', 'budget', 'recommendations'],
  },
  {
    id: 2,
    title: 'Tips for negotiating car prices',
    content: 'What are some effective strategies for negotiating with car dealers...',
    author: 'CarExpert',
    createdAt: '2024-03-14T15:45:00Z',
    replies: 8,
    views: 89,
    tags: ['negotiation', 'tips', 'dealer'],
  },
];

export default function CommunityForum() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(
    new Set(samplePosts.flatMap((post) => post.tags))
  ).sort();

  const filteredPosts = samplePosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.every((tag) => post.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Community Forum</h1>
              <p className="mt-2 text-sm text-gray-700">
                Join the conversation with other first-time car buyers
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                to="/forum/new"
                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                New Post
              </Link>
            </div>
          </div>

          {/* Search and filters */}
          <div className="space-y-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                    selectedTags.includes(tag)
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Posts list */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/forum/post/${post.id}`}
                className="block rounded-lg border border-gray-200 bg-white p-6 hover:border-gray-300"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h2 className="text-lg font-medium text-gray-900">{post.title}</h2>
                    <p className="text-sm text-gray-500 line-clamp-2">{post.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <ChatBubbleLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                      {post.replies}
                    </div>
                    <div className="flex items-center">
                      <UserIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                      {post.views}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="text-sm text-gray-500">{post.author}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                    {formatDate(post.createdAt)}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 