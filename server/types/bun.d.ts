/**
 * Bun Runtime Types
 *
 * Минимальные объявления типов для Bun runtime.
 */

declare global {
  const Bun: {
    serve(options: {
      port: number;
      fetch(req: Request): Response | Promise<Response>;
      error?(error: Error): Response;
    }): {
      stop(): void;
    };
    sleep(ms: number): Promise<void>;
  };

  interface Response {
    json(data: unknown, init?: ResponseInit): Response;
  }

  interface ResponseConstructor {
    json(data: unknown, init?: ResponseInit): Response;
  }

  interface Crypto {
    randomUUID(): string;
  }
}

export {};
