/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface EstrategiaMovimiento {
    mover(): void;
}

//La mas rapida pero costosa
class Nadar implements EstrategiaMovimiento {
    mover(): void {
        console.log(`%cEl patito está nadando rapidamente sobre el agua.\n`, COLORS.blue);
    }
}

//no tan rapida pero no tan costosa
class Volar implements EstrategiaMovimiento {
    mover(): void {
        console.log(`%cEl patito está volando por el cielo.\n`, COLORS.pink);
    }
}

//la mas lenta pero la mas barata
class Caminar implements EstrategiaMovimiento {
    mover(): void {
        console.log(`%cEl patito está caminando lentamente por la tierra.\n`, COLORS.green);
    }
}

//clase implementadora del patrón Strategy
class Patito {
    private estrategiaMovimiento: EstrategiaMovimiento; 
    private nombre: string;

    constructor(nombre: string, estrategiaMovimiento: EstrategiaMovimiento) {
        this.nombre = nombre;
        this.estrategiaMovimiento = estrategiaMovimiento;
    }

    mover() {
        console.log(`El patito ${this.nombre} está listo para moverse.`);
        this.estrategiaMovimiento.mover();        
    }

    cambiarEstrategia(estrategiaMovimiento: EstrategiaMovimiento) {
        this.estrategiaMovimiento = estrategiaMovimiento;
        console.log(`El patito ${this.nombre} ha cambiado su estrategia de movimiento.`);
    }
}

function main() {
    const patito1 = new Patito("Patito 1", new Nadar());
    const patito2 = new Patito("Patito 2", new Volar());
    const patito3 = new Patito("Patito 3", new Caminar());

    console.log("%c¡La carrera de patitos ha comenzado!", COLORS.yellow);

    patito1.mover();
    patito2.mover();
    patito3.mover();    

    patito3.cambiarEstrategia(new Nadar());
    patito3.mover();
    
    console.log("\n\n");
}

main();
