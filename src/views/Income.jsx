import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';

const Income = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchDailyFares = async () => {
            try {
                const response = await axiosClient.get('/fare-collectionsv2');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching daily fares:', error);
            }
        };

        fetchDailyFares();
    }, []);

    const handleDateFilter = () => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            const filtered = data
                .filter(record => {
                    const recordDate = new Date(record.date);
                    // Check if the start and end dates are the same
                    if (start.toDateString() === end.toDateString()) {
                        return recordDate.toDateString() === start.toDateString();
                    } else {
                        return recordDate >= start && recordDate <= end;
                    }
                })
                .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (latest to oldest)

            setFilteredData(filtered);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Income Tally</h1>

            {/* Date Range Picker */}
            <div className="mb-4 flex items-center">
                <label className="mr-2">Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-2 border rounded mr-4"
                />
                <label className="mr-2">End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-2 border rounded mr-4"
                />
                <button
                    onClick={handleDateFilter}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    Filter
                </button>
            </div>

            {/* Filtered Data Table */}
            <h2 className="text-xl font-semibold mb-2">Filtered Records</h2>
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Date</th>
                        <th className="border border-gray-300 p-2">Regular Total</th>
                        <th className="border border-gray-300 p-2">Discounted Total</th>
                        <th className="border border-gray-300 p-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((record, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">
                                {new Date(record.date).toLocaleString()}
                            </td>
                            <td className="border border-gray-300 p-2">
                                ₱{parseFloat(record.regular_total).toFixed(2)}
                            </td>
                            <td className="border border-gray-300 p-2">
                                ₱{parseFloat(record.discounted_total).toFixed(2)}
                            </td>
                            <td className="border border-gray-300 p-2">
                                ₱{(parseFloat(record.regular_total) + parseFloat(record.discounted_total)).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Income;
