import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao";

export class Negociacoes implements Modelo<Negociacoes> {
  
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

  public paraTexto(): string {
    let response = '';
    for (let element of this.negociacoes) {
      
      response += `
        --------------------------------
        Data: ${element.data}
        Quantidade: ${element.quantidade}
        Valor: ${element.valor}
        Volume: ${element.volume}
        --------------------------------
        `;
    }
    return response;
  }

  ehIgual(object: Negociacoes): boolean {
    return JSON.stringify(this.negociacoes) === JSON.stringify(object);
  }
}