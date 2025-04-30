import { useEffect } from "react";
import "../styles.css";
import { useNavigate } from "react-router-dom";

export const meta = () => {
  return [
    { title: "Virtual Wrench" },
    {
      name: "description",
      content: "Customize your dream ride in cinematic 3D 🔧🏍️",
    },
  ];
};

export default function Index() {
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
            Virtual Wrench
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-xl mx-auto leading-relaxed">
            Customize your ride in cinematic 3D — tweak parts, paint, and make
            it yours.
          </p>
        </div>

        {/* 🏍️ 3D Viewer Section */}
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
          >
            <button
              className="Hotspot"
              slot="hotspot-6"
              data-position="-0.3037741182937464m 0.8599847504191316m -0.7889937195456455m"
              data-normal="-0.17677395554959377m 0.9839074011515646m 0.026022962908258132m"
              data-visibility-attribute="visible"
            >
              <div className="HotspotAnnotation">Seat</div>
            </button>
            <button
              className="Hotspot"
              slot="hotspot-7"
              data-position="0.7159423687176228m 1.0227042153191173m -0.7960691258958839m"
              data-normal="0.9991068058168706m 0.016517362607019942m -0.038894309389912736m"
              data-visibility-attribute="visible"
            >
              <div className="HotspotAnnotation">Headlight</div>
            </button>
            {/* <button
              className="Hotspot"
              slot="hotspot-8"
              data-position="0.19188891829846283m 1.0332254587625123m -0.6190773906069553m"
              data-normal="-0.2287634452228024m 0.36437684057631897m 0.902716347576255m"
              data-visibility-attribute="visible"
            >
              <div className="HotspotAnnotation">Tank color</div>
            </button> */}
            <button
              className="Hotspot"
              slot="hotspot-9"
              data-position="1.077063956271406m 0.6864549175274641m -0.7094392844672766m"
              data-normal="0.6001191131228196m 0.477236085540658m 0.6419523103179164m"
              data-visibility-attribute="visible"
            >
              <div className="HotspotAnnotation">Tyres</div>
            </button>
            <button
              className="Hotspot"
              slot="hotspot-10"
              data-position="-0.8371353762969266m 0.5498768298534953m -0.45445147609746533m"
              data-normal="0.003980647541542647m 0.5551274504868968m 0.8317557743478959m"
              data-visibility-attribute="visible"
            >
              <div className="HotspotAnnotation">Exhaust</div>
            </button>
            <button
              className="Hotspot"
              slot="hotspot-11"
              data-position="-0.8840520855788517m 0.8893338966170445m -0.7617660972140154m"
              data-normal="-0.43440971979877896m 0.8908199091683003m 0.13314685416384403m"
              data-visibility-attribute="visible"
            >
              <div className="HotspotAnnotation">Fenders</div>
            </button>
            <button
              className="Hotspot"
              slot="hotspot-12"
              data-position="-0.964782859312123m 0.7611688379999609m -0.635579041653236m"
              data-normal="-0.9954155268838731m 0.09446740977504516m 0.01496119409990947m"
              data-visibility-attribute="visible"
            >
              <div className="HotspotAnnotation">Tail light</div>
            </button>
            {/* <button
              className="Hotspot"
              slot="hotspot-13"
              data-position="-0.9568900991232412m 0.6451948703026554m -1.0069869057833538m"
              data-normal="0.007287719953806844m 0.9999534671477663m -0.006320813004366144m"
              data-visibility-attribute="visible"
            >
              <div className="HotspotAnnotation">Number Plate</div>
            </button> */}
            {/* <button
              className="Hotspot"
              slot="hotspot-14"
              data-position="-0.5505728671817784m 0.6271835999893716m -1.0072689020196666m"
              data-normal="-0.2018417948444115m 0.3404315541786817m -0.9183497409884067m"
              data-visibility-attribute="visible"
            >
              <div className="HotspotAnnotation">Suspension</div>
            </button> */}
            <button
              className="Hotspot"
              slot="hotspot-15"
              data-position="0.9784838892688918m 0.5304628608261746m -0.8738651504036541m"
              data-normal="0.002685924550659191m -0.00028326322710861155m -0.9999963527789751m"
              data-visibility-attribute="visible"
            >
              <div className="HotspotAnnotation">Brakes</div>
            </button>
            <div className="progress-bar hide" slot="progress-bar">
              <div className="update-bar"></div>
            </div>
          </model-viewer>
        </div>

        <div className="mt-14 animate-fade-in-up delay-500">
          <button
            className="px-10 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(255,0,150,0.6)]"
            onClick={() => navigate("/experience")}
          >
            🚀 Launch Garage
          </button>
        </div>
      </div>
    </main>
  );
}
