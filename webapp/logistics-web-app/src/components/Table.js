import React, { useState } from 'react';

const Table = ({ data, favorites, onToggleFavorite }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'item', direction: 'ascending' });
    const [filter, setFilter] = useState('');

    if (!data || Object.keys(data).length === 0) {
        return <div>No data available</div>;
    }

    const qualities = ['normal', 'uncommon', 'rare', 'epic', 'legendary'];
    const items = Object.keys(data);

    const sortedItems = [...items].sort((a, b) => {
        if (sortConfig.key === 'item') {
            if (a < b) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (a > b) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        } else {
            const quality = sortConfig.key;
            const aValue = data[a][quality] || 0;
            const bValue = data[b][quality] || 0;
            if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        }
    });

    const filteredItems = sortedItems.filter(item => item.toLowerCase().includes(filter.toLowerCase()));

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = key => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
        }
        return '';
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Filter items"
                value={filter}
                onChange={e => setFilter(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('item')}>
                            Item{getSortIndicator('item')}
                        </th>
                        {qualities.map(quality => (
                            <th key={quality} onClick={() => requestSort(quality)}>
                                {quality.charAt(0).toUpperCase() + quality.slice(1)}
                                {getSortIndicator(quality)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map(item => (
                        <tr key={item}>
                            <td onClick={() => onToggleFavorite(item)}>
                                {favorites.hasOwnProperty(item) ? '★' : '☆'} {item}
                            </td>
                            {qualities.map(quality => (
                                <td key={quality}>{data[item][quality] || 0}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;