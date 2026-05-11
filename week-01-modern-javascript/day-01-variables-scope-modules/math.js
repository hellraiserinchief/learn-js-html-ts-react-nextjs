// TODO: named exports for PI and area(r); default export circumference(r)
export const PI = 3.14159;

export function area(r) {
  return PI * r * r;
}

export default function circumference(r) {
  return 2 * PI * r;
}
