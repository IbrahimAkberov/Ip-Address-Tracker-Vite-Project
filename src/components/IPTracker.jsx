import React, { useState } from 'react';
import { fetchIPInfo } from '../api/ipService';
import Map from './Map';
import './IPTracker.css';

const IPTracker = () => {
  const [ip, setIP] = useState('');
  const [ipInfo, setIPInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIPInfo(ip);
      setIPInfo(data);
    } catch (err) {
      setError('Failed to fetch IP information');
    }
    setLoading(false);
  };

  return (
    
    <div className="ip-tracker">
      <div className="header">
        <h2>IP Address Tracker</h2>
        <div className="search-bar">
          <input
            type="text"
            value={ip}
            onChange={(e) => setIP(e.target.value)}
            placeholder="Search for any IP address or domain"
          />
          
          <button onClick={handleSearch}> <span>&#10148;</span></button>
          
        </div>
        
        
      </div>
    {/* {loading && <h3>Loading...</h3>} */}
      {error && <p>{error}</p>}
      
      {ipInfo && (
        <>
        
          <div className="ip-info">
            
            <p>
              IP ADDRESS <h2>{ipInfo.ip}</h2>
            </p>
            <p>
              LOCATION <h2>{ipInfo.location.city}, {ipInfo.location.region}</h2>
            </p>
            <p>
              TIMEZONE <h2>UTC {ipInfo.location.timezone}</h2>
            </p>
            <p>
              ISP <h2>{ipInfo.isp}</h2>
            </p>
          </div>
          <Map location={[ipInfo.location.lat, ipInfo.location.lng]} />
        </>
      )}
    </div>
  );
};

export default IPTracker;
