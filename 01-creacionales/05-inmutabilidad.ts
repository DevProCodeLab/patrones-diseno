/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";

class EditorCodeState{
    readonly contenido: string;
    readonly cursorPosicion: number;
    readonly cambiosNoGuardados: boolean;

    constructor(contenido: string, cursorPosicion: number, desHacerCambios: boolean){
        this.contenido = contenido;
        this.cursorPosicion = cursorPosicion;
        this.cambiosNoGuardados = desHacerCambios
    }

    copyWith ({
        contenido,
        cursorPosicion,
        cambiosNoGuardados
    }: Partial<EditorCodeState>): EditorCodeState
    {
        return new EditorCodeState(
            contenido ?? this.contenido,
            cursorPosicion ?? this.cursorPosicion,
            cambiosNoGuardados ?? this.cambiosNoGuardados
        );
    }

    displayState(){
        console.log('\n%cEstado del editor:', COLORS.green);
        console.log(`
            Contenido: ${this.contenido}
            Posisción Cursor: ${ this.cursorPosicion }     
            DesHacer Cambios: ${ this.cambiosNoGuardados }
        `);
    }
}

class HistorialCodeState {
    private history: EditorCodeState[] = [];
    private currentIndex: number = -1;

    save(state: EditorCodeState ): void {
        if (this.currentIndex < this.history.length -1) {
            this.history = this.history.slice(0, this.currentIndex + 1);
        }

        this.history.push(state);
        this.currentIndex++;
    }

    unDo (): EditorCodeState | null {
        if (this.currentIndex > 0){
            this.currentIndex--;
            return this.history[this.currentIndex];
        }
        return null;
    }

    reDo(): EditorCodeState | null{
        if (this.currentIndex < this.history.length -1) {
            this.currentIndex++;
            return this.history[this.currentIndex];
        }

        return null;
    }
}

function main (){
    const historyEditor = new HistorialCodeState();
    let editarEstado = new EditorCodeState("console.log('hola  mundo!')", 2, false);

    historyEditor.save(editarEstado);

    console.log('%cEstado Inicial:', COLORS.green);
    editarEstado.displayState();

    editarEstado = editarEstado.copyWith({
        contenido: "console.log('hola mundo!'); \nconsole.log('nueva línea');",
        cursorPosicion: 3,
        cambiosNoGuardados: true
    });

    historyEditor.save(editarEstado);
    console.log('%cDespúes del primer cambio:', COLORS.green);
    editarEstado.displayState();

    editarEstado = editarEstado.copyWith({
        cursorPosicion: 5
    });
    
    historyEditor.save(editarEstado);
    console.log('%cDespúes de mover el cursor:', COLORS.green);
    editarEstado.displayState();

    editarEstado = historyEditor.unDo()!;
    console.log('%cDespúes del unDo:', COLORS.green);
    editarEstado.displayState();

    editarEstado = historyEditor.reDo()!;
    console.log('%cDespúes del reDo:', COLORS.green);
    editarEstado.displayState();

}

main();
