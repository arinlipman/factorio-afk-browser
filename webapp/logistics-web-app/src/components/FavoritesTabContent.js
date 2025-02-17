import React from 'react';

const qualityIcons = {
    normal: 'https://wiki.factorio.com/images/Quality_normal.png',
    uncommon: 'https://wiki.factorio.com/images/Quality_uncommon.png',
    rare: 'https://wiki.factorio.com/images/Quality_rare.png',
    epic: 'https://wiki.factorio.com/images/Quality_epic.png',
    legendary: 'https://wiki.factorio.com/images/Quality_legendary.png'
};

const FavoritesTabContent = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return <div>No data available</div>;
    }

    const surfaces = Array.from(new Set(Object.values(data).flatMap(item => Object.keys(item))));

    return (
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    {surfaces.map(surface => (
                        <th key={surface}>{surface}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.keys(data).map(item => (
                    <tr key={item}>
                        <td>{item}</td>
                        {surfaces.map(surface => (
                            <td key={surface}>
                                {data[item][surface] ? (
                                    Object.keys(data[item][surface]).map(quality => (
                                        <div key={quality}>
                                            <img src={qualityIcons[quality]} alt={quality} style={{ width: '16px', height: '16px' }} /> {data[item][surface][quality]}
                                        </div>
                                    ))
                                ) : (
                                    <div>0</div>
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FavoritesTabContent;