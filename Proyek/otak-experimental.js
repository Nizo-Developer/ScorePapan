var score1 = 1;
var score2 = 1;
var co;

fetch("memo-otak.json")
    .then(response => response.json())
    .then(data => {
        co = data
    })
    .catch(error => console.error('Error:', error));

function cl(conlog) {
    console.log(conlog)
}

function inputing(team) {
    //Membuat Baris (tr)
    var baris = document.createElement("tr");
    //Menyeting Atribut dari tr di atas (Atribut, Value)
    baris.setAttribute("id", "baris");

    var noda = co.notif

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
        cl("i" + i + noda)
        if (i == noda && k == 2) {
            if (team == 1) {
                kolom.innerHTML = score1;
                score1++
            } else {
                kolom.innerHTML = score2;
                score2++
            };
            cl("yes")
        } else if (i == noda && k == 1) {
            if (noda == 1) {
                kolom.innerHTML = score1;
                score1++
            } else {
                kolom.innerHTML = score2;
                score2++
            }
        } else {
            kolom.innerHTML = ' '
        }
        cl(score1)
        cl(score2)
    }

    var dc = document.getElementById("dataContent");
    //Kalau ini anggep aja print karna kita ambil data dari element dari id yang ada di tag html di atas scroll cari komentar "yang ini"
    dc.appendChild(baris)
    co.notif = parseInt(0)
    cl("aa" + co.notif)
}

function notif(con, p, team) {
    var not = document.getElementById("notif");
    var nobg = document.getElementById("notif-bg");
    var sub = document.getElementsByClassName("sub");
    if (p !== undefined) {
        co.notif = parseInt(p)
        var nt = co.notif
        console.log("ini p", p)
    }
    console.log("ini nt", nt)
    cl("ini" + co.notif)

    if (nt > 0) {
        for (var i = 0; i < sub.length; i++) {
            sub[i].addEventListener("mouseup", tp);
            cl(i)
        }

        function tp(event) {
            var mouseX = event.clientX;
            var mouseY = event.clientY - 150;

            not.style.left = mouseX + 'px';
            not.style.top = mouseY + 'px';
            kondisi();
            cl("raw")
        };
    } else {
        kondisi();
    }
    
    function kondisi() {
        if (con == 1) {
            not.style.display = "flex";
            nobg.style.display = "flex";
        } else if (con == 2) {
            not.style.display = "none";
            nobg.style.display = "none";
            inputing(team)
        } else {
            co.notif = parseInt(0)
            not.style.display = "none";
            nobg.style.display = "none";
        }   
        cl("pe")
    }

    
}
