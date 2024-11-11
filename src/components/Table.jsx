import React from 'react';

const DataTable = ({ columns, data, columnKeyMapping }) => {
    return (
        <table className="data-table">
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {columns.map((col, colIndex) => {
                            // Use the columnKeyMapping to get the data key
                            const columnKey = columnKeyMapping[col];
                            return <td key={colIndex}>{item[columnKey]}</td>;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
