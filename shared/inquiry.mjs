export const email = "hookprojectbysemicolon@gmail.com";
export const instagram =
  "https://www.instagram.com/hook_by_semicolon?evlk=aDd0ZXNjaWE2NzVr";
export const limits = { name: 100, email: 254, phone: 40, description: 3000 };

export function validEmail(value) {
  return (
    typeof value === "string" &&
    value.length <= limits.email &&
    /^[A-Z0-9_+.'%-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+$/i.test(value) &&
    !/\s/.test(value)
  );
}

export function validate(fields) {
  const errors = {};
  for (const [key, max] of Object.entries(limits)) {
    const value = fields?.[key];
    if (typeof value !== "string" || !value.trim())
      errors[key] = "This field is required.";
    else if (value.length > max)
      errors[key] = "Use " + max + " characters or fewer.";
    else if (key !== "description" && /[\u0000-\u001f\u007f]/u.test(value))
      errors[key] = "Use a single line of text.";
  }
  if (!errors.email && !validEmail(fields.email.trim()))
    errors.email = "Enter a valid email address.";
  if (
    !errors.phone &&
    (!/^\+?[\d\s().-]+$/.test(fields.phone.trim()) ||
      !/^\d{7,15}$/.test(fields.phone.replace(/\D/g, "")))
  )
    errors.phone =
      "Enter 7 to 15 digits, including your country code when applicable.";
  return errors;
}
