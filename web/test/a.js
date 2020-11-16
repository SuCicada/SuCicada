a = "僕の肋骨を蹴ってください"

vu = "445863.57696122"
var tu = function (a) {
    return function () {
        return a
    }
}
uu = function (a, b) {
    for (var c = 0; c < b.length - 2; c += 3) {
        var d = b.charAt(c + 2);
        d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d);
        d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
        a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
    }
    return a
}
wu = function (a) {
    if (null !== vu)
        var b = vu;
    else {
        b = tu(String.fromCharCode(84));
        var c = tu(String.fromCharCode(75));
        b = [b(), b()];
        b[1] = c();
        b = (vu = window[b.join(c())] || "") || ""
    }
    var d = tu(String.fromCharCode(116));
    c = tu(String.fromCharCode(107));
    d = [d(), d()];
    d[1] = c();
    c = "&" + d.join("") + "=";
    // console.log(b)
    d = b.split(".");
    b = Number(d[0]) || 0;
    for (var e = [], f = 0, g = 0; g < a.length; g++) {
        var h = a.charCodeAt(g);
        128 > h ? e[f++] = h : (2048 > h ? e[f++] = h >> 6 | 192 : (55296 == (h & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (h = 65536 + ((h & 1023) << 10) + (a.charCodeAt(++g) & 1023),
            e[f++] = h >> 18 | 240,
            e[f++] = h >> 12 & 63 | 128) : e[f++] = h >> 12 | 224,
            e[f++] = h >> 6 & 63 | 128),
            e[f++] = h & 63 | 128)
    }
    a = b;
    for (f = 0; f < e.length; f++)
        a += e[f],
            a = uu(a, "+-a^+6");
    a = uu(a, "+-3^+b+-f");
    a ^= Number(d[1]) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1E6;
    return c + (a.toString() + "." + (a ^ b))
};
Vd = function(a) {
    return encodeURIComponent(String(a))
}
tk = wu(a)
console.log(tk)
total = 1
idx = 0
ttsspeed = 0.6
// ie=UTF-8&q=%E8%84%9A%E6%9C%AC%E6%94%BB%E5%87%BB%E6%9D%A5&tl=ja&total=1&idx=0&textlen=5&tk=519340.73995&client=webapp&prev=input&ttsspeed=0.24{

res = "https://translate.google.com/translate_tts?" +
    "ie=UTF-8&" +
    "q=" + Vd(a) + "&" +
    "tl=ja&" +
    "total=" + total + "&" +
    "idx=" + idx + "&" +
    "textlen=" + a.length + "&" +
    "tk=" + tk + "&" +
    "client=webapp&" +
    "prev=input&" +
    "ttsspeed=" + ttsspeed

console.info(res)



