import Image from "next/image";

export function Header() {
  return (
    <header className="w-full bg-gradient-to-b from-sky-50 to-white pt-6 pb-3 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <Image
          src="/solar-plug-hero.svg"
          alt="Solar panels connected to a wall outlet"
          width={320}
          height={160}
          priority
          className="w-full max-w-xs h-auto mb-4"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
          Balcony aka &apos;Plug In&apos; Solar
        </h1>
        <p className="text-lg text-zinc-500 mt-2">
          See if plug-in solar makes sense for you
        </p>
        <p className="text-sm text-zinc-400 mt-1">
          Powered by ElectrifyEverythingNow
        </p>
      </div>
    </header>
  );
}
