import { useState, useEffect } from 'react';
import '../index.css'; // Ensure this file includes your styles
import DataTable from '../components/Table';

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

  // const data = [
  //   { date: '2024-11-01', busNo: '101', username: 'user1', route: 'Route A', total: '100' },
  //   { date: '2024-11-02', busNo: '102', username: 'user2', route: 'Route B', total: '120' },
  //   // More rows can go here
  // ];

  const columnKeyMapping = {
    'DATE': 'date',
    'BUS NO.': 'busNo',
    'USERNAME': 'username',
    'ROUTE': 'route',
    'TOTAL': 'total',
  };

  const columns = ['DATE', 'BUS NO.', 'USERNAME', 'ROUTE', 'TOTAL'];

  return (
    <div className="dashboard">
      <main className="main-content">
        <h1>Daily Counts</h1>
        {/* Display a message if there's no data */}
        {data.length === 0 ? (
          <p>No data available</p>
        ) : (
          <DataTable columns={columns} data={data} columnKeyMapping={columnKeyMapping} />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
