!function (root, namespace, className) {

    /* 别名 */

    var using = Jyo.using({
        MathHelper: "Jyo.Utils.MathHelper"
    });

    /* 公开静态方法 */

    namespace[className] = {
        shuffle: Jyo.Overload.create().
                    add("Array", function (arr) {
                        /// <summary>把数组中的元素按随机顺序重新排列&#10;该函数会修改原始数组</summary>
                        /// <param name="arr" type="Array">要操作的数组</param>

                        for (var i = arr.length - 1; i > 0; i--) {
                            var j = Math.floor(Math.random() * (i + 1));
                            var temp = arr[i];
                            this[i] = arr[j];
                            this[j] = temp;
                        }
                    }),

        clone: Jyo.Overload.create().
                  add("Array", function (arr) {
                      /// <summary>
                      /// 创建一个数组的浅副本
                      /// <param name="arr" type="Array">要拷贝的数组</param>
                      /// <returns type="Array">数组副本</returns>
                      /// </summary>

                      var newArr = [];
                      for (var i = 0; i < arr.length; i++) {
                          newArr[i] = arr[i];
                      }
                      return newArr;
                  }),

        insert: Jyo.Overload.create().
                  add("Array, Number, any", function (arr, index, value) {
                      /// <summary>插入项&#10;该函数会修改原始数组</summary>
                      /// <param name="arr" type="Array">要操作的数组</param>
                      /// <param name="index" type="Number">索引</param>
                      /// <param name="value" type="Object">元素</param>

                      if (index > arr.length) index = arr.length;
                      if (index < -arr.length) index = 0;
                      if (index < 0) index = arr.length + index;
                      for (var i = arr.length; i > index; i--) {
                          arr[i] = arr[i - 1];
                      }
                      arr[index] = value;
                  }).
                  add("Array, Number, Array", function (arr, index, value) {
                      /// <summary>插入数组&#10;该函数会修改原始数组</summary>
                      /// <param name="arr" type="Array">要操作的数组</param>
                      /// <param name="index" type="Number">索引</param>
                      /// <param name="value" type="Array">要插入的数组</param>

                      Array.prototype.splice.apply(arr, [index, 0].concat(value));
                  }),

        remove: Jyo.Overload.create().
                     add("Array, any", function (arr, item) {
                         /// <summary>移除项&#10;该函数会修改原始数组</summary>
                         /// <param name="arr" type="Array">要操作的数组</param>
                         /// <param name="item" type="Object">要移除的项</param>
                         /// <returns type="Boolean">是否找到匹配项并移除</returns>

                         for (var i = 0; i < arr.length; i++) {
                             if (arr[i] === item) {
                                 this.removeAt(arr, i);
                                 return true;
                             }
                         }
                         return false;
                     }),

        removeAt: Jyo.Overload.create().
                         add("Array, Number", function (arr, index) {
                             /// <summary>根据索引移除项&#10;该函数会修改原始数组</summary>
                             /// <param name="arr" type="Array">要操作的数组</param>
                             /// <param name="index" type="Number">索引</param>

                             if (isNaN(index) || index > arr.length) {
                                 return;
                             }
                             arr.splice(index, 1);
                         }),

        pdf2cdf: Jyo.Overload.create().
                      add("Array", function (arr) {
                          /// <summary>将概率密度转换为累计分布</summary>
                          /// <param name="arr" type="Array">要操作的数组</param>
                          /// <returns type="Array">累计分布数组</returns>

                          var cdf = arr.slice();

                          for (var i = 1; i < cdf.length - 1; i++) {
                              cdf[i] += cdf[i - 1];
                          }

                          cdf[cdf.length - 1] = 1;

                          return cdf;
                      }),

        discreteSampling: Jyo.Overload.create().
                                    add("Array", function (arr) {
                                        /// <summary>对数组进行离散采样</summary>
                                        /// <param name="arr" type="Array">要采样的数组</param>
                                        /// <returns type="Number">采样结果</returns>

                                        var y = Math.random();
                                        for (var x in arr) {
                                            if (y < arr[x]) {
                                                return x;
                                            }
                                        }

                                        return -1;
                                    }),

        random: Jyo.Overload.create().
                      add("Array", function (arr) {
                          /// <summary>随机抽取元素</summary>
                          /// <param name="arr" type="Array">要操作的数组</param>
                          /// <returns type="Object">随机出的元素</returns>

                          return arr[Math.floor(Math.random() * arr.length)];
                      }).
                      add("Array, Array", function (arr, probabilityTable) {
                          /// <summary>随机抽取元素</summary>
                          /// <param name="arr" type="Array">要操作的数组</param>
                          /// <param name="probabilityTable" type="Array">概率数组(长度必须和本数组一致并且总数为1)</param>
                          /// <returns type="Object">随机出的元素</returns>

                          if (arr.length !== probabilityTable.length) {
                              throw new Error("Length inconsistent");
                          }

                          var targetCdf = this.pdf2cdf(probabilityTable);
                          return arr[this.discreteSampling(targetCdf)];
                      }),

        adler32: Jyo.Overload.create().
                     add("Array, Number, Number", function (arr, start, len) {
                         /// <summary>计算Adler32校验和</summary>
                         /// <param name="arr" type="Array">要操作的数组</param>
                         /// <param name="start" type="Number">起始位置</param>
                         /// <param name="len" type="Number">长度</param>
                         /// <returns type="Number">计算结果</returns>

                         switch (arguments.length) { case 0: start = 0; case 1: len = arr.length - start; }
                         var a = 1, b = 0;
                         for (var i = 0; i < len; i++) {
                             a = (a + arr[start + i]) % 65521; b = (b + a) % 65521;
                         }
                         return using.MathHelper.toUInt((b << 16) | a);
                     }),

        crc32: Jyo.Overload.create().
                  add("Array, Number, Number", function (arr, start, len) {
                      /// <summary>计算CRC32校验和</summary>
                      /// <param name="arr" type="Array">要操作的数组</param>
                      /// <param name="start" type="Number">起始位置</param>
                      /// <param name="len" type="Number">长度</param>
                      /// <returns type="Number">计算结果</returns>

                      switch (arguments.length) { case 0: start = 0; case 1: len = arr.length - start; }
                      var table = arguments.callee.crctable;
                      if (!table) {
                          table = [];
                          var c;
                          for (var n = 0; n < 256; n++) {
                              c = n;
                              for (var k = 0; k < 8; k++)
                                  c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
                              table[n] = using.MathHelper.toUInt(c);
                          }
                          arguments.callee.crctable = table;
                      }
                      var c = 0xffffffff;
                      for (var i = 0; i < len; i++) c = table[(c ^ arr[start + i]) & 0xff] ^ (c >>> 8);
                      return using.MathHelper.toUInt(c ^ 0xffffffff);
                  })
    };

}(Jyo, Jyo.Utils, "ArrayHelper");