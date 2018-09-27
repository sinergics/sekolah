var $$ = Dom7;
var theme = 'auto';

if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

var monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
var monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
var dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
var dayNamesShort = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

function addTanggal(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function setTanggal(date) {
  var date = new Date(date);
  var month = date.getMonth() + +1;
  var str_tanggal = date.getFullYear() + '-' + month + '-' + date.getDate();
  return str_tanggal;
}

function getTanggal(date) {
  var tanggal = new Date(date);
  var month = monthNames[tanggal.getMonth()];
  var hari = dayNames[tanggal.getDay()];
  var str_tanggal = hari + ', ' + tanggal.getDate() + ' ' + month + ' ' + tanggal.getFullYear();
  return str_tanggal;
}

function getAngka(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
}

function addNol(num) {
  if (num.toString().length < 2)
    return "0" + num;
  return num.toString();
}

var app = new Framework7({
  id: 'net.fajarhidayah.sekolah',
  root: '#app',
  theme: theme,
  dialog: {
    title: 'FAJARHIDAYAH'
  },
  calendar: {
    monthNames: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    dateFormat: 'DD, dd MM, yyyy',
    url: 'calendar/',
  },
  routes: routes,
});

var ip_address = localStorage.getItem("ip_address");
var path_server = 'http://fajarhidayah.net/sister/';
var path_api = 'http://fajarhidayah.net/sister/mobile.api/';

var view = app.views.create('.view-main', {
  name: "mainView",
  pushState: true,
  xhrCache: false,
});


router = view.router;

var mySwiper = new Swiper('.swiper-container', {
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
  speed: 400,
  lazy: true,
  spaceBetween: 10,
  slidesPerView: 'auto',
  centeredSlides: true,
});

app.request.get(path_api + 'home.php', { mode: 'slider' }, function (data) {
  obj = JSON.parse(data);
  $.each(obj.data, function (index, row_slider) {
    mySwiper.appendSlide(
      '<div class="swiper-slide">' +
      '<img src="' + path_server + 'files/berita/foto/' + row_slider.fotoBerita + '" >' +
      '<div class="desc-slide">' +
      '<span class="title">' + row_slider.judulBerita + '</span>' +
      '</div>' +
      '</div>'
    );
  });
});

$$(document).on('click', '#logout-button', function () {
  Logout();
});

$$(document).on('click', '.open-popover-setting-ip-address', function () {
  app.popover.close('.popover-settings');
  app.popover.open('.popover-setting-ip-address');
});

$$(document).on('popover:open', '.popover-setting-ip-address', function (e, popover) {
  var set_ip_address = $('#set_ip_address');
  set_ip_address.val(localStorage.getItem("ip_address"));
});

/** FUNCTION **/

function getUser(username) {
  app.request.get(path_api + 'helper.php', { mode: 'get_user', username: username }, function (data) {
    obj_user = JSON.parse(data);
    $.each(obj_user, function (index, row_user) {
      var image = path_server + 'images/user/' + row_user.fotoUser;
      $$("#image-login").attr("src", image);
      $$("#nama-login").html(row_user.namaUser);
    });
  }, function () {
    notConnected();
  });
}

function viewMenu(kode_kategori) {
  id_penjualan = localStorage.getItem("id_penjualan");
  app.dialog.preloader();
  app.request.get(path_api + 'pos.php', { mode: 'menu', filter_kode_kategori: kode_kategori }, function (data) {
    app.dialog.close();
    obj_menu = JSON.parse(data);
    $.each(obj_menu.data, function (index, row_menu) {
      $$("#row").append(
        '<div class="col-50" style="font-size:9pt;"> <div style="border:1px solid #ddd;">' +
        '<a href="#" title="" id="pilih_' + row_menu.id_menu + '"><div class="col-100" style="padding:30px; margin:0;">' + 
        '<center><img src="' + path_server + 'files/menu/icon/' + row_menu.icon_menu + '" style="width:60%; margin-bottom:10px;"></center>' + '</div><div class="col-100" style="padding-top:10px; text-align:center;"><br clear="all">' +
        row_menu.nama_menu + '<br clear="all"><b>Rp. ' + row_menu.harga_jual +
        '</b></div>' +
        '</a>' +
        '</div></div>'
      );
      
      $$("#pilih_" + row_menu.id_menu).on("click", function () {
        if (id_penjualan !== null) {
          app.request.get(path_api + 'pos.php', { mode: 'input_struk', id_penjualan: id_penjualan, id_menu: row_menu.id_menu }, function (data_struk) {
            router.navigate("/popup-daftar-struk/" + id_penjualan + "/");
            
            $tanggal = $$("#calendar-view-transaksi").val();
            viewSale($tanggal);
          }, function () {
            notConnected();
          });
        } else {
          app.dialog.alert("Harap pilih/isi pelanggan terlebih dahulu.");
        }
      });
    });
  }, function () {
    notConnected();
  });
}

function viewSale(filter) {
  app.dialog.preloader();
  $$("#body-transaksi").empty();
  app.request.get(path_api + 'pos.php', { mode: 'lihat_penjualan', tanggal: filter }, function (data) {
    app.dialog.close();
    obj_view = JSON.parse(data);
    $.each(obj_view.data['detail'], function (index, row_penjualan) {
      $("#body-transaksi").append(
        '<tr>' +
        '<td align="right">' + addNol(row_penjualan.no) + '.</td>' +
        '<td align="center"><a href="#" id="view_' + row_penjualan.id_penjualan + '">' + row_penjualan.nomor_struk + '</a></td>' +
        '<td align="right">' + getAngka(row_penjualan.total) + '</td>' +
        '</tr>'
      );
      
      $$("#view_" + row_penjualan.id_penjualan).on("click", function () {
        router.navigate("/popup-daftar-struk/"+row_penjualan.id_penjualan+"/");
      });
    });
  }, function () {
    notConnected();
  });
}

function viewReport(tanggal) {
  app.dialog.preloader();
  $$("#body-laporan").empty();
  app.request.get(path_api + 'laporan.php', { mode: 'lihat_laporan', tanggal: tanggal }, function (data) {
    app.dialog.close();
    obj_view = JSON.parse(data);
    $.each(obj_view.data['detail'], function (index, row_laporan) {
      $("#body-laporan").append(
        '<tr>' +
        '<td class="numeric-cell">' + row_laporan.no + '</td>' +
        '<td class="label-cell"><a href="#" id="view_' + row_laporan.id_penjualan + '">' + row_laporan.nomor_struk + '</a></td>' +
        '<td class="numeric-cell">' + getAngka(row_laporan.total) + '</td>' +
        '</tr>'
      );
      
      $$("#view_" + row_laporan.id_penjualan).on("click", function () {
        router.navigate("/popup-daftar-struk/" + row_laporan.id_penjualan + "/?parent=" + router.currentRoute.name);
      });
    });
    
    $$("#total-laporan").html(getAngka(obj_view.data['total']));
  }, function () {
    notConnected();
  });
}



function viewAbsen(tanggal) {
  app.dialog.preloader();
  $$("#body-absen").empty();
  app.request.get(path_api + 'absen.php', { mode: 'lihat_absen', tanggal: tanggal }, function (data) {
    app.dialog.close();
    console.log(data);
    obj_pegawai = JSON.parse(tanggal);
    $.each(obj_pegawai.data, function (index, row_pegawai) {
      $("#body-absen").append(
        '<tr>' +
        '<td align="right">' + row_pegawai.no + '.</td>' +
        '<td>' + row_pegawai.nama_pegawai + '</a></td>' +
        '<td align="center">' + row_pegawai.jam_masuk + '</td>' +
        '<td align="center">' + row_pegawai.jam_pulang + '</td>' +
        '</tr>'
      );
    });
  }, function () {
    notConnected();
  });
}

function notConnected() {
  app.dialog.close();
  app.dialog.alert("Tidak dapat terhubung dengan server.", "Warning");
}