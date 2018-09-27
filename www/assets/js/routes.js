var routes = [
  {
    path: '/',
    url: './index.html',
    name: 'home',
  },
  {
    path: '/login-screen/',
    loginScreen: {
      componentUrl: './pages/login-screen.html',
    },
  },
  {
    path: '/profile/',
    componentUrl: './pages/profile.html',
    name: 'profile',
  },
  {
    path: '/kegiatan/',
    componentUrl: './pages/kegiatan.html',
    name: 'kegiatan',
  },
    {
    path: '/more/',
    componentUrl: './pages/more.html',
    name: 'more',
  },

  {
    path: '/pos/',
    componentUrl: './pages/pos.html',
    name: 'pos',
  },
  {
    path: '/laporan/',
    componentUrl: './pages/laporan.html',
    name: 'laporan',
  },
  {
    path: '/berita/',
    componentUrl: './pages/berita.html',
    name: 'berita',
  },
  {
    path: '/absen/',
    componentUrl: './pages/absen.html',
    name: 'absen',
  },
  {
    path: '/popup-daftar-struk/:sale/',
    popup: {
      componentUrl: './pages/popup-daftar-struk.html',
    },
  },
  
  {
    path: '/popover-pelanggan-baru/',
    popup: {
      componentUrl: './pages/popover-pelanggan-baru.html',
    },
  },
  
  {
    path: '/popup-detail-berita/:idBerita/',
    popup: {
      componentUrl: './pages/popup-detail-berita.html',
    },
  },
  
  {
    path: '/input-absen/',
    componentUrl: './pages/input-absen.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
