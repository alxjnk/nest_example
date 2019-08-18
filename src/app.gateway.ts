import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Client } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;
    users: number = 0;

    async handleConnection() {
        this.users++;
        console.log('connected', this.users)
    }

    async handleDisconnect() {
        this.users--;
        console.log('disconnected', this.users)
    }


    @SubscribeMessage('roomTaskChange')
    handleRoomTaskChange(client, data: string) {
        client.broadcast.emit('roomTaskChange', data);
    }

    @SubscribeMessage('roomsAdd')
    handleRoomAdd(client, data: string) {
        client.broadcast.emit('roomsAdd', data);
    }

}