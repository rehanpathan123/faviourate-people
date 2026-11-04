import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Music2, VolumeX, Volume2, ArrowDown, Stars, Quote } from "lucide-react";
import emailjs from "@emailjs/browser";

const floatingHearts = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 9) % 100}%`,
  delay: (i % 7) * 0.8,
  duration: 9 + (i % 6) * 1.7,
  size: 12 + (i % 5) * 7,
}));

function FloatingHearts() {
  return <div className="floating-layer" aria-hidden="true">
    {floatingHearts.map((heart) => <motion.div
      key={heart.id}
      className="floating-heart"
      style={{ left: heart.left, fontSize: heart.size }}
      initial={{ y: "110vh", opacity: 0, rotate: -15 }}
      animate={{ y: "-15vh", opacity: [0, 0.5, 0.5, 0], rotate: 20 }}
      transition={{ duration: heart.duration, delay: heart.delay, repeat: Infinity, ease: "linear" }}
    >♥</motion.div>)}
  </div>;
}

function HeartScene() {
  return <div className="heart-scene" aria-label="A glowing 3D-style heart">
    <div className="orbit orbit-one" />
    <div className="orbit orbit-two" />
    <motion.div
      className="heart-3d"
      animate={{ y: [0, -13, 0], rotate: [-4, 4, -4], scale: [1, 1.045, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <span>♥</span>
    </motion.div>
    <div className="heart-glow" />
    <Sparkles className="sparkle sparkle-a" size={22} />
    <Sparkles className="sparkle sparkle-b" size={16} />
    <Sparkles className="sparkle sparkle-c" size={19} />
  </div>;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);
  const [formData, setFormData] = useState({
    changeThing: "",
    doMore: "",
    neverDo: "",
    loveMost: "",
    dreamDate: "",
    specialRequest: "",
  });

  const handleYes = () => {
    setAccepted(true);
  };

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setMusicOn(true);
      }).catch(() => {
        // Autoplay may be restricted until user interacts
      });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
    } else {
      audioRef.current.play().then(() => {
        setMusicOn(true);
      }).catch(() => {});
    }
  };

  const handleDismissSplash = () => {
    setShowSplash(false);
    startMusic();
  };

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => setShowSplash(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const message = [
      "🎉💖 SHE SAID YES! And here's what she wants:\n",
      `💫 Things to change about yourself:\n${formData.changeThing || "Nothing — you're perfect! 😊"}`,
      `💕 Things to do more for her:\n${formData.doMore || "No answer"}`,
      `🚫 Things to never do:\n${formData.neverDo || "No answer"}`,
      `❤️ What she loves most about you:\n${formData.loveMost || "No answer"}`,
      `🌙 Her dream date idea:\n${formData.dreamDate || "No answer"}`,
      `✨ Special request:\n${formData.specialRequest || "No answer"}`,
    ].join("\n\n");

    emailjs.send(
      "service_jd5o3iw",
      "template_55h4gej",
      { message },
      "xNrdwiisduTOibjFd"
    ).then(() => {
      setFormSubmitted(true);
      setSubmitting(false);
    }).catch(() => {
      setFormSubmitted(true);
      setSubmitting(false);
    });
  };

  const noMessages = useMemo(() => [
    "Are you sure, Mansi? 🥺",
    "Mansi, maybe give my heart another chance? ♥",
    "I'll bring snacks and extra hugs for you, Mansi 🍓",
    "That button seems a little shy, Mansi 🙈",
    "I'll keep asking with love, Mansi 💗",
  ], []);

  const scrollToQuestion = () => document.getElementById("question")?.scrollIntoView({ behavior: "smooth" });

  return <main className="site-shell">
    <audio ref={audioRef} src="/love-music.mp3" loop preload="auto" />
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="splash-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          onClick={handleDismissSplash}
        >
          {/* Floating flowers */}
          {["🌸", "🌷", "🌹", "💐", "🌺", "🌸", "🌷", "💐", "🌹", "🌺", "🌸", "🌷", "💐", "🌹", "🌺", "🌸"].map((flower, i) => (
            <motion.span
              key={i}
              className="splash-flower"
              style={{ left: `${(i * 29 + 5) % 100}%`, fontSize: 18 + (i % 4) * 8 }}
              initial={{ y: "110vh", opacity: 0, rotate: -20 }}
              animate={{ y: "-15vh", opacity: [0, 0.8, 0.8, 0], rotate: 25 }}
              transition={{ duration: 7 + (i % 5) * 1.5, delay: (i % 8) * 0.5, repeat: Infinity, ease: "linear" }}
            >{flower}</motion.span>
          ))}

          {/* Floating hearts */}
          {["♥", "♥", "♥", "♥", "♥", "♥", "♥", "♥"].map((h, i) => (
            <motion.span
              key={`h${i}`}
              className="splash-heart-float"
              style={{ left: `${(i * 31 + 12) % 100}%` }}
              initial={{ y: "110vh", opacity: 0 }}
              animate={{ y: "-10vh", opacity: [0, 0.4, 0.4, 0] }}
              transition={{ duration: 8 + (i % 4) * 2, delay: (i % 6) * 0.7, repeat: Infinity, ease: "linear" }}
            >{h}</motion.span>
          ))}

          <div className="splash-content">
            {/* Bouquets on sides */}
            <motion.div className="splash-bouquet splash-bouquet-left"
              initial={{ opacity: 0, x: -40, rotate: -15 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >💐</motion.div>
            <motion.div className="splash-bouquet splash-bouquet-right"
              initial={{ opacity: 0, x: 40, rotate: 15 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >💐</motion.div>

            {/* Welcome text */}
            <motion.p className="splash-welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >🌸 Welcome, my love 🌸</motion.p>

            {/* Name with hearts */}
            <motion.h1 className="splash-name"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.6, type: "spring", damping: 12 }}
            >
              <span className="splash-heart-left">♥</span>
              Mansi
              <span className="splash-heart-right">♥</span>
            </motion.h1>

            {/* Flower row */}
            <motion.div className="splash-flower-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >🌷 🌹 🌸 🌺 🌷</motion.div>

            {/* Subtitle */}
            <motion.p className="splash-sub"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.5 }}
            >This little world was made just for you 💗</motion.p>

            {/* Enter button */}
            <motion.button className="splash-enter"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
              onClick={(e) => {
                e.stopPropagation();
                handleDismissSplash();
              }}
            >
              Open My Heart 🌹
            </motion.button>

            {/* Pulsing heart below */}
            <motion.div className="splash-big-heart"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >♥</motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    <div className="ambient ambient-one" />
    <div className="ambient ambient-two" />
    <FloatingHearts />

    <header className="topbar">
      <a className="brand" href="#home"><span className="brand-mark"><Heart size={15} fill="currentColor" /></span> just for you, Mansi ♥</a>
      <button className="sound-toggle" onClick={toggleMusic} aria-label="Toggle music">
        {musicOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
        <span>{musicOn ? "Music playing ♫" : "Play music ♪"}</span>
      </button>
    </header>

    <section id="home" className="hero section-pad">
      <motion.div className="hero-copy"
        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}>
        <div className="eyebrow"><span className="eyebrow-line" /> A LITTLE SOMETHING FROM MY HEART FOR MANSI ♥ <span className="eyebrow-line" /></div>
        <h1>Mansi, you make<br />the world feel <em>magical.</em></h1>
        <p className="hero-subtitle">And somehow, you became my favourite part of it, Mansi. ♥</p>
        <button className="primary-button" onClick={scrollToQuestion}>Mansi, I want to ask you something <Heart size={17} fill="currentColor" /></button>
        <div className="scroll-cue"><ArrowDown size={14} /> take a little journey with me, Mansi</div>
      </motion.div>
      <motion.div className="hero-art"
        initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2 }}>
        <HeartScene />
        <div className="art-caption"><span>♡</span> made with extra love for Mansi</div>
      </motion.div>
      <div className="hero-bottom-note">MANSI ♥ SCROLL TO FEEL THE LOVE <span>↓</span></div>
    </section>

    <section className="photo-spotlight section-pad">
      <motion.div
        className="photo-card"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="photo-frame-wrapper">
          <motion.div
            className="photo-frame"
            whileHover={{ scale: 1.02, rotate: 0 }}
            initial={{ rotate: -1.5 }}
          >
            <div className="photo-glow" />
            <div className="photo-inner">
              <img
                src="/mansi.jpg"
                alt="Mansi"
                className="mansi-image"
              />
              <div className="photo-badge">
                <Heart size={14} fill="currentColor" />
                <span>My favorite view ♥</span>
              </div>
            </div>
            <div className="photo-polaroid-caption">
              <span>Mansi, you bring light into everything ✨</span>
            </div>
          </motion.div>
        </div>

        <div className="photo-copy">
          <div className="photo-tag"><Sparkles size={16} /> THE MOST BEAUTIFUL SMILE</div>
          <h2>My Favorite View<br />in the <em>Whole World</em></h2>
          <p className="photo-quote">
            "Out of 8 billion people on this planet, my eyes will forever search for only you, Mansi.
            Your smile has a way of melting every worry, and your gentle soul makes this entire world feel like a warmer, safer place."
          </p>
          <p className="photo-subquote">
            Seeing you smile like this is my favorite moment in every single day. You are effortlessly beautiful, inside and out. ♥
          </p>
          <div className="photo-stats">
            <div className="stat-pill"><span>🌷</span> Pure Kindness</div>
            <div className="stat-pill"><span>✨</span> Endless Magic</div>
            <div className="stat-pill"><span>💖</span> 100% Mine?</div>
          </div>
        </div>
      </motion.div>
    </section>

    <section className="story section-pad">
      <motion.div className="story-card" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }}>
        <div className="story-icon"><Stars size={20} /></div>
        <p className="section-kicker">A THOUGHT I'VE BEEN KEEPING FOR MANSI ♥</p>
        <h2>Mansi, it's the little things<br />that mean <em>everything.</em></h2>
        <p className="story-text">Your smile, Mansi. The way you make ordinary moments feel special. The conversations I never want to end. I don't know exactly when it happened, but somewhere along the way, Mansi, you became someone incredibly important to me. ♥</p>
        <div className="tiny-hearts">♥ &nbsp; ♥ &nbsp; ♥</div>
      </motion.div>
    </section>

    <section className="love-speech section-pad">
      <motion.div className="speech-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="speech-quote-icon"><Quote size={28} /></div>
        <p className="section-kicker">WORDS FROM MY HEART TO MANSI ♥</p>
        <h2>My Love Speech<br />to <em>Mansi</em> ♥</h2>

        <div className="speech-body">
          {[
            "Mansi, having you in my life has quietly transformed my entire world. Your presence brings an effortless calm, a gentle warmth, and a pure happiness I never knew was possible before you. ♥",
            "You are my favorite thought to wake up to and my most comforting peace at the end of every tiring day. Whenever I talk to you, everything noisy in the world just fades away. ♥",
            "I love the genuine purity of your heart, Mansi. I love your laughter that instantly brightens up even the darkest room, the way your eyes sparkle when you're excited, and the beautiful comforting silence we share where no words are needed. ♥",
            "With you, Mansi, ordinary days turn into extraordinary memories. A simple walk, a late-night conversation, a shared smile over silly inside jokes — every second by your side is something I treasure with all my soul. ♥",
            "You have taught me what unconditional care and tenderness truly mean. You understand me in ways no one else ever could, you support me when I doubt myself, and you inspire me to become a better person every single day. ♥",
            "Life will always bring its uncertainties and changes, Mansi, but one thing will never waver — my unwavering dedication to you. I promise to be your safest shelter, your biggest cheerleader, your patient listener, and the one person who never leaves your side. ♥",
            "In a world where everything moves so fast, you are my steady anchor. You are my peace in the chaos, my favorite story to tell, and the home my heart always looked for without even knowing it. ♥",
            "I don't need a picture-perfect fairytale, Mansi — all I want is a real life shared with you. Holding your hand through every high and low, celebrating your triumphs, wiping away your tears, and dreaming together for our future. ♥",
            "You are not just someone I love, Mansi — you are my best friend, my greatest confidante, and the most precious blessing of my life. Every day spent knowing you is a gift I will never take for granted. ♥",
            "So with all my heart, honesty, and devotion, I make this promise to you today: I will cherish you, respect you, protect your smile, and love you gently, fiercely, and endlessly — today, tomorrow, and for all eternity. ♥",
          ].map((line, i) => (
            <motion.p
              key={i}
              className="speech-line"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div className="speech-sign-off"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Heart size={16} fill="currentColor" />
          <span>Forever & always yours, Mansi ♥</span>
        </motion.div>
      </motion.div>
    </section>

    <section className="memory section-pad">
      <div className="memory-heading">
        <p className="section-kicker">IF I COULD SAVE A FEELING WITH MANSI ♥</p>
        <h2>It would look a little<br />like <em>this, Mansi.</em></h2>
      </div>
      <div className="memory-grid">
        <motion.div className="memory-tile tile-one" whileHover={{ y: -8, rotate: -1 }}>
          <div className="tile-emoji">🌷</div><p>Every little moment</p><span>feels brighter with you, Mansi ♥</span>
        </motion.div>
        <motion.div className="memory-tile tile-two" whileHover={{ y: -8, rotate: 1 }}>
          <div className="tile-emoji">✨</div><p>Every conversation</p><span>with Mansi becomes a favourite memory ♥</span>
        </motion.div>
        <motion.div className="memory-tile tile-three" whileHover={{ y: -8, rotate: -1 }}>
          <div className="tile-emoji">💌</div><p>And every tomorrow</p><span>with Mansi feels worth looking forward to ♥</span>
        </motion.div>
      </div>
    </section>

    <section id="question" className="question-section section-pad">
      <motion.div className="question-card" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        <div className="question-glow" />
        <div className="question-content">
          <div className="big-heart"><Heart fill="currentColor" size={34} /></div>
          <p className="section-kicker">SO, HERE GOES NOTHING, MANSI... ♥</p>
          <h2>Mansi, will you make<br />me the <em>happiest</em><br />person?</h2>
          <p className="question-sub">Mansi, will you be mine? ❤️</p>
          <div className="answer-row">
            <motion.button className="yes-button" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} onClick={handleYes}>
              YES! <Heart size={17} fill="currentColor" />
            </motion.button>
            <motion.button className="no-button" whileHover={{ x: [0, -5, 5, 0] }} onClick={() => setNoCount((n) => n + 1)}>
              {noCount === 0 ? "Not sure..." : "Still thinking?"}
            </motion.button>
          </div>
          {noCount > 0 && <motion.p className="gentle-nudge" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{noMessages[(noCount - 1) % noMessages.length]}</motion.p>}
          <p className="no-pressure">Whatever your answer, Mansi, you deserve to feel comfortable and happy. 💗</p>
        </div>
      </motion.div>
    </section>

    <footer className="footer">
      <Heart size={14} fill="currentColor" /> made with love, just for you Mansi <span>✦</span> always ♥
    </footer>

    <AnimatePresence>
      {accepted && !formSubmitted && (
        <motion.div className="celebration-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="confetti" aria-hidden="true">{Array.from({ length: 42 }, (_, i) => <motion.span key={i} style={{ left: `${(i * 23) % 100}%`, animationDelay: `${(i % 9) * 0.16}s` }}>♥</motion.span>)}</div>
          <motion.div className="form-card" initial={{ scale: 0.75, y: 25 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", damping: 14 }}>
            <div className="success-heart">💖</div>
            <p className="section-kicker">MANSI, YOU SAID YES! ♥ NOW TELL ME...</p>
            <h2>Help me be the<br /><em>best</em> for you, Mansi</h2>
            <p className="form-subtitle">Be honest, be fun, Mansi — I want to hear it all 💗</p>

            <form className="love-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>💫 What should I change about myself?</label>
                <textarea placeholder="Be honest... or say nothing, you're already perfect!" value={formData.changeThing} onChange={(e) => handleFormChange("changeThing", e.target.value)} rows={2} />
              </div>
              <div className="form-group">
                <label>💕 What should I do more for you?</label>
                <textarea placeholder="More hugs? More surprises? More chai? ☕" value={formData.doMore} onChange={(e) => handleFormChange("doMore", e.target.value)} rows={2} />
              </div>
              <div className="form-group">
                <label>🚫 What should I never do?</label>
                <textarea placeholder="I promise I'll try my best!" value={formData.neverDo} onChange={(e) => handleFormChange("neverDo", e.target.value)} rows={2} />
              </div>
              <div className="form-group">
                <label>❤️ What do you love most about me?</label>
                <textarea placeholder="Go on, make me blush 😊" value={formData.loveMost} onChange={(e) => handleFormChange("loveMost", e.target.value)} rows={2} />
              </div>
              <div className="form-group">
                <label>🌙 Your dream date idea?</label>
                <textarea placeholder="Rooftop dinner? Beach walk? Movie marathon?" value={formData.dreamDate} onChange={(e) => handleFormChange("dreamDate", e.target.value)} rows={2} />
              </div>
              <div className="form-group">
                <label>✨ Any special request for me?</label>
                <textarea placeholder="Anything at all... I'm all ears 🤗" value={formData.specialRequest} onChange={(e) => handleFormChange("specialRequest", e.target.value)} rows={2} />
              </div>
              <button className="primary-button submit-btn" type="submit" disabled={submitting}>
                {submitting ? "Sending with love..." : <>Send my wishes <Heart size={16} fill="currentColor" /></>}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {formSubmitted && (
        <motion.div className="celebration-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="confetti" aria-hidden="true">{Array.from({ length: 42 }, (_, i) => <motion.span key={i} style={{ left: `${(i * 23) % 100}%`, animationDelay: `${(i % 9) * 0.16}s` }}>♥</motion.span>)}</div>
          <motion.div className="success-card" initial={{ scale: 0.75, y: 25 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", damping: 14 }}>
            <div className="success-avatar-wrap">
              <img src="/mansi.jpg" alt="Mansi" className="success-avatar" />
              <span className="success-heart-badge">💖</span>
            </div>
            <p className="section-kicker">THIS IS MY FAVOURITE MOMENT, MANSI ♥</p>
            <h2>Mansi, you just made<br />my world <em>brighter!</em></h2>
            <p>I can't stop smiling, Mansi. Your wishes are on their way to me. Here's to more laughter, little adventures, and beautiful memories together. ❤️</p>
            <button className="primary-button" onClick={() => { setAccepted(false); setFormSubmitted(false); }}>Let's make memories, Mansi ♥ <Heart size={16} fill="currentColor" /></button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </main>;
}