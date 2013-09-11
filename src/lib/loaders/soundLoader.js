define(["log", "Howler", "config", "utils/publisher"],
  function(log, Howler, config, publisher) {

    var sounds = {},
      events = publisher.make(),
      soundsLoadedCount = 0,
      soundsToLoadLength = config.get("sounds").length;

    function init() {

      var i = 0,
        soundFiles = config.get("sounds"),
        len = soundFiles.length,
        soundBaseDir = config.get("soundBaseDir"),
        soundExtensions = config.get("soundExtensions"),
        soundUrls = [];


      for (i; i < len; i += 1) {
        sounds[soundFiles[i].name] = new Howler.Howl({
          urls: generateUrls(soundBaseDir, soundFiles[i].name, soundExtensions),
          autoplay: false,
          loop: (soundFiles[i].loop !== undefined) ? soundFiles[i].loop : false,
          volume: soundFiles[i].volume,
          onload: onSoundLoaded(soundFiles[i])
        });
      }

    }

    function generateUrls(basedir, sound, extensions) {
      var i = 0,
        len = extensions.length,
        soundArray = [];
      for (i; i < len; i += 1) {
        soundArray.push(basedir + sound + extensions[i]);
      }

      return soundArray;
    }

    function onSoundLoaded(sound) {
      log.debug("sound loaded: " + sound.name + " volume: " + sound.volume);
      soundsLoadedCount += 1;

      if(soundsToLoadLength === soundsLoadedCount) {
        // all sounds loaded!
        //log.debug("all sounds loaded!");
        events.trigger("allSoundsLoaded");
      }
    }

    function getSound(key) {
      return sounds[key];
    }

    return {
      init: init,
      getSound: getSound,
      events: events
    };

  }
);