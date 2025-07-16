import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AppMessageService,
  MessageType,
} from '../../services/app-message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-message.component.html',
  styleUrls: ['./app-message.component.css'],
})
export class AppMessageComponent {
  message$: Observable<{ type: MessageType; text: string } | null>;
  constructor(private service: AppMessageService) {
    this.message$ = this.service.message$;
  }
  close() {
    this.service.clear();
  }
}
