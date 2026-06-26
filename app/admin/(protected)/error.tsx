"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const missingCatalogTable =
    error.message.includes('relation "categories" does not exist') ||
    error.message.includes('relation "products" does not exist');

  return (
    <main className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold tracking-[0.24em] text-red-600 uppercase">
        Admin setup required
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-zinc-950">
        {missingCatalogTable
          ? "Catalog database tables are missing"
          : "The admin panel could not load"}
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-zinc-600">
        {missingCatalogTable
          ? "The Drizzle schema is ready, but the catalog migration has not been generated and applied to the configured database."
          : "Check the server output for the underlying error, then retry."}
      </p>

      {missingCatalogTable ? (
        <div className="mt-6 rounded-2xl bg-zinc-950 p-4 text-sm text-white">
          <p className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
            Run manually from the project directory
          </p>
          <code className="mt-2 block font-mono">
            npm run db:generate
            <br />
            npm run db:migrate
          </code>
        </div>
      ) : null}

      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
      >
        Try again
      </button>
    </main>
  );
}
