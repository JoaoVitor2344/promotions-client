import { Component, OnInit } from '@angular/core';
import { PromotionsService } from '../../../shared/services/promotions.service';
import { Promotion } from '../../../shared/models/promotion.model';

@Component({
  selector: 'app-promotions-pending',
  templateUrl: './promotions-pending.component.html',
  styleUrls: ['./promotions-pending.component.css']
})
export class PromotionsPendingComponent implements OnInit {
  pending: Promotion[] = [];

  constructor(private service: PromotionsService) {}

  ngOnInit(): void {
    this.loadPending();
  }

  loadPending() {
    this.service.getPendingPromotions().subscribe({
      next: (data) => this.pending = data,
      error: () => this.pending = []
    });
  }

  approve(id: number) {
    this.service.approvePromotion(id).subscribe(() => {
      this.loadPending();
    });
  }

  autoApprove() {
    this.service.autoApprovePromotions().subscribe(() => {
      this.loadPending();
    });
  }
}
