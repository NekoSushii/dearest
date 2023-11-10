import React from 'react';
import MapContainer from './SearchMap';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Google Maps Search</h1>
      <MapContainer />
    </div>
  );
};

export default App;
