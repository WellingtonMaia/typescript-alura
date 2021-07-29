import { DiasDaSemanda } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView', true);
  private mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this.inputData = <HTMLInputElement>document
      .querySelector('#data');
    this.inputQuantidade = document
      .querySelector('#quantidade') as HTMLInputElement;
    this.inputValor = document
      .querySelector('#valor') as HTMLInputElement;
    this.negociacoesView.update(this.negociacoes);
  }

  public adicionar(): void {
    
    if (!this.dadosSaoValidos()) return;

    const negociacao = Negociacao.criarInstancia(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    
    if (!this.ehDiaUtil(negociacao.data)) {
      this.mensagemView.update('Apenas negociações em dias uteis são aceitas')
      return;
    }

    this.negociacoes.adicionar(negociacao);
    this.atualizaView();
    this.limparFormulario();
  }

  private limparFormulario(): void {
    this.inputData.value = '';
    this.inputQuantidade.value = '';
    this.inputValor.value = '';
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update('negociação adicionada com sucesso!');
  }

  private ehDiaUtil(data: Date): boolean {
    return ( data.getDay() > DiasDaSemanda.DOMINGO 
    && data.getDay() < DiasDaSemanda.SABADO);
  }

  private dadosSaoValidos() {
    return (this.inputData !== null
      && this.inputQuantidade != null
      && this.inputValor != null)
  }
}