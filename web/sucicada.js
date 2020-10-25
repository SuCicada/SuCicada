script = document.createElement('script')
script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js"
document.getElementsByTagName('head')[0].appendChild(script);


// Sucicada = {
// }



function loadMD(mdList) {
    mdList
        .forEach(function (md) {
            addMD(md)
        })

    MDBuffer = []
    script.addEventListener('load', function () {
        MDBuffer.forEach(function (md) {
            document.getElementById(md[1]).innerHTML = marked(md[0])
        })
    })

    function addMD(md) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let src = xmlhttp.responseText
                MDBuffer.push([src, md[1]])
            }
        }
        xmlhttp.open('GET', md[0]);
        xmlhttp.send();
        return this
    }
}
