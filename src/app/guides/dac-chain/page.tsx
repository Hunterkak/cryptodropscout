export default function DACGuidePage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white px-6 py-16">
      
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-6">
          DAC Chain Node Guide
        </h1>

        <p className="text-gray-300 text-lg mb-10">
          Complete beginner-friendly DAC Chain node setup guide for potential future rewards and ecosystem participation.
        </p>

        <div className="bg-[#111827] border border-cyan-500/20 rounded-3xl p-8 space-y-8">
          
          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
              Step 1 — VPS Requirements
            </h2>

            <ul className="text-gray-300 space-y-2">
              <li>• Ubuntu 22.04 VPS</li>
              <li>• 4GB RAM minimum</li>
              <li>• 2 CPU Cores</li>
              <li>• Stable internet connection</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
              Step 2 — Update Server
            </h2>

            <div className="bg-black rounded-xl p-4 text-green-400 overflow-x-auto">
              <code>
                sudo apt update && sudo apt upgrade -y
              </code>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
              Step 3 — Install Docker
            </h2>

            <div className="bg-black rounded-xl p-4 text-green-400 overflow-x-auto">
              <code>
                curl -fsSL https://get.docker.com | bash
              </code>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
              Step 4 — Join Community
            </h2>

            <a
              href="https://t.me/CryptoDropScoutt"
              target="_blank"
              className="inline-block mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold hover:opacity-90 transition"
            >
              Join Telegram
            </a>
          </div>

        </div>

      </div>

    </main>
  );
}