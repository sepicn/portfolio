"use client";

import { Bloom, EffectComposer, Outline, Vignette } from "@react-three/postprocessing";

export function Effects() {
  return (
    <EffectComposer multisampling={0} autoClear={false}>
      <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.2} intensity={0.7} />
      <Outline
        blur
        edgeStrength={6}
        pulseSpeed={0.6}
        visibleEdgeColor={0x00e5ff}
        hiddenEdgeColor={0x00e5ff}
        width={1024}
      />
      <Vignette eskil={false} offset={0.2} darkness={0.85} />
    </EffectComposer>
  );
}
