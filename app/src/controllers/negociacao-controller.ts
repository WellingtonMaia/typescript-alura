import { domInjector } from '../decorators/domInjector.js';
import { inspect } from '../decorators/inspect.js';
import { logarTempoExecucao } from '../decorators/logar-tempo-execucao.js';
import { DiasDaSemanda } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesService } from '../services/negociacoes-service.js';
import { imprimir } from '../utils/imprimir.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
  @domInjector("#data")
  private inputData: HTMLInputElement;
  
  @domInjector("#quantidade")
  private inputQuantidade: HTMLInputElement;
  
  @domInjector("#valor")
  private inputValor: HTMLInputElement;

  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');
  private negociacoesService =  new NegociacoesService();

  constructor() {
     this.negociacoesView.update(this.negociacoes);
  }

  @logarTempoExecucao()
  @inspect
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

    imprimir(negociacao, this.negociacoes);
    this.negociacoes.paraTexto();
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

  public importarDados(): void {
    this.negociacoesService.obterNegociacoesDoDia()
    .then(negociacoes => {
      return negociacoes.filter(negociacaoDeHoje => {
        return !this.negociacoes
        .lista()
        .some(negociacao => negociacao.ehIgual(negociacaoDeHoje));
      });
    })
    .then(negociacoes => {
      for (let negociacao of negociacoes) {
        this.negociacoes.adicionar(negociacao);
      }

      this.negociacoesView.update(this.negociacoes);
    });
  }
}