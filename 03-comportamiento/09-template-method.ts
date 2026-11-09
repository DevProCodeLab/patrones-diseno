/**
 * ! Patrón Template Method
 *
 * El patrón Template Method es un patrón de diseño de comportamiento
 * que define el esqueleto de un algoritmo en una operación,
 * delegando algunos pasos a las subclases.
 *
 * Permite que las subclases redefinan ciertos pasos de un algoritmo
 * sin cambiar su estructura.
 *
 * * Es útil cuando se tiene un algoritmo que sigue una secuencia de pasos
 * * y se quiere permitir a las subclases que redefinan algunos de esos pasos.
 *
 * https://refactoring.guru/es/design-patterns/template-method
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * Contexto: Vamos a implementar un sistema que permite preparar
 * diferentes bebidas calientes, como café y té.
 *
 * Aunque el proceso general para preparar ambas bebidas es similar
 * (hervir agua, añadir el ingrediente principal, servir en una taza),
 * hay pasos específicos que varían dependiendo de la bebida.
 *
 * El patrón Template Method es perfecto para este caso,
 * ya que define un esqueleto general del algoritmo en una clase base
 * y delega los detalles específicos a las subclases.
 */

abstract class BebidaCaliente {
    // Método plantilla que define el esqueleto del algoritmo
    prepararBebida(): void {
        this.hervirAgua();
        this.agregarIngredientePrincipal();
        this.servirEnTaza();
        this.agregarCondimentos();
    }

    // Pasos del algoritmo que pueden ser comunes o específicos
    private hervirAgua(): void {
        console.log("Hirviendo agua...");
    }
    private servirEnTaza(): void {
        console.log("Sirviendo en la taza...");
    }
    // Métodos abstractos que deben ser implementados por las subclases
    protected abstract agregarIngredientePrincipal(): void;
    protected abstract agregarCondimentos(): void;
}

class tea extends BebidaCaliente {
    protected override agregarIngredientePrincipal(): void {
        console.log("Agregando bolsa de té...");
    }
    protected override agregarCondimentos(): void {
        console.log("Agregando miel y limón...");
    }
}

class coffee extends BebidaCaliente {
    protected override agregarIngredientePrincipal(): void {
        console.log("Agregando café molido...");
    }  
    protected override agregarCondimentos(): void {  
        console.log("Agregando azúcar y leche...");
    } 
}

function main() {
    console.log("%cPreparando té:", COLORS.green);
    const teaBeverage = new tea();
    teaBeverage.prepararBebida();

    console.log("\n%cPreparando café:", COLORS.brown);
    const coffeeBeverage = new coffee();
    coffeeBeverage.prepararBebida();
}

main();
