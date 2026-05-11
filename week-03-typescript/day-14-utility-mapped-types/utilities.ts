type User = { id: number; name: string; email: string; age: number };

// --- Built-in utility types --------------------------------------------------
type PartialUser  = Partial<User>;             // all optional
type RequiredUser = Required<User>;            // all required
type PublicUser   = Omit<User, 'email'>;       // remove email
type Credentials  = Pick<User, 'email'>;       // keep only email
type UserKeys     = keyof User;                // 'id' | 'name' | 'email' | 'age'
type ReadonlyUser = Readonly<User>;            // can't mutate

// --- Mapped types (build your own) -------------------------------------------
type Nullable<T> = { [K in keyof T]: T[K] | null };
type NullableUser = Nullable<User>;

// --- Conditional types -------------------------------------------------------
type IsString<T> = T extends string ? true : false;
type A = IsString<'hello'>; // true
type B = IsString<42>;      // false

// TODO: write `DeepPartial<T>` that recurses into nested objects.
// TODO: write `PromiseValue<T>` that unwraps `Promise<X>` to `X`.

const u: PartialUser = { name: 'Ada' };
const sample: A = true;
const sample2: B = false;
console.log({ u, sample, sample2 });
