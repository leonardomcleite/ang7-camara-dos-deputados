import { Component, OnInit } from '@angular/core';
import { DeputadosService } from './services/deputados/deputados.service';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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
    });
    this.router.events.subscribe((event: any) => {
      if (event.url !== undefined) {
        this.path = event.url;
      }
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
}
