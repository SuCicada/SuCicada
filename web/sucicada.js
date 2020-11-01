IMPORT_JS = [""]

function loadJS(resolve) {
    script = document.createElement('script')
    script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js"
    document.getElementsByTagName('head')[0].appendChild(script);
    script.addEventListener('load', function () {
        resolve()
    })
}

function loadMD(resolve, md) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            let src = xmlHttp.responseText
            console.log(md[1], src)
            // console.log(resolve.toString())
            resolve([md[1], src])
            // resolve(src, md[1])
        }
    }
    xmlHttp.open('GET', md[0]);
    xmlHttp.send();
    return this
}


function getPromise(func, ...args) {
    return new Promise(function (resolve) {
        func(resolve, ...args)
    })
}

var loadJSPromise = getPromise(loadJS)

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

