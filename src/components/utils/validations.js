export const validateFormFields = (formFields, rules) => {
  const errors = {};
  for (const field in rules) {
    if (rules.hasOwnProperty(field)) {
      const fieldRules = rules[field];
      let value = "";
      if (formFields.hasOwnProperty(field)) {
        if (typeof formFields[field] !== "object") {
          value = formFields[field];
        } else {
          value = formFields[field].value;
        }
      }
      if (fieldRules.hasOwnProperty("required")) {
        let valid = true;
        if (typeof value === "boolean") {
          if (!value) {
            valid = false;
          }
        }
        if (!value.length) {
          valid = false;
        }
        if (!valid) {
          if (typeof fieldRules.required !== "object") {
            errors[field] = `${field} is required`;
          } else {
            errors[field] = fieldRules.required.message;
          }
          continue;
        }
      }
      if (fieldRules.hasOwnProperty("email")) {
        const pattern = new RegExp(
          /*/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i*/
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        );
        if (!pattern.test(formFields[field])) {
          if (typeof fieldRules.email !== "object") {
            errors[field] = `${field} must be a valid email`;
          } else {
            errors[field] = fieldRules.email.message;
          }
        }
      }

      if (fieldRules.hasOwnProperty("username")) {
        const pattern = new RegExp(/^\S+$/);
        if (!pattern.test(formFields[field])) {
          if (typeof fieldRules.username !== "object") {
            errors[field] = `${field} must be a valid username`;
          } else {
            errors[field] = fieldRules.username.message;
          }
        }
      }

      if (fieldRules.hasOwnProperty("minLength")) {
        if (formFields[field]?.length < fieldRules.minLength.value) {
          if (typeof fieldRules.minLength !== "object") {
            errors[
              field
            ] = `The length of ${field} must be more ${fieldRules.minLength.value} character`;
          } else {
            errors[field] = fieldRules.minLength.message;
          }
        }
      }
      if (fieldRules.hasOwnProperty("maxLength")) {
        if (formFields[field].length > fieldRules.maxLength.value) {
          if (typeof fieldRules.maxLength !== "object") {
            errors[
              field
            ] = `The length of ${field} must be under ${fieldRules.maxLength.value} character`;
          } else {
            errors[field] = fieldRules.maxLength.message;
          }
        }
      }
      if (fieldRules.hasOwnProperty("match")) {
        const matchField =
          typeof fieldRules.match !== "object"
            ? fieldRules.match
            : fieldRules.match.value;
        const matchFieldValue = formFields[matchField];
        if (matchFieldValue && matchFieldValue !== formFields[field]) {
          if (typeof fieldRules.match !== "object") {
            errors[field] = `The ${field} must match with ${matchField}`;
          } else {
            errors[field] = fieldRules.match.message;
          }
        }
      }
    }
  }
  if (Object.keys(errors).length) {
    return {
      valid: false,
      errors,
    };
  }
  return {
    valid: true,
    errors: undefined,
  };
};
