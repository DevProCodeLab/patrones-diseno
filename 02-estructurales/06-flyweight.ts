import { COLORS } from "../helpers/colors.ts";

/**
* ! Patrón Flyweight
* Es un patrón de diseño estructural que nos permite usar objetos compartidos
* para soportar eficientemente grandes cantidades de objetos.
*
* * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
* * la cantidad de memoria que utilizan.
*
* https://refactoring.guru/es/design-patterns/flyweight
*/
interface Location {
    display(cordinates: {x: number, y: number}): void;
}

//flyweight
class LocationIcon implements Location {
    private type: string;
    private iconImage: string;

    constructor(type: string, iconImage: string) {
        this.type = type;
        this.iconImage = iconImage;
    }
    
    display(cordinates: { x: number; y: number; }): void {
        console.log(
            `Coords: ${this.type} en (${cordinates.x}, ${cordinates.y}) con ícono %c[${this.iconImage}]`, COLORS.green);
    }    
}

//fabrica de flyweights
class LocationFactory {
    private icons: Record<string, LocationIcon> = {};

    getLocationIcon(type: string): LocationIcon {
        if (!this.icons[type]) {
            console.log(`\n%cCreando nuevo ícono de ubicación para el tipo: ${type}\n`, COLORS.red);
            this.icons[type] = new LocationIcon(type, `imagen-de-${type}`);
        }
        return this.icons[type];
    }   


}

class MapLocation {
    private cordinates: { x: number; y: number; };
    private icon: LocationIcon;

    constructor(x: number, y: number, icon: LocationIcon) {
        this.cordinates = { x, y };
        this.icon = icon;
    }

    display(): void {
        this.icon.display(this.cordinates);
    }
}

function main() {
    const locationFactory = new LocationFactory();

    const locations = [
        new MapLocation(10, 20, locationFactory.getLocationIcon("Hospital")),
        new MapLocation(20, 30, locationFactory.getLocationIcon("Hospital")),
        new MapLocation(30, 40, locationFactory.getLocationIcon("Hospital")),

        new MapLocation(45, 55, locationFactory.getLocationIcon("Restaurante")),
        new MapLocation(65, 75, locationFactory.getLocationIcon("Restaurante")),
        new MapLocation(85, 95, locationFactory.getLocationIcon("Restaurante")),
    ];
    
    locations.forEach(location => location.display());
}

main();
    