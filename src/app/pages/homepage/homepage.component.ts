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

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    document.getElementById('tres').addEventListener('click', function (event) {
      console.log('#tres clicado');
      event.stopPropagation();
    });

    document.getElementById('dois').addEventListener('click', function (event) {
      console.log('#dois clicado');
      event.stopPropagation();
    });

    document.getElementById('um').addEventListener('click', function (event) {
      console.log('#um clicado');
    });
  }

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

