import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChatBubbleLeftIcon, 
  EyeIcon, 
  ClockIcon,
  UserCircleIcon,
  HeartIcon,
  ShareIcon,
  FlagIcon
} from '@heroicons/react/24/outline';

interface Reply {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  replies: Reply[];
  views: number;
  likes: number;
  tags: string[];
}

// Sample data - replace with API call
const samplePost: Post = {
  id: '1',
  title: 'What should I consider when buying my first car?',
  content: `I'm looking to buy my first car and I'm feeling overwhelmed with all the options and considerations. 
  My budget is around $15,000, and I'm looking for something reliable and fuel-efficient. 
  I've been looking at used Honda Civics and Toyota Corollas, but I'm not sure if that's the best choice.
  
  What factors should I consider? Any advice would be greatly appreciated!`,
  author: 'FirstTimeBuyer',
  createdAt: '2024-03-15T10:30:00Z',
  views: 156,
  likes: 23,
  tags: ['first-car', 'budget', 'recommendations'],
  replies: [
    {
      id: '1',
      content: 'For your budget, both the Civic and Corolla are excellent choices! They're known for their reliability and fuel efficiency. Make sure to check the vehicle history report and get a pre-purchase inspection.',
      author: 'CarExpert',
      createdAt: '2024-03-15T11:00:00Z',
      likes: 12
    },
    {
      id: '2',
      content: 'Don't forget to factor in insurance costs, maintenance, and fuel expenses. Also, consider the cost of replacement parts and the availability of mechanics who can work on your chosen model.',
      author: 'AutoAdvisor',
      createdAt: '2024-03-15T11:30:00Z',
      likes: 8
    }
  ]
};

export default function PostDetail() {
  const { id } = useParams();
  const [post] = useState<Post>(samplePost);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    // Here you would typically make an API call to submit the reply
    console.log('Submitting reply:', replyContent);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setReplyContent('');
    }, 1000);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Post Header */}
          <div>
            <div className="flex items-center space-x-4">
              <Link to="/forum" className="text-sm text-indigo-600 hover:text-indigo-500">
                ← Back to Forum
              </Link>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <UserCircleIcon className="mr-1.5 h-5 w-5" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="mr-1.5 h-5 w-5" />
                    {formatDate(post.createdAt)}
                  </div>
                  <div className="flex items-center">
                    <EyeIcon className="mr-1.5 h-5 w-5" />
                    {post.views} views
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{post.content}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 border-t border-b border-gray-200 py-4">
            <button className="flex items-center text-gray-500 hover:text-gray-700">
              <HeartIcon className="mr-1.5 h-5 w-5" />
              {post.likes} Likes
            </button>
            <button className="flex items-center text-gray-500 hover:text-gray-700">
              <ShareIcon className="mr-1.5 h-5 w-5" />
              Share
            </button>
            <button className="flex items-center text-gray-500 hover:text-gray-700">
              <FlagIcon className="mr-1.5 h-5 w-5" />
              Report
            </button>
          </div>

          {/* Replies Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">
              {post.replies.length} Replies
            </h2>

            {/* Reply Form */}
            <form onSubmit={handleSubmitReply} className="space-y-4">
              <div>
                <label htmlFor="reply" className="sr-only">
                  Your reply
                </label>
                <textarea
                  id="reply"
                  rows={4}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Write your reply..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !replyContent.trim()}
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Posting...' : 'Post Reply'}
                </button>
              </div>
            </form>

            {/* Replies List */}
            <div className="space-y-6">
              {post.replies.map((reply) => (
                <div key={reply.id} className="rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center space-x-4">
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{reply.author}</div>
                      <div className="text-sm text-gray-500">{formatDate(reply.createdAt)}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-gray-700">{reply.content}</div>
                  <div className="mt-4 flex items-center space-x-4">
                    <button className="flex items-center text-gray-500 hover:text-gray-700">
                      <HeartIcon className="mr-1.5 h-5 w-5" />
                      {reply.likes} Likes
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-gray-700">
                      <ChatBubbleLeftIcon className="mr-1.5 h-5 w-5" />
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 