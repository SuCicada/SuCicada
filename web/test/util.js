function all(...s) {
    res = []
    index = Array(s.length).fill(0)

    function loop(n) {
        if (n === index.length) {
            aa = []
            for (j = 0; j < s.length; j++) {
                aa.push(s[j][index[j]])
            }
            res.push(aa)
            return
        }
        for (let i = 0; i < s[n].length; i++) {
            index[n] = i
            // console.log("start ",n, i, index)
            loop(n + 1)
            // console.log("end   ",n, i, index)
        }
    }
    loop(0)
    return res
}

res = all([1, 2, 3, 5], ["af", "qer", "f"])
console.log(res)