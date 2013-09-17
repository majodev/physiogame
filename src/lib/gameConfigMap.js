define([],
  function() {
    return {
      objectsToSpawn: {
        def: 30,
        min: 2,
        max: 100,
        step: 1,
        ui: "slider",
        cat: "general",
        desc: "Anzahl der Spiel-Objekte",
      },
      cloudsToGenerate: {
        def: 25,
        min: 0,
        max: 100,
        step: 1,
        ui: "slider",
        cat: "general",
        desc: "Anzahl der Wolken-Objekte"
      },
      objectHittedScaleCap: {
        def: 1,
        min: 0.1,
        max: 2,
        step: 0.1,
        ui: "slider",
        cat: "scale",
        desc: "Skalier-Grenze von getroffenen Spiel-Objekten"
      },
      objectHittedScaleBeforeCap: {
        def: 0.12,
        min: 0.01,
        max: 0.3,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Skalier-Zunahme von getroffenen Spiel-Objekten bevor Grenze"
      },
      objectHittedScaleAfterCap: {
        def: 0.08,
        min: 0.01,
        max: 0.3,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Skalier-Zunahme von getroffenen Spiel-Objekten nach Grenze"
      },
      objectHittedSpeedMax: {
        def: 5,
        min: 0.1,
        max: 10,
        step: 0.1,
        ui: "slider",
        cat: "speed",
        desc: "Maximale Geschwindigkeit von getroffenen Spiel-Objekten"
      },
      objectHittedSpeedStep: {
        def: 1,
        min: 0.1,
        max: 2,
        step: 0.1,
        ui: "slider",
        cat: "speed",
        desc: "Geschwindigkeitserhöhung von getroffenen Spiel-Objekten"
      },
      objectNormalSpeedMin: {
        def: 1,
        min: 0.1,
        max: 5,
        step: 0.1,
        ui: "slider",
        cat: "speed",
        desc: "Minimale Geschwindigkeit von normalen Spiel-Objekten"
      },
      objectNormalAlphaMin: {
        def: 0.5,
        min: 0.1,
        max: 1,
        step: 0.01,
        ui: "slider",
        cat: "alpha",
        desc: "Minimale Durchsichtigkeit von normalen Spiel-Objekten"
      },
      objectHittedAlphaStep: {
        def: 0.2,
        min: 0.01,
        max: 0.4,
        step: 0.01,
        ui: "slider",
        cat: "alpha",
        desc: "Durchsichtigkeitserhöhung von getroffenen Spiel-Objekten"
      },
      objectNormalAlphaStep: {
        def: 0.01,
        min: 0.01,
        max: 0.1,
        step: 0.01,
        ui: "slider",
        cat: "alpha",
        desc: "Durchsichtigkeitsverringerung von normalen Spiel-Objekten"
      },
      objectNormalScaleMin: {
        def: 0.7,
        min: 0.1,
        max: 1.5,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Minimale Skalierung von normalen Spiel-Objekten"
      },
      objectNormalScaleCap: {
        def: 0.9,
        min: 0.5,
        max: 1,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Skalier-Grenze von normalen Spiel-Objekten"
      },
      objectNormalScaleBeforeCap: {
        def: 0.02,
        min: 0.01,
        max: 0.1,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Skalier-Abnahme von normalen Spiel-Objekten bevor Grenze"
      },
      objectNormalScaleAfterCap: {
        def: 0.003,
        min: 0.001,
        max: 0.02,
        step: 0.001,
        ui: "slider",
        cat: "scale",
        desc: "Skalier-Abnahme von normalen Spiel-Objekten nach Grenze"
      },
      objectTexture: {
        def: "aliens",
        opt: ["aliens", "balloons"],
        ui: "dropdown",
        cat: "general",
        desc: "Texturpacket der Spiel-Objekte"
      }
    };
  }
);