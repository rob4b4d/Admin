import { useState, useEffect } from 'react';
import '../index.css';
import axiosClient from '../axios-client';

function Dashboard() {
  const [data, setData] = useState([]);
  const [processedData, setProcessedData] = useState([]);

  // Get the current date in the format YYYY-MM-DD
  const currentDate = new Date().toISOString().split('T')[0];

  // Fetch data on component mount
  useEffect(() => {
    const fetchDailyFares = async () => {
      try {
        const response = await axiosClient.get('/reports'); // Correct endpoint
        console.log('Fetched data:', response.data); // Debug response
        setData(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching daily fares:', error);
      }
    };

    fetchDailyFares();
  }, []);

  console.log({ data: data });

  useEffect(() => {
    const processFares = () => {
      const groupedData = {};

      // Filter data to include only the current date
      const filteredData = data.filter(item => item.date === currentDate);

      filteredData.forEach((item) => {
        const { username, bus_num, route, regular_total, discounted_total, date } = item;

        const key = `${bus_num}-${username}-${date}`; // Create a unique key for each bus, username, and date combination

        if (!groupedData[key]) {
          groupedData[key] = {
            bus_num,
            username,
            date,
            routeCount: 0, // Track the number of route entries
            total: 0,
          };
        }

        groupedData[key].routeCount += 1; // Increment route count for each entry
        groupedData[key].total += parseFloat(regular_total) + parseFloat(discounted_total); // Aggregate fare totals
      });

      // Convert grouped data to an array
      const result = Object.values(groupedData).map((entry) => ({
        'BUS NO.': entry.bus_num,
        USERNAME: entry.username,
        DATE: entry.date, // Include date in the processed data
        'ROUTE COUNT': entry.routeCount, // Use route count instead of Set size
        TOTAL: entry.total.toFixed(2),
      }));

      // Sort the result array by date in ascending order (latest to oldest)
      result.sort((a, b) => {
        const dateA = new Date(a.DATE);
        const dateB = new Date(b.DATE);
        return dateB - dateA; // Sort in descending order (latest to oldest)
      });

      console.log('Processed and sorted data:', result); // Debug processed and sorted data
      setProcessedData(result);
    };

    if (data.length > 0) {
      processFares();
    }
  }, [data, currentDate]); // Add currentDate as a dependency to ensure it updates when the date changes

  return (
    <div className="dashboard">
      <main className="main-content">
        <h1>Daily Counts</h1>
        {processedData.length === 0 ? (
          <p>No data available for today</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>BUS NO.</th>
                <th>USERNAME</th>
                <th>DATE</th>
                <th>ROUTE COUNT</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {processedData.map((row, index) => (
                <tr key={index}>
                  <td>{row['BUS NO.']}</td>
                  <td>{row.USERNAME}</td>
                  <td>{row.DATE}</td>
                  <td>{row['ROUTE COUNT']}</td>
                  <td>{row.TOTAL}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
