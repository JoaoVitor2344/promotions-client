import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchedulesService } from '../../../shared/services/schedules.service';
import { Schedule } from '../../../shared/models/schedule.model';
import { CommonModule, DatePipe, AsyncPipe } from '@angular/common';
import { AppMessageService } from '../../../shared/services/app-message.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-schedules-list',
  standalone: true,
  imports: [CommonModule, DatePipe, AsyncPipe, ButtonComponent],
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.css']
})
export class SchedulesListComponent implements OnInit {
  schedules: Schedule[] = [];

  constructor(
    private schedulesService: SchedulesService,
    private router: Router,
    private messageService: AppMessageService
  ) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules() {
    this.schedulesService.getSchedules().subscribe({
      next: (data) => {
        this.schedules = data;
        if (data.length) {
          this.messageService.show('success', 'Agendamentos carregados com sucesso!');
        } else {
          this.messageService.show('info', 'Nenhum agendamento encontrado.');
        }
      },
      error: () => {
        this.schedules = [];
        this.messageService.show('error', 'Erro ao carregar agendamentos.');
      }
    });
  }

  goToNew() {
    this.router.navigate(['/schedules/new']);
  }

  editSchedule(id: number) {
    this.router.navigate(['/schedules/edit', id]);
  }

  deleteSchedule(id: number) {
    if (confirm('Tem certeza que deseja remover este agendamento?')) {
      this.schedulesService.deleteSchedule(id).subscribe({
        next: () => {
          this.loadSchedules();
          this.messageService.show('success', 'Agendamento removido com sucesso!');
        },
        error: () => {
          this.messageService.show('error', 'Erro ao remover agendamento.');
        }
      });
    }
  }
}
