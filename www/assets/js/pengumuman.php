<?php
header('Access-Control-Allow-Origin: *');

include "../global.php";

switch($_GET['mode']){
	case 'lihat_pengumuman':
	echo lihat_pengumuman();
	break;
}

function lihat_pengumuman(){
	
	$data = array();
	$sql = "SELECT * FROM berita ORDER BY tanggalBerita DESC";
	$res = db($sql);
	if ($res) {
		while ($r = mysql_fetch_assoc($res)) {
			array_push($data, $r);
			$error = false;
			$code = "00";
			$message = "Berhasil mengambil data.";
		}
	}else{
		$error = true;
		$code = "01";
		$message = "Gagal mengambil data.";
	}
	
	$response = resultJson($error, $code, $message, $data);
	
	echo json_encode($response, JSON_PRETTY_PRINT);
}
?>