import React, { useState, useMemo } from 'react';
import ToolLayout from '../../components/ToolLayout';

interface DensityResult {
  keyword: string;
  count: number;
  density: string;
}

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', "aren't", 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', "can't", 'cannot',
  'could', "couldn't", 'did', "didn't", 'do', 'does', "doesn't", 'doing', "don't", 'down', 'during', 'each', 'few',
  'for', 'from', 'further', 'had', "hadn't", 'has', "hasn't", 'have', "haven't", 'having', 'he', "he'd", "he'll",
  "he's", 'her', 'here', "here's", 'hers', 'herself', 'him', 'himself', 'his', 'how', "how's", 'i', "i'd", "i'll",
  "i'm", "i've", 'if', 'in', 'into', 'is', "isn't", 'it', "it's", 'its', 'itself', "let's", 'me', 'more', 'most',
  "mustn't", 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our',
  'ours', 'ourselves', 'out', 'over', 'own', 'same', "shan't", 'she', "she'd", "she'll", "she's", 'should',
  "shouldn't", 'so', 'some', 'such', 'than', 'that', "that's", 'the', 'their', 'theirs', 'them', 'themselves',
  'then', 'there', "there's", 'these', 'they', "they'd", "they'll", "they're", "they've", 'this', 'those',
  'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', "wasn't", 'we', "we'd", "we'll", "we're",
  "we've", 'were', "weren't", 'what', "what's", 'when', "when's", 'where', "where's", 'which', 'while', 'who',
  "who's", 'whom', 'why', "why's", 'with', "won't", 'would', "wouldn't", 'you', "you'd", "you'll", "you're",
  "you've", 'your', 'yours', 'yourself', 'yourselves'
]);

const KeywordDensityAnalyzerPage: React.FC = () => {
  const [text, setText] = useState('');
  const [minChars, setMinChars] = useState(4);
  const [phraseLength, setPhraseLength] = useState(1);

  const results: DensityResult[] = useMemo(() => {
    if (!text.trim()) return [];
    
    const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
    if (words.length === 0) return [];

    const phrases = [];
    if (phraseLength > 1) {
        for (let i = 0; i <= words.length - phraseLength; i++) {
            const phrase = words.slice(i, i + phraseLength).join(' ');
            phrases.push(phrase);
        }
    }
    const itemsToCount = phraseLength > 1 ? phrases : words;
    const totalItems = itemsToCount.length;
    if (totalItems === 0) return [];

    const counts: { [key: string]: number } = {};
    itemsToCount.forEach(item => {
        if (phraseLength === 1 && (STOP_WORDS.has(item) || item.length < minChars)) {
            return;
        }
        counts[item] = (counts[item] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: ((count / totalItems) * 100).toFixed(2) + '%',
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50);

  }, [text, minChars, phraseLength]);

  return (
    <ToolLayout
      title="Keyword Density Analyzer"
      description="Analyze text to find keyword frequency and density for SEO."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <textarea
            rows={15}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex space-x-4">
            <div>
              <label className="block text-sm font-medium">Min word length</label>
              <input type="number" value={minChars} onChange={e => setMinChars(parseInt(e.target.value) || 1)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Phrase length</label>
              <select value={phraseLength} onChange={e => setPhraseLength(parseInt(e.target.value))} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                <option value={1}>1 word</option>
                <option value={2}>2 words</option>
                <option value={3}>3 words</option>
              </select>
            </div>
          </div>
        </div>
        <div className="h-[450px] overflow-y-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-light sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keyword/Phrase</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Density</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.length > 0 ? results.map(item => (
                <tr key={item.keyword}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.keyword}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.count}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.density}</td>
                </tr>
              )) : (
                  <tr>
                      <td colSpan={3} className="text-center py-10 text-gray-500">No results to display.</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ToolLayout>
  );
};

export default KeywordDensityAnalyzerPage;