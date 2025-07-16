import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionsService } from '../../../shared/services/promotions.service';
import { Promotion } from '../../../shared/models/promotion.model';
import { AppMessageService } from '../../../shared/services/app-message.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-promotions-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.css'],
})
export class PromotionsListComponent implements OnInit {
  promotions: Promotion[] = [];

  constructor(
    private promotionsService: PromotionsService,
    private router: Router,
    private messageService: AppMessageService
  ) {}

  ngOnInit(): void {
    this.loadPromotions();
  }

  loadPromotions() {
    this.promotionsService.getPromotions().subscribe({
      next: (data) => {
        this.promotions = data;
        if (data.length) {
          this.messageService.show('success', 'Promoções carregadas com sucesso!');
        } else {
          this.messageService.show('info', 'Nenhuma promoção encontrada.');
        }
      },
      error: () => {
        this.promotions = [];
        this.messageService.show('error', 'Erro ao carregar promoções.');
      },
    });
  }

  goToNew() {
    this.router.navigate(['/promotions/new']);
  }

  editPromotion(id: number) {
    this.router.navigate(['/promotions/edit', id]);
  }

  deletePromotion(id: number) {
    if (confirm('Tem certeza que deseja remover esta promoção?')) {
      this.promotionsService.deletePromotion(id).subscribe({
        next: () => {
          this.loadPromotions();
          this.messageService.show('success', 'Promoção removida com sucesso!');
        },
        error: () => {
          this.messageService.show('error', 'Erro ao remover promoção.');
        },
      });
    }
  }

  sendTelegram(id: number) {
    this.promotionsService.sendToTelegram(id).subscribe({
      next: () => {
        this.messageService.show(
          'success',
          'Promoção enviada para o Telegram!'
        );
      },
      error: () => {
        this.messageService.show('error', 'Erro ao enviar para o Telegram.');
      },
    });
  }
}
