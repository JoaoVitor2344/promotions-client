import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AffiliatesService } from '../../../shared/services/affiliates.service';
import { Affiliate } from '../../../shared/models/affiliate.model';
import { AppMessageService } from '../../../shared/services/app-message.service';

@Component({
  selector: 'app-affiliates-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './affiliates-form.component.html',
  styleUrls: ['./affiliates-form.component.css']
})
export class AffiliatesFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  affiliateId?: number;

  constructor(
    private fb: FormBuilder,
    private service: AffiliatesService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: AppMessageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.affiliateId = +id;
        this.service.getAffiliate(this.affiliateId).subscribe(affiliate => {
          this.form.patchValue(affiliate);
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const data = this.form.value;
    if (this.isEdit && this.affiliateId) {
      this.service.updateAffiliate(this.affiliateId, data).subscribe({
        next: () => {
          this.router.navigate(['/affiliates']);
          this.messageService.show('success', 'Afiliado atualizado com sucesso!');
        },
        error: () => {
          this.messageService.show('error', 'Erro ao atualizar afiliado.');
        }
      });
    } else {
      this.service.createAffiliate(data).subscribe({
        next: () => {
          this.router.navigate(['/affiliates']);
          this.messageService.show('success', 'Afiliado criado com sucesso!');
        },
        error: () => {
          this.messageService.show('error', 'Erro ao criar afiliado.');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/affiliates']);
  }
}
