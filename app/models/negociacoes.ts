import { Negociacao } from "./negociacao";

export class Negociacoes {
  private negociacoes: Negociacao[] = []; // Array<Negociacao>

  adicionar(negociacao: Negociacao): void{
    this.setNegociacoes(negociacao);
  }

  setNegociacoes(negociacoes: Negociacao): void {
    this.negociacoes.push(negociacoes);
  }

  lista(): readonly Negociacao[] {
    return this.negociacoes;  
  }

  deletar(negociacao: Negociacao) {
    this.negociacoes.splice(this.negociacoes.indexOf(negociacao), 1);
  }
}