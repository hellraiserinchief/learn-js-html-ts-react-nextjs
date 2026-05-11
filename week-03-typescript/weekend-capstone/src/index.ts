// Typed API client — public surface for the package.
export type RequestInterceptor = (init: RequestInit) => RequestInit | Promise<RequestInit>;
export type ResponseInterceptor = (res: Response) => Response | Promise<Response>;

export type ClientOptions = {
  baseUrl: string;
  retries?: number;
  requestInterceptors?: RequestInterceptor[];
  responseInterceptors?: ResponseInterceptor[];
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly url: string,
  ) {
    super(message);
  }
}

export class ApiClient {
  constructor(private readonly opts: ClientOptions) {}

  async get<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'GET' });
  }

  async post<T, B = unknown>(path: string, body: B): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  // TODO: implement retry/backoff and interceptor chains
  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const url = `${this.opts.baseUrl}${path}`;
    const r = await fetch(url, init);
    if (!r.ok) throw new ApiError(`Request failed`, r.status, url);
    return (await r.json()) as T;
  }
}

// Smoke test
if (import.meta.url === `file://${process.argv[1]}`) {
  const client = new ApiClient({ baseUrl: 'https://jsonplaceholder.typicode.com' });
  type Todo = { id: number; title: string; completed: boolean };
  client.get<Todo>('/todos/1').then(console.log).catch(console.error);
}
