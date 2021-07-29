import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this.inputData = document.querySelector('#data');
    this.inputQuantidade = document.querySelector('#quantidade');
    this.inputValor = document.querySelector('#valor');
    this.negociacoesView.update(this.negociacoes);
  }

  adicionar(): void {
    const negociacao: Negociacao = this.criaNegociacao();
    this.negociacoes.adicionar(negociacao);
    console.log(this.listarNegociacoes());
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update('negociação adicionada com sucesso!');
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