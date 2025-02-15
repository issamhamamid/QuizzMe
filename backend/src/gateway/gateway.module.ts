import { Module } from '@nestjs/common';
import {RoomGateWay} from "./gateway";

@Module({
    providers : [RoomGateWay]
})
export class GatewayModule {}
