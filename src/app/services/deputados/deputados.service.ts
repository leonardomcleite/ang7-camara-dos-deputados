import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

declare const require;

@Injectable({
  providedIn: 'root'
})
export class DeputadosService implements OnInit {

  urlBase = 'https://dadosabertos.camara.leg.br/api/v2/';

  @Output() filter: EventEmitter<string[]> = new EventEmitter();
  @Output() scrolled: EventEmitter<any> = new EventEmitter;
  @Output() toggleSortBy: EventEmitter<any> = new EventEmitter;
  @Output() toggleFilters: EventEmitter<any> = new EventEmitter;

  states: string[] = [];
  partidos: string[] = [];
  sexo: string[] = [];
  deputados: any[] = [];
  tMandato: any;
  idade: any;
  loading: boolean;
  sortBy: string;
  orderBy: number;

  constructor(
    public httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.filter.subscribe(state => {
      this.states = state;
    });
  }

  findDeputadosByUf(ufs: string[], partidos: string[], sexo: string[], page: number) {
    let url, siglaUf, pagina, siglaPartido, siglaSexo;

    siglaUf = ufs ? 'siglaUf=' + ufs.filter(uf => uf !== 'Todos') : '';
    siglaPartido = partidos ? '&siglaPartido=' + partidos : '';
    siglaSexo = sexo.length === 1 ? '&siglaSexo=' + sexo[0] : '';
    pagina = '&pagina=' + page;

    url = this.urlBase + 'deputados?' + siglaUf + siglaPartido + siglaSexo + pagina + '&itens=100&ordem=ASC&ordenarPor=nome';
    return this.httpClient.get(url);
  }

  findDeputados(ufs: string[], partidos: string[], sexo: string[], tempoMandato: any, idade: any, page: number) {
    let deputados;
    deputados = require(`./deputados.json`);
    deputados = deputados.filter(dp => dp.dataFalecimento === null);
    deputados.forEach(dp => {
      dp.idade = this.calculateAge(dp.dataNascimento);
      dp.tMandato = this.calculateAge(dp.ultimoStatus.data);
    });
    if (ufs.length > 0) {
      deputados = deputados.filter(dp => {
        return this.filterBy(ufs, dp.ultimoStatus.siglaUf);
      });
    }
    if (partidos.length > 0) {
      deputados = deputados.filter(dp => {
        return this.filterBy(partidos, dp.ultimoStatus.siglaPartido);
      });
    }
    if (sexo.length > 0) {
      deputados = deputados.filter(dp => {
        return this.filterBy(sexo, dp.sexo);
      });
    }
    if (tempoMandato !== undefined) {
      if (tempoMandato.from !== undefined && tempoMandato.to !== undefined) {
        deputados = deputados.filter(dp => {
          return (dp.tMandato ? (dp.tMandato >= tempoMandato.from) : true) && (dp.tMandato ? (dp.tMandato <= tempoMandato.to) : true);
        });
      }
    }
    if (idade !== undefined) {
      if (idade.from !== undefined && idade.to !== undefined) {
        deputados = deputados.filter(dp => {
          return (dp.idade ? (dp.idade >= idade.from) : true) && (dp.idade ? (dp.idade <= idade.to) : true);
        });
      }
    }
    return deputados;
  }

  filterBy(data, compare) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element === compare) {
        return true;
      }
    }
    return false;
  }

  findDeputadosById(id: number): Observable<any> {
    const url = this.urlBase +  'deputados/' + id;
    return this.httpClient.get(url);
  }

  findDespesas(id: number): Observable<any> {
    const url = this.urlBase +  'deputados/' + id +  'despesas?ordem=ASC&ordenarPor=ano';
    return this.httpClient.get(url);
  }

  findUfs(): Observable<any> {
    const url = this.urlBase +  'referencias/uf';
    return this.httpClient.get(url);
  }

  findPartidos(): Observable<any> {
    const url = this.urlBase + 'partidos?pagina=1&itens=100&ordem=ASC&ordenarPor=sigla';
    return this.httpClient.get(url);
  }

  setSiglaUf(states: string[]) {
    this.states = states;
  }

  getSiglaUf() {
    return this.states;
  }

  setSiglaPartido(partidos: string[]) {
    this.partidos = partidos;
  }

  getSiglaPartido() {
    return this.partidos;
  }

  setSiglaSexo(sexo: string[]) {
    this.sexo = sexo;
  }

  getSiglaSexo() {
    return this.sexo;
  }

  setDeputados(deputados: any[]) {
    this.deputados = deputados;
  }

  getDeputados() {
    return this.deputados;
  }

  setTMandato(from, to): any {
    if (from === undefined && to === undefined) {
      this.tMandato = undefined;
    }
    this.tMandato = {from: from, to: to};
  }

  getTMandato(): any {
    return this.tMandato;
  }

  setIdade(from, to): any {
    if (from === undefined && to === undefined) {
      this.idade = undefined;
    }
    this.idade = {from: from, to: to};
  }

  getIdade(): any {
    return this.idade;
  }

  setSortBy(sortBy: string) {
    this.sortBy = sortBy;
  }

  getSortBy(): string {
    return this.sortBy;
  }

  setOrderBy(orderBy: number) {
    this.orderBy = orderBy;
  }

  getOrderBy(): number {
    return this.orderBy;
  }

  calculateAge(dobString) {
    const dob = new Date(dobString);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const birthdayThisYear = new Date(currentYear, dob.getMonth(), dob.getDate());
    let age = currentYear - dob.getFullYear();

    if (birthdayThisYear > currentDate) {
      age--;
    }

    return age;
  }
}
