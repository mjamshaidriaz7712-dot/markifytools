import React, { useState, useMemo } from 'react';
import ToolLayout from '../../components/ToolLayout';
import ToolInfoBox from '../../components/ToolInfoBox';
import RelatedTools from '../../components/RelatedTools';

const RoiCalculatorPage: React.FC = () => {
    const [investment, setInvestment] = useState('');
    const [revenue, setRevenue] = useState('');

    const roi = useMemo(() => {
        const numInvestment = parseFloat(investment) || 0;
        const numRevenue = parseFloat(revenue) || 0;

        if (numInvestment === 0) {
            return 0;
        }

        const calculatedRoi = ((numRevenue - numInvestment) / numInvestment) * 100;
        return calculatedRoi.toFixed(2);
    }, [investment, revenue]);

    const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary";
    const labelClass = "block text-gray-700 font-semibold mb-2";

    return (
        <ToolLayout
            title="ROI Calculator"
            description="Calculate the return on investment (ROI) of your marketing campaigns."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="investment" className={labelClass}>Amount Invested ($)</label>
                        <input type="number" id="investment" value={investment} onChange={e => setInvestment(e.target.value)} className={inputClass} placeholder="e.g. 500" />
                    </div>
                     <div>
                        <label htmlFor="revenue" className={labelClass}>Revenue Generated ($)</label>
                        <input type="number" id="revenue" value={revenue} onChange={e => setRevenue(e.target.value)} className={inputClass} placeholder="e.g. 2500" />
                    </div>
                </div>
                <div className="text-center bg-light p-8 rounded-lg">
                    <h3 className="text-xl text-gray-600 mb-2">Return on Investment (ROI)</h3>
                    <p className="text-6xl font-bold text-primary">{roi}%</p>
                </div>
            </div>
            
            <ToolInfoBox title="Understanding ROI">
                <p>Return on Investment (ROI) is a performance measure used to evaluate the efficiency of an investment. It measures the amount of return on a particular investment, relative to the investment's cost. A high ROI means the investment's gains compare favorably to its cost.</p>
            </ToolInfoBox>

            <RelatedTools currentToolLink="/tools/roi-calculator" />
        </ToolLayout>
    );
};

export default RoiCalculatorPage;
