
// interface ViewIterface<T> {
//   template(model: T) : string;
//   update(model: T): void;
// }

export abstract class View<T> {
  private elemento: HTMLElement;
  private escapar = false;
  
  constructor(seletor: string, escapar?: boolean) {
    const elemento = document.querySelector(seletor);
    
    if (!elemento) {
      throw new Error(`Seletor ${seletor} não encontrar.`);
    }
    
    this.elemento = elemento as HTMLElement;
    
    if (escapar) this.escapar = escapar;
  }

  protected abstract template(model: T): string;

  public update(model: T): void {
    let template = this.template(model);

    if (this.escapar) {
      template = template.replace(/<script>[\s\S]*?<\/script>/, '');
    }

    this.elemento.innerHTML = template;
  }
}