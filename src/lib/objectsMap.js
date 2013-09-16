define([],
  function() {
    return {
      objectsToSpawn: {
        def: 100,
        min: 1,
        max: 200,
        step: 1,
        desc: "Anzahl der Spiel-Objekte"
      },
      cloudsToGenerate: {
        def: 50,
        min: 0,
        max: 200,
        step: 1,
        desc: "Anzahl der Wolken-Objekte"
      },
      objectHittedScaleCap: {
        def: 1,
        min: 0.1,
        max: 2,
        step: 0.1,
        desc: "Skalier-Grenze von getroffenen Spiel-Objekten"
      },
      objectHittedScaleBeforeCap: {
        def: 0.12,
        min: 0.01,
        max: 0.3,
        step: 0.01,
        desc: "Skalier-Zunahme von getroffenen Spiel-Objekten bevor Grenze"
      },
      objectHittedScaleAfterCap: {
        def: 0.08,
        min: 0.01,
        max: 0.3,
        step: 0.01,
        desc: "Skalier-Zunahme von getroffenen Spiel-Objekten nach Grenze"
      },
      objectHittedSpeedMax: {
        def: 5,
        min: 0.1,
        max: 10,
        step: 0.1,
        desc: "Maximale Geschwindigkeit von getroffenen Spiel-Objekten"
      },
      objectHittedSpeedStep: {
        def: 1,
        min: 0.1,
        max: 2,
        step: 0.1,
        desc: "Geschwindigkeitserhöhung von getroffenen Spiel-Objekten"
      },
      objectHittedAlphaStep: {
        def: 0.2,
        min: 0.01,
        max: 0.4,
        step: 0.01,
        desc: "Durchsichtigkeitserhöhung von getroffenen Spiel-Objekten"
      },
      objectNormalScaleMin: {
        def: 0.25,
        min: 0.1,
        max: 0.4,
        step: 0.01,
        desc: "Minimale Skalierung von normalen Spiel-Objekten"
      },
      objectNormalScaleCap: {
        def: 0.9,
        min: 0.5,
        max: 1,
        step: 0.05,
        desc: "Skalier-Grenze von normalen Spiel-Objekten"
      },
      objectNormalScaleBeforeCap: {
        def: 0.02,
        min: 0.01,
        max: 0.1,
        step: 0.01,
        desc: "Skalier-Abnahme von normalen Spiel-Objekten bevor Grenze"
      },
      objectNormalScaleAfterCap: {
        def: 0.003,
        min: 0.001,
        max: 0.02,
        step: 0.001,
        desc: "Skalier-Abnahme von normalen Spiel-Objekten nach Grenze"
      }
    };
  }
);