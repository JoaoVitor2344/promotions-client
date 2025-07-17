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
  @Input() customClass = '';
  @Output() clicked = new EventEmitter<Event>();

  get buttonClass() {
    let baseClass =
      'px-4 py-2 rounded font-semibold transition-colors duration-200';
    switch (this.color) {
      case 'primary':
        baseClass += ' bg-blue-600 text-white hover:bg-blue-700';
        break;
      case 'secondary':
        baseClass += ' bg-gray-500 text-white hover:bg-gray-600';
        break;
      case 'success':
        baseClass += ' bg-green-600 text-white hover:bg-green-700';
        break;
      case 'danger':
        baseClass += ' bg-red-600 text-white hover:bg-red-700';
        break;
      case 'warning':
        baseClass += ' bg-yellow-500 text-white hover:bg-yellow-600';
        break;
      default:
        baseClass += ' bg-blue-600 text-white hover:bg-blue-700';
    }
    return `${baseClass} ${this.customClass}`.trim();
  }

  onClick(event: Event) {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
