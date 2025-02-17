import React from 'react';
import Table from './Table';

const TabContent = ({ data, favorites, handleToggleFavorite }) => {
    if (!data || !data.item_counts) {
        return <div>Select a tab to view content</div>;
    }

    return (
        <div className="tab-content">
            <h2>Network {data.id} - {data.surface}</h2>
            <Table 
                data={data.item_counts} 
                favorites={favorites} 
                onToggleFavorite={handleToggleFavorite} 
            />
        </div>
    );
};

export default TabContent;