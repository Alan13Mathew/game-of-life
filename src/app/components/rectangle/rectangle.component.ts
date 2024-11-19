import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input , Output} from '@angular/core';

@Component({
  selector: 'app-rectangle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rectangle.component.html',
  styleUrl: './rectangle.component.css'
})
export class RectangleComponent {

  @Input() grid!: number[][];
  @Output() cellClick = new EventEmitter<{row: number, col: number}>();
  onCellClick(row: number, col: number) {
    this.cellClick.emit({row, col});
  }
}
