Overload = function (fn_objs) {
    var is_match = function (x, y) {
        if (x === y) return true;
        if (x.indexOf("*") === -1) return false;

        var x_arr = x.split(","), y_arr = y.split(",");
        if (x_arr.length !== y_arr.length) return false;

        while (x_arr.length) {
            var x_first = x_arr.shift(), y_first = y_arr.shift();
            if (x_first !== "*" && x_first !== y_first) return false;
        }
        return true;
    };
    var ret = function () {
        var args = arguments
            , args_len = args.length
            , args_types = []
            , args_type
            , fn_objs = args.callee._fn_objs
            , match_fn = function () {
        };

        for (var i = 0; i < args_len; i++) {
            var type = typeof args[i];
            type === "object" && (args[i].length > -1) && (type = "array");
            args_types.push(type);
        }
        args_type = args_types.join(",");
        for (var k in fn_objs) {
            if (is_match(k, args_type)) {
                match_fn = fn_objs[k];
                break;
            }
        }
        return match_fn.apply(this, args);
    };
    ret._fn_objs = fn_objs;
    return ret;
};

String.prototype.format = Overload({
    "array": function (params) {
        var reg = /{(\d+)}/gm;
        return this.replace(reg, function (match, name) {
            return params[~~name];
        });
    }
    , "object": function (param) {
        var reg = /{([^{}]+)}/gm;
        return this.replace(reg, function (match, name) {
            return param[name];
        });
    }
});


function niceObject(obj) {
    // Object.prototype
    Object.defineProperties(obj,
        {
            "items": {
                value: () => {
                    console.log(obj)
                    return Object.entries(obj)
                }
                , configurable: true
            }
            , "empty": {
                value: () => {
                    return Object.keys(obj).length === 0
                }
                , configurable: true
            }
            , "set": {
                value: (k, v) => {
                    obj[k] = v
                    return obj
                }
                , configurable: true
            }
        }
    )
    return obj
}
