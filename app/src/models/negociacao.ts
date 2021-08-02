import { Modelo } from "../interfaces/modelo.js";

export class Negociacao implements Modelo<Negociacao> {
  constructor( 
      private _data: Date,
      public readonly quantidade: number,
      public readonly valor: number
  ) {}

  public static criarInstancia(
    dataString: string, 
    quantidadeString: string, 
    valorString: string
  ): Negociacao {
    const exp = /-/g
    return new Negociacao(
      new Date(dataString.replace(exp, ',')),
      parseInt(quantidadeString),
      parseFloat(valorString)
    );
  }

  get volume(): number {
    return this.quantidade * this.valor;
  }

  get data(): Date {
    const data = new Date(this._data.getTime()); //programação defensiva
    return data;
  }

  public ehIgual(negociacao: Negociacao) {
    return negociacao.data.getDay() === this.data.getDay()
      && negociacao.data.getMonth() === this.data.getMonth()
      && negociacao.data.getFullYear() === this.data.getFullYear();
  }

  public paraTexto(): string {
    return `
      Data: ${this.data}
      Quantidade: ${this.quantidade}
      Valor: ${this.valor}
      Volume: ${this.volume}
    `;
  }
}