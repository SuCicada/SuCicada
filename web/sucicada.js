IMPORT_JS = [
    "https://cdn.jsdelivr.net/npm/marked/marked.min.js"
    , "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"
    , "https://cdn.bootcdn.net/ajax/libs/js-yaml/3.9.1/js-yaml.min.js"
    , "utils.js"
]

/* func 是非阻塞原函数， resolve是then后的函数 */
function getPromise(func, ...args) {
    return new Promise(function (resolve) {
        func(...args, resolve)
    })
}

function promisify(func) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            func(...args, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };
}

const loadJSPromise =
    Promise.all(IMPORT_JS.map(js => {
        return loadJS(js)
    }))
yaml = 'sucicada.yaml'

const loadConf = loadJSPromise
    .then(() => getPromise($.get, yaml))
    .then(data => jsyaml.load(data))

// (data) => {
//     let menuIndex = getUrlSearch()['menu']
//     let menuDiv = $("#menu")
//     jsyaml.load(data)['menu'].forEach((bar) => {
//         menuDiv.append(
//             $('<a></a>')
//                 .attr("href", "javascript:void(0)")
//                 .text(bar['text'])
//                 .click((e, a) => {
//                     // let gotoMd = $(e.target).attr("goto")
//                     let gotoMd = bar['md']
//                     gotoMd !== getUrlSearch()['md'] && goto(gotoMd)
//                 }))
//     })
// })

function loadJS(js) {
    let script = document.createElement('script')
    script.src = js
    document.getElementsByTagName('head')[0].appendChild(script);
    return new Promise((resolve) => {
        script.addEventListener('load', function () {
            resolve()
        })
    })
}

function loadMD(md, resolve) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            let src = xmlHttp.responseText
            console.log("load success: " + md[0])
            // console.log(resolve.toString())
            resolve([md[1], src])
            // resolve(src, md[1])
        }
    }
    // console.log(md)
    xmlHttp.open('GET', md[0]);
    xmlHttp.send();
    return this
}


function addMD(mdList) {
    mdList
        .forEach((md) =>
            loadJSPromise
                .then(() => getPromise(loadMD, md))
                .then((md) => {
                    document.getElementById(md[0]).innerHTML =
                        marked(md[1], {
                            breaks: true
                            , gfm: true
                        })
                })
        )
}


// goto new web
function goto(md, changeUrl = true) {
    console.log('goto:' + md, 'changeUrl:' + changeUrl)
    if (changeUrl) {
        let encodeMd = encodeURIComponent(md)
        let newSearch = niceObject(getUrlSearch()).set('md', encodeMd)
        history.pushState({md: md}, md, toUrlSearch(newSearch))
    }
    md = decodeURIComponent(md)
    // console.log(md)
    let masterDiv = document.getElementById("master")
    masterDiv.innerHTML = ''
    let mdDiv = document.createElement("div")
    mdDiv.setAttribute("id", md)
    addMD([[md + '.md', md]])
    masterDiv.appendChild(mdDiv)
}

function equalsIgnoreURICode(a, b) {
    // console.log(decodeURIComponent(a) , decodeURIComponent(b))
    // console.log(decodeURIComponent(a) === decodeURIComponent(b))
    return decodeURIComponent(a) === decodeURIComponent(b)
}

function showMenu(menu, changeUrl = true) {
    console.log('menu:' + menu)
    if (changeUrl) {
        let encode = encodeURIComponent(menu)
        let newSearch = niceObject(getUrlSearch()).set('menu', encode)
        history.pushState({newSearch: newSearch}, newSearch, toUrlSearch(newSearch))
    }
    loadConf
        .then((data) => {
            let menuObj = data['menus'][menu]
            let menuDiv = $("#menu").html('')
            menuObj.forEach((bar) => {
                menuDiv.append(
                    $('<a></a>')
                        .attr("href", "javascript:void(0)")
                        .text(bar['text'])
                        .click((e, a) => {
                            // let gotoMd = $(e.target).attr("goto")
                            let gotoMd = bar['md'] /* 要跳转的md */
                            let dir = bar['menu'] /* 要切换的目录 */
                            let search = getUrlSearch()
                            // console.log(bar)
                            // console.log(search)
                            // (gotoMd === 'index' ? '' : (dir + '/')) +
                            // console.log(gotoMd && !equalsIgnoreURICode(gotoMd, search['md']) )
                            gotoMd && !equalsIgnoreURICode(gotoMd, search['md']) && goto(gotoMd)
                            dir && !equalsIgnoreURICode(dir, search['menu']) && showMenu(dir)
                            // if (gotoMd) {
                            // } else if (dir) {
                            // }
                        }))
                    .append($('<span></span>').text(" | "))
            })
        })
}

Array.prototype.foldLeft = function (sum, fun) {
    //    fun: (sum,a)=>sum
    return this.length ? this.foldLeft(fun(sum, this.shift()), fun) : sum
}

// Object.items = function () {
//     return Object.entries(this)
// }
// Object.empty = function () {
//     return Object.keys(this).length === 0
// }
// Object.set = function (k, v) {
//     this[k] = v
//     return this
// }

function getUrlSearch() {
    return !location.search.length ? {} :
        location.search
            .substring(1).split("&")
            .map((a) => {
                return a.split("=")
            })
            .foldLeft({}, (s, a) => {
                // console.log(s)
                // console.log(a)
                s[a[0]] = a[1]
                return s
            })
}

function toUrlSearch(obj) {
    // console.log(obj)
    niceObject(obj)
    return obj.empty() ? '' : '?' + obj.items().map((a) => a.join('=')).join('&')
}

function init() {
    let search = getUrlSearch()
    let md = search['md']
    let menu = search['menu']
    menu ? showMenu(menu, false) : showMenu('index', true)
    md ? goto(md, false) : goto('index', true)
}

// loadJSPromise.then(() => {
window.onload = (() => {
    window.onpopstate = (e) => {
        if (e.state) {
            let md = e.state['md']
            console.log(md)
            console.log(e)
            goto(md, false)
        }
    }

    loadJSPromise.then(() => {
        init()
        // $(".goto-md")
        // .attr("href", "javascript:void(0)")
        // .click((e, a) => {
        //     let gotoMd = $(e.target).attr("goto")
        //     gotoMd !== getUrlSearch()['md'] && goto(gotoMd)
        // })
    })
})
// })
