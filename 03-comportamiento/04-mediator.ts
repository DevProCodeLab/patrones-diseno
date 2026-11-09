/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */
//chatroom

import { COLORS } from "../helpers/colors.ts";

class ChatRoom {
    private users: User[] = [];
    public title: string;

    constructor(title: string) {
        this.title = title;
    }

    adduser(user: User): void {
        this.users.push(user);
    }

    sendMessage(message: string, user: User): void {
        const senduser = this.users.filter(u => u !== user);
        
        senduser.forEach(u => u.receiveMessage(user, message));
    }
}

class User {
    private userName: string;
    private chatRoom: ChatRoom;

    constructor(userName: string, chatRoom: ChatRoom) {
        this.userName = userName;
        this.chatRoom = chatRoom;

        chatRoom.adduser(this);
    }

    sendMessage(message: string): void {
        console.log(`\n\n%c${this.userName} envía: %c${message}`,
            COLORS.blue,
            COLORS.white
        );
        this.chatRoom.sendMessage(message, this);
    }

    receiveMessage(sender: User, message: string): void {
        //this.chatRoom.sendMessage(message, this);
        console.log(`%c${this.userName} Recibe de ${sender.userName}: %c${message}`,
            COLORS.blue,
            COLORS.white
        );
    }
}

function main() {
    const chatRoom = new ChatRoom("Chat trabajo");       

    const user1 = new User("Juan", chatRoom);
    const user2 = new User("Pedro", chatRoom);
    const user3 = new User("Maria", chatRoom);

    user1.sendMessage("Hola a todos");
    user2.sendMessage("Hola Juan ¿como estas?");
    user3.sendMessage("Hola Juan y Pedro, ¿como estan?");

    console.log("\n\n");
}

main();