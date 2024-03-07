import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isBrazilianCarPlate', async: false })
export class IsBrazilianCarPlateConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        if (typeof value !== 'string') {
            return false;
        }

        // Regular expression for Brazilian car plate format
        const plateRegex = /^[A-Z]{3}-\d{4}$/;

        return plateRegex.test(value);
    }

    defaultMessage(args: ValidationArguments) {
        return 'Invalid Brazilian car plate format';
    }
}
