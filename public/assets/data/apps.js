var apps = [
    {
      'id': 'customapp',
      'title': 'Add custom app',
      'image': 'assets/images/add.png'
    },
    {
      "id": "google",
      "title": "Google",
      "url": "https://www.google.com/?safe=active&ssui=on",
      'image': 'https://img.freepik.com/free-icon/search_318-265146.jpg'
      
    },
    {
      "id": "discord",
      "title": "Discord",
      "url": "https://discord.com/app",
      'image': 'https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg'
    },
    
    {
      "id": "tiktok",
      "title": "TikTok",
      "url": "https://tiktok.com",
      'image': 'https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png'
    },

    {
      "id": "youtube",
      "title": "YouTube",
      "url": "https://youtube.com",
      'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/YouTube_social_red_square_%282017%29.svg/2048px-YouTube_social_red_square_%282017%29.svg.png'
    },

    {
      'id': 'spotify',
      'title': 'Spotify',
      'url': 'https://open.spotify.com/browse',
      'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png'
    },
    {
      'id': 'chess',
      'title': 'Chess.com',
      'url': 'https://chess.com',
      'image': 'https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/SamCopeland/phpmeXx6V.png'
    },

    {
      'id': 'coolmathgames',
      'title': 'Cool Math Games',
      'url': 'https://coolmathgames.com',
      'image': 'https://docs.google.com/drawings/d/e/2PACX-1vR6y2GvcGu9PdrX9zzE24dhm24hClcNsdAmZjIgSUC8sFOahf6t7Yg6l_W8Rd4GduWOH_X02GHVFdBb/pub?w=512&h=512'
    }


  ]
  
  var customapps = JSON.parse(localStorage.getItem("customapps"))
  if (customapps) customapps.forEach(app => {
    apps.push(app)
  })
  
  console.log("Loaded " + apps.length + " apps")
  if (customapps) console.log("Loaded " + customapps.length + " custom apps")
