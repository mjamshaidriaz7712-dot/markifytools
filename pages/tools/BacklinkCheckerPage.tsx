import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

interface FakeBacklink {
    source: string;
    domainAuthority: number;
    anchorText: string;
}

const FAKE_DATA: FakeBacklink[] = [
    { source: 'techcrunch.com/article/new-startup', domainAuthority: 94, anchorText: 'innovative new tool' },
    { source: 'forbes.com/business/top-tools', domainAuthority: 95, anchorText: 'Markify Tools' },
    { source: 'producthunt.com/posts/markify', domainAuthority: 88, anchorText: 'a free suite of tools' },
    { source: 'marketingblog.com/reviews', domainAuthority: 65, anchorText: 'check out this analyzer' },
    { source: 'smashingmagazine.com/design-resources', domainAuthority: 89, anchorText: 'useful resource' },
];

const BacklinkCheckerPage: React.FC = () => {
    const [domain, setDomain] = useState('');
    const [results, setResults] = useState<FakeBacklink[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCheck = () => {
        if (!domain) {
            setError('Please enter a domain to check.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResults(null);

        // Simulate API call
        setTimeout(() => {
            setResults(FAKE_DATA);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <ToolLayout
            title="Backlink Checker (Demo)"
            description="Enter a domain to see some basic backlink statistics. This is a demonstration and uses sample data."
        >
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., yourwebsite.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                    />
                    <button
                        onClick={handleCheck}
                        disabled={isLoading}
                        className="bg-primary text-white font-bold py-2 px-6 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center whitespace-nowrap"
                    >
                        {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                        {isLoading ? 'Checking...' : 'Check Backlinks'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {results && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2 text-dark">Showing sample results for <span className="font-bold">{domain}</span></h3>
                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source URL</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Domain Authority</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Anchor Text</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {results.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:underline cursor-pointer">{item.source}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.domainAuthority}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.anchorText}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default BacklinkCheckerPage;