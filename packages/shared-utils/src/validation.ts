import { ValidationError, ErrorFactory, ErrorCodes } from '@repo/shared-types';

// Validation Rule Interface (Strategy Pattern)
export interface ValidationRule<T> {
  validate(value: T): ValidationResult;
  getErrorMessage(): string;
}

// Validation Result Interface
export interface ValidationResult {
  isValid: boolean;
  error?: ValidationError;
}

// Required Field Validation Rule
export class RequiredRule implements ValidationRule<unknown> {
  constructor(private fieldName: string) {}

  validate(value: unknown): ValidationResult {
    if (value === null || value === undefined || value === '') {
      return {
        isValid: false,
        error: ErrorFactory.createValidationError(
          this.fieldName,
          value,
          'required',
          `${this.fieldName}은(는) 필수 입력 항목입니다.`
        )
      };
    }
    return { isValid: true };
  }

  getErrorMessage(): string {
    return `${this.fieldName}은(는) 필수 입력 항목입니다.`;
  }
}

// String Length Validation Rule
export class StringLengthRule implements ValidationRule<string> {
  constructor(
    private fieldName: string,
    private minLength: number,
    private maxLength: number
  ) {}

  validate(value: string): ValidationResult {
    if (value.length < this.minLength) {
      return {
        isValid: false,
        error: ErrorFactory.createValidationError(
          this.fieldName,
          value,
          `minLength:${this.minLength}`,
          `${this.fieldName}은(는) 최소 ${this.minLength}자 이상이어야 합니다.`
        )
      };
    }

    if (value.length > this.maxLength) {
      return {
        isValid: false,
        error: ErrorFactory.createValidationError(
          this.fieldName,
          value,
          `maxLength:${this.maxLength}`,
          `${this.fieldName}은(는) 최대 ${this.maxLength}자까지 입력 가능합니다.`
        )
      };
    }

    return { isValid: true };
  }

  getErrorMessage(): string {
    return `${this.fieldName}은(는) ${this.minLength}자 이상 ${this.maxLength}자 이하여야 합니다.`;
  }
}

// Email Format Validation Rule
export class EmailRule implements ValidationRule<string> {
  constructor(private fieldName: string) {}

  validate(value: string): ValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
      return {
        isValid: false,
        error: ErrorFactory.createValidationError(
          this.fieldName,
          value,
          'email_format',
          `${this.fieldName}은(는) 올바른 이메일 형식이어야 합니다.`
        )
      };
    }

    return { isValid: true };
  }

  getErrorMessage(): string {
    return `${this.fieldName}은(는) 올바른 이메일 형식이어야 합니다.`;
  }
}

// Phone Number Validation Rule
export class PhoneNumberRule implements ValidationRule<string> {
  constructor(private fieldName: string) {}

  validate(value: string): ValidationResult {
    const phoneRegex = /^[0-9-+\s()]+$/;
    
    if (!phoneRegex.test(value)) {
      return {
        isValid: false,
        error: ErrorFactory.createValidationError(
          this.fieldName,
          value,
          'phone_format',
          `${this.fieldName}은(는) 올바른 전화번호 형식이어야 합니다.`
        )
      };
    }

    return { isValid: true };
  }

  getErrorMessage(): string {
    return `${this.fieldName}은(는) 올바른 전화번호 형식이어야 합니다.`;
  }
}

// Number Range Validation Rule
export class NumberRangeRule implements ValidationRule<number> {
  constructor(
    private fieldName: string,
    private min: number,
    private max: number
  ) {}

  validate(value: number): ValidationResult {
    if (value < this.min) {
      return {
        isValid: false,
        error: ErrorFactory.createValidationError(
          this.fieldName,
          value,
          `min:${this.min}`,
          `${this.fieldName}은(는) 최소 ${this.min} 이상이어야 합니다.`
        )
      };
    }

    if (value > this.max) {
      return {
        isValid: false,
        error: ErrorFactory.createValidationError(
          this.fieldName,
          value,
          `max:${this.max}`,
          `${this.fieldName}은(는) 최대 ${this.max} 이하여야 합니다.`
        )
      };
    }

    return { isValid: true };
  }

  getErrorMessage(): string {
    return `${this.fieldName}은(는) ${this.min} 이상 ${this.max} 이하여야 합니다.`;
  }
}

// Custom Validation Rule
export class CustomRule<T> implements ValidationRule<T> {
  constructor(
    private fieldName: string,
    private validator: (value: T) => boolean,
    private errorMessage: string
  ) {}

  validate(value: T): ValidationResult {
    if (!this.validator(value)) {
      return {
        isValid: false,
        error: ErrorFactory.createValidationError(
          this.fieldName,
          value,
          'custom',
          this.errorMessage
        )
      };
    }

    return { isValid: true };
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}

// Validation Schema Interface
export interface ValidationSchema<T> {
  [K in keyof T]?: ValidationRule<any>[];
}

// Validation Result Interface
export interface SchemaValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Validator Class (Facade Pattern)
export class Validator {
  static validateField<T>(
    value: T,
    rules: ValidationRule<T>[]
  ): ValidationResult {
    for (const rule of rules) {
      const result = rule.validate(value);
      if (!result.isValid) {
        return result;
      }
    }
    return { isValid: true };
  }

  static validateSchema<T>(
    data: T,
    schema: ValidationSchema<T>
  ): SchemaValidationResult {
    const errors: ValidationError[] = [];

    for (const [fieldName, rules] of Object.entries(schema)) {
      if (rules) {
        const fieldValue = (data as Record<string, unknown>)[fieldName];
        const result = this.validateField(fieldValue, rules);
        
        if (!result.isValid && result.error) {
          errors.push(result.error);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Convenience methods for common validations
  static isRequired(fieldName: string): RequiredRule {
    return new RequiredRule(fieldName);
  }

  static isEmail(fieldName: string): EmailRule {
    return new EmailRule(fieldName);
  }

  static isPhoneNumber(fieldName: string): PhoneNumberRule {
    return new PhoneNumberRule(fieldName);
  }

  static hasLength(fieldName: string, minLength: number, maxLength: number): StringLengthRule {
    return new StringLengthRule(fieldName, minLength, maxLength);
  }

  static isInRange(fieldName: string, min: number, max: number): NumberRangeRule {
    return new NumberRangeRule(fieldName, min, max);
  }

  static custom<T>(fieldName: string, validator: (value: T) => boolean, errorMessage: string): CustomRule<T> {
    return new CustomRule(fieldName, validator, errorMessage);
  }
}

// Predefined Validation Schemas
export const CommonValidationSchemas = {
  email: {
    email: [
      Validator.isRequired('이메일'),
      Validator.isEmail('이메일')
    ]
  },

  password: {
    password: [
      Validator.isRequired('비밀번호'),
      Validator.hasLength('비밀번호', 8, 50)
    ]
  },

  phoneNumber: {
    phoneNumber: [
      Validator.isRequired('전화번호'),
      Validator.isPhoneNumber('전화번호')
    ]
  },

  name: {
    name: [
      Validator.isRequired('이름'),
      Validator.hasLength('이름', 2, 20)
    ]
  }
} as const; 