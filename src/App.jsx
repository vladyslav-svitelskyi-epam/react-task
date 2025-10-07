import { useState } from 'react'
import './App.css'

function getRandomMatrix(rows, cols) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(Math.floor(Math.random() * 1001));
    }
    matrix.push(row);
  }
  return matrix;
}

function getClosestCells(matrix, rowIdx, colIdx, k) {
  const flat = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (i === rowIdx && j === colIdx) continue;
      flat.push({
        value: matrix[i][j],
        row: i,
        col: j,
      });
    }
  }
  flat.sort((a, b) => Math.abs(a.value - matrix[rowIdx][colIdx]) - Math.abs(b.value - matrix[rowIdx][colIdx]));
  return flat.slice(0, k).map(cell => `${cell.row}-${cell.col}`);
}

function App() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [k, setK] = useState(3);
  const [matrix, setMatrix] = useState(() => getRandomMatrix(10, 10));
  const [hovered, setHovered] = useState(null);
  const [highlighted, setHighlighted] = useState([]);

  const regenerate = () => {
    setMatrix(getRandomMatrix(rows, cols));
    setHovered(null);
    setHighlighted([]);
  };

  const handleMouseEnter = (i, j) => {
    setHovered(`${i}-${j}`);
    setHighlighted(getClosestCells(matrix, i, j, k));
  };

  const handleMouseLeave = () => {
    setHovered(null);
    setHighlighted([]);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 16 }}>
        <label>
          Rows (M): <input type="number" min={1} max={200} value={rows} onChange={e => setRows(Number(e.target.value))} />
        </label>
        <label style={{ marginLeft: 12 }}>
          Columns (N): <input type="number" min={1} max={200} value={cols} onChange={e => setCols(Number(e.target.value))} />
        </label>
        <label style={{ marginLeft: 12 }}>
          Neighbors (K): <input type="number" min={1} max={rows*cols-1} value={k} onChange={e => setK(Number(e.target.value))} />
        </label>
        <button style={{ marginLeft: 12 }} onClick={regenerate}>Generate</button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 32px)`,
          gridTemplateRows: `repeat(${rows}, 32px)`,
          gap: 2,
        }}
      >
        {matrix.map((row, i) =>
          row.map((cell, j) => {
            const key = `${i}-${j}`;
            const percent = cell;
            const isHovered = hovered === key;
            const isHighlighted = highlighted.includes(key);
            return (
              <div
                key={key}
                onMouseEnter={() => handleMouseEnter(i, j)}
                onMouseLeave={handleMouseLeave}
                style={{
                  width: 32,
                  height: 32,
                  border: '1px solid #888',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  background: isHovered
                    ? `linear-gradient(to top, #4caf50 ${percent}%, transparent ${percent}%)`
                    : isHighlighted
                    ? '#ffe082'
                    : '#fff',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: isHovered ? 'bold' : 'normal',
                }}
              >
                {cell}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App
