document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    
}
var db = window.openDatabase("fajarhidayah", "1.0", "fajarhidayah.db", 200000);
db.transaction(createTable, onError, onSuccess);

function createTable(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS user(username VARCHAR)');
}

function onSuccess() {
    db.transaction(queryLogin, onErrorLogin);
}

function queryLogin(tx) {
    tx.executeSql('SELECT * FROM user', [], onSuccessLogin, onErrorLogin);
}

function onSuccessLogin(tx, result) {
    var jml = result.rows.length;
    
    if (jml > 0) {
        for (var i = 0; i < jml; i++) {
            app.loginScreen.close('.login-screen');
            var row_user = result.rows.item(i);
            getUser(row_user.username);
            localStorage.setItem("user", JSON.stringify(row_user));
        }
    } else {
        router.navigate("/login-screen/", {
            clearPreviousHistory: true,
            pushState: false,
        });
    }
}

function Login(data, username) {
    db.transaction(deleteUser, onError);
    db.transaction(insertUser(data, username), onError, checkLogin);
}

function Logout() {
    db.transaction(deleteUser, onError, checkLogin);
}

function deleteUser(tx) {
    localStorage.removeItem("user");
    tx.executeSql('DELETE FROM user', []);
}

function insertUser(data, username) {
    return function (tx) {
        tx.executeSql('INSERT INTO user VALUES ("' + username + '")');
    }
}

function checkLogin() {
    db.transaction(queryLogin, onError);
}

function onErrorLogin(tx, err) {
    setTimeout(function () {
        router.navigate("/login-screen/");
    }, 60);
}

function onError(err) {
    app.dialog.alert("Query Error", "ERROR");
}