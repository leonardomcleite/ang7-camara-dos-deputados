import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeputadosService } from 'src/app/services/deputados/deputados.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  constructor(
    public router: Router,
    public deputadosService: DeputadosService
  ) { }

  navigateTo(uf: string) {
    const state = [uf];
    this.deputadosService.setSiglaUf(state);
    this.deputadosService.filter.emit();
    this.router.navigate(['/deputados']);
  }

  funcao(n) {
    console.log(n);
  }

}

