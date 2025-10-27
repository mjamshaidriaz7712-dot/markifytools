import React, { useState, useMemo } from 'react';
import ToolLayout from '../../components/ToolLayout';

const SocialEngagementCalculatorPage: React.FC = () => {
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [shares, setShares] = useState('');
  const [followers, setFollowers] = useState('');

  const engagementRate = useMemo(() => {
    const numLikes = parseInt(likes) || 0;
    const numComments = parseInt(comments) || 0;
    const numShares = parseInt(shares) || 0;
    const numFollowers = parseInt(followers) || 1; // Avoid division by zero

    if (numFollowers === 0 || (!likes && !comments && !shares)) return 0;

    const totalEngagements = numLikes + numComments + numShares;
    return (totalEngagements / numFollowers) * 100;
  }, [likes, comments, shares, followers]);

  return (
    <ToolLayout
      title="Social Engagement Calculator"
      description="Calculate the engagement rate of a post based on likes, comments, and shares."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div>
            <label htmlFor="likes" className="block text-sm font-medium text-gray-700">Likes</label>
            <input type="number" id="likes" value={likes} onChange={e => setLikes(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="0" />
          </div>
          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments</label>
            <input type="number" id="comments" value={comments} onChange={e => setComments(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="0" />
          </div>
          <div>
            <label htmlFor="shares" className="block text-sm font-medium text-gray-700">Shares</label>
            <input type="number" id="shares" value={shares} onChange={e => setShares(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="0" />
          </div>
          <div>
            <label htmlFor="followers" className="block text-sm font-medium text-gray-700">Total Followers</label>
            <input type="number" id="followers" value={followers} onChange={e => setFollowers(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="0" />
          </div>
        </div>
        
        <div className="text-center p-8 bg-light rounded-lg">
            <h3 className="text-lg font-semibold text-dark">Engagement Rate</h3>
            <p className="text-6xl font-bold text-primary my-2">{engagementRate.toFixed(2)}%</p>
            <p className="text-gray-600">This is the percentage of your followers who engaged with your post.</p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default SocialEngagementCalculatorPage;