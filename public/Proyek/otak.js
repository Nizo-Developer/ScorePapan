var score1 = 0;
var score2 = 0;
var onLoad = 0;
var streak = 0;
var adv = 0;
var fitHeight;
var tabWinCon = 0;

var spareTabData = {
    streak: ["-", 0]
}
var tabData = {
    totalTab: 0,
    tabName: {}
}
var dataList = {}
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

            if (localStorage.getItem('dataList', JSON.stringify(dataList)) === null) {
                localStorage.setItem('dataList', JSON.stringify(dataList));
                baF = 1;
            }

            console.log(localStorage.getItem("DATA", JSON.stringify(tabData)))

            menuClose();
            setSize();
            newTab();
            notif(1, 1, 1, 1);
            loadData();
            console.log(localStorage.getItem("DATA", JSON.stringify(tabData)))
            
            if (localStorage.getItem("DATA", JSON.stringify(tabData)) !== null && baF == 0) {
                localStorage.setItem("DATA", JSON.stringify(tabData))
            }

            if (localStorage.getItem('dataList', JSON.stringify(dataList)) === null && baF == 0) {
                localStorage.setItem('dataList', JSON.stringify(dataList));

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

        })

            // window.open('score-display.html', '_blank');
            // console.log("ULANG")
            // console.log(co)
        .catch(error => console.error('Error:', error));
        
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('resize', setSize);
        window.addEventListener('load', adaptCon);
})


//custom console log; mwehe jd lebih singkat contoh cl("hello world")
function cl(conlog) {
    console.log(conlog)
}

function adaptCon() {
    console.log(window.location.pathname)
    if (window.location.pathname.includes('solo')) {
        localStorage.setItem("con", 1);
    } else if (window.location.pathname.includes('duo')) {
        localStorage.setItem("con", 2);
    }
}

function setSize() {
    var object = document.getElementById('menu')
    var wobject = parseFloat(window.getComputedStyle(object).getPropertyValue("width"));
    var iobject = document.getElementById("tabName");
    var warn = document.getElementById('warn');
    var warnText = document.getElementById('warnText');

    var lebarLayar = window.innerWidth;

    if ((lebarLayar * 0.4) >= 300) {
        object.style.width = lebarLayar * 0.4 + 'px';
    } else {
        object.style.width = 300 + 'px'
    }

    console.log(lebarLayar)

    if (lebarLayar < 600) {
        warn.style.width = '90%';
        warnText.style.fontSize = lebarLayar * 0.05 + 'px';
    } else {
        warn.style.width = 500 + 'px'
    }
    
    if ((lebarLayar * 0.05) < 18) {
        warnText.style.fontSize = lebarLayar * 0.05 + 'px';
    }
    else {
        warnText.style.fontSize = '18px';
    }

    iobject.style.width = lebarLayar * 0.2 + 'px';
    
    console.log(parseFloat(window.getComputedStyle(iobject).getPropertyValue("width")));
    console.log(parseFloat(window.getComputedStyle(object).getPropertyValue("width")));
    // console.log(parseFloat(window.getComputedStyle(object).getPropertyValue("height")));
};

function openMenu() {
    var menu = document.getElementById('menu');
    var menuBg = document.getElementById('menuBg');
    var body = document.getElementById('body');
    
    body.style.overflowY = 'hidden';
    menu.style.opacity = '1';
    menuBg.style.opacity = '1';
    menuBg.style.display = "flex";
    
    if (adv == 1) {
        arrow.className += ' fa-flip-vertical';
        menuMain.style.height = "400px";
        menu.style.top = '300px';
    } else {
        menu.style.top = '100px';
    }
}

function menuClose() {
    var close = document.getElementById('menu');
    var closeBg = document.getElementById('menuBg');
    var body = document.getElementById('body');
    
    body.style.overflowY = 'visible';
    menu.style.top = '-100px';
    close.style.opacity = "0";
    closeBg.style.opacity = "0";
    closeBg.style.display = "none";
};

function menuEnter() {
    var nameTabValue = document.getElementById('tabName').value;
    var nameTab = document.getElementById('tabName');
    
    if (tabWinCon > 0) {
        if (nameTabValue) {
            newTab(nameTabValue)
        }
        menuClose();
        nameTab.innerHTML = '';
    } else if (tabWinCon == 0) {
        warnMenu();
    }
}

function warnMenu() {
    menuClose()
    var warn = document.getElementById('warn');
    var warnBg = document.getElementById('menuBg');
    var body = document.getElementById('body');
    
    body.style.overflowY = 'hidden';
    warn.style.opacity = '1';
    warn.style.display = 'flex';
    warn.style.top = '300px';
    warnBg.style.opacity = '1';
    warnBg.style.display = "flex";
}

function warnClose() {
    var warn = document.getElementById('warn');
    var warnBg = document.getElementById('menuBg');
    var body = document.getElementById('body');
    
    body.style.overflowY = 'visible';
    warn.style.top = '-200px';
    warn.style.opacity = '0';
    warnBg.style.opacity = '0';
    warnBg.style.display = "none";
}

function warnEnter() {
    var nameTabValue = document.getElementById('tabName').value;
    var nameTab = document.getElementById('tabName');
    
    if (nameTabValue) {
        newTab(nameTabValue)
    }
    nameTab.innerHTML = '';
    menuClose();
    warnClose();
}

function advSetting() {
    var arrow = document.getElementById("arrow");
    var menuMain = document.getElementById("menuMain");
    var menu = document.getElementById("menu")
    console.log(!menuMain.style.height)
    if (!menuMain.style.height) {
        fitHeight = menuMain.clientHeight;
        console.log(fitHeight)
        menuMain.style.height = fitHeight + 'px';
        setTimeout(advSetting, 0)
    } else {
        if (adv == 0) {
            arrow.className += ' fa-flip-vertical';
            menuMain.style.height = "400px";
            menu.style.top = '300px';
            adv = 1;
        } else {
            arrow.classList.remove('fa-flip-vertical');
            menuMain.style.height = fitHeight + 'px';
            menu.style.top = '100px';
            adv = 0;
        }
    }
    

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
    var numBox = document.createElement("div");
    numBox.setAttribute("class", "num");
    baris.appendChild(numBox);
    numBox.innerHTML = (score1 + score2) - 1;

    //Looping 4x untuk membuat 4 kolom (td)
    var nullScore = 0;
    for (var i = 1; i <= p; i++) {
        var kolom = document.createElement("div")
        kolom.setAttribute("class", "box-v")
        if (numBox.innerHTML%2 == 1) {
            colorBg = '#f8f8ff';
        } else {
            colorBg = '#cfceca';
        }
        kolom.style.backgroundColor = colorBg;
        kolom.style.color = '#262739';
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
                    var localData = JSON.parse(localStorage.getItem('dataList'));
                    var lastDigit = localData[`data${co.noTab}`].charAt(localData[`data${co.noTab}`].length - 1)
                    if (!isNaN(lastDigit)) {
                        cl("lah")
                        var addPoint = localData[`data${co.noTab}`].replace(/(\D)(\d+)$/, function(match, id, num) {
                            cl(`mrk ${match} idi ${id} num ${num}`)
                            return id + spareTabData.streak[1];
                        });
                        dataList[`data${co.noTab}`] = addPoint
                    } else {
                        dataList[`data${co.noTab}`] += spareTabData.streak[1]
                    }

                } else {
                    spareTabData.streak[1] = 1;
                    if (dataList[`data${co.noTab}`] && dataList[`data${co.noTab}`][dataList[`data${co.noTab}`].length - 1] == ";") {
                        dataList[`data${co.noTab}`] += spareTabData.streak[0]
                    } else {
                        dataList[`data${co.noTab}`] += "," + spareTabData.streak[0]
                    }
                }
                cl(spareTabData)
                if (dataList[`data${co.noTab}`][dataList[`data${co.noTab}`].length-1] !== ";" && dataList[`data${co.noTab}`] !== null) {
                    cl(`ini woyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy ${dataList[`data${co.noTab}`][dataList[`data${co.noTab}`].length-1]}`)

                    const storedData = JSON.parse(localStorage.getItem('dataList')) || {};
                    storedData[`data${co.noTab}`] = dataList[`data${co.noTab}`]; 
                    localStorage.setItem('dataList', JSON.stringify(storedData));
                }
            }
            console.log(spareTabData.streak)
            console.log(dataList[`data${co.noTab}`])
            console.log(dataList)
            console.log(JSON.parse(localStorage.getItem('dataList')))
        }
        win()
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

function win() {
    var btnContainer = document.getElementById('btnContainer');
    var dataLs = JSON.parse(localStorage.getItem("DATA"));
    var onTab = localStorage.getItem('JSON-memoOtak-noTab');

    if (dataLs.totalTab == onTab) {
        console.log('woyyyyyyyyyyy')
        if ((score1 > 21 && score1 - score2 >= 2) || score1 == 31) {
            btnContainer.style.display = 'none';
            tabWinCon = 1;
            openMenu()
        } else if ((score2 > 21 && score2 - score1 >= 2) || score2 == 31) {
            btnContainer.style.display = 'none';
            openMenu()
            tabWinCon = 2;
        } else {
            btnContainer.style.display = 'flex';
            tabWinCon = 0;
        }
    } else {
        console.log('watteeehelllll')
        btnContainer.style.display = 'none';

        if ((score1 > 21 && score1 - score2 >= 2) || score1 == 31) {
            tabWinCon = 1;
        } else if ((score2 > 21 && score2 - score1 >= 2) || score2 == 31) {
            tabWinCon = 2;
        }
    }

    if (dataLs.totalTab == 0) {
        btnContainer.style.display = 'flex';
        tabWinCon = 0
    }
};

function newTab(nama) {
    var hexColors = ['#ffa500', '#ff0000', '#ffff00', '#228b22', '#800080', '#d2691e', '#ffc0cb', '#808080', '#87ceeb', '#ffa500'];
    var widthData = [35];
    var colorBg;
    
    // Contoh penggunaan: mendapatkan angka bulat acak antara 1 dan 10
    // var randColor = hexColors[randInt(0, hexColors.length-1)];
    // console.log(randColor)
    
    tabData.totalTab++

    if (tabData.totalTab == 1 && tabData.tabName[`name1`] == null) {
        nama = "ScorePapan Badminton"
    };

    tabData.tabName[`name${tabData.totalTab}`] = nama;
    var tab = document.createElement("div")
    tab.setAttribute("class", "default-tab tab")
    tab.setAttribute("id", `dataTab${tabData.totalTab}`)
    tab.setAttribute("onclick", `loadTab(${tabData.totalTab})`)
    tab.innerHTML = nama;
    
    
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
    var listIsi = JSON.parse(localStorage.getItem('dataList'))
    console.log(isNaN(listIsi[`data${tabData.totalTab}`]))
    console.log(listIsi[`data${tabData.totalTab}`])
    if (listIsi[`data${tabData.totalTab}`] === undefined || listIsi[`data${tabData.totalTab}`] === null || (isNaN(listIsi[`data${tabData.totalTab}`]) && listIsi.length == 2) || (listIsi[`data${tabData.totalTab}`].length == 0)) {
        console.log("WAIT WHAT " + listIsi[`data${tabData.totalTab}`])
        dataList[`data${tabData.totalTab}`] = `${tabData.totalTab};`

        const storedData = JSON.parse(localStorage.getItem('dataList')) || {};
        storedData[`data${tabData.totalTab}`] = `${tabData.totalTab};`; 
        localStorage.setItem('dataList', JSON.stringify(storedData));
    } 
    if (tabData.totalTab > 1 && onLoad == 0) {
        console.log(localStorage.getItem("DATA"))
        localStorage.setItem("DATA", JSON.stringify(tabData))
        console.log(localStorage.getItem("DATA"))
    }
    console.log(localStorage.getItem("DATA"))
    if (onLoad == 0) {
        loadTab(tabData.totalTab)
    }
}

function loadData() {
    onLoad = 2;
    console.log(tabData)
    
    var totalTabLs = JSON.parse(localStorage.getItem("DATA"))
    var openTab = localStorage.getItem("JSON-memoOtak-noTab")
    console.log(totalTabLs)
    score1 = 1;
    score2 = 1;
    console.log(totalTabLs.tabName[`name1`])
    for (i = 2; i <= totalTabLs.totalTab; i++) {
        console.log(i)
        console.log(totalTabLs.totalTab)
        console.log('MUAHAAHAHHAHAHAAAAAAAAAAk')
        newTab(totalTabLs.tabName[`name${i}`]);
    }
    console.log(openTab)
    if (openTab === null) {
        openTab = 1;
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
    var rawLsData = JSON.parse(localStorage.getItem('dataList'));
    var dataParent = document.getElementById("dataContent")
    var con = localStorage.getItem('con')

    var loadVar = JSON.parse(localStorage.getItem('dataList'))
    dataList[`data${tabIndex}`] = loadVar[`data${tabIndex}`]
    console.log(co.noTab)
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

    if (rawLsData[rawData] !== null) {
        var cookData = rawLsData[rawData].slice(2).split(",");
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
    win()
    if (onLoad !== 2) {
        onLoad = 0;
    }
}



























//ALAM BAWAH (DEVELOPER TOOL)

function handleKeyPress(event) {
    if (event.key === '`') {
        konfirmasi();
    }
}

function konfirmasi() {
    var hasil = confirm("Apakah Anda yakin ingin menghapus data Local Storage?");

    if (hasil == true) {
        localStorage.clear();
        alert("Local Storage di hapus!");
        window.location.href = '../index.html'
    }
}