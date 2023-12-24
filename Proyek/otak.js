var score1 = 1;
var score2 = 1;
var spareTabData = {
    streak: ["-", 0]
}
var tabData = {
    totalTab: 0,
    tab1: `${spareTabData.idt}:${spareTabData.data1}`
}
var co = {};

document.addEventListener('DOMContentLoaded', function() {    
    //Mengambil data dari json memo-otak.json
    fetch("memo-otak.json")
        .then(response => response.json())
        .then(data => {
            co = data

            newTab()
            notif(1, 1, 1, 1);
            loadData();
            
            var player = [];
            var index;
            var con = localStorage.getItem('con')
    
            for (i = 1; i <= con*2; i++) {
                player.push(localStorage.getItem('player' + i))
                for (l = 1; l <= 2; l++) {
                    if (l == 1) {
                        index = "s"
                    // } else if (l == 2) {
                    //     index = "c"
                    } else {
                        index = "b"
                    }
                    console.log("p" + i + index)
                    document.getElementById("p" + i + index).innerHTML = player[i-1]
                }
            }

            
            // window.open('score-display.html', '_blank');
            console.log("ULANG")
        })
        .catch(error => console.error('Error:', error));

});

//custom console log; mwehe jd lebih singkat contoh cl("hello world")
function cl(conlog) {
    console.log(conlog)
}

function inputing() {
    //Membuat Baris (tr)
    var baris = document.createElement("div");

    //Menyeting Atribut dari tr di atas (Atribut, Value)
    baris.setAttribute("class", "box-h")
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
    var numBox = document.createElement("div")
    numBox.setAttribute("class", "num")
    baris.appendChild(numBox)

    //Looping 4x untuk membuat 4 kolom (td)
    for (var i = 1; i <= p; i++) {
        var kolom = document.createElement("div")
        kolom.setAttribute("class", "box-v")
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
        
        if (i == noda) {
            pointId = ["a","b","c","d"]

            
            if (pointId[i - 1] == spareTabData.streak[0]) {
                spareTabData.streak[1]++
            } else {
                if (spareTabData.streak[0] !== "-") {
                    if (spareTabData.streak[1] == 1) {
                        var addData = spareTabData.streak[1]
                    } else {
                        var addData = ""
                    }

                    if (spareTabData[`data${co.noTab}`][spareTabData[`data${co.noTab}`].length - 1] == ";") {
                        spareTabData[`data${co.noTab}`] += spareTabData.streak[0] + addData
                    } else {
                        spareTabData[`data${co.noTab}`] += "," + spareTabData.streak[0] + addData
                    }
                    localStorage.setItem(`data${co.noTab}`, spareTabData[`data${co.noTab}`])
                } 
                switch (noda) {
                    case 1:
                        spareTabData.streak[1] = 'a';
                        break;
                    case 2:
                        spareTabData.streak[1] = 'b';
                        break;
                    case 3:
                        spareTabData.streak[1] = 'c';
                        break;
                    case 4:
                        spareTabData.streak[1] = 'd';
                        break;
                    default:
                        spareTabData.streak[1] = '';
                }
                spareTabData.streak[1] = 1;
            }
            console.log(spareTabData.streak)
            console.log(spareTabData.data1)
        }
        cl(score1)
        cl(score2)
    }

    numBox.innerHTML = (score1 + score2) - 2;

    var dc = document.getElementById("dataContent");
    //Kalau ini anggep aja print karna kita ambil data dari element dari id yang ada di tag html di atas scroll cari komentar "yang ini"
    dc.appendChild(baris)
    baris.style.position = "static"
    co.notif = parseInt(0)
    cl("aa" + co.notif)
}

function notif(con, p, teaming, team, noTab) {
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
    if (noTab !== undefined) {
        co.noTab = parseInt(noTab)
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
            not.style.top = "90%";
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

function newTab() {
    var widthData = [35];
    
    
    tabData.totalTab++
    var tab = document.createElement("div")
    tab.setAttribute("class", "default-tab tab")
    tab.setAttribute("id", `dataTab${tabData.totalTab}`)
    
    if (tabData.totalTab == 1) {
        tab.innerHTML = "ScorePapan Badminton"
    }
    
    var tabWrapper = document.getElementById("tabWr")
    tabWrapper.appendChild(tab)

    for (var i = 1; i <= tabData.totalTab; i++) {
        var tabId = document.getElementById(`dataTab${i}`);
        var tabWidth = tabId.clientWidth;
        widthData.push(tabWidth);
        console.log(tabId, tabWidth, widthData);
    }
    var sum = widthData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    
    tab.setAttribute("style", `z-index: ${tabData.totalTab * -1}; left: ${sum - widthData[widthData.length - 1] - (tabData.totalTab) * 7}px;`)
    var nt = document.getElementById("nt")
    nt.style.zIndex = tabData.totalTab * -1 - 1
    nt.style.left = (sum - (tabData.totalTab + 1) * 7) + "px"

    spareTabData[`data${tabData.totalTab}`] = `${tabData.totalTab};`
    
    if (tabData.totalTab > 1) {
        localStorage.setItem("DATA", JSON.stringify(tabData))
    }
}

function loadData() {
    console.log('MUAHAAHAHHAHAHAAAAAAAAAA')
    
    for (i = 1; i <= tabData.totalTab; i++) {
        var rawData = `data${i}`;
        if (localStorage.getItem(rawData) !== null) {
            var cookData = localStorage.getItem(rawData).slice(2).split(",");
            console.log(cookData)
            for (o = 1; o <= cookData.length; o++) {
                var load = []
                switch (cookData[o][0]) {
                    case 'a':
                        load.push(1);
                        break;
                    case 'b':
                        load.push(2);
                        break;
                    case 'c':
                        load.push(3);
                        break;
                    case 'd':
                        load.push(4);
                        break;
                    default:
                        load.push('');
                }
                
                var funcNotif = document.getElementById(`p${load[0]-1}b`).getAttribute("onclick")
                console.log(funcNotif)
                if (cookData[o].length == 1) {
                    co.notif = parseInt(load[0])
                }
            }
        }
        if (i > 1) {
            newTab()
        }
    }
}