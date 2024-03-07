import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsValidCPFConstraint } from '../classValidators/isValidCPF';

export function IsCPF(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidCPFConstraint,
        });
    };
}
