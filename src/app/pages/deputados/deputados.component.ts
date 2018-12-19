import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeputadosService } from '../../services/deputados/deputados.service';
import { ExpensesDialogComponent } from './expenses-dialog/expenses-dialog/expenses-dialog.component';

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
  sortBy = '';
  sexo: string[] = [];
  image: string;
  page = 1;
  tMandato: any;
  idade: any;
  orderBy: any = '0';

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
    public dialog: MatDialog
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
      this.sortBy = this.deputadosService.getSortBy();
      this.orderBy = this.deputadosService.getOrderBy();
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
    switch (this.sortBy) {
      case 'siglaPartido':
        if (this.orderBy === '0') {
          this.deputados.sort((a, b) => (a.ultimoStatus.siglaPartido > b.ultimoStatus.siglaPartido) ? 1 : ((b.ultimoStatus.siglaPartido > a.ultimoStatus.siglaPartido) ? -1 : 0));
        } else {
          this.deputados.sort((b, a) => (a.ultimoStatus.siglaPartido > b.ultimoStatus.siglaPartido) ? 1 : ((b.ultimoStatus.siglaPartido > a.ultimoStatus.siglaPartido) ? -1 : 0));
        }
        break;
      case 'siglaUf':
        if (this.orderBy === '0') {
          this.deputados.sort((a,b) => (a.ultimoStatus.siglaUf > b.ultimoStatus.siglaUf) ? 1 : ((b.ultimoStatus.siglaUf > a.ultimoStatus.siglaUf) ? -1 : 0));
        } else {
          this.deputados.sort((b,a) => (a.ultimoStatus.siglaUf > b.ultimoStatus.siglaUf) ? 1 : ((b.ultimoStatus.siglaUf > a.ultimoStatus.siglaUf) ? -1 : 0));
        }
        break;
      default:
        if (this.orderBy === '0') {
          this.deputados.sort((a,b) => (a.ultimoStatus.nome > b.ultimoStatus.nome) ? 1 : ((b.ultimoStatus.nome > a.ultimoStatus.nome) ? -1 : 0));
        } else {
          this.deputados.sort((b,a) => (a.ultimoStatus.nome > b.ultimoStatus.nome) ? 1 : ((b.ultimoStatus.nome > a.ultimoStatus.nome) ? -1 : 0));
        }
    }
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
    const dialogRef = this.dialog.open(ExpensesDialogComponent, {
      width: '99%',
      data: deputado
    });
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

  toggle(type) {
    switch (type) {
      case 'filter':
        this.deputadosService.toggleFilters.emit();
        break;
      case 'sort':
        this.deputadosService.toggleSortBy.emit();
        break;
    }
  }

}
