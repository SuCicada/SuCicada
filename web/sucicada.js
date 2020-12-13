IMPORT_JS = [
    "https://cdn.jsdelivr.net/npm/marked/marked.min.js"
    , "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"
    , "https://cdn.bootcdn.net/ajax/libs/js-yaml/3.9.1/js-yaml.min.js"
    , "utils.js"
]

function getPromise(func, ...args) {
    return new Promise(function (resolve) {
        func(resolve, ...args)
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

function loadMD(resolve, md) {
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

function loadMenu() {
    let a = (location.origin + location.pathname)
    a = a.substr(0, a.lastIndexOf('/') + 1)
    let yaml = "sucicada.yaml"
    // yaml = a + yaml

    console.log(yaml)
    // let res = $.ajax({
    //     url: yaml,
    //     type: "GET",//请求方式为get
    //     dataType: "json", //返回数据格式为json
    //     success: function (a) {
    //         console.log(a)
    //     }
    // });

    $.get(yaml,
        function (data) {
            // alert(1)
            console.log(data)
        })
    // console.log(res.responseText)
    // console.log(jsyaml.load())
}

function init() {
    let md = getUrlSearch()['md']
    md ? goto(md, false) : goto('index', true)
    loadMenu()
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
        // loadJSPromise.
        // <a class="goto-md" href="#" onclick="goto('index')">最后的家园</a>
        $(".goto-md")
            .attr("href", "javascript:void(0)")
            .click((e, a) => {
                let gotoMd = $(e.target).attr("goto")
                gotoMd !== getUrlSearch()['md'] && goto(gotoMd)
            })
    })
})
// })
