/**
* ! Patrón Bridge
* Este patrón nos permite desacoplar una abstracción de su implementación,
* de tal forma que ambas puedan variar independientemente.
*
* * Es útil cuando se tienen múltiples implementaciones de una abstracción
* * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
* * Se puede utilizar para separar la lógica de la interfaz de usuario también.
*
* https://refactoring.guru/es/design-patterns/bridge
*/

import { COLORS } from "../helpers/colors.ts";

interface Habilidad{
    use(): void;        
}

class AtaqueEspada implements Habilidad{
    
    use(): void {
        console.log('Ataque con %cespada feroz activo', COLORS.white);
    }    
}

class AtaqueHacha implements Habilidad{
    
    use(): void {
        console.log('Ataque con %cHacha feroz activo', COLORS.red);
    }
    
}

class AtaqueMagico implements Habilidad{
    
    use(): void {
        console.log('Ataque %cmágico lanzar hechizos activado', COLORS.blue);
    }
}

class AtaqueBoladeFuego implements Habilidad {

    use(): void {
        console.log('Ataque lazar %cBolas de fuego activado', COLORS.yellow);
    }
}

abstract class Personaje {
    protected habilidad: Habilidad;
    
    constructor(habilidad: Habilidad){
        this.habilidad = habilidad;
    }
    
    setHabilidad(habilidad: Habilidad): void{
        this.habilidad = habilidad;
    }
    
    abstract usarHabilidad(): void;
}

class Guerrero extends Personaje{
    override usarHabilidad(): void {
        console.log('\nEl guerrero esta listo para luchar!');
        this.habilidad.use();
    }
    
}

class Mago extends Personaje {
    override usarHabilidad(): void {
        console.log('\nEl mago esta listo para Luchar!');
        this.habilidad.use();
    }
    
}

function main (){
    const guerrero1 = new Guerrero(new AtaqueEspada());
    guerrero1.usarHabilidad();

    guerrero1.setHabilidad(new AtaqueHacha());
    guerrero1.usarHabilidad();

    const mago1 = new Mago(new AtaqueMagico());
    mago1.usarHabilidad();

    mago1.setHabilidad(new AtaqueBoladeFuego());
    mago1.usarHabilidad();
}

main();