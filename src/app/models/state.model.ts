export class State {
    ufSigla: string;
    ufNome: string;
    location: string;
    xCircle: number;
    yCircle: number;
    xSigla: number;
    ySigla: number;
    xNome: number;
    yNome: number;

    constructor(ufSigla: string, ufNome: string, location: string, xCircle: number, yCircle: number, xSigla: number, ySigla: number, xNome: number, yNome: number) {
        this.ufSigla = ufSigla;
        this.ufNome = ufNome;
        this.location = location;
        this.xCircle = xCircle;
        this.yCircle = yCircle;
        this.xSigla = xSigla;
        this.ySigla = ySigla;
        this.xNome = xNome;
        this.yNome = yNome;
    }
}
