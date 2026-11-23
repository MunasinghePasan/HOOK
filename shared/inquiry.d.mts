export const email: string;
export const instagram: string;
export type Fields = Record<"name" | "email" | "phone" | "description", string>;
export const limits: Record<keyof Fields, number>;
export function validEmail(value: unknown): boolean;
export function validate(fields: Fields): Partial<Record<keyof Fields, string>>;
