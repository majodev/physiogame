define([],
  function() {
    return {
      audioEnabled: {
        def: true,
        ui: "toggle",
        cat: "audio",
        desc: "Audio-Effekte abspielen"
      },
      audioBackgroundEnabled: {
        def: false,
        ui: "toggle",
        cat: "audio",
        desc: "Audio-Hintergrund abspielen"
      },
      userName: {
        def: "Anonym",
        ui: "text",
        cat: "general",
        desc: "Benutzername"
      },
      debugLayerVisible: {
        def: false,
        ui: "toggle",
        cat: "visual",
        desc: "Zeige Frames pro Sekunde"
      },
      introTimerLength: {
        def: 3000,
        min: 1000,
        max: 10000,
        step: 500,
        ui: "slider",
        cat: "visual",
        desc: "Aufbauzeit vor Spielstart",
        format: {
          time: "milli"
        }
      },
      objectTexture: {
        def: "balloons",
        opt: [{
          id: "aliens",
          desc: "Alienpaket"
        }, {
          id: "balloons",
          desc: "Luftballonpaket"
        }],
        ui: "dropdown",
        cat: "visual",
        desc: "Texturpaket der Spiel-Objekte"
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
        desc: "Hauptspielmodus"
      },
      gameMaxTime: {
        def: 15,
        min: 15,
        max: 1200,
        step: 15,
        ui: "slider",
        cat: "general",
        desc: "Spielzeit eines Durchlaufes",
        enabled: {
          id: "gameMode",
          value: "clearInTime"
        },
        format: {
          time: "sec"
        }
      },
      gameReattachObjectAfterMs: {
        def: 2500,
        min: 100,
        max: 20000,
        step: 100,
        ui: "slider",
        cat: "general",
        desc: "Spiel-Objekte wieder hinzuzufügen nach",
        enabled: {
          id: "gameMode",
          value: "clearInTime"
        },
        format: {
          time: "milli"
        }
      },
      gameReattachObjectMax: {
        def: 1,
        min: 1,
        max: 75,
        step: 1,
        ui: "slider",
        cat: "general",
        desc: "Anzahl Objekte gleichzeitig hinzuzufügen",
        enabled: {
          id: "gameMode",
          value: "clearInTime"
        },
        format: {
          post: "Objekte"
        }
      },
      objectsToSpawn: {
        def: 15,
        min: 1,
        max: 150,
        step: 1,
        ui: "slider",
        cat: "general",
        desc: "Anzahl der Spiel-Objekte",
        format: {
          post: "Objekte"
        }
      },
      cloudsToGenerate: {
        def: 5,
        min: 0,
        max: 100,
        step: 1,
        ui: "slider",
        cat: "visual",
        desc: "Anzahl der Wolken-Objekte",
        format: {
          post: "Objekte"
        }
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
        },
        format: {
          percent: true,
          post: "%"
        }
      },
      objectHittedScaleBeforeCap: {
        def: 0.04,
        min: 0.01,
        max: 0.3,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Getroffen: Skalier-Zunahme vor Grenze",
        format: {
          percent: true,
          post: "%/Frame"
        }
      },
      objectHittedScaleAfterCap: {
        def: 0.01,
        min: 0.01,
        max: 0.3,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Getroffen: Skalier-Zunahme nach Grenze",
        format: {
          percent: true,
          post: "%/Frame"
        }
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
        },
        format: {
          post: "Pixel/Frame"
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
        },
        format: {
          post: "Pixel/Frame"
        }
      },
      objectHittedSpeedStep: {
        def: -0.16,
        min: -2,
        max: 2,
        step: 0.01,
        ui: "slider",
        cat: "speed",
        desc: "Getroffen: Geschwindigkeitsschritt",
        format: {
          post: "Pixel/Frame"
        }
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
        },
        format: {
          post: "Pixel/Frame"
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
        },
        format: {
          post: "Pixel/Frame"
        }
      },
      objectNormalSpeedStep: {
        def: 0.19,
        min: -2,
        max: 2,
        step: 0.01,
        ui: "slider",
        cat: "speed",
        desc: "Normal: Geschwindigkeitsschritt",
        format: {
          post: "Pixel/Frame"
        }
      },
      objectNormalAlphaMin: {
        def: 0.6,
        min: 0.1,
        max: 1,
        step: 0.01,
        ui: "slider",
        cat: "alpha",
        desc: "Normal: Minimale Durchsichtigkeit",
        format: {
          percent: true,
          post: "%"
        }
      },
      objectHittedAlphaStep: {
        def: 0.05,
        min: 0.01,
        max: 0.1,
        step: 0.01,
        ui: "slider",
        cat: "alpha",
        desc: "Getroffen: Durchsichtigkeitserhöhung",
        format: {
          percent: true,
          post: "%/Frame"
        }
      },
      objectNormalAlphaStep: {
        def: 0.05,
        min: 0.01,
        max: 0.1,
        step: 0.01,
        ui: "slider",
        cat: "alpha",
        desc: "Normal: Durchsichtigkeitsverringerung",
        format: {
          percent: true,
          post: "%/Frame"
        }
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
        },
        format: {
          percent: true,
          post: "%"
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
        },
        format: {
          percent: true,
          post: "%"
        }
      },
      objectNormalScaleBeforeCap: {
        def: 0.02,
        min: 0.01,
        max: 0.1,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Normal: Skalier-Abnahme vor Grenze",
        format: {
          percent: true,
          post: "%/Frame"
        }
      },
      objectNormalScaleAfterCap: {
        def: 0.003,
        min: 0.001,
        max: 0.02,
        step: 0.001,
        ui: "slider",
        cat: "scale",
        desc: "Normal: Skalier-Abnahme nach Grenze",
        format: {
          percent: true,
          post: "%/Frame"
        }
      },
      leapShowIndicatorLayer: {
        def: true,
        ui: "toggle",
        cat: "visual",
        desc: "Zeige Leap Motion Hinweise"
      },
      leapXModifier: {
        def: 5,
        min: 2,
        max: 16,
        step: 0.1,
        ui: "slider",
        cat: "leap",
        desc: "Fläche: Verkleinerung horizontale Achse (x)",
        format: {
          post: "fach"
        }
      },
      leapYModifier: {
        def: 4,
        min: 1.5,
        max: 16,
        step: 0.1,
        ui: "slider",
        cat: "leap",
        desc: "Fläche: Verkleinerung vertikale Achse (y)",
        format: {
          post: "fach"
        }
      },
      leapToDisplayX: {
        def: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
        ui: "slider",
        cat: "leap",
        desc: "Mittelpunkt: horizontale Achse (x)",
        format: {
          pre: "Produkt von"
        }
      },
      leapToDisplayY: {
        def: 0.25,
        min: 0,
        max: 1,
        step: 0.01,
        ui: "slider",
        cat: "leap",
        desc: "Mittelpunkt: vertikale Achse (y)",
        format: {
          pre: "Produkt von"
        }
      },
      leapButtonHitAfterMs: {
        def: 2000,
        min: 1000,
        max: 5000,
        step: 100,
        ui: "slider",
        cat: "leap",
        desc: "Zeit bevor Schaltflächen ausgelößt werden",
        format: {
          time: "milli"
        }
      },
      objectHittedScaleExplodes: {
        def: 1.8,
        min: 0.1,
        max: 3,
        step: 0.01,
        ui: "slider",
        cat: "scale",
        desc: "Getroffen: Skalier-Maximum vor Explosion",
        format: {
          percent: true,
          post: "%"
        }
      }
    };
  }
);