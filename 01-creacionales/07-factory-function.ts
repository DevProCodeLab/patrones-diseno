/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

import { COLORS } from "../helpers/colors.ts";

type Langue = 'es' | 'en' | 'fr';

function crearSaludo(lang: Langue){
    return function(name: string){
        const message = {
            es: `Hola %c${name}`,
            en: `Hello %c${name}`,
            fr: `Bonjuor %c${name}`,
        };

        return console.log(message[lang], COLORS.green);
    }
}


function main() {
    const saludoEsp = crearSaludo("es");
    saludoEsp('Gustavo');
    
    const saludoEn = crearSaludo("en");
    saludoEn('Peter');

    const saludoFr = crearSaludo("fr");
    saludoFr('JeanPier');

}

main();