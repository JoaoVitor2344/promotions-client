import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AppMessageService,
  MessageType,
} from '../../services/app-message.service';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './app-message.component.html',
  styleUrls: ['./app-message.component.css'],
})
export class AppMessageComponent implements OnInit, OnDestroy {
  message$: Observable<{ type: MessageType; text: string } | null>;
  progress = 100;
  private intervalId: any;
  private timeout = 4000; // tempo em ms

  constructor(private appMessageService: AppMessageService) {
    this.message$ = this.appMessageService.message$;
  }

  ngOnInit() {
    this.message$.subscribe(msg => {
      if (msg) {
        this.startProgressBar();
      } else {
        this.clearProgressBar();
      }
    });
  }

  startProgressBar() {
    this.progress = 100;
    this.clearProgressBar();
    const step = 100 / (this.timeout / 50);
    this.intervalId = setInterval(() => {
      this.progress -= step;
      if (this.progress <= 0) {
        this.progress = 0;
        this.close();
      }
    }, 50);
  }

  clearProgressBar() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  close() {
    this.appMessageService.clear();
    this.clearProgressBar();
  }

  ngOnDestroy() {
    this.clearProgressBar();
  }
}
