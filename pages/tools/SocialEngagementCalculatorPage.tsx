import React, { useState, useMemo } from 'react';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

const SocialEngagementCalculatorPage: React.FC = () => {
    const [likes, setLikes] = useState('');
    const [comments, setComments] = useState('');
    const [shares, setShares] = useState('');
    const [followers, setFollowers] = useState('');

    const engagementRate = useMemo(() => {
        const numLikes = parseInt(likes) || 0;
        const numComments = parseInt(comments) || 0;
        const numShares = parseInt(shares) || 0;
        const numFollowers = parseInt(followers) || 0;

        if (numFollowers === 0) {
            return 0;
        }

        const totalEngagements = numLikes + numComments + numShares;
        const rate = (totalEngagements / numFollowers) * 100;
        return rate.toFixed(2);
    }, [likes, comments, shares, followers]);

    const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary";
    const labelClass = "block text-gray-700 font-semibold mb-2";

    return (
        <ToolLayout
            title="Social Engagement Calculator"
            description="Calculate the engagement rate of your social media posts and profiles."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="likes" className={labelClass}>Total Likes</label>
                        <input type="number" id="likes" value={likes} onChange={e => setLikes(e.target.value)} className={inputClass} />
                    </div>
                     <div>
                        <label htmlFor="comments" className={labelClass}>Total Comments</label>
                        <input type="number" id="comments" value={comments} onChange={e => setComments(e.target.value)} className={inputClass} />
                    </div>
                     <div>
                        <label htmlFor="shares" className={labelClass}>Total Shares</label>
                        <input type="number" id="shares" value={shares} onChange={e => setShares(e.target.value)} className={inputClass} />
                    </div>
                     <div>
                        <label htmlFor="followers" className={labelClass}>Total Followers</label>
                        <input type="number" id="followers" value={followers} onChange={e => setFollowers(e.target.value)} className={inputClass} />
                    </div>
                </div>
                <div className="text-center bg-light p-8 rounded-lg">
                    <h3 className="text-xl text-gray-600 mb-2">Engagement Rate</h3>
                    <p className="text-6xl font-bold text-primary">{engagementRate}%</p>
                </div>
            </div>
            
            <ToolInfoBox title="What is a good engagement rate?">
                <p>Engagement rates vary by platform and industry. Generally, an engagement rate of 1% to 5% is considered good. This tool helps you benchmark your performance and track improvement over time.</p>
            </ToolInfoBox>

            <RelatedTools currentToolLink="/tools/engagement-calculator" />
        </ToolLayout>
    );
};

export default SocialEngagementCalculatorPage;
