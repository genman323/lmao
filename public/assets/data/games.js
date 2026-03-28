var games = [
  {
    id: 'customgame',
    title: 'Add custom game',
    image: 'assets/images/add.png'
  },
  {
    id: 'run3',
    title: 'Run 3',
    url: 'https://coolmathgames.com/0-run-3/play',
    image: 'https://play-lh.googleusercontent.com/A97ygyZMgnoapGfPhWZn9QBMsrskPuPQmJqeEtROZWnbQRfAOZZlhtP-UBWxaKtMI6U',
    description: 'Run 3 is a classic game where you swerve through space in a race to the finish. Play hundreds of new levels in this fast-paced platformer'
  },
  {
    id: 'twerk3d',
    title: 'Twerk 3D',
    url: 'https://visionary-blancmange-6c7907.netlify.app/',
    image: 'https://play-lh.googleusercontent.com/pwSOpb5SD-2z1k76ame_4A1ah0_jvvC6QUt1PwPgA9bam-0bcsEH84ZHNe3kEFG4MA=w240-h480-rw'
  },
  {
    id: 'buckshotroulette',
    title: 'Buckshot Roulette',
    url: 'https://sunny-centaur-429109.netlify.app/',
    image: 'https://sm.ign.com/ign_nordic/cover/b/buckshot-r/buckshot-roulette_7qmn.jpg'
  },
  {
    id: 'crazykitty3d',
    title: 'Crazy Kitty 3D',
    url: 'https://deft-buttercream-5adf0e.netlify.app/',
    image: 'https://img.itch.zone/aW1nLzIwODI1NDM3LnBuZw==/original/h0Thrh.png'
  },
  {
    id: 'crazycattle3d',
    title: 'Crazy Cattle 3D',
    url: 'https://shiny-peony-81dd64.netlify.app/',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi_kJmi7hJL6OMwhMTCR4wHzvtwUGvPkWrFg&s'
  },
  {
    id: 'snowbattleio',
    title: 'SnowBattle.io',
    url: 'https://illustrious-zuccutto-4b35bf.netlify.app/',
    image: 'https://play-lh.googleusercontent.com/X8FEOENa_t5mlRllBh2RRLc6sMnPIq56Wxa2ndValDOmwzIRhAv7MG6fT97TLQ2DK48'
  },

  {
    id: 'fivenightsatepsteins',
    title: "Five Nights At Epstein's",
    url: 'https://tranquil-sunflower-16a155.netlify.app/',
    image: 'https://i.ytimg.com/vi/MDxXt76ub0c/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB0j0BDTjAndca73CBXBgp0czdknQ'
  },
  {
    id: '1v1lolnew',
    title: '1v1.lol',
    url: 'https://roaring-sundae-99054f.netlify.app/',
    image: 'https://imgs.crazygames.com/games/1v1-lol/cover-1585728351086.png?metadata=none&quality=100&width=1200&height=630&fit=crop'
  }
]

games.sort(function (a, b) {
  return a.title.localeCompare(b.title);
});
var customGameId = "customgame";
var customGame = games.find(function (game) {
  return game.id === customGameId;
});
games.splice(games.indexOf(customGame), 1);
games.unshift(customGame);

var customgames = getObj("customgames")
if (customgames) customgames.forEach(game => {
  games.push(game)
})

console.log("Loaded " + games.length + " games")
if (customgames) console.log("Loaded " + customgames.length + " custom games")
