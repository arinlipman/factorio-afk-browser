import React, { useState, useEffect } from 'react';
import Tab from './components/Tab';
import TabContent from './components/TabContent';
import FavoritesTabContent from './components/FavoritesTabContent';
import Accordion from './components/Accordion';
import logisticsData from './data/logistics_networks.json';

function App() {
    const [activeTab, setActiveTab] = useState({ surface: '', index: 0 });
    const [groupedTabs, setGroupedTabs] = useState({});
    const [openAccordion, setOpenAccordion] = useState('');
    const [favorites, setFavorites] = useState({});

    useEffect(() => {
        if (logisticsData.logistics_networks) {
            const grouped = logisticsData.logistics_networks.reduce((acc, network) => {
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
        }
    }, []);

    const handleTabClick = (surface, index) => {
        setActiveTab({ surface, index });
    };

    const handleAccordionToggle = (surface) => {
        setOpenAccordion(openAccordion === surface ? '' : surface);
    };

    const handleToggleFavorite = (item) => {
        setFavorites(prevFavorites => {
            const updatedFavorites = {
                ...prevFavorites,
                [item]: !prevFavorites[item]
            };
            console.log('Updated Favorites:', updatedFavorites);
            return updatedFavorites;
        });
    };

    const compileFavorites = () => {
        const compiled = {};
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
        console.log(JSON.stringify(compiled));
        return compiled;
    };

    const surfaces = Object.keys(groupedTabs).sort();

    return (
        <div className="App">
            <h1>Logistics Networks</h1>
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
        </div>
    );
}

export default App;