/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

import { COLORS } from "../helpers/colors.ts";

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

interface Hamburguesa {
    preparar(): void;
}

interface Bebida {
    servir(): void;
}

class HamburguesaRes implements Hamburguesa {
    preparar(): void {
        console.log("%cPreparando una hamburguesa de res", COLORS.red);
    }
}

class HamburguesaVegana implements Hamburguesa {
    preparar(): void {
        console.log("%cPreparando una hamburguesa vegana", COLORS.green);
    }
}

class BebidaSoda implements Bebida {
    servir(): void {
        console.log("%cSirviendo una bebida gaseosa", COLORS.pink);
    }
}

class BebidaNatural implements Bebida {
    servir(): void {
        console.log("%cSirviendo una bebida natural", COLORS.green);
    }
}

interface RestauranteFactory {
    crearHamburguesa(): Hamburguesa;
    crearBebida(): Bebida;
}

class RestauranteSaludableFactoy implements RestauranteFactory {
  crearHamburguesa(): Hamburguesa {
    return new HamburguesaVegana();
  }

  crearBebida(): Bebida {
    return new BebidaNatural();
  }
}

class RestauranteGorditosFactory implements RestauranteFactory {
  crearHamburguesa(): Hamburguesa {
    return new HamburguesaRes();
  }

  crearBebida(): Bebida {
    return new BebidaSoda();
  }
}

function main (factory : RestauranteFactory){
    const hamburguesa = factory.crearHamburguesa();
    const bebida = factory.crearBebida();

    hamburguesa.preparar();
    bebida.servir();
}

console.log('\n%cPedido comida para gorditos delicius! menú: ', COLORS.red);
main(new RestauranteGorditosFactory());

console.log('\n%cPedido comida para saludable delicius! menú: ', COLORS.green);
main(new RestauranteSaludableFactoy());


