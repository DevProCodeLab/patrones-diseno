/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

import { COLORS } from "../helpers/colors.ts";

class GameMemento {
    private level: number;
    private health: number;
    private position: string;

    constructor(level: number, health: number, position: string) {
        this.level = level;
        this.health = health;
        this.position = position;
    }

    getlevel(): number {
        return this.level;
    }

    getHealth(): number {
        return this.health;
    }

    getPosition(): string {
        return this.position;
    }
}

class Game {
    private level: number = 1;
    private health: number = 100;
    private position: string = "Inicio";           

    constructor() {
        console.log(`Jugando en el nivel ${this.level}, 
                vida: ${this.health}, 
                posisión ${this.position}`);
    }

    save(): GameMemento {
        return new GameMemento(this.level, this.health, this.position);
    }

    play(level: number, health: number, position: string): void {
        this.level = level;
        this.health = health;
        this.position = position;

        console.log(`Jugando en el nivel ${this.level}, 
                vida: ${this.health}, 
                posisión ${this.position}`);    
    }
    
    restore(memento: GameMemento): void{
        this.level = memento.getlevel();
        this.health = memento.getHealth();
        this.position = memento.getPosition();

        console.log(`Restaurando juego al nivel ${this.level}, 
                vida: ${this.health}, 
                posisión ${this.position}`);    
    }

}

class GameHistory { 
    private mementos: GameMemento[] = [];

    push(memento: GameMemento): void {
        this.mementos.push(memento);
    }

    pop(): GameMemento | null {
        return this.mementos.pop() ?? null;
    }
}

function main() {
    const game = new Game();
    const history = new GameHistory();

    history.push(game.save());

    game.play(2, 80, "Bosque encantado");
    history.push(game.save());

    game.play(3, 50, "Cueva oscura");
    history.push(game.save());

    game.play(4, 20, "Castillo maldito");
    console.log('%c\nEstado actual del juego:', COLORS.blue);

    game.restore(history.pop()!);
    console.log('%c\Despues de restaurar el último estado guardado.', COLORS.green);

    game.restore(history.pop()!);
    console.log('%c\Despues de restaurar el último estado guardado.', COLORS.green);
}

main();
