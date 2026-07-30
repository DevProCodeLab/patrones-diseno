/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { COLORS } from "../helpers/colors.ts";

class DragonBall {
    private static instance: DragonBall;
    private collectedBalls: number;

    private constructor(){
        this.collectedBalls = 0;
    }

    public static getInstance(): DragonBall {
        if (!DragonBall.instance){
            DragonBall.instance = new DragonBall();
            console.log('%cLas esferas del dragón han sido creadas!', COLORS.orange);
        }

        return DragonBall.instance;
    }

    collectBall () {
        if (this.collectedBalls < 7){
            this.collectedBalls++;
            console.log(`%cEsfera recolectada!. Total esferas: ${this.collectedBalls}`, COLORS.orange);
            return;
        }

        console.log('%cYa se han recolectado las esferas puedes invocar a shenlong!', COLORS.orange);
    }

    callShenlong () {
        if (this.collectedBalls === 7){
            console.log('%cShenLogn ha sido invocado pide tu deseo!', COLORS.orange);
            this.collectedBalls = 0;
            return;
        }

        console.log(`Aun faltan: ${7 - this.collectedBalls} por recolectar para poder invocar a ShenLong!.`);
    }
}

function main(){
    const gokuCollectBall = DragonBall.getInstance();

    gokuCollectBall.collectBall();
    gokuCollectBall.collectBall();
    gokuCollectBall.collectBall();
    gokuCollectBall.collectBall();

    gokuCollectBall.callShenlong();

    const VegetaCollectBall = DragonBall.getInstance();

    VegetaCollectBall.collectBall();
    VegetaCollectBall.collectBall();
    VegetaCollectBall.collectBall();

    gokuCollectBall.callShenlong();
    VegetaCollectBall.callShenlong();
}

main();
