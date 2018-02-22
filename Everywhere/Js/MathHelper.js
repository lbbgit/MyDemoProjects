!function (root, namespace, className) {

    /* 公开静态方法 */

    namespace[className] = {
        get E() {
            return Math.E;
        },

        get Log10E() {
            return Math.LOG10E;
        },

        get Log2E() {
            return Math.LOG2E;
        },

        get Pi() {
            return Math.PI;
        },

        get PiOver2() {
            return Math.PI / 2;
        },

        get PiOver4() {
            return Math.PI / 4;
        },

        get TwoPi() {
            return Math.PI * 2;
        },

        getSingle: function () {
            var t = new Uint8Array(4);
            var dv = new DataView(t.buffer);
            return Jyo.Overload.create().
                      add("Number", function (num) {
                          /// <summary>获取单精度浮点数</summary>
                          /// <param name="num" type="Number">要进行转换的数</param>
                          /// <returns type="Number">转换后的数</returns>

                          dv.setUint32(0, num);
                          return dv.getFloat32(0);
                      });
        }(),

        precisionCorrect: Jyo.Overload.create().
                                   add("Number, Number", function (num, n) {
                                       /// <summary>精度修正函数</summary>
                                       /// <param name="num" type="Number">要转换的值</param>
                                       /// <param name="n" type="Number">要保留的精度</param>
                                       /// <returns type="Number">修正后的值</returns>

                                       var dd = 1;
                                       for (i = 0; i < n; i++) {
                                           dd *= 10;
                                       }
                                       return Math.round(num * dd) / dd;
                                   }),

        prefixInteger: Jyo.Overload.create().
                             add("Number, Number", function (num, length) {
                                 /// <summary>用0补全位数</summary>
                                 /// <param name="num" type="Number">要补全的数</param>
                                 /// <param name="length" type="Number">要补全的位数</param>
                                 /// <returns type="Number">补全后的数</returns>

                                 return (num / Math.pow(10, length)).toFixed(length).substr(2);
                             }),

        toRadian: Jyo.Overload.create().
                       add("Number", function (num) {
                           /// <summary>角度转弧度</summary>
                           /// <param name="num" type="Number">要转换的角度值</param>
                           /// <returns type="Number">转换后的弧度值</returns>

                           return num * Math.PI / 180;
                       }),

        toDegrees: Jyo.Overload.create().
                          add("Number", function (num) {
                              /// <summary>弧度转角度</summary>
                              /// <param name="num" type="Number">要转换的弧度值</param>
                              /// <returns type="Number">转换后的角度值</returns>

                              return num * 180 / Math.PI;
                          }),

        toUInt: Jyo.Overload.create().
                   add("Number", function (num) {
                       /// <summary>转换为32位无符号整数</summary>
                       /// <param name="num" type="Number">要转换的数</param>
                       /// <returns type="Number">转换后的数</returns>

                       return num < 0 ? num + 4294967296 : num;
                   }),

        bytes32: Jyo.Overload.create().
                      add("Number", function (num) {
                          /// <summary>转换为32位bytes</summary>
                          /// <param name="num" type="Number">要转换的数</param>
                          /// <returns type="Array">转换后的数组</returns>

                          return [(num >>> 24) & 0xff, (num >>> 16) & 0xff, (num >>> 8) & 0xff, num & 0xff];
                      }),

        bytes32sw: Jyo.Overload.create().
                          add("Number", function (num) {
                              /// <summary>转换为倒置32位bytes</summary>
                              /// <param name="num" type="Number">要转换的数</param>
                              /// <returns type="Array">转换后的数组</returns>

                              return [num & 0xff, (num >>> 8) & 0xff, (num >>> 16) & 0xff, (num >>> 24) & 0xff];
                          }),

        bytes16: Jyo.Overload.create().
                     add("Number", function (num) {
                         /// <summary>转换为16位bytes</summary>
                         /// <param name="num" type="Number">要转换的数</param>
                         /// <returns type="Array">转换后的数组</returns>

                         return [(num >>> 8) & 0xff, num & 0xff];
                     }),

        bytes16sw: Jyo.Overload.create().
                         add("Number", function (num) {
                             /// <summary>转换为倒置16位bytes</summary>
                             /// <param name="num" type="Number">要转换的数</param>
                             /// <returns type="Array">转换后的数组</returns>

                             return [num & 0xff, (num >>> 8) & 0xff];
                         }),

        barycentric: Jyo.Overload.create().
                           add("Number, Number, Number, Number, Number", function (value1, value2, value3, amount1, amount2) {
                               /// <summary>
                               /// 返回笛卡尔坐标的点中的一个轴是由给定的三角形和两个标准化的重心（面积）定义的坐标
                               /// </summary>
                               /// <param name="value1" type="Number">在限定的三角形的顶点1的一个轴的坐标</param>
                               /// <param name="value2" type="Number">在限定的三角形的顶点2的一个轴的坐标</param>
                               /// <param name="value3" type="Number">在限定的三角形的顶点3的一个轴的坐标</param>
                               /// <param name="amount1" type="Number">归一化的重心（面积）坐标B2，等于加权因子为顶点2，坐标其中中值2被指定</param>
                               /// <param name="amount2" type="Number">归一化的重心（面积）坐标B3，等于加权因子为顶点3，坐标其中中值3被指定</param>
                               /// <returns type="">相对于该轴线被使用的指定点的直角坐标</returns>

                               return value1 + (value2 - value1) * amount1 + (value3 - value1) * amount2;
                           }),

        catmullRom: Jyo.Overload.create().
                            add("Number, Number, Number, Number, Number", function (value1, value2, value3, value4, amount) {
                                /// <summary>
                                /// 使用指定位置的Catmull-Rom插值
                                /// </summary>
                                /// <param name="value1" type="Number">第一个插值位置</param>
                                /// <param name="value2" type="Number">第二个插值位置</param>
                                /// <param name="value3" type="Number">第三个插值位置</param>
                                /// <param name="value4" type="Number">第四个插值位置</param>
                                /// <param name="amount" type="Number">加权因子</param>
                                /// <returns type="Number">Catmull-Rom插值结果</returns>

                                var amountSquared = amount * amount;
                                var amountCubed = amountSquared * amount;
                                return 0.5 * (2 * value2 +
                                          (value3 - value1) * amount +
                                          (2 * value1 - 5 * value2 + 4 * value3 - value4) * amountSquared +
                                          (3 * value2 - value1 - 3 * value3 + value4) * amountCubed);
                            }),

        clamp: Jyo.Overload.create().
                   add("Number, Number, Number", function (value, min, max) {
                       /// <summary>
                       /// 限制值在指定范围内
                       /// </summary>
                       /// <param name="value" type="Number">要进行限定的值</param>
                       /// <param name="min" type="Number">最小值</param>
                       /// <param name="max" type="Number">最大值</param>
                       /// <returns type="Number">限定后的值</returns>

                       value = (value > max) ? max : value;
                       value = (value < min) ? min : value;
                       return value;
                   }),

        hermite: Jyo.Overload.create().
                     add("Number, Number, Number, Number, Number", function (value1, tangent1, value2, tangent2, amount) {
                         /// <summary>
                         /// 埃尔米特插值
                         /// </summary>
                         /// <param name="value1" type="Number">第一个值</param>
                         /// <param name="tangent1" type="Number">第一个正切值</param>
                         /// <param name="value2" type="Number">第二个值</param>
                         /// <param name="tangent2" type="Number">第二个正切值</param>
                         /// <param name="amount" type="Number">加权因子</param>
                         /// <returns type="Number">埃尔米特插值的结果</returns>

                         var v1 = value1, v2 = value2, t1 = tangent1, t2 = tangent2, s = amount, result;
                         var sCubed = s * s * s;
                         var sSquared = s * s;

                         switch (amount) {
                             case 0:
                                 result = value1;
                                 break;
                             case 1:
                                 result = value2;
                                 break;
                             default:
                                 result = (2 * v1 - 2 * v2 + t2 + t1) * sCubed +
                                 (3 * v2 - 3 * v1 - 2 * t1 - t2) * sSquared +
                                 t1 * s +
                                 v1;
                                 break;
                         }

                         return result;
                     }),

        lerp: Jyo.Overload.create().
                add("Number, Number, Number", function (value1, value2, amount) {
                    /// <summary>
                    /// 对两个值进行线性插值
                    /// </summary>
                    /// <param name="value1" type="Number">源值</param>
                    /// <param name="value2" type="Number">目标值</param>
                    /// <param name="amount" type="Number">加权因子</param>
                    /// <returns type="Number">线性插值结果</returns>

                    return value1 + (value2 - value1) * amount;
                }),

        smoothStep: Jyo.Overload.create().
                            add("Number, Number, Number", function (value1, value2, amount) {
                                /// <summary>
                                /// 使用三次方程对两个值进行插补
                                /// </summary>
                                /// <param name="value1" type="Number">源值1</param>
                                /// <param name="value2" type="Number">源值2</param>
                                /// <param name="amount" type="Number">加权因子</param>
                                /// <returns type="Number">插值结果</returns>

                                var result = this.clamp(amount, 0, 1);
                                result = this.hermite(value1, 0, value2, 0, result);

                                return result;
                            }),

        isPowerOfTwo: Jyo.Overload.create().
                                add("Number", function (value) {
                                    /// <summary>是否为2的幂</summary>
                                    /// <param name="value" type="Number">要判断的值</param>
                                    /// <returns type="Boolean" />

                                    return (value > 0) && ((value & (value - 1)) === 0);
                                })
    };

}(Jyo, Jyo.Utils, "MathHelper");