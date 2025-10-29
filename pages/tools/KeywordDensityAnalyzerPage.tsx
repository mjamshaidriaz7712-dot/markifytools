import React, { useState, useMemo } from 'react';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

interface KeywordData {
  keyword: string;
  count: number;
  density: string;
}

const KeywordDensityAnalyzerPage: React.FC = () => {
    const [text, setText] = useState('');
    const [minChars, setMinChars] = useState(4);
    const [minCount, setMinCount] = useState(2);
    
    // Common English stop words
    const stopWords = new Set(['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'let', 'me', 'more', 'most', 'my', 'myself', 'nor', 'of', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves']);

    const analysisResult = useMemo(() => {
        if (!text.trim()) {
            return { totalWords: 0, keywords: [] };
        }

        const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
        const totalWords = words.length;
        
        if (totalWords === 0) {
            return { totalWords: 0, keywords: [] };
        }
        
        // FIX: Explicitly cast the initial value of the reduce accumulator to Record<string, number>.
        // This ensures TypeScript correctly infers the type for `wordCounts`, resolving
        // downstream errors where the `count` property was being inferred as `unknown`.
        const wordCounts = words.reduce((acc, word) => {
            if (word.length >= minChars && !stopWords.has(word)) {
                acc[word] = (acc[word] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        const keywords: KeywordData[] = Object.entries(wordCounts)
            .filter(([, count]) => count >= minCount)
            .map(([keyword, count]) => ({
                keyword,
                count,
                density: ((count / totalWords) * 100).toFixed(2)
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 20); // Show top 20 results

        return { totalWords, keywords };
    }, [text, minChars, minCount]);

    return (
        <ToolLayout
            title="Keyword Density Analyzer"
            description="Check the keyword density of a webpage or text to optimize for SEO."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Your Text</h3>
                    <textarea 
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Paste your text here..."
                        className="w-full h-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Analysis Results</h3>
                    <p className="mb-4 text-gray-600">Total Words: <span className="font-bold">{analysisResult.totalWords}</span></p>
                    <div className="overflow-auto max-h-64 border rounded-md">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Keyword</th>
                                    <th scope="col" className="px-6 py-3">Count</th>
                                    <th scope="col" className="px-6 py-3">Density</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analysisResult.keywords.map(item => (
                                    <tr key={item.keyword} className="bg-white border-b hover:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.keyword}</th>
                                        <td className="px-6 py-4">{item.count}</td>
                                        <td className="px-6 py-4">{item.density}%</td>
                                    </tr>
                                ))}
                                {analysisResult.keywords.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="text-center py-4">No significant keywords found. Try pasting more text.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ToolInfoBox title="What is Keyword Density?">
                <p>Keyword density is the percentage of times a keyword or phrase appears on a web page compared to the total number of words on the page. While not as critical as it once was, it's still a good practice to ensure your main keywords appear naturally in your text. Aim for a density of around 1-2% for your primary keyword.</p>
            </ToolInfoBox>

            <RelatedTools currentToolLink="/tools/keyword-density-analyzer" />
        </ToolLayout>
    );
};

export default KeywordDensityAnalyzerPage;