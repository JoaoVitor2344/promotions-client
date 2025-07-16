import { Component } from '@angular/core';
import { ImportService } from '../../../shared/services/import.service';
import { AppMessageService } from '../../../shared/services/app-message.service';

@Component({
  selector: 'app-import-list',
  standalone: true,
  templateUrl: './import-list.component.html',
  styleUrls: ['./import-list.component.css']
})
export class ImportListComponent {
  loadingAli = false;
  loadingAmazon = false;
  loadingML = false;
  loadingShopee = false;

  constructor(private service: ImportService, private messageService: AppMessageService) {}

  importAliExpress() {
    this.reset();
    this.loadingAli = true;
    this.service.importAliExpress().subscribe({
      next: () => this.handleSuccess('Importação do AliExpress realizada com sucesso!'),
      error: () => this.handleError('Erro ao importar promoções do AliExpress.')
    });
  }
  importAmazon() {
    this.reset();
    this.loadingAmazon = true;
    this.service.importAmazon().subscribe({
      next: () => this.handleSuccess('Importação da Amazon realizada com sucesso!'),
      error: () => this.handleError('Erro ao importar promoções da Amazon.')
    });
  }
  importMercadoLivre() {
    this.reset();
    this.loadingML = true;
    this.service.importMercadoLivre().subscribe({
      next: () => this.handleSuccess('Importação do Mercado Livre realizada com sucesso!'),
      error: () => this.handleError('Erro ao importar promoções do Mercado Livre.')
    });
  }
  importShopee() {
    this.reset();
    this.loadingShopee = true;
    this.service.importShopee().subscribe({
      next: () => this.handleSuccess('Importação da Shopee realizada com sucesso!'),
      error: () => this.handleError('Erro ao importar promoções da Shopee.')
    });
  }
  private handleSuccess(msg: string) {
    this.loadingAli = this.loadingAmazon = this.loadingML = this.loadingShopee = false;
    this.messageService.show('success', msg);
  }
  private handleError(msg: string) {
    this.loadingAli = this.loadingAmazon = this.loadingML = this.loadingShopee = false;
    this.messageService.show('error', msg);
  }
  private reset() {
    // apenas reseta loading, mensagens são globais
    this.loadingAli = this.loadingAmazon = this.loadingML = this.loadingShopee = false;
  }
}
