/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from "../helpers/colors.ts";
import { sleep } from "../helpers/sleep.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

interface State {
    name: string;

    insertMoney(): void;
    selectProduct(): void;
    dispenseProduct(): void;
}

class VendingMachine {
    private state: State;

    constructor() {
        //estado inicial
        this.state = new WaitingForMoneyState(this);
    }

    insertMoney() {
        this.state.insertMoney();
    };
    selectProduct() {
        this.state.selectProduct();
    };
    dispenseProduct() {
        this.state.dispenseProduct();
    };

    setState(state: State) {
        this.state = state;
        console.log(`Estado cambio a: ${this.state.name}`);
    }

    getstateName(): string {
        return this.state.name;
    }
}

class WaitingForMoneyState implements State {    
    public name: string = 'Esperando Dinero';
    private vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine;
    }

    insertMoney(): void {
        console.log("Dinero insertado. %cPuede seleccionar un producto.", COLORS.green);
        this.vendingMachine.setState(new ProductSelectedState(this.vendingMachine));
    }
    selectProduct(): void {
        console.log("No se puede seleccionar un producto. %cInserte dinero primero.", COLORS.red);
    }
    dispenseProduct(): void {
        console.log("No se puede dispensar un producto. %cInserte dinero primero.", COLORS.red);
    }
}

class ProductSelectedState implements State {
    public name: string = 'Seleccionando Producto';
    private vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine;
    }

    insertMoney(): void {
        console.log("Dinero ya insertado. %cPuedes seleccionar un producto.", COLORS.orange);
    }
    selectProduct(): void {
        console.log("Producto seleccionado. %cPuede despacharlo.", COLORS.green);
        this.vendingMachine.setState(new DispensingProductState(this.vendingMachine));        
    }
    dispenseProduct(): void {
        console.log("Selecciona un producto - %cantes de despacharlo.", COLORS.red);
    }
}

class DispensingProductState implements State {
    public name: string = 'Entregando Producto';
    private vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine;
    }

    insertMoney(): void {
        console.log("Por favor espera a que se %centregue el producto.", COLORS.orange);
    }
    selectProduct(): void {
        console.log("Por favor espera a que se %centregue el producto.", COLORS.orange);
    }
    dispenseProduct(): void {
        console.log("Producto entregado. %cGracias por su compra.", COLORS.green);
        this.vendingMachine.setState(new WaitingForMoneyState(this.vendingMachine));
    }
}

async function main() {
    const vendingMachine = new VendingMachine();

    let selectOption: string | null = '4';

    do {
        console.clear();
        console.log(`Selecciona una opción: %c${vendingMachine.getstateName()}`, COLORS.blue);
        selectOption = prompt(`1. Insertar Dinero\n2. Seleccionar Producto\n3. Entregar Producto\n4. Salir\n opción: `);

        switch(selectOption) {
            case '1':
                vendingMachine.insertMoney();
                break;
            case '2':
                vendingMachine.selectProduct();
                break;
            case '3':
                vendingMachine.dispenseProduct();
                break;
            case '4':
                console.log("Saliendo...");
                break;
            default:
                console.log("Opción inválida. Intenta de nuevo.", COLORS.red);
        }

        await sleep(3000); // Espera 3 segundos antes de limpiar la consola y mostrar el menú nuevamente

    }while (selectOption !== '4'); 


}

main();

