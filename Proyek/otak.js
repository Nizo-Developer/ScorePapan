var score1 = 1;
var score2 = 1;
var onLoad = 0;
var streak = 0;
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

            localStorage.setItem("DATA", JSON.stringify(tabData))

            newTab()
            notif(1, 1, 1, 1);
            loadData();
            
            var player = [];
            var index;
            var con = localStorage.getItem('con')
    
            for (i = 1; i <= con*2; i++) {
                var getPlayerList = JSON.parse(localStorage.getItem("playerList"))
                player.push(getPlayerList[`player${i}`])
                for (l = 1; l <= 2; l++) {
                    if (l == 1) {
                        index = "s"
                    // } else if (l == 2) {
                    //     index = "c"
                    } else {
                        index = "b"
                    }
                    document.getElementById("p" + i + index).innerHTML = player[i-1]
                }
            }

            
            // window.open('score-display.html', '_blank');
            // console.log("ULANG")
        })
        .catch(error => console.error('Error:', error));

    window.addEventListener('keydown', handleKeyPress);
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
    var nullScore = 0;
    for (var i = 1; i <= p; i++) {
        var kolom = document.createElement("div")
        kolom.setAttribute("class", "box-v")
        //Menambahkan si kolom (tr) ke baris (td)
        //Sistemnya kyk variabel yang belum di print
        baris.appendChild(kolom)
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
            nullScore++
        }
        
        if (i == noda) {
            pointId = ["a","b","c","d"]

            if (pointId[i - 1] == spareTabData.streak[0]) {
                spareTabData.streak[1]++
                streak = 1;
            } else {
                streak = 0;
            }

            
            switch (noda) {
                case 1:
                    spareTabData.streak[0] = 'a';
                    break;
                case 2:
                    spareTabData.streak[0] = 'b';
                    break;
                case 3:
                    spareTabData.streak[0] = 'c';
                    break;
                case 4:
                    spareTabData.streak[0] = 'd';
                    break;
                default:
                    spareTabData.streak[0] = '';
            }

            if (spareTabData.streak[0] !== "-" && onLoad !== 1) {
                // if (spareTabData.streak[1] <= 1) {
                //     var addData = ""
                // } else {
                //     var addData = spareTabData.streak[1]                   
                // }

                if (streak == 1) {
                    var localData = localStorage.getItem(`data${co.noTab}`);
                    var lastDigit = localData.charAt(localData.length - 1)
                    if (!isNaN(lastDigit)) {
                        cl("lah")
                        var addPoint = localData.replace(/(\D)(\d+)$/, function(match, id, num) {
                            cl(`mrk ${match} idi ${id} num ${num}`)
                            return id + spareTabData.streak[1];
                        });
                        spareTabData[`data${co.noTab}`] = addPoint
                    } else {
                        spareTabData[`data${co.noTab}`] += spareTabData.streak[1]
                    }

                } else {
                    spareTabData.streak[1] = 1;
                    if (spareTabData[`data${co.noTab}`][spareTabData[`data${co.noTab}`].length - 1] == ";") {
                        spareTabData[`data${co.noTab}`] += spareTabData.streak[0]
                    } else {
                        spareTabData[`data${co.noTab}`] += "," + spareTabData.streak[0] 
                    }
                }
                cl(spareTabData)
                localStorage.setItem(`data${co.noTab}`, spareTabData[`data${co.noTab}`])
            }
            console.log(spareTabData.streak)
            console.log(spareTabData[`data${co.noTab}`])
        }
    }

    numBox.innerHTML = (score1 + score2) - 2;

    var dc = document.getElementById("dataContent");
    //Kalau ini anggep aja print karna kita ambil data dari element dari id yang ada di tag html di atas scroll cari komentar "yang ini"
    if (nullScore !== 4) {
        dc.appendChild(baris)
        baris.style.position = "static"
        co.notif = parseInt(0)
    }
}

function notif(con, p, teaming, team, noTab) {
    var not = document.getElementById("notif");
    var nobg = document.getElementById("notif-bg");
    var sub = document.getElementsByClassName("sub");
    if (p !== undefined) {
        co.notif = parseInt(p)
        var nt = co.notif
        // console.log("ini p", p)
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
    // console.log("x", co.notif, "y", co.teaming, "z", co.team)

    if (nt > 0) {
        for (var i = 0; i < sub.length; i++) {
            sub[i].addEventListener("mouseup", tp);
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
    tab.setAttribute("onclick", `loadTab(${tabData.totalTab})`)
    
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

    if (spareTabData[`data${tabData.totalTab}`] == null) {
        spareTabData[`data${tabData.totalTab}`] = `${tabData.totalTab};`
        localStorage.setItem(`data${tabData.totalTab}`, `${tabData.totalTab};`)
    }
    
    if (tabData.totalTab > 1) {
        localStorage.setItem("DATA", JSON.stringify(tabData))
    }
}

function loadData() {
    onLoad = 1;



    console.log('MUAHAAHAHHAHAHAAAAAAAAAA')

    var totalTabLs = JSON.parse(localStorage.getItem("DATA"))

    score1 = 1;
    score2 = 1;
    
    for (i = 1; i <= totalTabLs.totalTab; i++) {
        var rawData = `data${i}`;
        var rawLsData = localStorage.getItem(rawData)
        if (rawLsData !== null) {
            var cookData = localStorage.getItem(rawData).slice(2).split(",");
            console.log(cookData[0][0])
            for (o = 0; o <= cookData.length-1; o++) {
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
                
                if (load[0] !== '') {
                    var funcNotif = document.getElementById(`p${load[0]}b`).getAttribute("onclick").replace(/notif\(|\)/g, '').split(',').map(Number);
                    console.log(funcNotif)
                    if (cookData[o].length == 1) {
                        co.notif = parseInt(funcNotif[1])
                        co.teaming = parseInt(funcNotif[2])
                        co.team = parseInt(funcNotif[3])
                        co.noTab = parseInt(funcNotif[4])

                        inputing()
                    } else {
                        for (p = 1; p <= cookData[o][1]; p++) {
                            co.notif = parseInt(funcNotif[1])
                            co.teaming = parseInt(funcNotif[2])
                            co.team = parseInt(funcNotif[3])
                            co.noTab = parseInt(funcNotif[4])

                            inputing()
                        }
                    }
                }
            }
        }
        cl(3)
        if (i > 1) {
            cl(1)
            newTab()
            cl(2)
        }
        cl(4)
    }
    onLoad = 0;
}

function loadTab(tabIndex) {
    onLoad = 1;
    co.noTab = tabIndex
    var rawData = `data${tabIndex}`;
    var rawLsData = localStorage.getItem(rawData);
    var dataParent = document.getElementById("dataContent")

    spareTabData.streak = ["-", 0];
    score1 = 1;
    score2 = 1;

    while (dataParent.firstChild) {
        dataParent.removeChild(dataParent.firstChild);
    }

    for (i = 1; i <= 4; i++) {
        var notifParam = document.getElementById(`p${i}b`)
        var notifOnClick = notifParam.getAttribute("onclick").replace(/notif\(|\)/g, '').split(',').map(Number);

        notifParam.setAttribute("onclick", `notif(${notifOnClick[0]}, ${notifOnClick[1]}, ${notifOnClick[2]}, ${notifOnClick[3]}, ${co.noTab})`)
    }

    if (rawLsData !== null) {
        var cookData = localStorage.getItem(rawData).slice(2).split(",");
        for (o = 0; o <= cookData.length-1; o++) {
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
            
            if (load[0] !== '') {
                var funcNotif = document.getElementById(`p${load[0]}b`).getAttribute("onclick").replace(/notif\(|\)/g, '').split(',').map(Number);
                console.log(funcNotif)
                if (cookData[o].length == 1) {
                    co.notif = parseInt(funcNotif[1])
                    co.teaming = parseInt(funcNotif[2])
                    co.team = parseInt(funcNotif[3])
                    co.noTab = parseInt(funcNotif[4])

                    inputing()
                } else {
                    for (p = 1; p <= cookData[o][1]; p++) {
                        co.notif = parseInt(funcNotif[1])
                        co.teaming = parseInt(funcNotif[2])
                        co.team = parseInt(funcNotif[3])
                        co.noTab = parseInt(funcNotif[4])

                        inputing()
                    }
                }
            } 
        }
    } else {
        console.log("ya gmn ya tapi datanya blm ada")
    }
    onLoad = 0;
}














//ALAM BAWAH (DEVELOPER TOOL)

function handleKeyPress(event) {
    if (event.key === 'r') {
      konfirmasi();
    }
  }
  
  function konfirmasi() {
    var hasil = prompt("Apakah Anda yakin ingin menghapus data Local Storage?");
  
    if (hasil !== null) {
      hasil = hasil.toLowerCase();
      if (hasil === "ya") {
        localStorage.clear()
        alert("Local Storage di hapus!");
      } else {
        alert("Input tidak valid.");
      }
    } else {
      alert("Anda telah membatalkan.");
    }
}