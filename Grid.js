import React, { useState, useEffect } from 'react';
import './grid.css';

const Grid = ({ width, height, selectedFurniture }) => {
  const [rows, setRows] = useState(Math.floor(height / 50));
  const [columns, setColumns] = useState(Math.floor(width / 50));
  const [grid, setGrid] = useState(
    Array(rows).fill(null).map(() => Array(columns).fill(null))
  );

  useEffect(() => {
    const newRows = Math.floor(height / 50);
    const newColumns = Math.floor(width / 50);
    
    setRows(newRows);
    setColumns(newColumns);
    setGrid(Array(newRows).fill(null).map(() => Array(newColumns).fill(null)));
  }, [width, height]);

  const handleCellClick = (startRow, startCol) => {
    if (!selectedFurniture) return;

    const { model_name, model_size, model_picture } = selectedFurniture;
    const [furnitureWidth, furnitureHeight] = model_size;

    // Check if placing the furniture would go out of bounds
    if (startRow + furnitureHeight > rows || startCol + furnitureWidth > columns) {
      alert("This item can't be placed here as it exceeds grid bounds.");
      return;
    }

    // Check if any of the cells are already occupied
    for (let i = 0; i < furnitureHeight; i++) {
      for (let j = 0; j < furnitureWidth; j++) {
        if (grid[startRow + i][startCol + j]) {
          alert("Some of these cells are already occupied!");
          return;
        }
      }
    }

    // Update the grid with the selected furniture
    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (
          rowIndex >= startRow &&
          rowIndex < startRow + furnitureHeight &&
          colIndex >= startCol &&
          colIndex < startCol + furnitureWidth
        ) {
          return { model_name, model_picture, row: startRow, col: startCol, width: furnitureWidth, height: furnitureHeight };
        }
        return cell;
      })
    );

    setGrid(newGrid);
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`grid-cell ${cell ? 'occupied' : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {/* Render the image only in the top-left cell of the furniture and span it across */}
              {cell && rowIndex === cell.row && colIndex === cell.col && (
                <img
                  src={cell.model_picture}
                  alt={cell.model_name}
                  className="furniture-image"
                  style={{
                    gridColumn: `span ${cell.width}`,
                    gridRow: `span ${cell.height}`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
