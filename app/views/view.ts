
interface ViewIterface<T> {
  template(model: T) : string;
  update(model: T): void 
}

export abstract class View<T> implements ViewIterface<T> {
  private elemento: HTMLElement;
  
  constructor(seletor: string) {
    this.elemento = document.querySelector(seletor);
  }

  abstract template(model: T): string;

  update(model: T): void {
    this.elemento.innerHTML = this.template(model);
  }
}