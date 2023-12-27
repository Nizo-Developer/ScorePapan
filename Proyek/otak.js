var score1 = 1;
var score2 = 1;
var onLoad = 0;
var streak = 0;
var spareTabData = {
    streak: ["-", 0]
}
var tabData = {
    totalTab: 0,
}
var co = {};

document.addEventListener('DOMContentLoaded', function() {    
    //Mengambil data dari json memo-otak.json
    fetch("memo-otak.json")
        .then(response => response.json())
        .then(data => {
            co = data

            var baF = 0;
            if (localStorage.getItem("DATA", JSON.stringify(tabData)) === null) {
                cl("NANIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
                localStorage.setItem("DATA", JSON.stringify(tabData))
                baF = 1;
            }

            console.log(localStorage.getItem("DATA", JSON.stringify(tabData)))

            setSize();
            newTab();
            notif(1, 1, 1, 1);
            loadData();
            console.log(localStorage.getItem("DATA", JSON.stringify(tabData)))
            
            if (localStorage.getItem("DATA", JSON.stringify(tabData)) !== null && baF == 0) {
                localStorage.setItem("DATA", JSON.stringify(tabData))
            }

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
            console.log(co)
        })
        .catch(error => console.error('Error:', error));

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('resize', setSize)
});

//custom console log; mwehe jd lebih singkat contoh cl("hello world")
function cl(conlog) {
    console.log(conlog)
}

function setSize() {
    var object = document.getElementById('menu')
    var wobject = parseFloat(window.getComputedStyle(object).getPropertyValue("width"));

    var lebarLayar = window.innerWidth;

    if ((lebarLayar * 0.3) >= 300) {
        object.style.width = lebarLayar * 0.3 + 'px';
    } else {
        object.style.width = 300 + 'px'
    }
    
    
    console.log(parseFloat(window.getComputedStyle(object).getPropertyValue("width")));
    console.log(parseFloat(window.getComputedStyle(object).getPropertyValue("height")));
};

function openMenu() {
    var menu = document.getElementById('menu');
    var menuBg = document.getElementById('menuBg');
    var body = document.getElementById('body')
    body.style.overflowY = 'hidden';
    menu.style.display = 'flex';
    menuBg.style.display = 'flex';
}

function menuClose() {
    var close = document.getElementById('menu');
    var closeBg = document.getElementById('menuBg');
    var body = document.getElementById('body');

    body.style.overflowY = 'visible';
    close.style.display = "none";
    closeBg.style.display = "none";

};

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
    numBox.innerHTML = (score1 + score2) - 2;

    //Looping 4x untuk membuat 4 kolom (td)
    var nullScore = 0;
    for (var i = 1; i <= p; i++) {
        var kolom = document.createElement("div")
        kolom.setAttribute("class", "box-v")
        if (numBox.innerHTML%2 == 1) {
            colorBg = '#707070'
        } else {
            colorBg = '#4d4d4d'
        }
        kolom.style.backgroundColor = colorBg;
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

            if (spareTabData.streak[0] !== "-" && onLoad < 1) {
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
                    if (spareTabData[`data${co.noTab}`] && spareTabData[`data${co.noTab}`][spareTabData[`data${co.noTab}`].length - 1] == ";") {
                        spareTabData[`data${co.noTab}`] += spareTabData.streak[0]
                    } else {
                        spareTabData[`data${co.noTab}`] += "," + spareTabData.streak[0] 
                    }
                }
                cl(spareTabData)
                if (spareTabData[`data${co.noTab}`][spareTabData[`data${co.noTab}`].length-1] !== ";" && spareTabData[`data${co.noTab}`] !== null) {
                    cl(`ini woyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy ${spareTabData[`data${co.noTab}`][spareTabData[`data${co.noTab}`].length-1]}`)
                    localStorage.setItem(`data${co.noTab}`, spareTabData[`data${co.noTab}`])
                }
            }
            console.log(spareTabData.streak)
            console.log(spareTabData[`data${co.noTab}`])
        }
    }


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
    var hexColors = ['#ffa500', '#ff0000', '#ffff00', '#228b22', '#800080', '#d2691e', '#ffc0cb', '#808080', '#87ceeb', '#ffa500'];
    var widthData = [35];
    var colorBg;
    
    // Contoh penggunaan: mendapatkan angka bulat acak antara 1 dan 10
    var randColor = hexColors[randInt(0, hexColors.length-1)];
    console.log(randColor)
    
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
        // console.log(tabId, tabWidth, widthData);
    }
    var sum = widthData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    
    if (tabData.totalTab%2 == 1) {
        colorBg = 'lightgray'
    } else {
        colorBg = 'gray'
    }

    tab.setAttribute("style", `z-index: ${tabData.totalTab * -1}; left: ${sum - widthData[widthData.length - 1] - (tabData.totalTab) * 7}px; background-color: ${colorBg};`)
    var nt = document.getElementById("nt")
    nt.style.zIndex = tabData.totalTab * -1 - 1
    nt.style.left = (sum - (tabData.totalTab + 1) * 7) + "px"

    console.log(localStorage.getItem("DATA"))
    cl(isNaN(localStorage.getItem(`data${tabData.totalTab}`)))
    if (localStorage.getItem(`data${tabData.totalTab}`) === null || localStorage.getItem(`data${tabData.totalTab}`).length == 0) {
        console.log("WAIT WHAT " + localStorage.getItem(`data${tabData.totalTab}`))
        spareTabData[`data${tabData.totalTab}`] = `${tabData.totalTab};`
        localStorage.setItem(`data${tabData.totalTab}`, `${tabData.totalTab};`)
    } 
    if (tabData.totalTab > 1 && onLoad == 0) {
        console.log(localStorage.getItem("DATA"))
        localStorage.setItem("DATA", JSON.stringify(tabData))
        console.log(localStorage.getItem("DATA"))
    }
    console.log(localStorage.getItem("DATA"))
}

function loadData() {
    onLoad = 2;
    console.log(tabData)
    
    var totalTabLs = JSON.parse(localStorage.getItem("DATA"))
    var openTab = localStorage.getItem("JSON-memoOtak-noTab")
    console.log(totalTabLs)
    score1 = 1;
    score2 = 1;
    console.log(totalTabLs.totalTab)
    for (i = 2; i <= totalTabLs.totalTab; i++) {
        console.log(i)
        console.log(totalTabLs.totalTab)
        console.log('MUAHAAHAHHAHAHAAAAAAAAAAk')
        newTab();
    }
    loadTab(openTab)
    onLoad = 0;
}

function loadTab(tabIndex) {
    if (onLoad !== 2) {
        onLoad = 1;
    }
    co.noTab = tabIndex
    var rawData = `data${tabIndex}`;
    var rawLsData = localStorage.getItem(rawData);
    var dataParent = document.getElementById("dataContent")
    var con = localStorage.getItem('con')

    var loadVar = localStorage.getItem(`data${tabIndex}`)
    spareTabData[`data${tabIndex}`] = loadVar
    console.log(spareTabData)
    if (onLoad !== 2) {
        localStorage.setItem("JSON-memoOtak-noTab", co.noTab)
    }
    

    score1 = 1;
    score2 = 1;

    while (dataParent.firstChild) {
        dataParent.removeChild(dataParent.firstChild);
    }

    for (i = 1; i <= con*2; i++) {
        var notifParam = document.getElementById(`p${i}b`)
        var notifOnClick = notifParam.getAttribute("onclick").replace(/notif\(|\)/g, '').split(',').map(Number);

        notifParam.setAttribute("onclick", `notif(${notifOnClick[0]}, ${notifOnClick[1]}, ${notifOnClick[2]}, ${notifOnClick[3]}, ${co.noTab})`)
    }

    if (rawLsData !== null) {
        var cookData = rawLsData.slice(2).split(",");
        var repeat;
        for (o = 0; o <= cookData.length-1; o++) {
            spareTabData.streak = ["-", 1];
            console.log(cookData[0])
            if (cookData[o].length == 1) {
                repeat = 1
            } else {
                repeat = cookData[o].slice(1)
            }
        
            console.log(repeat)
            // console.log(o)
            // console.log(cookData[0])
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
                    for (p = 1; p <= repeat; p++) {
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
    if (onLoad !== 2) {
        onLoad = 0;
    }
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
        window.location.href = '../index.html';
      } else {
        alert("Input tidak valid.");
      }
    } else {
      alert("Anda telah membatalkan.");
    }
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}