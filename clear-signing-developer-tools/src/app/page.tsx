import JsonFileImport from "~/readJsonFile/jsonFileImport";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background">
      <div className="container mx-auto flex flex-col justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Clear signing developer tools
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <JsonFileImport />
        </div>
      </div>
    </main>
  );
}
