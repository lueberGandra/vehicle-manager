import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { IsBrazilianCarPlateConstraint } from '../classValidators/isBrazilianCarPlate';

export function IsBrazilianCarPlate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isBrazilianCarPlate',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsBrazilianCarPlateConstraint,
        });
    };
}
