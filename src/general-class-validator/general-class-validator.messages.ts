import type { ValidationArguments } from 'class-validator'

import { isArray } from 'class-validator'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class GeneralClassValidatorMessages {
  public static isEmpty(): string {
    return '$property tem que ser vazio'
  }

  public static isNotEmpty(): string {
    return '$property não pode estar vazio'
  }

  public static notEquals(): string {
    return '$property não pode ser $value'
  }

  public static equals(arguments_: ValidationArguments): string {
    return `$property deve ser igual a ${arguments_.constraints.join(', ')}`
  }

  public static isString(): string {
    return '$property deve ser uma string'
  }

  public static minLength(): string {
    return '$property deve ter no mínimo $constraint1 caracteres'
  }

  public static maxLength(): string {
    return '$property deve ter no máximo $constraint1 caracteres'
  }

  public static isBetweenLength(): string {
    return '$property deve ter no mínimo $constraint1 e máximo $constraint2 caracteres'
  }

  public static isEnum(arguments_: ValidationArguments): string {
    const acceptedValues = isArray(arguments_.constraints[0])
      ? arguments_?.constraints?.[0]?.join?.(', ')
      : arguments_?.constraints?.[1]?.join?.(', ')

    return `$property deve ser um dos seguintes valores: ${acceptedValues || 'Valores não definidos'}`
  }

  public static isUUID(): string {
    return '$property deve ser um UUID válido'
  }

  public static arrayNotEmpty(): string {
    return GeneralClassValidatorMessages.isNotEmpty()
  }

  public static isObject(): string {
    return 'Cada valor no atributo $property deve ser um objeto'
  }

  public static isArray(): string {
    return '$property deve ser um array'
  }

  public static isNumber(): string {
    return '$property deve ser um número'
  }

  public static min(): string {
    return '$property não deve ser inferior a $constraint1'
  }

  public static max(): string {
    return '$property não deve ser maior que $constraint1'
  }

  public static isBoolean(): string {
    return '$property deve ser um booleano'
  }

  public static exactLength(): string {
    return '$property deve ter exatamente $constraint1 caracteres'
  }

  public static isISO8601(): string {
    return '$property deve ser uma data válida'
  }

  public static isEmail(): string {
    return '$property deve ser um email válido'
  }

  public static arrayMinSize(): string {
    return '$property deve ter no mínimo $constraint1 item(s)'
  }

  public static arrayMaxSize(): string {
    return '$property deve ter no máximo $constraint1 item(s)'
  }

  public static entityDoesNotExist(): string {
    return '$property não existe'
  }

  public static isBefore(): string {
    return '$property deve ser antes de $constraint1'
  }

  public static isSameDay(): string {
    return '$property deve ser no mesmo dia que $constraint1'
  }

  public static isDate(): string {
    return '$property deve ser uma data válida'
  }
}
