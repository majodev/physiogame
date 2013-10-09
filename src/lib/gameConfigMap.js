define([],
  function() {
    return {
      debugLayerVisible: {
        def: true,
        ui: "toggle",
        cat: "general",
        desc: "Sichtbarkeit des Debug-Layers"
      },
      introTimerLength: {
        def: 3000,
        min: 500,
        max: 10000,
        step: 100,
        ui: "slider",
        cat: "general",
        desc: "Aufbauzeit vor Spielstart",
        time: "milli"
      },
      objectTexture: {
        def: "balloons",
        opt: [{
          id: "aliens",
          desc: "Alienpacket"
        }, {
          id: "balloons",
          desc: "Luftballonpacket"
        }],
        ui: "dropdown",
        cat: "general",
        desc: "Texturpacket der Spiel-Objekte"
      },
      gameMode: {
        def: "clearInTime",
        opt: [{
          id: "clearAllObjects",
          desc: "nach Anzahl"
        }, {
          id: "clearInTime",
          desc: "nach Zeit"
        }],
        ui: "dropdown",
        cat: "general",
        desc: "Spielmodus"
      },
      gameMaxTime: {
        def: 15,
        min: 15,
        max: 1200,
        step: 15,
        ui: "slider",
        cat: "general",
        desc: "Spielzeit",
        enabled: {
          id: "gameMode",
          value: "clearInTime"
        },
        time: "sec"
      },
      gameReattachObjectAfterMs: {
        def: 2500,
        min: 100,
        max: 20000,
        step: 100,
        ui: "slider",
        cat: "general",
        desc: "Spiel-Objekt spätestens hinzufügen",
        enabled: {
          id: "gameMode",
          value: "clearInTime"
        },
        time: "milli"
      },
      objectsToSpawn: {
        def: 15,
        min: 2,
        max: 200,
        step: 1,
        ui: "slider",
        cat: "general",
        desc: "Anzahl der Spiel-Objekte",
      },
      cloudsToGenerate: {
        def: 5,
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
        desc: "Getroffen: Skalier-Grenze",
        check: {
          max: "objectHittedScaleExplodes"
        }
      },
      objectHittedScaleBeforeCap: {
        def: 0.04,
        min: 0.01,
        max: 0.3,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Getroffen: Skalier-Zunahme vor Grenze"
      },
      objectHittedScaleAfterCap: {
        def: 0.01,
        min: 0.01,
        max: 0.3,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Getroffen: Skalier-Zunahme nach Grenze"
      },
      objectHittedSpeedMin: {
        def: 0,
        min: 0,
        max: 3,
        step: 0.1,
        ui: "slider",
        cat: "speed",
        desc: "Getroffen: Minimale Geschwindigkeit",
        check: {
          max: "objectHittedSpeedMax"
        }
      },
      objectHittedSpeedMax: {
        def: 5,
        min: 0,
        max: 20,
        step: 0.1,
        ui: "slider",
        cat: "speed",
        desc: "Getroffen: Maximale Geschwindigkeit",
        check: {
          min: "objectHittedSpeedMin"
        }
      },
      objectHittedSpeedStep: {
        def: -0.16,
        min: -2,
        max: 2,
        step: 0.01,
        ui: "slider",
        cat: "speed",
        desc: "Getroffen: Geschwindigkeitsschritt"
      },
      objectNormalSpeedMin: {
        def: 0.6,
        min: 0,
        max: 5,
        step: 0.1,
        ui: "slider",
        cat: "speed",
        desc: "Normal: Minimale Geschwindigkeit",
        check: {
          max: "objectNormalSpeedMax"
        }
      },
      objectNormalSpeedMax: {
        def: 1.4,
        min: 0,
        max: 5,
        step: 0.1,
        ui: "slider",
        cat: "speed",
        desc: "Normal: Maximale Geschwindigkeit",
        check: {
          min: "objectNormalSpeedMin"
        }
      },
      objectNormalSpeedStep: {
        def: 0.19,
        min: -2,
        max: 2,
        step: 0.01,
        ui: "slider",
        cat: "speed",
        desc: "Normal: Geschwindigkeitsschritt"
      },
      objectNormalAlphaMin: {
        def: 0.6,
        min: 0.1,
        max: 1,
        step: 0.01,
        ui: "slider",
        cat: "alpha",
        desc: "Normal: Minimale Durchsichtigkeit"
      },
      objectHittedAlphaStep: {
        def: 0.05,
        min: 0.01,
        max: 0.1,
        step: 0.01,
        ui: "slider",
        cat: "alpha",
        desc: "Getroffen: Durchsichtigkeitserhöhung"
      },
      objectNormalAlphaStep: {
        def: 0.05,
        min: 0.01,
        max: 0.1,
        step: 0.01,
        ui: "slider",
        cat: "alpha",
        desc: "Normal: Durchsichtigkeitsverringerung"
      },
      objectNormalScaleMin: {
        def: 0.7,
        min: 0.1,
        max: 1.5,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Normal: Minimale Skalierung",
        check: {
          max: "objectNormalScaleCap"
        }
      },
      objectNormalScaleCap: {
        def: 0.9,
        min: 0.5,
        max: 1,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Normal: Skalier-Grenze",
        check: {
          max: "objectHittedScaleExplodes"
        }
      },
      objectNormalScaleBeforeCap: {
        def: 0.02,
        min: 0.01,
        max: 0.1,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Normal: Skalier-Abnahme vor Grenze"
      },
      objectNormalScaleAfterCap: {
        def: 0.003,
        min: 0.001,
        max: 0.02,
        step: 0.001,
        ui: "slider",
        cat: "scale",
        desc: "Normal: Skalier-Abnahme nach Grenze"
      },
      leapShowIndicatorLayer: {
        def: true,
        ui: "toggle",
        cat: "leap",
        desc: "Zeige visuelle Leap Hinweise während des Spieles"
      },
      leapXModifier: {
        def: 3.8,
        min: 2,
        max: 18,
        step: 0.2,
        ui: "slider",
        cat: "leap",
        desc: "X: Größe der abgetasteten horizontalen Achse"
      },
      leapYModifier: {
        def: 3.8,
        min: 1.5,
        max: 10,
        step: 0.02,
        ui: "slider",
        cat: "leap",
        desc: "Y: Größe der abgetasteten vertikalen Achse"
      },
      leapToDisplayX: {
        def: 2,
        min: 1,
        max: 4,
        step: 0.02,
        ui: "slider",
        cat: "leap",
        desc: "X: Abtastmittelpunkt der horizontalen Achse "
      },
      leapToDisplayY: {
        def: 2,
        min: 1.5,
        max: 4,
        step: 0.02,
        ui: "slider",
        cat: "leap",
        desc: "Y: Abtastmittelpunkt der vertikalen Achse"
      },
      objectHittedScaleExplodes: {
        def: 1.8,
        min: 0.1,
        max: 3,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Getroffen: Skalier-Maximum vor Explosion"
      }
    };
  }
);