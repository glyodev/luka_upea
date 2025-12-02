import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isDateFormat', async: false })
export class IsDateFormatConstraint implements ValidatorConstraintInterface {
    validate(value: any): boolean {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        return typeof value === 'string' && datePattern.test(value);
    }

    defaultMessage(): string {
        return 'La fecha debe estar en formato YYYY-MM-DD';
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

@ValidatorConstraint({ name: 'isTimestampFormat', async: false })
export class IsTimastampFormatConstraint implements ValidatorConstraintInterface {
    validate(value: any): boolean {
        const datePattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        return typeof value === 'string' && datePattern.test(value);
    }

    defaultMessage(): string {
        return 'El tiempo debe estar en formato YYYY-MM-DD HH:MM:SS';
    }
}
export function IsTimestampFormat(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsTimastampFormatConstraint,
        });
    };
}