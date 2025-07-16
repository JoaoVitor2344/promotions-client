import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SchedulesService } from '../../../shared/services/schedules.service';
import { Schedule } from '../../../shared/models/schedule.model';
import { AppMessageService } from '../../../shared/services/app-message.service';

@Component({
  selector: 'app-schedules-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './schedules-form.component.html',
  styleUrls: ['./schedules-form.component.css']
})
export class SchedulesFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  scheduleId?: number;

  constructor(
    private fb: FormBuilder,
    private service: SchedulesService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: AppMessageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.scheduleId = +id;
        this.service.getSchedule(this.scheduleId).subscribe(schedule => {
          this.form.patchValue(schedule);
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const data = this.form.value;
    if (this.isEdit && this.scheduleId) {
      this.service.updateSchedule(this.scheduleId, data).subscribe({
        next: () => {
          this.router.navigate(['/schedules']);
          this.messageService.show('success', 'Agendamento atualizado com sucesso!');
        },
        error: () => {
          this.messageService.show('error', 'Erro ao atualizar agendamento.');
        }
      });
    } else {
      this.service.createSchedule(data).subscribe({
        next: () => {
          this.router.navigate(['/schedules']);
          this.messageService.show('success', 'Agendamento criado com sucesso!');
        },
        error: () => {
          this.messageService.show('error', 'Erro ao criar agendamento.');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/schedules']);
  }
}
