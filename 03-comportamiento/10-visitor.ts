/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

interface Visitor {
    visitRollerCoaster(rollerCoaster: RollerCoaster): void;
    visitHauntedHouse(hauntedHouse: HauntedHouse): void;
    visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction {
    accept(visitor: Visitor): void;
    getPrice(): number;
}

class RollerCoaster implements Attraction {
    price: number = 50;

    getPrice(): number {
        console.log(`Precio original de la montaña rusa: $${this.price}`);
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitRollerCoaster(this);
    }
}

class HauntedHouse implements Attraction {
    price: number = 30;     

    getPrice(): number {
        console.log(`Precio original de la casa del terror: $${this.price}`);
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitHauntedHouse(this);
    }
}

class FerrisWheel implements Attraction {
    price: number = 20;

    getPrice(): number {
        console.log(`Precio original de la rueda de la fortuna: $${this.price}`);
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitFerrisWheel(this);
    }
}

class ChildVisitor implements Visitor {

    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        console.log(`El niño en montaña russa tiene un descuento del 50%: ${rollerCoaster.getPrice() * 0.5}`);
    }
    visitHauntedHouse(hauntedHouse: HauntedHouse): void {
        console.log(`El niño en casa del terror tiene un descuento del 50%: ${hauntedHouse.getPrice() * 0.5}`);
    }
    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(`El niño en rueda de la fortuna tiene un descuento del 50%: ${ferrisWheel.getPrice() * 0.5}`);
    }
}

class AdultVisitor implements Visitor {
    visitHauntedHouse(hauntedHouse: HauntedHouse): void {
        console.log(`El adulto en casa del terror tiene un precio: $${hauntedHouse.getPrice()}`);
    }
    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(`El adulto en rueda de la fortuna tiene un precio: $${ferrisWheel.getPrice()}`);
    }
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        console.log(`El adulto en montaña russa tiene un precio: $${rollerCoaster.getPrice()}`);
    }  
}

class SeniorVisitor implements Visitor {
    visitHauntedHouse(hauntedHouse: HauntedHouse): void {
        console.log(`El adulto mayor en casa del terror tiene un precio con descuento: $${hauntedHouse.getPrice() * 0.8}`);
    }
    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(`El adulto mayor en rueda de la fortuna tiene un precio con descuento: $${ferrisWheel.getPrice() * 0.8}`);
    }
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        console.log(`El adulto mayor en montaña russa tiene un precio con descuento: $${rollerCoaster.getPrice() * 0.8}`);
    }
}

function main() {
    const atracciones: Attraction[] = [
        new RollerCoaster(),
        new HauntedHouse(),
        new FerrisWheel()
    ];

    atracciones.forEach(atraccion => {
        console.log(`Precio original de la atracción: $${atraccion.getPrice()}`);
    });

    console.log("\n--- Visitantes ---\n");
    const childVisitor = new ChildVisitor();
    const adultVisitor = new AdultVisitor();
    const seniorVisitor = new SeniorVisitor();

    atracciones.forEach(atraccion => {
        console.log(`\n%cVisitante Niño`, COLORS.blue);
        atraccion.accept(childVisitor);
        console.log(`\n%cVisitante Adulto`, COLORS.orange);
        atraccion.accept(adultVisitor);
        console.log(`\n%cVisitante Adulto Mayor`, COLORS.green);
        atraccion.accept(seniorVisitor);
    });
}

main();
