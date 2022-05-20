
import { useState } from 'react';
import './App.css';
import Tests from './component/Tests';
import TripList from './component/TripList';

function App() {
  const [showTrips, setShowTrips] = useState(true)

  return (
    <div className="App">
      <Tests />
      <button onClick={() => setShowTrips(false)}>Hide Trips</button>
      <button onClick={() => setShowTrips(true)}>Show Trips</button>
     {showTrips && <TripList />}
    </div>
  );
}

export default App;
