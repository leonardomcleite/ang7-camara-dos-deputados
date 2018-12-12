import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DeputadosService } from 'src/app/services/deputados/deputados.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {

  @Input() man: number;
  @Input() woman: number;

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
    scaleShowVerticalLines: false,
    scaleShowHorizontalLines: false,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          min: 0,
          fontSize: 16,
          fontFamily: 'Raleway'
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          min: 0,
          fontSize: 16,
          fontFamily: 'Raleway'
        },
        scaleLabel: {
          display: true,
          labelString: '[Quantidade]',
          fontSize: 16,
          fontFamily: 'Raleway'
        },
      }]
    },
    legend: {
      display: false,
      position: 'bottom',
      labels: {
        fontSize: 15,
        fontStyle: 'bold',
        fontFamily: 'Raleway'
      }
    }
  };
  barChartLegend = true;
  barChartType = 'bar';

  barChartDistributionData: any[];
  barChartDistributionLabels: string[];
  barChartDistributionColors: any[];

  barChartPartidosData: any[];
  barChartPartidosLabels: string[];
  barChartPartidosColors: any[];

  @Input() get loading(): boolean {return this._loading; }
  @Output() loadingChange: EventEmitter<boolean> = new EventEmitter();
  set loading(val: boolean) {
    this._loading = val;
    this.loadingChange.emit(val);
  }
  _loading = true;

  constructor(
    public deputadosService: DeputadosService
  ) {}

  ngOnInit() {
    this.setData();
    this.deputadosService.filter.subscribe(() => {
      this.setData();
    });
  }

  setData(): any {
    this.loading = true;
    const temp = this.deputadosService.getDeputados();
    const man = temp.filter(dep => dep.sexo === 'M').length;
    const woman = temp.filter(dep => dep.sexo === 'F').length;
    this.barChartDistributionData = [
      {data: [man, woman], label: 'Quantidade'}
    ];
    this.barChartDistributionColors = [
      {backgroundColor: ['#5a95ce', '#f9ee1b']}
    ];
    this.barChartDistributionLabels = ['Homens', 'Mulheres'];

    let partidos = [];
    const partCont = [];
    temp.forEach(element => {
      partidos.push(element.ultimoStatus.siglaPartido);
    });
    partidos = this.removeDuplicates(partidos);
    this.barChartPartidosColors = [{backgroundColor: []}];

    const obj = [];
    partidos.forEach(element => {
      obj.push({
        cont: temp.filter(p => p.ultimoStatus.siglaPartido === element).length,
        color: this.colors[obj.length - 1],
        partido: element
      });
    });

    obj.sort(function(a, b) {
      return b.cont - a.cont;
    });

    const data = [];
    this.barChartPartidosLabels = [];
    obj.forEach(e => {
      this.barChartPartidosColors[0].backgroundColor.push(e.color);
      data.push(e.cont);
      this.barChartPartidosLabels.push(e.partido);
    });
    this.barChartPartidosData = [
      {data: data, label: 'Quantidade'}
    ];
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  geraCor() {
    const hexadecimais = '0123456789ABCDEF';
    let cor = '#';
    for (let i = 0; i < 6; i++ ) {
      cor += hexadecimais[Math.floor(Math.random() * 16)];
    }
    return cor;
  }

  removeDuplicates(arr) {
    const novaArr = arr.filter(function(este, i) {
      return arr.indexOf(este) === i;
    });
    return novaArr;
  }

  // events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  onChartClick(event) {
    console.log(event);
  }
}
