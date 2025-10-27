import React, { useState, useMemo } from 'react';
import ToolLayout from '../../components/ToolLayout';

const RoiCalculatorPage: React.FC = () => {
  const [investment, setInvestment] = useState('');
  const [revenue, setRevenue] = useState('');
  const [conversions, setConversions] = useState('');

  const { roi, cpa } = useMemo(() => {
    const numInvestment = parseFloat(investment) || 0;
    const numRevenue = parseFloat(revenue) || 0;
    const numConversions = parseInt(conversions) || 0;

    const calculatedRoi = numInvestment > 0 ? ((numRevenue - numInvestment) / numInvestment) * 100 : 0;
    const calculatedCpa = numConversions > 0 ? numInvestment / numConversions : 0;

    return { roi: calculatedRoi, cpa: calculatedCpa };
  }, [investment, revenue, conversions]);

  return (
    <ToolLayout
      title="ROI & Ad Spend Calculator"
      description="Compute your Return on Investment (ROI) and Cost Per Acquisition (CPA)."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="investment" className="block text-sm font-medium text-gray-700">Total Investment (Ad Spend)</label>
            <input type="number" id="investment" value={investment} onChange={e => setInvestment(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., 1000" />
          </div>
          <div>
            <label htmlFor="revenue" className="block text-sm font-medium text-gray-700">Total Revenue from Campaign</label>
            <input type="number" id="revenue" value={revenue} onChange={e => setRevenue(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., 5000" />
          </div>
          <div>
            <label htmlFor="conversions" className="block text-sm font-medium text-gray-700">Total Conversions (Sales/Leads)</label>
            <input type="number" id="conversions" value={conversions} onChange={e => setConversions(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., 50" />
          </div>
        </div>
        
        <div className="space-y-6">
            <div className="text-center p-6 bg-light rounded-lg">
                <h3 className="text-lg font-semibold text-dark">Return on Investment (ROI)</h3>
                <p className={`text-6xl font-bold my-2 ${roi >= 0 ? 'text-green-600' : 'text-red-500'}`}>{roi.toFixed(2)}%</p>
                <p className="text-gray-600">The profit generated for every dollar invested.</p>
            </div>
            <div className="text-center p-6 bg-light rounded-lg">
                <h3 className="text-lg font-semibold text-dark">Cost Per Acquisition (CPA)</h3>
                <p className="text-6xl font-bold text-primary my-2">${cpa.toFixed(2)}</p>
                <p className="text-gray-600">The average cost to acquire one customer.</p>
            </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default RoiCalculatorPage;