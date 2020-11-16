function sleep(name, ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name)
            resolve()
        }, ms);
    })
}


function test() {

    a = sleep(1, 500)
    b = sleep(2, 400)
    c = sleep(3, 400)
    a.then(() => b.then(() => c))
}

function sleep(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    })
}

require("../utils")

function slow(name, time, ...aaa) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("slow {0} over".format([name]))
            // console.log(resolve.toString())
            resolve(...aaa)
        }, time)
    })
}

function init() {
    var task1 = new Promise(function (resolve) {
        slow("load js", 1000, resolve)
    })

    var task2 = new Promise(function (resolve) {
        slow("ajax md", 2000, resolve)
    })

    var task3 = new Promise(function (resolve) {
        slow("task3 task3 task3 task3", 1000, resolve)
    })
    var task4 = function () {
        console.log("task4 task4 task4 task4")
    }
}


var pro = Promise
    .all([
        slow("1111", 1000)
        , slow("2222", 2000)
    ])

pro.then(() => slow("3.1", 1000,["?????","sdfsdf"]))
    .then((...res) => {
        console.log(...res)
        console.log("333111")
    })

// pro.then(() => slow("3.2", 100))
//     .then((res) => console.log("333222"))

function aa(a, ...aa) {
    console.log(a, ...aa)
}

// aa(11)
// aa(11, 1, 1, 1, 1)


https://f5b1452c-1837-11eb-a8bf-f23c91cfbbc9:abc2336d091894f5ead8af8836b89478@de-cn2.ghelper.net:443/#Frankfurt