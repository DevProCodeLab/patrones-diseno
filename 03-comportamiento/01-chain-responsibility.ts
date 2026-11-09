/**
* ! Patron Chain of Responsibility
* Es un patrón de diseño de comportamiento que te permite pasar solicitudes
* a lo largo de una cadena de manejadores.
*
* * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
* * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
* * pero se sabe que se necesita procesar en una secuencia.
*
* https://refactoring.guru/es/design-patterns/chain-of-responsibility
*/

import { COLORS } from "../helpers/colors.ts";

interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): void;
}

//model de como luce la cadena de responsabilidad
abstract class BaseHandler implements Handler {
    private nextHandler?: Handler;


    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    handle(request: string): void {
        if (this.nextHandler) {
            this.nextHandler.handle(request);
        }
    }
    
}

class BasicSupport extends BaseHandler {
    override handle(request: string): void {
        if (request === 'basic') {
            console.log('%cSoporte Básico atendiendo la solicitud.', COLORS.blue);
            return;
        }
        console.log('%cSoporte Básico no puede atender la solicitud, pasando al siguiente nivel de soporte.', COLORS.red);
        super.handle(request);
    }
}

class AdvancedSupport extends BaseHandler {
    override handle(request: string): void {
        if (request === 'advanced') {
            console.log('%cSoporte Avanzado atendiendo la solicitud.', COLORS.green);
            return;
        }
        console.log('%cSoporte Avanzado no puede atender la solicitud, pasando al siguiente nivel de soporte.', COLORS.red);
        super.handle(request);
    }
}

class ExpertSupport extends BaseHandler {
    override handle(request: string): void {
        if (request === 'expert') {
            console.log('%cSoporte Experto atendiendo la solicitud.', COLORS.yellow);
            return;
        }
        console.log('%cSoporte Experto no puede atender la solicitud, se debe agendar una visita en sitio.', COLORS.red);
    }
}


function main() {
    const basicSupport = new BasicSupport();
    const advancedSupport = new AdvancedSupport();
    const expertSupport = new ExpertSupport();

    basicSupport.setNext(advancedSupport).setNext(expertSupport);
    basicSupport.handle('expert123');
}

main();