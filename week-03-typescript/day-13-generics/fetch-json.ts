// Typed fetch helper — caller specifies the response shape.
export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, init);
  if (!r.ok) throw new Error(`${url} → ${r.status}`);
  return (await r.json()) as T;
}

// Generic types preserve information through the chain.
type ApiResponse<T> = {
  data: T;
  status: number;
  error?: string;
};

type User = { id: number; name: string };
type UserResponse = ApiResponse<User>;

// TODO: build a typed event emitter with this signature.
// type Events = { 'user:login': User; 'user:logout': void };
// const emitter = new TypedEmitter<Events>();
// emitter.on('user:login', (u) => /* u is User */);

// TODO: build a typed Cache<K, V> class with .get/.set/.has and TTL.

async function main() {
  const u = await fetchJson<User>('https://jsonplaceholder.typicode.com/users/1');
  console.log(u.name);
}
main();
