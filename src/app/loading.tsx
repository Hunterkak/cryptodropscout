export default function Loading() {
  return (
    <main className="min-h-screen bg-[#020817] flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
          CryptoDropScout
        </h1>

        <div className="mt-8 flex justify-center gap-3">

          <div className="w-4 h-4 rounded-full bg-cyan-400 animate-bounce"></div>

          <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-100"></div>

          <div className="w-4 h-4 rounded-full bg-purple-500 animate-bounce delay-200"></div>

        </div>

        <p className="mt-6 text-gray-400">
          Loading Web3 Alpha...
        </p>

      </div>

    </main>
  );
}