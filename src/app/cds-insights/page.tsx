'use client';

import { useState } from 'react';

export default function CDSInsightsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (
      password ===
      process.env.NEXT_PUBLIC_ANALYTICS_PASSWORD
    ) {
      setAuthenticated(true);
    } else {
      alert('Invalid Password');
    }
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            CDS Insights
          </h1>

          <p className="text-gray-400 text-center mb-6">
            Private Analytics Dashboard
          </p>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 outline-none"
          />

          <button
            onClick={handleLogin}
            className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-semibold"
          >
            Access Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            CDS Insights
          </h1>

          <p className="text-gray-400 mt-2">
            CryptoDropScout Analytics Dashboard
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-gray-400">
              Total Visitors
            </h3>

            <p className="text-3xl font-bold mt-2">
              Coming Soon
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-gray-400">
              Unique Visitors
            </h3>

            <p className="text-3xl font-bold mt-2">
              Coming Soon
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-gray-400">
              Page Views
            </h3>

            <p className="text-3xl font-bold mt-2">
              Coming Soon
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-gray-400">
              Bounce Rate
            </h3>

            <p className="text-3xl font-bold mt-2">
              Coming Soon
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-semibold mb-3">
              Top Countries
            </h3>

            <p className="text-gray-400">
              Google Analytics Integration Pending
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-semibold mb-3">
              Top Devices
            </h3>

            <p className="text-gray-400">
              Google Analytics Integration Pending
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-semibold mb-3">
              Traffic Sources
            </h3>

            <p className="text-gray-400">
              Google Analytics Integration Pending
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}