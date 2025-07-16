import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PromotionsService } from '../../../shared/services/promotions.service';
import { Promotion } from '../../../shared/models/promotion.model';
import { AppMessageService } from '../../../shared/services/app-message.service';

@Component({
  selector: 'app-promotions-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './promotions-form.component.html',
  styleUrls: ['./promotions-form.component.css']
})
export class PromotionsFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  promotionId?: number;

  constructor(
    private fb: FormBuilder,
    private service: PromotionsService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: AppMessageService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.promotionId = +id;
        this.service.getPromotion(this.promotionId).subscribe(promo => {
          this.form.patchValue(promo);
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const data = this.form.value;
    if (this.isEdit && this.promotionId) {
      this.service.updatePromotion(this.promotionId, data).subscribe({
        next: () => {
          this.router.navigate(['/promotions']);
          this.messageService.show('success', 'Promoção atualizada com sucesso!');
        },
        error: () => {
          this.messageService.show('error', 'Erro ao atualizar promoção.');
        }
      });
    } else {
      this.service.createPromotion(data).subscribe({
        next: () => {
          this.router.navigate(['/promotions']);
          this.messageService.show('success', 'Promoção criada com sucesso!');
        },
        error: () => {
          this.messageService.show('error', 'Erro ao criar promoção.');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/promotions']);
  }
}
