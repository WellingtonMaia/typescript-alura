import { Imprimivel } from "../interfaces/imprimivel.js";

export function imprimir (...objects: Array<Imprimivel>) {
  for (let object of objects) {
    console.log(object.paraTexto());
  }
}