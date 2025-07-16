import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AppMessageComponent } from '../shared/components/app-message/app-message.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    AppMessageComponent,
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'promotions-client';
  isLoading = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
