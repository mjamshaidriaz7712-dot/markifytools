import React, { useState, useMemo } from 'react';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

const WordCounterPage: React.FC = () => {
    const [text, setText] = useState('');

    const stats = useMemo(() => {
        const trimmedText = text.trim();
        const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
        const characters = text.length;
        const paragraphs = trimmedText ? trimmedText.split(/\n+/).length : 0;
        return { words, characters, paragraphs };
    }, [text]);

    return (
        <ToolLayout
            title="Word Counter"
            description="Quickly count words, characters, and paragraphs in your text."
        >
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6 text-center">
                <div className="bg-light p-4 rounded-lg min-w-[120px]">
                    <div className="text-3xl font-bold text-primary">{stats.words}</div>
                    <div className="text-gray-600">Words</div>
                </div>
                <div className="bg-light p-4 rounded-lg min-w-[120px]">
                    <div className="text-3xl font-bold text-primary">{stats.characters}</div>
                    <div className="text-gray-600">Characters</div>
                </div>
                <div className="bg-light p-4 rounded-lg min-w-[120px]">
                    <div className="text-3xl font-bold text-primary">{stats.paragraphs}</div>
                    <div className="text-gray-600">Paragraphs</div>
                </div>
            </div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here..."
                className="w-full h-80 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <ToolInfoBox title="Why Word Count Matters">
                <p>Whether you're writing a blog post with a target length for SEO, a tweet that needs to be under the character limit, or an ad with limited space, knowing your word and character count is essential for effective communication.</p>
            </ToolInfoBox>
            <RelatedTools currentToolLink="/tools/word-counter" />
        </ToolLayout>
    );
};

export default WordCounterPage;
