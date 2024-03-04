import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isHexColor', async: false })
export class IsHexColorConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        if (typeof value !== 'string') {
            return false;
        }

        // Check if the string is a valid hexadecimal color
        return /^#([0-9A-F]{3}){1,2}$/i.test(value);
    }

    defaultMessage(args: ValidationArguments) {
        return 'Invalid hexadecimal color format';
    }
}
