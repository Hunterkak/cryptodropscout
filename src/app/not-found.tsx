export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#020817] text-white flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        404
      </h1>

      <h2 className="mt-6 text-4xl font-bold">
        Page Not Found
      </h2>

      <p className="mt-4 text-gray-400 max-w-xl text-lg">
        The page you are looking for does not exist or may have been moved.
      </p>

      <a
        href="/"
        className="mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-lg hover:scale-105 transition"
      >
        Return Home
      </a>

    </main>
  );
}