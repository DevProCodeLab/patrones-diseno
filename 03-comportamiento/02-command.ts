/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Command {
    execute(): void;
}

class Light {
    turnOn(): void {
        console.log('%cLa luz está encendida.', COLORS.yellow);
    }

    turnOff(): void {   
        console.log('%cLa luz está apagada.', COLORS.yellow);
    }
}

class Ventilator {
    On(): void {
        console.log('%cEl ventilador está encendido.', COLORS.green);
    }

    Off(): void {
        console.log('%cEl ventilador está apagado.', COLORS.green);
    }
}

//commands
class LightOnCommand implements Command {
    constructor(private light: Light) {}    

    execute(): void {
        this.light.turnOn();
    }
}

class LightOffCommand implements Command {
    constructor(private light: Light) {}    

    execute(): void {
        this.light.turnOff();
    }
}

class VentilatorOnCommand implements Command {
    constructor(private ventilator: Ventilator) {}    

    execute(): void {
        this.ventilator.On();
    }
}

class VentilatorOffCommand implements Command {
    constructor(private ventilator: Ventilator) {}  

    execute(): void {
        this.ventilator.Off();
    }
}

class RemoteControl {
    private commands: Record<string, Command> = {};

    setCommand(button: string, command: Command): void {
        this.commands[button] = command;
    }

    pressButton(button: string): void {        
        if (this.commands[button]) {
            this.commands[button].execute();
            return;
        }
        console.log(`%cNo hay comando asignado al botón ${button}.`, COLORS.red);
    }
}

function main() {
    const light = new Light();
    const ventilator = new Ventilator();
    const remoteControl = new RemoteControl();

    // crear comandos
    const lightOnCommand = new LightOnCommand(light);
    const lightOffCommand = new LightOffCommand(light);
    const ventilatorOnCommand = new VentilatorOnCommand(ventilator);
    const ventilatorOffCommand = new VentilatorOffCommand(ventilator);

    // asignar comandos a botones
    remoteControl.setCommand('1', lightOnCommand);
    remoteControl.setCommand('2', lightOffCommand);
    remoteControl.setCommand('3', ventilatorOnCommand);
    remoteControl.setCommand('4', ventilatorOffCommand);

    // simular presionar botones
    let continueProgram = true;

    do {
        console.clear();

        const pressButton = prompt(`%cSeleccione una opción del control:
            1. Encender la luz
            2. Apagar la luz
            3. Encender el ventilador
            4. Apagar el ventilador

            Botón:

        `) ?? ''
        remoteControl.pressButton(pressButton);

        const continueInput = prompt(`\n¿Desea continuar? (s/n):`)?.toLocaleLowerCase() ?? '';
        continueProgram = continueInput.toLowerCase() === 's' ? true : false;
        

    } while (continueProgram);
}

main();