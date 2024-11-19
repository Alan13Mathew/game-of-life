import { CommonModule } from '@angular/common';
import { Component, OnInit,OnDestroy } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RectangleComponent } from '../rectangle/rectangle.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule,MatButtonModule,RectangleComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit, OnDestroy {

  grid!: number[][];
  rows = 10;
  cols = 10;
  isRunning = false;
  private intervalId: number | null = null;
  private autoPlayIntervalId: number | null = null;

  ngOnInit(): void {
    this.grid = this.make2DArray(this.cols, this.rows);
    this.initializeRandomGrid();
  }
  ngOnDestroy() {
    this.stopSimulation();
  }
  toggleSimulation() {
    if (this.isRunning) {
      this.stopSimulation();
    } else {
      this.startSimulation();
    }
  }

  startSimulation() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.intervalId = window.setInterval(() => {
        this.nextGeneration();
      }, 500);
    }
  }


  stopSimulation() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.autoPlayIntervalId) {
      window.clearInterval(this.autoPlayIntervalId);
      this.autoPlayIntervalId = null;
    }
    this.isRunning = false;
  }

  toggleCell(coords: {row: number, col: number}) {
    // Create a new reference to trigger change detection
    const newGrid = this.grid.map(row => [...row]);
    newGrid[coords.row][coords.col] = newGrid[coords.row][coords.col] === 1 ? 0 : 1;
    this.grid = newGrid;
  }

  startAutoPlay() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.autoPlayIntervalId = window.setInterval(() => {
        this.nextGeneration();
      }, 500);
    }
  }

make2DArray(cols:number,rows:number){
  let arr = new Array(cols)
  for(let i=0;i<arr.length;i++){
      arr[i] = new Array(rows)
  }
  return arr
}
initializeRandomGrid() {
  for (let i = 0; i < this.cols; i++) {
    for (let j = 0; j < this.rows; j++) {
      this.grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
}

nextGeneration() {
  const next = this.make2DArray(this.cols, this.rows);

  // Evaluate each cell's next state
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      const neighbors = this.countNeighbors(j, i);
      const currentState = this.grid[j][i];

      // Conway's Rules
      if (currentState === 0 && neighbors === 3) {
        next[j][i] = 1; // Birth
      } else if (currentState === 1 && (neighbors === 2 || neighbors === 3)) {
        next[j][i] = 1; // Survival
      } else {
        next[j][i] = 0; // Death
      }
    }
  }

  this.grid = next;
}


countNeighbors(x: number, y: number): number {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const row = (y + j + this.rows) % this.rows;
      const col = (x + i + this.cols) % this.cols;
      sum += this.grid[col][row];
    }
  }
  sum -= this.grid[x][y];
  return sum;
}




clearGrid() {
  this.grid = this.make2DArray(this.cols, this.rows);
  this.stopSimulation();
}

// createGliderGun() {
//   this.clearGrid();
//   const pattern = [
//     [0, 4], [0, 5], [1, 4], [1, 5],
//     [10, 4], [10, 5], [10, 6], [11, 3], [11, 7], [12, 2], [12, 8],
//     [13, 2], [13, 8], [14, 5], [15, 3], [15, 7], [16, 4], [16, 5],
//     [16, 6], [17, 5],
//     [20, 2], [20, 3], [20, 4], [21, 2], [21, 3], [21, 4], [22, 1],
//     [22, 5], [24, 0], [24, 1], [24, 5], [24, 6]
//   ];
  
//   const offsetX = 5;
//   const offsetY = 5;
  
//   pattern.forEach(([x, y]) => {
//     this.setCell(y + offsetY, x + offsetX, 1); // Swap x and y coordinates
//   });
// }
 
// createGlider() {
//   this.clearGrid();
//   const pattern = [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
//   const offsetX = Math.floor(this.rows / 4);
//   const offsetY = Math.floor(this.cols / 4);
  
//   pattern.forEach(([x, y]) => {
//     this.setCell(y + offsetY, x + offsetX, 1); // Swap x and y coordinates
//   });
// }


// createBlinker() {
//   this.clearGrid();
//   const centerX = Math.floor(this.rows / 2);
//   const centerY = Math.floor(this.cols / 2);
  
//   [-1, 0, 1].forEach(offset => {
//     this.setCell(centerX, centerY + offset, 1);
//   });
// }

// createPulsar() {
//   this.clearGrid();
//   const pattern = [
//     // Horizontal lines
//     [2, 4], [2, 5], [2, 6], [2, 10], [2, 11], [2, 12],
//     [7, 4], [7, 5], [7, 6], [7, 10], [7, 11], [7, 12],
//     [9, 4], [9, 5], [9, 6], [9, 10], [9, 11], [9, 12],
//     [14, 4], [14, 5], [14, 6], [14, 10], [14, 11], [14, 12],
//     // Vertical lines
//     [4, 2], [5, 2], [6, 2], [10, 2], [11, 2], [12, 2],
//     [4, 7], [5, 7], [6, 7], [10, 7], [11, 7], [12, 7],
//     [4, 9], [5, 9], [6, 9], [10, 9], [11, 9], [12, 9],
//     [4, 14], [5, 14], [6, 14], [10, 14], [11, 14], [12, 14]
//   ];
  
//   const offsetX = 10;
//   const offsetY = 10;
  
//   pattern.forEach(([x, y]) => {
//     this.setCell(y + offsetY, x + offsetX, 1); // Swap x and y coordinates
//   });
// }


// createSpaceship() {
//   this.clearGrid();
//   const pattern = [
//     [0, 1], [0, 2], [0, 3],
//     [1, 0], [1, 3],
//     [2, 3],
//     [3, 2]
//   ];
  
//   const offsetX = 20;
//   const offsetY = 20;
  
//   pattern.forEach(([x, y]) => {
//     this.setCell(y + offsetY, x + offsetX, 1); // Swap x and y coordinates
//   });
// }

private setCell(row: number, col: number, value: number) {
  if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
    this.grid[col][row] = value;
  }
}

}
