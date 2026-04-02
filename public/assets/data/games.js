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
    id: 'hidenseek',
    title: 'Hide N Seek',
    url: 'https://effortless-mermaid-f8d427.netlify.app/',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSRcWv9wuD9wT0UN0y5Z_duvXt-ySXG7p7A&s'
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
  },
  {
    id: 'cuttherope',
    title: 'Cut the Rope',
    url: 'https://funny-sfogliatella-c899b9.netlify.app/',
    image: 'https://imgs.crazygames.com/cut-the-rope-ebx_16x9/20240530085010/cut-the-rope-ebx_16x9-cover?metadata=none&quality=100&width=1200&height=630&fit=crop'
  },
  {
    id: 'dogeminer',
    title: 'Doge Miner',
    url: 'https://zippy-peony-a51d81.netlify.app/',
    image: 'https://imgs.crazygames.com/games/doge-miner/cover-1593443166599.png?format=auto&quality=100&metadata=none&width=1200'
  },
  {
    id: 'gorillatag',
    title: 'Gorilla Tag',
    url: 'https://comforting-stroopwafel-9fdc85.netlify.app/',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1533390/capsule_616x353.jpg?t=1715638911'
  },
  {
    id: 'terraria',
    title: 'Terraria',
    url: 'https://playful-tiramisu-94422c.netlify.app/',
    image: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000001702/dac3a26570b5ca1ddf703bf0add7cc7c527f71a2b56521baf69e20c7a573c610'
  },
  {
    id: 'ultrakill',
    title: 'Ultrakill',
    url: 'https://splendorous-kringle-c54d6f.netlify.app/',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Ultrakill_cover.png/250px-Ultrakill_cover.png'
  },
  {
    id: 'amaze',
    title: 'Amaze',
    url: 'https://incredible-muffin-4bea4e.netlify.app/',
    image: 'https://www.crazylabs.com/wp-content/uploads/2022/03/amaze-icon-512.png'
  },
  {
    id: 'aquaparkio',
    title: 'Aquapark.io',
    url: 'https://splendid-banoffee-fdea94.netlify.app/',
    image: 'https://play-lh.googleusercontent.com/u1Z-wRullWJBvInhY4gdFxg_Q8Pz6clUQd7thoQNQNHQ1ghNeUf-lsJandlp1vFKhBk'
  },
  {
    id: 'basketbattle',
    title: 'Basket Battle',
    url: 'https://eloquent-sprinkles-9bd9d8.netlify.app/',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZHJw0B4-fHkvaX8DwyZF30E_4Nw8khf8qtw&s'
  },
  {
    id: 'blockblast',
    title: 'Block Blast',
    url: 'https://peppy-sprinkles-134f15.netlify.app/',
    image: 'https://play-lh.googleusercontent.com/R0qgNDYYHbRhw6JFsdEbDMqONplEvJx0m0W9wzYVvY3eNF1c2rfBWYjQxW0sLEzFe1E=w240-h480-rw'
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
