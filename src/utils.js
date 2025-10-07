export function getRandomMatrix(rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(Math.floor(Math.random() * 101));
        }
        matrix.push(row);
    }
    return matrix;
}

export function getClosestCells(matrix, rowIdx, colIdx, k) {
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