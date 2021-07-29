export class Negociacao {
  constructor( 
      private _data: Date,
      public readonly quantidade: number,
      public readonly valor: number
    ) {}

  get volume(): number {
    return this.quantidade * this.valor;
  }

  get data(): Date {
    const data = new Date(this._data.getTime()); //programação defensiva
    return data;
  }

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
}