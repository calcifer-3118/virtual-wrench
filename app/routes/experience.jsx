import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Html,
  PerspectiveCamera,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

let fov = 70;

function Loader() {
  return (
    <div className="fixed w-full h-full top-0 left-0 bg-black bg-opacity-70 flex items-center justify-center z-990">
      <div className="flex flex-col items-center justify-center bg-black bg-opacity-90 p-8 rounded-lg shadow-lg">
        <div className="spinner mb-4 w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-white text-lg font-semibold">Loading Garage...</p>
      </div>
    </div>
  );
}

function GarageModel({ setModel }) {
  const { scene } = useGLTF("/design.glb");
  setModel(scene);
  return <primitive object={scene} scale={2} />;
}

function HUDOverlay({ cameraRef, model }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [cameraIndex, setCameraIndex] = useState(1);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  const handleMenuToggle = (type) => {
    setActiveMenu((prev) => (prev === type ? null : type));
  };

  const switchCam = (pos, rot, fov) => {
    const degToRad = Math.PI / 180;
    const rotX = rot.x * degToRad;
    const rotY = rot.y * degToRad;
    const rotZ = rot.z * degToRad;

    if (true) {
      gsap.to(cameraRef.current.position, {
        x: pos.x,
        y: pos.y,
        z: pos.z,
        duration: 1,
      });
      gsap.to(cameraRef.current.quaternion, {
        x: rot.x,
        y: rot.y,
        z: rot.z,
        w: rot.w,
        duration: 1,
      });
    } else {
      cameraRef.current.position.set(pos.x, pos.y, pos.z);
      cameraRef.current.rotation.set(rotX, rotY, rotZ);
    }
    if (fov) cameraRef.current.fov = fov;

    console.log(cameraRef.current.quaternion);
  };

  const camRotations = {
    cam3: {
      x: 0,
      y: 0.9659258262890683,
      z: 0,
      w: 0.25881904510252074,
    },
    cam4: {
      w: -0.3420201433256687,
      x: 0,
      y: 0.9396926207859084,
      z: 0,
    },
    cam1: { w: -1, x: 0, y: 1.2246467991473532e-16, z: 0 },
    cam2: { w: 0.8604753755654524, x: 0, y: 0.509492029422928, z: 0 },
    cam5: { w: -0.8870108331782217, x: 0, y: 0.4617486132350339, z: 0 },
  };

  const camRotationsE = {
    cam3: { x: 0, y: 150, z: 0 },
    cam4: { x: 0, y: 220, z: 0 },
    cam1: { x: 0, y: 360, z: 0 },
    cam2: { x: 0, y: 61.26, z: 0 },
    cam5: { x: 0, y: 305, z: 0 },
    tank: { x: -141.86, y: 37.44, z: 154.48 },
    tyre: { x: -141.86, y: 37.44, z: 154.48 },
  };

  const handleCameraChange = (direction) => {
    setCameraIndex((prev) => {
      let index = direction === "prev" ? prev - 1 : prev + 1;
      if (index < 1) index = 5;
      if (index > 5) index = 1;

      switch (index) {
        case 3:
          switchCam({ x: 3.341, y: 2, z: -4.5 }, camRotations.cam3, fov);
          break;
        case 4:
          switchCam({ x: -2.3, y: 2, z: -4.33 }, camRotations.cam4, fov);
          break;
        case 1:
          switchCam({ x: 0, y: 2, z: 3 }, camRotations.cam1, fov);
          break;
        case 2:
          switchCam({ x: 3.341, y: 2, z: 1 }, camRotations.cam2, fov);
          break;
        case 5:
          switchCam({ x: -2.8, y: 2, z: 0.6 }, camRotations.cam5, fov);
          break;
        default:
          break;
      }

      return index;
    });
  };

  const handleColorSelect = (hexColor) => {
    model.traverse((child) => {
      if (child.isMesh && child.name === "Body_Tank_Fender002") {
        console.log(child.material);
        child.material.color.set(hexColor);
      }
    });
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ""));
    return sum + price;
  }, 0);

  const buttonClass =
    "w-32 h-14 bg-white/10 backdrop-blur-lg border border-white/10 text-base font-medium text-white rounded-md shadow-sm flex items-center justify-center transition-all hover:bg-white/20 hover:scale-105 cursor-pointer";

  const verticalButtonClass =
    "w-[140px] h-12 bg-white/10 backdrop-blur-lg border border-white/10 text-sm font-semibold text-white tracking-widest rounded-md shadow-sm flex items-center justify-center transition-all hover:bg-white/20 hover:scale-105 cursor-pointer";

  const options = {
    TANK: [
      {
        name: "OEM Fuel Tank Assembly",
        brand: "Indian Motorcycle",
        price: "₹1,02,000",
        image:
          "https://cdn1.polaris.com/globalassets/indian/2021/model/vehicles/bobber-dark-horse/gallery/chief-bobber-dark-horse-black-smoke-1.jpg",
      },
      {
        name: "Custom Painted Tank",
        brand: "Custom Dynamics",
        price: "₹1,53,000",
        image:
          "https://www.americanbagger.com/wp-content/uploads/2022/03/custompainttank.jpg",
      },
    ],
    TYRE: [
      {
        name: "Michelin Commander III",
        brand: "Michelin",
        price: "₹21,300",
        image:
          "https://m.media-amazon.com/images/I/61skdlP7UvL._AC_UF894,1000_QL80_.jpg",
      },
      {
        name: "Dunlop Elite 4",
        brand: "Dunlop",
        price: "₹19,600",
        image: "https://images.carid.com/dunlop/items/elite-4.jpg",
      },
    ],
    MIRROR: [
      {
        name: "Kuryakyn Spear Mirrors",
        brand: "Kuryakyn",
        price: "₹12,800",
        image:
          "https://cdn.shopify.com/s/files/1/0266/6276/4597/products/546463_1200x1200.jpg",
      },
      {
        name: "Arlen Ness Oval Mirrors",
        brand: "Arlen Ness",
        price: "₹11,050",
        image:
          "https://cdn.bikebandit-images.com/product_images/arlen-ness-oval-mirror-black.jpg",
      },
    ],

    COLORS: [
      {
        name: "Colors",
      },
    ],
  };

  const partCamViews = {
    TYRE: {
      pos: { x: 2.355, y: 1.649, z: -2.022 },
      rot: {
        w: 0.3641841927192139,
        x: -0.09543337923604266,
        y: 0.8961756554217716,
        z: 0.2348010616040791,
      },
      fov: fov,
    },
    TANK: {
      pos: { x: -0.328, y: 3.1, z: -0.317 },
      rot: {
        w: 0.9252825541660955,
        x: -0.2831121617956065,
        y: -0.24134704822120184,
        z: -0.07383292703257739,
      },
      fov: fov,
    },
    MIRROR: {
      pos: { x: 2, y: 1.8, z: -2 },
      rot: { x: 10, y: 60, z: 0 },
      fov: fov,
    },
    RIM: {
      pos: { x: -1.5, y: 1.2, z: 2.5 },
      rot: { x: 0, y: -30, z: 0 },
      fov: fov,
    },
  };

  const navigate = useNavigate();

  const handleCheckout = async () => {
    const orderDetails = {
      items: cartItems.map((item) => ({
        name: item.name,
        brand: item.brand,
        price: item.price,
      })),
      totalAmount: totalAmount.toLocaleString("en-IN"),
    };

    navigate("/thank-you", { state: { orderDetails } });
  };

  return (
    <div className="absolute inset-0 pointer-events-none font-inter select-none">
      {/* Camera Controls Panel */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto z-10">
        <div className="flex gap-4 bg-white/10 backdrop-blur-lg border border-white/10 text-white px-6 py-2 rounded-md shadow-md text-sm font-semibold">
          <button className="hover:text-green-400 transition">🔄 Reset</button>
          <button className="hover:text-green-400 transition">
            🔍 Explore
          </button>
          <button className="hover:text-green-400 transition">💾 Save</button>
        </div>
      </div>

      {/* Bottom Center Camera Selector */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-auto z-10">
        <div className="flex items-center gap-6 bg-white/10 backdrop-blur-lg border border-white/10 text-white px-6 py-2 rounded-md shadow-md text-base font-semibold">
          <button
            onClick={() => handleCameraChange("prev")}
            className="hover:text-green-400 transition"
          >
            &lt;
          </button>
          <span className="text-white">cam {cameraIndex}</span>
          <button
            onClick={() => handleCameraChange("next")}
            className="hover:text-green-400 transition"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Cart Button */}
      <div className="absolute top-6 right-6 pointer-events-auto">
        <div
          className="bg-white/10 backdrop-blur-lg border border-white/10 text-white px-4 py-2 rounded-md shadow-md text-lg font-semibold cursor-pointer"
          onClick={() => setShowCart((prev) => !prev)}
        >
          Cart (₹{totalAmount.toLocaleString("en-IN")})
        </div>
      </div>

      {/* Centered Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[6%] left-[20%] w-[60%] h-[85%] bg-[#1a1a1d]/90 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-6 pointer-events-auto z-700"
          >
            <div className="text-white text-xl font-semibold mb-4 border-b border-white/10 pb-2 z-700">
              Your Cart
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-2">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 transition rounded-xl p-4 shadow-sm border border-white/10"
                >
                  <div className="flex flex-col gap-2">
                    <div className="text-white text-sm font-semibold">
                      {item.name}
                    </div>
                    <div className="text-white/60 text-xs">
                      Brand: {item.brand}
                    </div>
                    <div className="text-white/80 text-sm font-medium">
                      {item.price}
                    </div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="mt-3 w-full h-28 object-contain rounded-md border border-white/10 bg-white/5"
                    />
                    <button
                      onClick={() => handleRemoveFromCart(index)}
                      className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {cartItems.length === 0 && (
                <div className="text-white/50 text-sm text-center mt-10">
                  Your cart is empty.
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <button
                className="mt-6 w-full py-3 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700"
                onClick={handleCheckout}
              >
                Checkout (₹{totalAmount.toLocaleString("en-IN")})
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Buttons */}
      <div className="absolute top-1/4 right-6 flex flex-col gap-5 pointer-events-auto">
        {Object.keys(options).map((label) => (
          <div
            key={label}
            className={`${buttonClass} right-button`}
            onClick={() => {
              if (label != "COLORS") handleMenuToggle(label);
              else setShowColorPicker((prev) => !prev);
              const cam = partCamViews[label];
              if (cam) {
                switchCam(cam.pos, cam.rot, cam.fov);
              }
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="absolute bottom-6 left-6 flex gap-4 pointer-events-auto">
        <div className={buttonClass}>MODEL</div>
        <div className={buttonClass}>TYPE</div>
      </div>

      {/* <div className="absolute bottom-6 right-6 pointer-events-auto">
        <div className="w-32 h-14 bg-blue-600 text-white font-semibold rounded-md shadow-md flex items-center justify-center transition hover:bg-blue-700 hover:scale-105 cursor-pointer">
          SAVE
        </div>
      </div> */}

      {/* Slide-in Menu */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            ref={menuRef}
            className="absolute top-0 left-0 h-full w-80 bg-[#1a1a1d]/90 backdrop-blur-md border-r border-white/10 shadow-xl p-5 pointer-events-auto z-50"
          >
            <div className="text-white text-xl font-semibold mb-6 border-b border-white/10 pb-2">
              {activeMenu} Options
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto pr-2 h-[calc(100%-4rem)]">
              {options[activeMenu].map((opt, index) => (
                <div
                  key={index}
                  className="bg-white/5 hover:bg-white/10 transition rounded-xl p-4 shadow-sm border border-white/10"
                >
                  <div className="flex flex-col gap-2">
                    <div className="text-white text-sm font-semibold">
                      {opt.name}
                    </div>
                    <div className="text-white/60 text-xs">
                      Brand: {opt.brand}
                    </div>
                    <div className="text-white/80 text-sm font-medium">
                      {opt.price}
                    </div>
                    <img
                      src={opt.image}
                      alt={opt.name}
                      className="mt-3 w-full h-28 object-contain rounded-md border border-white/10 bg-white/5"
                    />
                    <button
                      onClick={() => {
                        handleAddToCart(opt);
                      }}
                      className="mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Placeholder Color Picker */}
      <AnimatePresence>
        {showColorPicker && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 top-[21%] w-64 flex flex-col gap-4 p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl pointer-events-auto z-40"
          >
            <div className="text-white text-xl font-semibold tracking-wide">
              🎨 Pick Your Shade
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto max-h-96 pr-1 custom-scrollbar">
              {/* Custom Color Picker */}
              <div className="flex items-center gap-3 group">
                <input
                  type="color"
                  onChange={(e) => handleColorSelect(e.target.value)}
                  className="w-10 h-10 border-2 border-white/20 rounded-full bg-transparent cursor-pointer transition-all duration-200 group-hover:scale-105"
                  title="Custom Color"
                />
                <span className="text-white text-sm group-hover:opacity-100 opacity-80 transition">
                  Custom Color
                </span>
              </div>

              {/* Predefined Cruiser Colors */}
              {[
                { name: "Matte Black", hex: "#1c1c1c" },
                { name: "Chrome Silver", hex: "#c0c0c0" },
                { name: "Midnight Blue", hex: "#191970" },
                { name: "Forest Green", hex: "#228B22" },
                { name: "Burnt Orange", hex: "#cc5500" },
                { name: "Maroon", hex: "#800000" },
                { name: "Pearl White", hex: "#f8f8ff" },
              ].map((color) => (
                <div
                  key={color.name}
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => handleColorSelect(color.hex)}
                >
                  <div
                    className="w-10 h-10 rounded-full border-2 border-white/20 transition-all duration-200 group-hover:scale-105"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                  <span className="text-white text-sm group-hover:opacity-100 opacity-80 transition">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Experience() {
  const cameraRef = useRef();
  const [model, setModel] = useState();

  return (
    <Suspense fallback={<Loader />}>
      <motion.div
        className="relative w-full h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Canvas
          camera={{ position: [0, 2, 5], fov: 60 }}
          shadows
          gl={{ antialias: true }}
        >
          <color attach="background" args={["#0e0e10"]} />
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 2, 3]}
            rotation={[0, 0, 0]}
            fov={fov}
          />

          <pointLight
            position={[0.5, 1.9, -1]}
            scale={[7, 7, 7]}
            intensity={1.5}
            castShadow
          />
          <pointLight
            position={[0.5, 1.9, -2.5]}
            scale={[7, 7, 7]}
            intensity={1.5}
            castShadow
          />
          <pointLight
            position={[-1.2, 1.9, -1]}
            scale={[7, 7, 7]}
            intensity={1.5}
            castShadow
          />
          <pointLight
            position={[-1.2, 1.9, -2.5]}
            scale={[7, 7, 7]}
            intensity={1.5}
            castShadow
          />

          <rectAreaLight
            position={[0, 7, 0]}
            scale={[10, 4, 10]}
            intensity={1.5}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <rectAreaLight
            position={[0, -2, 0]}
            scale={[10, 4, 10]}
            intensity={1.5}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <GarageModel setModel={setModel} />
        </Canvas>
        <HUDOverlay cameraRef={cameraRef} model={model} />
      </motion.div>
    </Suspense>
  );
}

export default Experience;
