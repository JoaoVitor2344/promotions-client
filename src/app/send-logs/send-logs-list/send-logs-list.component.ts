import { Component, OnInit } from '@angular/core';
import { SendLogsService } from '../../../shared/services/send-logs.service';
import { SendLog } from '../../../shared/models/send-log.model';
import { CommonModule, DatePipe } from '@angular/common';
import { AppMessageService } from '../../../shared/services/app-message.service';

@Component({
  selector: 'app-send-logs-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './send-logs-list.component.html',
  styleUrls: ['./send-logs-list.component.css'],
})
export class SendLogsListComponent implements OnInit {
  logs: SendLog[] = [];

  constructor(
    private service: SendLogsService,
    private messageService: AppMessageService
  ) {}

  ngOnInit(): void {
    this.service.getSendLogs().subscribe({
      next: (data) => {
        this.logs = data;
        if (data.length) {
          this.messageService.show('success', 'Logs carregados com sucesso!');
        } else {
          this.messageService.show('info', 'Nenhum log encontrado.');
        }
      },
      error: () => {
        this.logs = [];
        this.messageService.show('error', 'Erro ao buscar logs de envio.');
      },
    });
  }
}
