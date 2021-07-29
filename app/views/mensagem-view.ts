import { View } from "./view.js";

export class MensagemView extends View<string> {
  constructor(seletor: string) {
    super(seletor);
  }
  
  protected template(model: string): string {
    return `<p class="alert alert-info">${model}</p>`;
  }
}