import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' =
    'primary';
  @Input() loading = false;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<Event>();

  get buttonClass() {
    switch (this.color) {
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'secondary':
        return 'bg-gray-500 text-white hover:bg-gray-600';
      case 'success':
        return 'bg-green-600 text-white hover:bg-green-700';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700';
      case 'warning':
        return 'bg-yellow-500 text-white hover:bg-yellow-600';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  }

  onClick(event: Event) {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
