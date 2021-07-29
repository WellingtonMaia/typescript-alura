import { Negociacao } from "./negociacao";

export class Negociacoes {
  private negociacoes: Negociacao[] = []; // Array<Negociacao>

  public adicionar(negociacao: Negociacao): void{
    this.setNegociacoes(negociacao);
  }

  private setNegociacoes(negociacoes: Negociacao): void {
    this.negociacoes.push(negociacoes);
  }

  public lista(): readonly Negociacao[] {
    return this.negociacoes;  
  }

  public deletar(negociacao: Negociacao) {
    this.negociacoes.splice(this.negociacoes.indexOf(negociacao), 1);
  }
}