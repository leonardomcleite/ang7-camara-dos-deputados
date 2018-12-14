import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeputadosService } from './services/deputados/deputados.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  @ViewChild('filters') filters: any;
  @ViewChild('sorting') sorting: any;

  classifications = [
    {name: 'Nome dos Deputados', value: 'name'},
    {name: 'Estado', value: 'siglaUF'},
    {name: 'Partido', value: 'siglaPartido'}
  ];

  statesList: string[] = [];
  statesChipList: string[] = [];

  partidosList: string[] = [];
  partidosChipList: string[] = [];

  sexosList: any[] = [{sigla: 'M', nome: 'Masculino'}, {sigla: 'F', nome: 'Feminino'}];
  sexosChipList: string[] = [];

  idadeFrom: any;
  idadeTo: any;

  TMandatoFrom: any;
  TMandatoTo: any;

  selectable = true;
  removable = true;
  path: any;
  sortBy: any;
  orderBy: number;

  constructor(
    public deputadosService: DeputadosService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.findUfs();
    this.findPartidos();
    this.statesChipList = this.deputadosService.getSiglaUf();
    this.deputadosService.filter.subscribe(() => {
      this.statesChipList = this.deputadosService.getSiglaUf();
      this.partidosChipList = this.deputadosService.getSiglaPartido();
      this.idadeFrom = this.deputadosService.getIdade() ? this.deputadosService.getIdade().from : undefined;
      this.idadeTo = this.deputadosService.getIdade() ? this.deputadosService.getIdade().to : undefined;
      this.TMandatoFrom = this.deputadosService.getTMandato() ? this.deputadosService.getTMandato().from : undefined;
      this.TMandatoTo = this.deputadosService.getTMandato() ? this.deputadosService.getTMandato().to : undefined;
      this.sortBy = this.deputadosService.getSortBy();
      this.orderBy = this.deputadosService.getOrderBy();
    });
    this.router.events.subscribe((event: any) => {
      if (event.url !== undefined) {
        this.path = event.url;
      }
    });
    this.deputadosService.toggleSortBy.subscribe(() => {
      this.sorting.toggle();
      this.filters.close();
    });
    this.deputadosService.toggleFilters.subscribe(() => {
      this.filters.toggle();
      this.sorting.close();
    });
  }

  findUfs() {
    this.deputadosService.findUfs().toPromise().then((ufs: any) => {
      this.statesList = ufs.dados;
    });
  }

  findPartidos() {
    this.deputadosService.findPartidos().toPromise().then((partidos: any) => {
      this.partidosList = partidos.dados;
    });
  }

  addChipsStates(states) {
    this.statesChipList = states.value;
  }

  addChipsPartidos(partidos) {
    this.partidosChipList = partidos.value;
  }

  addChipsSexos(sexos) {
    this.sexosChipList = sexos.value;
  }

  removeStates(index: number): void {
    const temp = JSON.parse(JSON.stringify(this.statesChipList));
    temp.splice(index, 1);
    this.statesChipList = temp;
  }

  removePartidos(index: number): void {
    const temp = JSON.parse(JSON.stringify(this.partidosChipList));
    temp.splice(index, 1);
    this.partidosChipList = temp;
  }

  removeSexos(index: number): void {
    const temp = JSON.parse(JSON.stringify(this.sexosChipList));
    temp.splice(index, 1);
    this.sexosChipList = temp;
  }

  saveFilter() {
    this.deputadosService.setSiglaUf(this.statesChipList);
    this.deputadosService.setSiglaPartido(this.partidosChipList);
    this.deputadosService.setSiglaSexo(this.sexosChipList);
    this.deputadosService.setIdade(this.idadeFrom, this.idadeTo);
    this.deputadosService.setTMandato(this.TMandatoFrom, this.TMandatoTo);
    this.deputadosService.filter.emit();
  }

  saveClassification() {
    this.deputadosService.setSortBy(this.sortBy);
    this.deputadosService.setOrderBy(this.orderBy);
    this.deputadosService.filter.emit();
  }
}
