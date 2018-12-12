import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeputadosService } from '../../services/deputados/deputados.service';

@Component({
  selector: 'app-deputados',
  templateUrl: './deputados.component.html',
  styleUrls: ['./deputados.component.scss']
})
export class DeputadosComponent implements OnInit {

  subscription: Subscription [] = [];
  states: string[] = [];
  partidos: string[] = [];
  deputados: any[] = [];
  sexo: string[] = [];
  image: string;
  page = 1;
  tMandato: any;
  idade: any;

  @Input() get loading(): boolean {return this._loading; }
  @Output() loadingChange: EventEmitter<boolean> = new EventEmitter();
  set loading(val: boolean) {
    this._loading = val;
    this.loadingChange.emit(val);
  }
  _loading = true;

  constructor(
    public activatedRoute: ActivatedRoute,
    public deputadosService: DeputadosService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.states = this.deputadosService.getSiglaUf();
    this.findDeputadosByUf();

    this.deputadosService.filter.subscribe(() => {
      this.states = this.deputadosService.getSiglaUf();
      this.partidos = this.deputadosService.getSiglaPartido();
      this.sexo = this.deputadosService.getSiglaSexo();
      this.tMandato = this.deputadosService.getTMandato();
      this.idade = this.deputadosService.getIdade();
      this.deputados = [];
      this.page = 1;
      this.findDeputadosByUf();
    });
    this.deputadosService.scrolled.subscribe(() => {
      this.page++;
      this.findDeputadosByUf();
    });
  }

  findDeputadosByUf() {
    // this.deputadosService.findDeputadosByUf(this.states, this.partidos, this.sexo, this.page).toPromise().then((returnQuery: any) => {
    //   this.findMoreInformations(returnQuery.dados);
    //   this.deputados = this.deputados.concat(returnQuery.dados);
    //   this.removeDuplicates(this.deputados);
    //   this.deputadosService.setDeputados(this.deputados);
    // });
    this.deputados = this.deputadosService.findDeputados(
      this.states, this.partidos, this.sexo, this.tMandato, this.idade, this.page
    );
    this.removeDuplicates(this.deputados);
    this.deputadosService.setDeputados(this.deputados);
  }

  findMoreInformations(returnQuery) {
    const detail: any[] = [];
    for (let index = 0; index < returnQuery.length; index++) {
      const dptd = returnQuery[index];
      this.deputadosService.findDeputadosById(dptd.id).toPromise().then(returnQ => {
        detail.push(returnQ.dados);
        if (detail.length === returnQuery.length) {
          sessionStorage.setItem('Deputados' + this.page, JSON.stringify(detail));
        }
      });
    }
  }

  url(uf: string) {
    return 'url(../../../assets/thumb_partidos/' + uf + '.png) no-repeat';
  }

  removeDuplicates(arr) {
    const novaArr = arr.filter(function(este, i) {
      return arr.indexOf(este) === i;
    });
  }

  moreDetails(deputado: any) {
    
  }

  clearAnGoToHome() {
    this.states = [];
    this.deputadosService.setSiglaUf([]);
    this.partidos = [];
    this.deputadosService.setSiglaPartido([]);
    this.sexo = [];
    this.deputadosService.setSiglaSexo([]);
    this.tMandato = undefined;
    this.deputadosService.setTMandato(undefined, undefined);
    this.idade = undefined;
    this.deputadosService.setIdade(undefined, undefined);
    this.deputados = [];
    this.page = 1;
    this.router.navigate(['/']);
  }

}
