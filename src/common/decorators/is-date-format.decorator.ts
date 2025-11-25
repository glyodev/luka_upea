import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isDateFormat', async: false })
export class IsDateFormatConstraint implements ValidatorConstraintInterface {
    validate(value: any): boolean {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        return typeof value === 'string' && datePattern.test(value);
    }

    defaultMessage(): string {
        return 'La fecha debe estar en formato DD-MM-YYYY';
    }
}

export function IsDateFormat(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsDateFormatConstraint,
        });
    };
}
