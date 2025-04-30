import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

export const exportSelectedMeshes = (meshList, callback) => {
  const scene = new THREE.Scene();

  meshList.forEach((mesh) => {
    // Clone the mesh to avoid altering the original scene
    scene.add(mesh.clone());
  });

  const exporter = new GLTFExporter();

  exporter.parse(
    scene,
    (gltf) => {
      // Check if the gltf is binary already or if it's in JSON format
      if (gltf instanceof ArrayBuffer) {
        const blob = new Blob([gltf], { type: "model/gltf-binary" });
        callback(blob);
      } else {
        // Convert JSON to binary .glb if it's in JSON format
        const json = JSON.stringify(gltf);
        const binary = new TextEncoder().encode(json);
        const blob = new Blob([binary], { type: "application/json" });
        callback(blob);
      }
    },
    { binary: true }
  );
};
