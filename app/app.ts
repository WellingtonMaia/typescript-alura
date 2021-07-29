import { NegociacaoController } from "./controllers/negociacao-controller.js";
import { NegociacoesView } from "./views/negociacoes-view.js";

const negociacaoController = new NegociacaoController();
const form = document.querySelector('.form');
form.addEventListener('submit', event => {
  event.preventDefault();
  negociacaoController.adicionar();
});