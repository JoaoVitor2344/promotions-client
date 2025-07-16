import { Component } from '@angular/core';
import { ScrapingService } from '../../../shared/services/scraping.service';
import { AppMessageService } from '../../../shared/services/app-message.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-scraping-list',
  standalone: true,
  templateUrl: './scraping-list.component.html',
  styleUrls: ['./scraping-list.component.css'],
  imports: [ButtonComponent]
})
export class ScrapingListComponent {
  loading = false;

  constructor(private service: ScrapingService, private messageService: AppMessageService) {}

  importMagalu() {
    this.loading = true;
    this.service.importMagalu().subscribe({
      next: () => {
        this.loading = false;
        this.messageService.show('success', 'Importação do Magalu realizada com sucesso!');
      },
      error: () => {
        this.loading = false;
        this.messageService.show('error', 'Erro ao importar promoções do Magalu.');
      }
    });
  }
}
