/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from "../helpers/colors.ts";

interface Observer {
    notify(videoTitle: string): void;
}

class YotubeChannel {
    private subscribers: Observer[] = [];
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    subscribe(observer: Observer): void {
        this.subscribers.push(observer);
        console.log(`El usuario se ha suscrito al canal ${this.name}`);
    }

    unsubscribe(observer: Observer): void {
        this.subscribers = this.subscribers.filter(sub => sub !== observer);
        console.log(`El usuario se ha desuscrito del canal ${this.name}`);
    }

    uploadVideo(videoTitle: string): void {
        for (const subscriber of this.subscribers) {
            subscriber.notify(videoTitle);
        }
    }
}

class Subscriber implements Observer {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    notify(videoTitle: string): void {
        console.log(`Hola %c${this.name}, se ha subido un %cnuevo video: ${videoTitle}`, COLORS.blue, COLORS.yellow);
    }
}

function main() {
    const channel = new YotubeChannel("Cocinando con Gustavo Olarte");
    const subscriber1 = new Subscriber("Alice");
    const subscriber2 = new Subscriber("Bob");
    const subscriber3 = new Subscriber("Charlie");

    channel.subscribe(subscriber1);
    channel.subscribe(subscriber2);

    channel.uploadVideo("Receta de lasaña");

    channel.subscribe(subscriber3);
    channel.uploadVideo("Receta de pizza");

    channel.unsubscribe(subscriber2);
    channel.uploadVideo("Receta de hamburguesa");

    channel.unsubscribe(subscriber1);
    channel.uploadVideo("Receta de ensalada");
    
    console.log('\n\n');
}

main();