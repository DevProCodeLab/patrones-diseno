/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class Documento {
    public titulo: string;
    private contenido: string;
    public autor: string;

    constructor(titulo: string, contenido: string, autor: string){
        this.titulo = titulo;
        this.contenido = contenido;
        this.autor = autor;
    }

    clone(): Documento {
        return new Documento(this.titulo, this.contenido, this.autor);
    }
    displayInfo(){
        console.log(`
            Título: ${ this.titulo }
            Contenido: ${ this.contenido }
            Autor: ${ this.autor }
        `);
    }
}

function main (){
    const Document1 = new Documento('Cotización', 'Valor de la PC 500 Dolares', 'Gustavo Olarte');

    console.log({Document1});
    Document1.displayInfo();

    const Document2 = Document1.clone();
    Document2.titulo = 'Cotización 2';

    console.log({Document2});
    Document2.displayInfo();

}

main();