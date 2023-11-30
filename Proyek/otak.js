var score1 = 1;
var score2 = 1;

function inputing(team, num) {
    //Membuat Baris (tr)
    var baris = document.createElement("tr");
    //Menyeting Atribut dari tr di atas (Atribut, Value)
    baris.setAttribute("id", "baris");

    if (team == 0) {
        var p = 2
        var k = 1
    } else {
        var p = 4
        var k = 2
    }

    //Looping 4x untuk membuat 4 kolom (td)
    for (var i = 1; i <= p; i++) {
        var kolom = document.createElement("td")
        kolom.setAttribute("class", "data") 
        //Menambahkan si kolom (tr) ke baris (td)
        //Sistemnya kyk variabel yang belum di print
        baris.appendChild(kolom)
        if (i == num && k == 2) {
            if (team == 1) {
                kolom.innerHTML = score1;
                score1++
            } else {
                kolom.innerHTML = score2;
                score2++
            };
        } else if (i == num && k == 1) {
            if (num == 1) {
                kolom.innerHTML = score1;
                score1++
            } else {
                kolom.innerHTML = score2;
                score2++
            }
        } else {
            kolom.innerHTML = ' '
        }
    }

    var dc = document.getElementById("dataContent");
    //Kalau ini anggep aja print karna kita ambil data dari element dari id yang ada di tag html di atas scroll cari komentar "yang ini"
    dc.appendChild(baris)
}