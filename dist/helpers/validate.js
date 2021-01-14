export default function validate(propName, value, nameMinLength) {
  const validation = {
    status: ""
  };
  switch (propName) {
    case "name":
      if (value.length < nameMinLength) {
        validation.status = "error";
        validation.message = `Name can not be shorter than ${nameMinLength} characters.`;
        return [true, validation];
      } else if (value.length > 32) {
        validation.status = "error";
        validation.message = `Name can not be longer than 32 characters.`;
        return [false, validation];
      } else if (value.includes(" ")) {
        validation.status = "error";
        validation.message = `Name can not include spaces.`;
        return [true, validation];
      } else {
        validation.status = "success";
        return [true, validation];
      }
      break;
    case "description":
      if (value.length < 1) {
        validation.status = "error";
        validation.message = `Description can not be shorter than 1 character.`;
        return [true, validation];
      } else if (value.length > 100) {
        validation.status = "error";
        validation.message = `Description can not be longer than 100 characters.`;
        return [false, validation];
      } else {
        validation.status = "success";
        return [true, validation];
      }
      break;
    default:
      validation.status = "validating";
      return [true, validation];
      break;
  }
  return [true, validation];
}
