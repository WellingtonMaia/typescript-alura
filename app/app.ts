import { NegociacaoController } from "./controllers/negociacao-controller.js";

const negociacaoController = new NegociacaoController();
const form = document.querySelector('.form');

if (!form) {
  throw new Error('Não foi possível realizar essa operação.')
}

form.addEventListener('submit', event => {
  event.preventDefault();
  negociacaoController.adicionar();
});