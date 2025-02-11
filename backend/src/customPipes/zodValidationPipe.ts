import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";
import {ZodError, ZodSchema} from "zod";
import {fromZodError} from "zod-validation-error";

export class ZodValidationPipe implements PipeTransform {
    constructor(private zodSchema : ZodSchema) {}

    transform(value: unknown, metadata: ArgumentMetadata): any {
        try{
            return this.zodSchema.parse(value)
        }

        catch (err){
            if(err instanceof ZodError){
                throw new BadRequestException({
                    errors : fromZodError(err),
                });
            }

        }

    }
}