import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input , OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rectangle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rectangle.component.html',
  styleUrl: './rectangle.component.css'
})
export class RectangleComponent implements OnInit{


  @Input() grid!: number[][];
  @Output() cellClick = new EventEmitter<{row: number, col: number}>();
  cellSize = 10;

  onCellClick(row: number, col: number) {
    this.cellClick.emit({row, col});
  }

    
  ngOnInit(): void {
    const maxSize = Math.min(window.innerWidth, window.innerHeight) * 0.8; // Use 80% of the smallest screen dimension
    const gridSize = Math.max(this.grid.length, this.grid[0].length);
    this.cellSize = Math.floor(maxSize / gridSize);
  }

  getCellStyle() {
    return {
      width: `${this.cellSize}px`,
      height: `${this.cellSize}px`
    };
  }


}
