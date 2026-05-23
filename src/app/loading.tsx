export default function Loading() {

  return (

    <main className="min-h-screen bg-[#020817] flex items-center justify-center overflow-hidden">

      <div className="text-center">

        <div className="w-24 h-24 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mx-auto"></div>

        <h1 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoDropScout
        </h1>

        <p className="mt-5 text-xl text-gray-400">
          Loading next opportunity...
        </p>

      </div>

    </main>

  );

}