import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
    transform(value: string, metadata: ArgumentMetadata): number {
        const inputVal = parseInt(value, 10);
        if (isNaN(inputVal)) {
            throw new Error("Validatio failed...");
        }
        return inputVal;
    }

}