/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../helpers/colors.ts";

class Proyector {
    turnOn() {
        console.log('Proyector encendido');
    }

    turnOff() {
        console.log('Proyector apagado');
    }
}

class SoundSystem {
    on() {
        console.log('Sistema de sonido encendido');
    }

    off() {
        console.log('Sistema de sonido apagado');
    }
}

class VideoPlayer {
    On() {
        console.log('Reproductor de video encendido');
    }
    
    play(movie: string) {
        console.log(`Reproduciendo película: ${movie}`);
    }

    stop() {
        console.log('Reproductor de video detenido');
    }

    off() {
        console.log('Reproductor de video apagado');
    }
}

class PopCornMaker {
    on() {
        console.log('Máquina de palomitas encendida');
    }

    preparingPopcorn() {
        console.log('Preparando palomitas de maíz');
    }

    off() {
        console.log('Máquina de palomitas apagada');
    }
}

interface HomeTheaterFacadeOptions {
    proyector: Proyector;
    soundSystem: SoundSystem;
    videoPlayer: VideoPlayer;
    popCornMaker: PopCornMaker;
}

class HomeTheaterFacade {
    private proyector: Proyector;
    private soundSystem: SoundSystem
    private videoPlayer: VideoPlayer;
    private popCornMaker: PopCornMaker;

    constructor(options: HomeTheaterFacadeOptions) {
        this.proyector = options.proyector;
        this.soundSystem = options.soundSystem;
        this.videoPlayer = options.videoPlayer;
        this.popCornMaker = options.popCornMaker;
    }

    verPelicula(movie: string) {
        console.log(`\nPreparando para ver la película: ${movie}\n`);
        this.popCornMaker.on();
        this.popCornMaker.preparingPopcorn();
        this.proyector.turnOn();
        this.soundSystem.on();
        this.videoPlayer.On();
        this.videoPlayer.play(movie);

        console.log('\n%c¡Disfruta de la película!', COLORS.blue);
    }

    detenerPelicula() {
        console.log('\n%cDeteniendo la película\n', COLORS.red);
        this.videoPlayer.stop();
        this.videoPlayer.off();
        this.soundSystem.off();
        this.proyector.turnOff();
        this.popCornMaker.off();

        console.log('\n%c¡Disfruta de tu día vuelve pronto!', COLORS.orange);
    }
}

function main() {
    const proyector = new Proyector();
    const soundSystem = new SoundSystem();
    const videoPlayer = new VideoPlayer();
    const popCornMaker = new PopCornMaker();

    const homeTheater = new HomeTheaterFacade({
        proyector,
        soundSystem,
        videoPlayer,
        popCornMaker
    });

    homeTheater.verPelicula('Avengers Endgame');
    homeTheater.detenerPelicula();

}

main();
