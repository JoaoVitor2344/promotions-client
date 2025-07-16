import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AffiliatesService } from '../../../shared/services/affiliates.service';
import { Affiliate } from '../../../shared/models/affiliate.model';
import { AppMessageService } from '../../../shared/services/app-message.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-affiliates-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './affiliates-list.component.html',
  styleUrls: ['./affiliates-list.component.css']
})
export class AffiliatesListComponent implements OnInit {
  affiliates: Affiliate[] = [];

  constructor(
    private affiliatesService: AffiliatesService,
    private router: Router,
    private messageService: AppMessageService
  ) {}

  ngOnInit(): void {
    this.loadAffiliates();
  }

  loadAffiliates() {
    this.affiliatesService.getAffiliates().subscribe({
      next: (data) => {
        this.affiliates = data;
        if (data.length) {
          this.messageService.show('success', 'Afiliados carregados com sucesso!');
        } else {
          this.messageService.show('info', 'Nenhum afiliado encontrado.');
        }
      },
      error: () => {
        this.affiliates = [];
        this.messageService.show('error', 'Erro ao carregar afiliados.');
      }
    });
  }

  goToNew() {
    this.router.navigate(['/affiliates/new']);
  }

  editAffiliate(id: number) {
    this.router.navigate(['/affiliates/edit', id]);
  }

  deleteAffiliate(id: number) {
    if (confirm('Tem certeza que deseja remover este afiliado?')) {
      this.affiliatesService.deleteAffiliate(id).subscribe({
        next: () => {
          this.loadAffiliates();
          this.messageService.show('success', 'Afiliado removido com sucesso!');
        },
        error: () => {
          this.messageService.show('error', 'Erro ao remover afiliado.');
        }
      });
    }
  }
}
