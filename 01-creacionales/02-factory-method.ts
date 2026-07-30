/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Hamburguesa {
    preparar(): void;
}

class HambuerguesaPollo implements Hamburguesa {
    preparar(): void {
        console.log('Preparando hamburguesa de %cpollo', COLORS.yellow);
    }   
}

class HambuerguesaRes implements Hamburguesa {
    preparar(): void {
        console.log('Preparando hamburguesa de %cres', COLORS.red);
    }   
}

class HambuerguesaMixta implements Hamburguesa {
    preparar(): void {
        console.log('Preparando hamburguesa %cmixta', COLORS.green);
    }
}

abstract class Restaurante {
    protected abstract crearHamburguesa(): Hamburguesa;

    ordenarHamburguesa(): void {
        const hamburguesa = this.crearHamburguesa();
        hamburguesa.preparar();
    }
}

class RestaurantePollo extends Restaurante {
    
    override crearHamburguesa(): Hamburguesa {
        return new HambuerguesaPollo();
    }
}

class RestauranteRes extends Restaurante {
    
    override crearHamburguesa(): Hamburguesa {
        return new HambuerguesaRes();
    }
}

class RestauranteMixto extends Restaurante {
    
    override crearHamburguesa(): Hamburguesa {
        return new HambuerguesaMixta();
    }
}

function main () {
    let restaurante: Restaurante;

    const tipoHamburguesa = prompt('Qué tipo de hamburguesa deseas? (pollo/res/mixta): ');

    switch (tipoHamburguesa) {
        case 'pollo':
            restaurante = new RestaurantePollo();
            break;
        case 'res':
            restaurante = new RestauranteRes();
            break;
        case 'mixta':
            restaurante = new RestauranteMixto();
            break;
        default:
            throw new Error('Tipo de hamburguesa no válido');
    }

    restaurante.ordenarHamburguesa();
}

main();
