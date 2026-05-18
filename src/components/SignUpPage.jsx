import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SignUpPage({ onSignUpComplete, onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("❌ The Void requires your terrestrial name.");
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError("❌ Enter a valid email to receive notifications in the afterlife.");
      return;
    }
    if (password.length < 6) {
      setError("❌ Secret chant (Password) must be at least 6 syllables to secure your soul.");
      return;
    }
    if (!agree) {
      setError("❌ You must agree to forfeit your mortal rights and shadows.");
      return;
    }

    setError('');
    setSubmitting(true);

    // Simulate horrific blood sealing process
    setTimeout(() => {
      onSignUpComplete(name);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#070707] text-cream flex items-center justify-center p-6 relative overflow-hidden font-sans select-none">
      {/* Background elements */}
      <div className="absolute inset-0 bg-radial-gradient from-gold/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blood/15 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-black/80 border-2 border-gold/40 p-8 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.15)] relative z-10"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-4 text-xs font-mono text-gold tracking-widest uppercase border-x border-gold/40">
          📜 Blood Contract 📜
        </div>

        <h2 className="text-3xl font-black text-center text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] uppercase tracking-wider mb-6 mt-2">
          Seal The Covenant
        </h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-red-950/50 border border-red-500 text-red-300 p-3 rounded text-sm font-mono text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-mono text-cream/70 uppercase tracking-widest mb-2">
              Vessel Name (Your Earth Alias)
            </label>
            <input
              type="text"
              required
              placeholder="e.g., John Doe the Doomed"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
              className="w-full bg-[#111] border border-gold/30 hover:border-gold/60 focus:border-gold p-3 rounded text-cream font-mono outline-none transition-colors placeholder:text-cream/20 text-sm"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-mono text-cream/70 uppercase tracking-widest mb-2">
              Spirit Anchor (Email Address)
            </label>
            <input
              type="email"
              required
              placeholder="vessel@eternal-torment.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              className="w-full bg-[#111] border border-gold/30 hover:border-gold/60 focus:border-gold p-3 rounded text-cream font-mono outline-none transition-colors placeholder:text-cream/20 text-sm"
            />
            {email.includes('@') && (
              <span className="text-[10px] text-green-400/70 font-mono mt-1 block">
                ✓ Spirit anchor frequency recognized.
              </span>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-mono text-cream/70 uppercase tracking-widest mb-2">
              Secret Chant (Password)
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              className="w-full bg-[#111] border border-gold/30 hover:border-gold/60 focus:border-gold p-3 rounded text-cream font-mono outline-none transition-colors placeholder:text-cream/20 text-sm"
            />
            {password.length > 0 && (
              <span className="text-[10px] text-red-400 font-mono mt-1 block animate-pulse">
                ⚠️ Secure level: {password.length < 6 ? 'Fragile Mortal Protection' : 'Fortified Shadow Barrier'}
              </span>
            )}
          </div>

          {/* Covenant Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="covenant"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              disabled={submitting}
              className="mt-1 accent-blood border-gold/30 rounded focus:ring-0 cursor-pointer"
            />
            <label htmlFor="covenant" className="text-xs font-mono text-cream/60 leading-relaxed cursor-pointer select-none">
              I solemnly agree to forfeit all mortal rights, shadow permissions, and browser history logs to Elite Cursed Commerce. I understand that logout features are only granted upon blood contract sealing.
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: submitting ? 1 : 1.02 }}
            whileTap={{ scale: submitting ? 1 : 0.98 }}
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-blood border border-red-500 rounded-lg text-cream font-bold uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(139,0,0,0.4)] hover:bg-red-950 transition-colors flex justify-center items-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                <span>Sealing Covenant in Blood...</span>
              </>
            ) : (
              <span>🩸 Seal The Covenant</span>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onBack}
            disabled={submitting}
            className="text-xs font-mono text-cream/40 hover:text-cream transition-colors underline uppercase tracking-widest"
          >
            ← Flee Back to Safety
          </button>
        </div>
      </motion.div>
    </div>
  );
}
