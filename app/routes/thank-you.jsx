import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

export const meta = () => {
  return [
    { title: "Thank You - Virtual Wrench" },
    {
      name: "description",
      content: "Thank you for using Virtual Wrench! 🎉",
    },
  ];
};

export default function ThankYouPage() {
  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen bg-[#0c0c0e] text-white overflow-hidden font-sans">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1a1d] via-[#121212] to-[#0a0a0a]" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#ffffff0c_1px,transparent_1px)] [background-size:25px_25px] opacity-10" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16 md:py-28">
        <div className="text-center max-w-4xl mb-14 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-lg">
            Thank You! 🙏
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-xl mx-auto leading-relaxed">
            We appreciate you using Virtual Wrench! 🎉 Your customized ride is
            ready.
          </p>
        </div>

        {/* 3D Viewer Section */}
        <div className="w-full min-h-[45vh] max-w-6xl rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_0_80px_rgba(0,255,255,0.2)] overflow-hidden animate-fade-in-up delay-300">
          <model-viewer
            style={{ minHeight: "50vh" }}
            src="/bike-model.glb"
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            tone-mapping="agx"
            poster="/poster.webp"
            shadow-intensity="0.98"
            exposure="0.75"
            auto-rotate
            camera-orbit="1569deg 81.82deg 4.799m"
            field-of-view="22.98deg"
            min-camera-orbit="-160deg 73deg 4.16m"
            max-camera-orbit="85deg 79deg auto"
            environment-image="/autoshop_01_4k.hdr"
            skybox-image="/autoshop_01_4k.hdr"
            min-field-of-view="22.98deg"
          />
        </div>

        <div className="mt-14 animate-fade-in-up delay-500">
          <button
            className="px-10 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(255,0,150,0.6)]"
            onClick={() => navigate("/experience")}
          >
            🏍️ Start a New Project
          </button>
        </div>
      </div>
    </main>
  );
}
