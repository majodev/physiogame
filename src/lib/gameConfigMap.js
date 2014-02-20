define(["i18n"],
  function(i18n) {
    return {
      audioEnabled: {
        def: true,
        ui: "toggle",
        cat: "audio",
        desc: i18n.t("audioEnabled")
      },
      audioBackgroundEnabled: {
        def: true,
        ui: "toggle",
        cat: "audio",
        desc: i18n.t("audioBackgroundEnabled")
      },
      userName: {
        def: i18n.t("userNameDefault"),
        ui: "text",
        cat: "general",
        desc: i18n.t("userName")
      },
      gameObjectCondition: {
        def: "clickOrDepth",
        opt: [{
          id: "objectScale",
          desc: i18n.t("gameObjectConditionMaxScale")
        }, {
          id: "clickOrDepth",
          desc: i18n.t("gameObjectConditionClickDepth")
        }],
        ui: "dropdown",
        cat: "general",
        desc: i18n.t("gameObjectCondition")
      },
      probabilitySpecialObject: {
        def: 0.20,
        min: 0,
        max: 1,
        step: 0.01,
        ui: "slider",
        cat: "general",
        desc: i18n.t("probabilitySpecialObject"),
        format: {
          percent: true,
          post: "%"
        },
        enabled: {
          id: "gameObjectCondition",
          value: "clickOrDepth"
        }
      },
      specialObjectCountMin: {
        def: 0,
        min: 0,
        max: 5,
        step: 1,
        ui: "slider",
        cat: "general",
        desc: i18n.t("specialObjectCountMin"),
        enabled: {
          id: "gameObjectCondition",
          value: "clickOrDepth"
        },
        format: {
          post: i18n.t("fingers")
        },
        check: {
          maxEquals: "specialObjectCountMax"
        }
      },
      specialObjectCountMax: {
        def: 5,
        min: 0,
        max: 5,
        step: 1,
        ui: "slider",
        cat: "general",
        desc: i18n.t("specialObjectCountMax"),
        enabled: {
          id: "gameObjectCondition",
          value: "clickOrDepth"
        },
        format: {
          post: i18n.t("fingers")
        },
        check: {
          minEquals: "specialObjectCountMin"
        }
      },
      debugLayerVisible: {
        def: false,
        ui: "toggle",
        cat: "visual",
        desc: i18n.t("debugLayerVisible")
      },
      introTimerLength: {
        def: 3000,
        min: 1000,
        max: 10000,
        step: 500,
        ui: "slider",
        cat: "visual",
        desc: i18n.t("introTimerLength"),
        format: {
          time: "milli"
        }
      },
      objectTexture: {
        def: "balloons",
        opt: [{
          id: "aliens",
          desc: i18n.t("objectTextureAliens")
        }, {
          id: "balloons",
          desc: i18n.t("objectTextureBalloons")
        }],
        ui: "dropdown",
        cat: "visual",
        desc: i18n.t("objectTexture")
      },
      explosionTexture: {
        def: "popExplosions",
        opt: [{
          id: "explosions",
          desc: i18n.t("explosionTextureReal")
        }, {
          id: "popExplosions",
          desc: i18n.t("explosionTextureCartoon")
        }],
        ui: "dropdown",
        cat: "visual",
        desc: i18n.t("explosionTexture")
      },
      explosionTextureRotate: {
        def: true,
        ui: "toggle",
        cat: "visual",
        desc: i18n.t("explosionTextureRotate"),
        enabled: {
          id: "explosionTexture",
          value: "explosions"
        },
      },
      crosshairTexture: {
        def: "crosshair",
        opt: [{
          id: "crosshair",
          desc: i18n.t("crosshairTextureCross")
        }, {
          id: "crosshairLeapStyle",
          desc: i18n.t("crosshairTextureHand")
        }],
        ui: "dropdown",
        cat: "visual",
        desc: i18n.t("crosshairTexture")
      },
      crosshairTextureRotate: {
        def: true,
        ui: "toggle",
        cat: "visual",
        desc: i18n.t("crosshairTextureRotate"),
        enabled: {
          id: "crosshairTexture",
          value: "crosshair"
        },
      },
      gameMode: {
        def: "clearInTime",
        opt: [{
          id: "clearAllObjects",
          desc: i18n.t("gameModeCount")
        }, {
          id: "clearInTime",
          desc: i18n.t("gameModeTime")
        }],
        ui: "dropdown",
        cat: "general",
        desc: i18n.t("gameMode")
      },
      gameMaxTime: {
        def: 15,
        min: 15,
        max: 1200,
        step: 15,
        ui: "slider",
        cat: "general",
        desc: i18n.t("gameMaxTime"),
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
        desc: i18n.t("gameReattachObjectAfterMs"),
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
        desc: i18n.t("gameReattachObjectMax"),
        enabled: {
          id: "gameMode",
          value: "clearInTime"
        },
        format: {
          post: i18n.t("objects")
        }
      },
      objectsToSpawn: {
        def: 15,
        min: 1,
        max: 150,
        step: 1,
        ui: "slider",
        cat: "general",
        desc: i18n.t("objectsToSpawn"),
        format: {
          post: i18n.t("objects")
        }
      },
      cloudsToGenerate: {
        def: 30,
        min: 0,
        max: 100,
        step: 1,
        ui: "slider",
        cat: "visual",
        desc: i18n.t("cloudsToGenerate"),
        format: {
          post: i18n.t("objects")
        }
      },
      fullScreenMode: {
        def: false,
        ui: "toggle",
        cat: "visual",
        desc: i18n.t("fullScreenMode"),
        enabled: {
          id: "kioskMode",
          value: false
        },
        nwRequired: true
      },
      kioskMode: {
        def: false,
        ui: "toggle",
        cat: "visual",
        desc: i18n.t("kioskMode"),
        enabled: {
          id: "fullScreenMode",
          value: false
        }
      },
      hideMouseCursor: {
        def: true,
        ui: "toggle",
        cat: "visual",
        desc: i18n.t("hideMouseCursor")
      },
      accuracyTextsEnabled: {
        def: true,
        ui: "toggle",
        cat: "visual",
        desc: i18n.t("accuracyTextsEnabled")
      },
      objectHittedScaleCap: {
        def: 1,
        min: 0.1,
        max: 2,
        step: 0.1,
        ui: "slider",
        cat: "scale",
        desc: i18n.t("objectHittedScaleCap"),
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
        desc: i18n.t("objectHittedScaleBeforeCap"),
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
        desc: i18n.t("objectHittedScaleAfterCap"),
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
        desc: i18n.t("objectHittedSpeedMin"),
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
        desc: i18n.t("objectHittedSpeedMax"),
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
        desc: i18n.t("objectHittedSpeedStep"),
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
        desc: i18n.t("objectNormalSpeedMin"),
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
        desc: i18n.t("objectNormalSpeedMax"),
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
        desc: i18n.t("objectNormalSpeedStep"),
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
        desc: i18n.t("objectNormalAlphaMin"),
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
        desc: i18n.t("objectHittedAlphaStep"),
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
        desc: i18n.t("objectNormalAlphaStep"),
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
        desc: i18n.t("objectNormalScaleMin"),
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
        desc: i18n.t("objectNormalScaleCap"),
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
        desc: i18n.t("objectNormalScaleBeforeCap"),
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
        desc: i18n.t("objectNormalScaleAfterCap"),
        format: {
          percent: true,
          post: "%/Frame"
        }
      },
      leapShowIndicatorLayer: {
        def: true,
        ui: "toggle",
        cat: "visual",
        desc: i18n.t("leapShowIndicatorLayer")
      },
      leapXModifier: {
        def: 5,
        min: 2,
        max: 16,
        step: 0.1,
        ui: "slider",
        cat: "leap",
        desc: i18n.t("leapXModifier"),
        format: {
          post: i18n.t("perTimes")
        }
      },
      leapYModifier: {
        def: 4,
        min: 1.5,
        max: 16,
        step: 0.1,
        ui: "slider",
        cat: "leap",
        desc: i18n.t("leapYModifier"),
        format: {
          post: i18n.t("perTimes")
        }
      },
      leapZModifier: {
        def: 8,
        min: 2,
        max: 10,
        step: 0.1,
        ui: "slider",
        cat: "leap",
        desc: i18n.t("leapZModifier"),
        format: {
          post: i18n.t("perTimes")
        }
      },
      leapToDisplayX: {
        def: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
        ui: "slider",
        cat: "leap",
        desc: i18n.t("leapToDisplayX"),
        format: {
          pre: i18n.t("productOf")
        }
      },
      leapToDisplayY: {
        def: 0.25,
        min: 0,
        max: 1,
        step: 0.01,
        ui: "slider",
        cat: "leap",
        desc: i18n.t("leapToDisplayY"),
        format: {
          pre: i18n.t("productOf")
        }
      },
      leapButtonHitAfterMs: {
        def: 2000,
        min: 1000,
        max: 5000,
        step: 100,
        ui: "slider",
        cat: "leap",
        desc: i18n.t("leapButtonHitAfterMs"),
        format: {
          time: "milli"
        }
      },
      leapSpecialsHitAfterMs: {
        def: 200,
        min: 100,
        max: 5000,
        step: 100,
        ui: "slider",
        cat: "leap",
        desc: i18n.t("leapSpecialsHitAfterMs"),
        format: {
          time: "milli"
        }
      },
      leapLocksMouseAndTouchForMs: {
        def: 1000,
        min: 500,
        max: 5000,
        step: 250,
        ui: "slider",
        cat: "leap",
        desc: i18n.t("leapLocksMouseAndTouchForMs"),
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
        desc: i18n.t("objectHittedScaleExplodes"),
        format: {
          percent: true,
          post: "%"
        }
      }
    };
  }
);