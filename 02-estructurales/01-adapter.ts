/**
 * ! Patrón Adapter
 *  Permite que objetos con interfaces incompatibles trabajen juntos, también es muy
 *  util para utilizar librerías de terceros en nuestra aplicación sin depender
 *  directamente de ellas.
 *
 * * Es útil cuando se quiere reutilizar una clase que no tiene la interfaz que
 * * necesitamos o cuando queremos crear una capa de abstracción para una librería
 * * de terceros.
 *
 * https://refactoring.guru/es/design-patterns/adapter
 */

import { COLORS } from "../helpers/colors.ts";

export class LocalLogger {
    
    constructor(private file: string) {}

    writeLog (msg: string): void {
        console.log(`[${this.file} LOG] ${msg}`);
    }

    writeErrorLog (msg: string): void {
        console.log(`[${this.file} ERROR] %c${msg}`, COLORS.red);
    }

    writeWarningLog (msg: string): void {
        console.log(`[${this.file} WARNING] %c${msg}`, COLORS.orange);
    }
}