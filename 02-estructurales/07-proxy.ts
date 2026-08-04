/**
* ! Patrón Proxy
* Este patrón se utiliza para controlar el acceso a un objeto, es decir,
* se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
*
* * Es útil cuando necesitamos controlar el acceso a un objeto,
* * por ejemplo, para verificar si el cliente tiene permiso
* * para acceder a ciertos métodos o propiedades.
*
* https://refactoring.guru/es/design-patterns/proxy
*
*/

import { COLORS } from "../helpers/colors.ts";

class Player {
    name: string;
    level: number;
    
    constructor(name: string, level: number) {
        this.name = name;
        this.level = level;
    }
}

interface Room {
    enter(player: Player): void;
}

class SecretRoom implements Room {
    
    enter(player: Player): void {
        console.log(`Bienvenido ${player.name} al cuarto secreto`);
        console.log('un gran enemeigo te espera');        
    }    
}

// Proxy
class MagicPortal implements Room {
    private secretRoom: Room;

    constructor(secretRoom: Room) {
        this.secretRoom = secretRoom;
    }
    
    enter(player: Player): void {
        if (player.level >= 10) {
            this.secretRoom.enter(player);
            return;
        }
        console.log(`%cLo siento ${player.name}, tu nivel es 
            ${player.level} y no tienes el nivel de 10 para entrar al cuarto secreto`, COLORS.red);
    }        
}

function main() {
    //proxy
    const magicPortal = new MagicPortal(new SecretRoom());

    const player1 = new Player('Juan', 5);
    const player2 = new Player('Pedro', 15);

    console.log('%cIntentando entrar al cuarto secreto con el primer jugador', COLORS.blue);
    magicPortal.enter(player1);

    console.log('%cIntentando entrar al cuarto secreto con el segundo jugador', COLORS.blue);
    magicPortal.enter(player2);
}

main();