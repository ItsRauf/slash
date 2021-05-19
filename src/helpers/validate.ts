export interface ValidationState {
  status: '' | 'success' | 'warning' | 'error' | 'validating';
  message?: string;
}

export default function validate(
  propName: string,
  value: string,
  nameMinLength: number,
): [boolean, ValidationState] {
  const validation: ValidationState = {
    status: '',
  };

  switch (propName) {
    case 'name':
      if (value.length < nameMinLength) {
        validation.status = 'error';
        validation.message = `Name must be at least ${nameMinLength} character.`;
        return [true, validation];
      } else if (value.length > 32) {
        validation.status = 'error';
        validation.message = `Name can not be longer than 32 characters.`;
        return [false, validation];
      } else if (value.includes(' ')) {
        validation.status = 'error';
        validation.message = `Name can not include spaces.`;
        return [true, validation];
      } else if (value.toLowerCase() !== value) {
        validation.status = 'error';
        validation.message = `Name must be lowercase.`;
        return [true, validation];
      } else {
        validation.status = 'success';
        return [true, validation];
      }
      break;

    case 'description':
      if (value.length < 1) {
        validation.status = 'error';
        validation.message = `Description must be at least 1 character.`;
        return [true, validation];
      } else if (value.length > 100) {
        validation.status = 'error';
        validation.message = `Description can not be longer than 100 characters.`;
        return [false, validation];
      } else {
        validation.status = 'success';
        return [true, validation];
      }
      break;

    default:
      validation.status = 'validating';
      return [true, validation];
      break;
  }
  return [true, validation];
}
