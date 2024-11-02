// App.js
import React, { useState } from 'react';
import Grid from './Grid';
import FurnitureDropdown from './FurnitureDropdown';
import models from './models.json';
import './App.css';

function App() {
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [roomWidth, setRoomWidth] = useState(500);
  const [roomHeight, setRoomHeight] = useState(500);
  const [gridHistory, setGridHistory] = useState([]);
  
  const handleFurnitureSelect = (modelName) => {
    const furnitureData = models[modelName];
    if (furnitureData) {
      setSelectedFurniture({ model_name: modelName, ...furnitureData });
    }
  };

  const handleRoomDimensionChange = (dimension, value) => {
    if (dimension === 'width') {
      setRoomWidth(value);
    } else if (dimension === 'height') {
      setRoomHeight(value);
    }
  };

  const handleUndo = () => {
    if (gridHistory.length > 0) {
      const newHistory = [...gridHistory];
      const previousGrid = newHistory.pop();
      setGridHistory(newHistory);
      return previousGrid;
    }
    return null;
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Furniture Planner</h2>
        <FurnitureDropdown models={models} onSelect={handleFurnitureSelect} />
      </div>
      <div className="main-content">
        {/* <div className="toolbar">
          <button onClick={handleUndo}>↻</button>
          <button>💾</button>
          <button>📂</button>
          <button>📐</button>
          <button>✏️</button>
          <button>📏</button>
        </div> */}
        <Grid 
          width={roomWidth} 
          height={roomHeight} 
          selectedFurniture={selectedFurniture}
          onGridUpdate={(grid) => setGridHistory([...gridHistory, grid])}
          onUndo={handleUndo}
        />
      </div>
      <div className="properties-panel">
        <h2>Properties</h2>
        <div className="room-dimensions">
          <p>Room Dimensions</p>
          <label>
            Width:
            <input
              type="number"
              value={roomWidth}
              onChange={(e) => handleRoomDimensionChange('width', e.target.value)}
            />
            cm
          </label>
          <label>
            Height:
            <input
              type="number"
              value={roomHeight}
              onChange={(e) => handleRoomDimensionChange('height', e.target.value)}
            />
            cm
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;