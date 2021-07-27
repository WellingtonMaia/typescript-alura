import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();

  constructor() {
    this.inputData = document.querySelector('#data');
    this.inputQuantidade = document.querySelector('#quantidade');
    this.inputValor = document.querySelector('#valor');
  }

  adicionar(): void {
    const negociacao: Negociacao = this.criaNegociacao();
    this.negociacoes.adicionar(negociacao);
    console.log(this.listarNegociacoes());
    this.limparFormulario();
  }

  criaNegociacao() : Negociacao {
    const exp = /-/g
    const negociacao = new Negociacao(
      new Date(this.inputData.value.replace(exp, ',')),
      parseInt(this.inputQuantidade.value),
      parseFloat(this.inputValor.value)
    );

    return negociacao;
  }

  listarNegociacoes() {
    return this.negociacoes.lista();
  }


  limparFormulario(): void {
    this.inputData.value = '';
    this.inputQuantidade.value = '';
    this.inputValor.value = '';
    this.inputData.focus();
  }
}