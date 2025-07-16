import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type MessageType = 'success' | 'error' | 'info';

@Injectable({ providedIn: 'root' })
export class AppMessageService {
  private messageSubject = new BehaviorSubject<{ type: MessageType, text: string } | null>(null);
  message$ = this.messageSubject.asObservable();

  show(type: MessageType, text: string) {
    this.messageSubject.next({ type, text });
    setTimeout(() => this.clear(), 5000); // Limpa após 5s
  }

  clear() {
    this.messageSubject.next(null);
  }
} 