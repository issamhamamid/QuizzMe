import {ClientError} from "./ClientError";
import {BadRequestException} from "@nestjs/common";

export const throwClientError = ( errors : ClientError[] , name : string) : void=>{

    throw new BadRequestException({
        name: name,
        details : errors
    });

}