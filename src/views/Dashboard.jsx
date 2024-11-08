import { useState, useEffect } from 'react';
import '../index.css'; // Ensure this file includes your styles

function Dashboard() {
  const [data, setData] = useState([]);

  // Sample data for demonstration (remove when using API)
  useEffect(() => {
    setData([
      {
        date: '2024-11-01',
        busNo: 'A123',
        username: 'john_doe',
        route: 'Route 1',
        total: 45,
      },
      {
        date: '2024-11-01',
        busNo: 'B456',
        username: 'jane_smith',
        route: 'Route 2',
        total: 38,
      },
      {
        date: '2024-11-02',
        busNo: 'C789',
        username: 'mark_jones',
        route: 'Route 3',
        total: 50,
      },
      {
        date: '2024-11-02',
        busNo: 'D012',
        username: 'emily_davis',
        route: 'Route 4',
        total: 42,
      },
    ]);
  }, []);

  return (
    <div className="dashboard">
      <main className="main-content">
        <h1>Daily Counts</h1>
        {/* Display a message if there's no data */}
        {data.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>BUS NO.</th>
                <th>USERNAME</th>
                <th>ROUTE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.busNo}</td>
                  <td>{item.username}</td>
                  <td>{item.route}</td>
                  <td>{item.total}</td>
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
