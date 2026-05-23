import Link from "next/link";

export default function NotFound() {

  return (

    <main className="min-h-screen bg-[#020817] text-white flex items-center justify-center px-6 overflow-hidden">

      <div className="text-center relative z-10">

        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

        <h1 className="text-9xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-8 text-5xl font-black">
          Lost In The Blockchain
        </h2>

        <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          The page you are looking for does not exist or may have been removed.
        </p>

        <Link
          href="/"
          className="inline-flex mt-10 px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-lg hover:scale-105 transition"
        >
          Back To Homepage →
        </Link>

      </div>

    </main>

  );

}