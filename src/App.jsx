import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import CurrentItem from './components/CurrentItem';
import BanList from './components/BanList';
import History from './components/History';
import './App.css';

function App() {
  const [currentItem, setCurrentItem] = useState(null);
  const [bannedItems, setBannedItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRandomDate = () => {
    const start = new Date('1995-06-16'); // First APOD date
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  const checkIfItemIsBanned = (item, bannedItems) => {
    return bannedItems.some(ban => {
      const itemValue = item[ban.attribute];
      if (!itemValue) return false;
      
      const normalizedItemValue = String(itemValue).toLowerCase().trim();
      const normalizedBanValue = String(ban.value).toLowerCase().trim();
      
      return normalizedItemValue.includes(normalizedBanValue) ||
             normalizedBanValue.includes(normalizedItemValue);
    });
  };

  const fetchAPOD = async (date = getRandomDate()) => {
    setLoading(true);
    setError(null);

    const tryFetch = async (currentDate) => {
      try {
        const formattedDate = format(currentDate, 'yyyy-MM-dd');
        const response = await axios.get(`https://api.nasa.gov/planetary/apod`, {
          params: {
            api_key: '9cvyVNlpFKP1TCJmRH4bKVv8eP8PY25PjWifBjOv',
            date: formattedDate
          }
        });

        const newItem = response.data;
        
        // If item is banned, try another date
        if (checkIfItemIsBanned(newItem, bannedItems)) {
          return tryFetch(getRandomDate());
        }

        // Valid item found
        setCurrentItem(newItem);
        if (!history.find(item => item.date === newItem.date)) {
          setHistory(prev => [newItem, ...prev]);
        }
        setLoading(false);
      } catch (err) {
        // On any error, try another random date
        return tryFetch(getRandomDate());
      }
    };

    try {
      await tryFetch(date);
    } catch (err) {
      setError('An error occurred while fetching the image. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPOD();
  }, []);

  const handleBanAttribute = (ban) => {
    setBannedItems(prev => [...prev, ban]);
    fetchAPOD();
  };

  const handleRemoveBan = (index) => {
    setBannedItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSelectHistoryItem = (item) => {
    setCurrentItem(item);
  };

  return (
    <div className="app">
      <h1>NASA Astronomy Picture of the Day</h1>
      <div className="main-content">
        <div className="content-left">
          {error ? (
            <div className="error">Error: {error}</div>
          ) : (
            <CurrentItem 
              item={currentItem} 
              onBanAttribute={handleBanAttribute} 
            />
          )}
          <button 
            onClick={() => fetchAPOD()} 
            disabled={loading}
            className="fetch-button"
          >
            {loading ? 'Loading...' : 'Get New Image'}
          </button>
        </div>
        <div className="sidebar">
          <BanList 
            bannedItems={bannedItems} 
            onRemoveBan={handleRemoveBan} 
          />
          <History 
            history={history}
            currentItem={currentItem}
            onSelectHistoryItem={handleSelectHistoryItem}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
