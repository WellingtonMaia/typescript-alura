export function domInjector(seletor: string) {
  return function (target: any, propertyKey: string) {
    
    let elemento: HTMLElement;
    
    const getter = function(): HTMLElement {
      if (!elemento) {
        elemento = <HTMLElement>document.querySelector(seletor); 
      }
      return elemento;
    }

    Object.defineProperty(target, propertyKey, {
      get: getter
    })
  }
}