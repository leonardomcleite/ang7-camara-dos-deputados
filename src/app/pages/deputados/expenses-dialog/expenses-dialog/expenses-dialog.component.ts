import { Component, Inject, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeputadosService } from 'src/app/services/deputados/deputados.service';

@Component({
  selector: 'app-expenses-dialog',
  templateUrl: './expenses-dialog.component.html',
  styleUrls: ['./expenses-dialog.component.scss']
})
export class ExpensesDialogComponent implements OnInit {

  colors = [
    '#bbdefb',
    '#90caf9',
    '#64b5f6',
    '#42a5f5',
    '#2196f3',
    '#1e88e5',
    '#1976d2',
    '#1565c0',
    '#0d47a1',

    '#fff176',
    '#ffee58',
    '#ffeb3b',
    '#fdd835',
    '#fbc02d',

    '#1b5e20',
    '#2e7d32',
    '#388e3c',
    '#43a047',
    '#4caf50',
    '#66bb6a',
    '#81c784',
    '#a5d6a7',
    '#c8e6c9'];

  barChartOptions = {
    responsive: true,
  };
  barChartLegend = true;
  barChartType = 'bar';

  barChartData: any[];
  barChartLabels: string[];
  barChartColors: any[];
  despesas: any;
  pagina = 1;
  group = 2018;
  total = 0;

  @Input() get ano(): number {return this._ano; }
  @Output() anoChange: EventEmitter<number> = new EventEmitter();
  set ano(val: number) {
    this._ano = val;
    this.anoChange.emit(val);
    this.setData();
  }
  _ano = 2018;

  constructor(
    public dialogRef: MatDialogRef < ExpensesDialogComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public deputadosService: DeputadosService
  ) {}

  ngOnInit() {
    this.setData();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setData(): any {
    const temp = this.deputadosService.findDespesas(this.data.id, this.pagina, this.ano).toPromise().then(returnQuery => {
      this.despesas = [];
      this.barChartData = [
        {data: [], label: 'Quantidade'}
      ];
      this.total = 0;
      this.despesas = returnQuery;

      this.barChartColors = [{backgroundColor: []}];
      this.barChartLabels = [];

      let tipos = [];
      this.despesas.dados.forEach(element => {
        tipos.push(element.tipoDespesa);
      });
      tipos = this.removeDuplicates(tipos);

      const obj = [];
      tipos.forEach(element => {
        obj.push({
          cont: (this.despesas.dados.filter(a => a.tipoDespesa === element)),
          color: this.colors[obj.length - 1],
          tipoDespesa: element,
          soma: 0,
        });
      });

      this.despesas.dados.forEach(element => {
        this.total += element.valorLiquido;
      });

      obj.forEach(element => {
        element.cont.forEach(ct => {
          element.soma += ct.valorLiquido;
        });
      });

      const values = [];
      obj.forEach(e => {
        this.barChartColors[0].backgroundColor.push(e.color);
        values.push(e.soma);
        this.barChartLabels.push(e.tipoDespesa);
      });
      this.barChartData = [
        {data: values, label: 'Quantidade'}
      ];

    });
  }

  removeDuplicates(arr) {
    const novaArr = arr.filter(function(este, i) {
      return arr.indexOf(este) === i;
    });
    return novaArr;
  }

}
