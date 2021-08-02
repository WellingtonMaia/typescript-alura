export abstract class View<T> {
  private elemento: HTMLElement;
  
  constructor(seletor: string) {
    const elemento = document.querySelector(seletor);
    
    if (!elemento) {
      throw new Error(`Seletor ${seletor} não encontrar.`);
    }
    
    this.elemento = elemento as HTMLElement;
  }

  protected abstract template(model: T): string;


  public update(model: T): void {
    let template = this.template(model);

    this.elemento.innerHTML = template;
  }
}