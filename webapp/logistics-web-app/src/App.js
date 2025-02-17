import React, { useState, useEffect } from 'react';
import Tab from './components/Tab';
import TabContent from './components/TabContent';
import FavoritesTabContent from './components/FavoritesTabContent';
import Accordion from './components/Accordion';

function App() {
    const [activeTab, setActiveTab] = useState({ surface: '', index: 0 });
    const [groupedTabs, setGroupedTabs] = useState({});
    const [openAccordion, setOpenAccordion] = useState('');
    const [favorites, setFavorites] = useState({});
    const [error, setError] = useState(null);
    const [logisticsData, setLogisticsData] = useState(null); // Add state for logisticsData

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const fetchData = () => {
        fetch('http://localhost:3000/api/logistics_networks')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.logistics_networks) {
                    const grouped = data.logistics_networks.reduce((acc, network) => {
                        if (!acc[network.surface]) {
                            acc[network.surface] = [];
                        }
                        acc[network.surface].push(network);
                        return acc;
                    }, {});

                    // Sort each group by network id
                    Object.keys(grouped).forEach(surface => {
                        grouped[surface].sort((a, b) => a.id - b.id);
                    });

                    setGroupedTabs(grouped);
                    setLogisticsData(data); // Persist fetched data into logisticsData
                    setError(null); // Clear any previous errors
                }
            })
            .catch(error => {
                setError('Failed to load data. Is the mod installed and the game running?');
                console.error('Fetch error:', error);
            });
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000); // 60000 ms = 1 minute
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleTabClick = (surface, index) => {
        setActiveTab({ surface, index });
    };

    const handleAccordionToggle = (surface) => {
        setOpenAccordion(openAccordion === surface ? '' : surface);
    };

    const handleToggleFavorite = (item) => {
        setFavorites(prevFavorites => {
            const updatedFavorites = { ...prevFavorites };
            if (updatedFavorites[item]) {
                delete updatedFavorites[item];
            } else {
                updatedFavorites[item] = true;
            }
            console.log('Updated Favorites:', updatedFavorites);
            return updatedFavorites;
        });
    };

    const compileFavorites = () => {
        const compiled = {};
        if (logisticsData) {
            Object.keys(favorites).forEach(item => {
                if (favorites[item]) {
                    logisticsData.logistics_networks.forEach(network => {
                        if (network.item_counts[item]) {
                            if (!compiled[item]) {
                                compiled[item] = {};
                            }
                            if (!compiled[item][network.surface]) {
                                compiled[item][network.surface] = {};
                            }
                            Object.keys(network.item_counts[item]).forEach(quality => {
                                if (!compiled[item][network.surface][quality]) {
                                    compiled[item][network.surface][quality] = 0;
                                }
                                compiled[item][network.surface][quality] += network.item_counts[item][quality];
                            });
                        }
                    });
                }
            });
        }
        console.log(JSON.stringify(compiled));
        return compiled;
    };

    const surfaces = Object.keys(groupedTabs).sort();

    return (
        <div className="App">
            <h1>Logistics Networks</h1>
            {error && <div className="error">{error}</div>}
            {!error && logisticsData && (
                <>
                    <div className="timestamp">
                        <strong>Factorio Last Updated Data at </strong> {logisticsData.timestamp}
                    </div>
                    <Accordion title="Favorites" isOpen={openAccordion === 'favorites'} onToggle={() => handleAccordionToggle('favorites')}>
                        <FavoritesTabContent 
                            data={compileFavorites()} 
                        />
                    </Accordion>
                    {surfaces.map(surface => (
                        <Accordion
                            key={surface}
                            title={surface}
                            isOpen={openAccordion === surface}
                            onToggle={() => handleAccordionToggle(surface)}
                        >
                            <div className="tabs">
                                {groupedTabs[surface].map((tab, index) => (
                                    <Tab
                                        key={tab.id}
                                        label={`Network ${tab.id}`}
                                        onClick={() => handleTabClick(surface, index)}
                                        isActive={activeTab.surface === surface && activeTab.index === index}
                                    />
                                ))}
                            </div>
                            {activeTab.surface === surface && (
                                <TabContent
                                    data={groupedTabs[surface][activeTab.index]}
                                    favorites={favorites}
                                    handleToggleFavorite={(item) => handleToggleFavorite(`${item}`)}
                                />
                            )}
                        </Accordion>
                    ))}
                </>
            )}
        </div>
    );
}

export default App;