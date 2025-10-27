import React from 'react';
import { LightbulbIcon } from './icons';

interface ToolInfoBoxProps {
    title: string;
    children: React.ReactNode;
}

const ToolInfoBox: React.FC<ToolInfoBoxProps> = ({ title, children }) => {
    return (
        <div className="mt-12 bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
            <div className="flex">
                <div className="flex-shrink-0">
                    <LightbulbIcon className="h-8 w-8 text-primary" />
                </div>
                <div className="ml-4">
                    <h3 className="text-xl font-bold text-dark">{title}</h3>
                    <div className="mt-2 text-md text-gray-700 space-y-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolInfoBox;
