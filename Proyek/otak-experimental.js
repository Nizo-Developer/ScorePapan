var score1 = 1;
var score2 = 1;
var co = {};

document.addEventListener('DOMContentLoaded', function() {    
    //Mengambil data dari json memo-otak.json
    fetch("memo-otak.json")
        .then(response => response.json())
        .then(data => {
            co = data

            notif(1, 1, 1, 1);
            
            var player = [];
            var index;
            var con = localStorage.getItem('con')
    
            for (i = 1; i <= con*2; i++) {
                player.push(localStorage.getItem('player' + i))
                for (l = 1; l <= 3; l++) {
                    if (l == 1) {
                        index = "s"
                    } else if (l == 2) {
                        index = "c"
                    } else {
                        index = "b"
                    }
                    console.log("p" + i + index)
                    document.getElementById("p" + i + index).innerHTML = player[i-1]
                }
            }
            
            var Tab = false;

            var windows = window.open('', '_blank');

            for (var i = 0; i < windows.length; i++) {
                if (windows[i].location.href === 'http://127.0.0.1:5500/Proyek/score-display.html' || windows[i].location.href === '') {
                    Tab = true;
                    windows[i].focus();
                    break;
                }
            }

            if (!Tab) {
                window.open('score-display.html', '_blank');
            }
        })
        .catch(error => console.error('Error:', error));
});

//custom console log; mwehe jd lebih singkat contoh cl("hello world")
function cl(conlog) {
    console.log(conlog)
}

function inputing() {
    //Membuat Baris (tr)
    var baris = document.createElement("tr");

    //Menyeting Atribut dari tr di atas (Atribut, Value)
    baris.setAttribute("id", "baris");

    //noda (Nomor Data; deklarasi co.notif dalam fungsi inputing)
    var noda = co.notif
    var tmg = co.teaming
    var tm = co.team

    //p (Pemain)
    //k (Jumlah pemain dalam 1 tim)

    if (tm == 1) {
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
            if (tmg == 1) {
                kolom.innerHTML = score1;
                score1++
                cl("x")
            } else {
                kolom.innerHTML = score2;
                score2++
                cl("y")
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

function notif(con, p, teaming, team) {
    var not = document.getElementById("notif");
    var nobg = document.getElementById("notif-bg");
    var sub = document.getElementsByClassName("sub");
    if (p !== undefined) {
        co.notif = parseInt(p)
        var nt = co.notif
        console.log("ini p", p)
    } 
    if (teaming !== undefined) {
        co.teaming = parseInt(teaming)
    }
    if (team !== undefined) {
        co.team = parseInt(team)
    }
    console.log("x", co.notif, "y", co.teaming, "z", co.team)


    if (nt > 0) {
        for (var i = 0; i < sub.length; i++) {
            sub[i].addEventListener("mouseup", tp);
            cl(i)
        }

        function tp(event) {
            var mouseX = event.clientX;
            var mouseY = event.clientY - 150;

            //bisa ga tuh?? bisa td mkdnya biar notifnya ngikutin laayr yang di klik jd istilahnya lebih deket di hp kurang inget gw hasilnya
            //iyah buat mobile aja @media only screen and (max-width: 600px) {} dc?
            //gas
            //bentar ngelag oke
            not.style.left = "50%";
            not.style.top = "70%";
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
            inputing()
        } else {
            co.notif = parseInt(0)
            co.teaming = parseInt(0)
            co.team = parseInt(0)
            not.style.display = "none";
            nobg.style.display = "none";
        }   
        cl("pe")
    }
};

function setScore() {
    var sc1 = document.getElementById('score1');
    var sc2 = document.getElementById('score2');
    sc1
};

