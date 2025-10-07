import { useState, useMemo } from 'react'
import './App.css'
import Cell from './Cell'
import {getClosestCells, getRandomMatrix} from "./utils.js";

function App() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [k, setK] = useState(3);
  const [matrix, setMatrix] = useState(() => getRandomMatrix(10, 10));
  const [hoveredCell, setHoveredCell] = useState(null); // {i, j} or null

  const [draftRows, setDraftRows] = useState(rows);
  const [draftCols, setDraftCols] = useState(cols);
  const [draftK, setDraftK] = useState(k);

  const regenerate = () => {
    setRows(draftRows);
    setCols(draftCols);
    setK(draftK);
    setMatrix(getRandomMatrix(draftRows, draftCols));
    setHoveredCell(null);
  };

  const handleMouseEnter = (i, j) => {
    setHoveredCell({i, j});
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const highlighted = useMemo(() => {
    if (!hoveredCell) return [];
    return getClosestCells(matrix, hoveredCell.i, hoveredCell.j, k);
  }, [matrix, hoveredCell, k]);

  return (
    <div className="matrix-container">
      <div className="matrix-controls">
        <label>
          Rows (M): <input type="number" min={1} max={200} value={draftRows} onChange={e => setDraftRows(Number(e.target.value))} />
        </label>
        <label style={{ marginLeft: 12 }}>
          Columns (N): <input type="number" min={1} max={200} value={draftCols} onChange={e => setDraftCols(Number(e.target.value))} />
        </label>
        <label style={{ marginLeft: 12 }}>
          Neighbors (K): <input type="number" min={1} max={draftRows*draftCols-1} value={draftK} onChange={e => setDraftK(Number(e.target.value))} />
        </label>
        <button style={{ marginLeft: 12 }} onClick={regenerate}>Generate</button>
      </div>
      <div
        className="matrix-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 32px)`,
          gridTemplateRows: `repeat(${rows}, 32px)`
        }}
      >
        {Array.from({ length: rows }).map((_, i) =>
          Array.from({ length: cols }).map((_, j) => {
            const cell = matrix[i]?.[j] ?? '';
            const key = `${i}-${j}`;
            const isHovered = hoveredCell && hoveredCell.i === i && hoveredCell.j === j;
            const isHighlighted = highlighted.includes(key);
            return (
              <Cell
                key={key}
                value={cell}
                isHovered={isHovered}
                isHighlighted={isHighlighted}
                onMouseEnter={() => handleMouseEnter(i, j)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App
