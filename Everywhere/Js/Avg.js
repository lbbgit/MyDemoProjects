(function (window, document, Jyo, undefined) {
    "use strict";

    Jyo.Avg = function () {
        /// <signature>
        /// <summary>Avg游戏对象构造函数</summary>
        /// <param name="content" type="Jyo.ContentManager">资源加载器</param>
        /// <param name="renderer" type="Jyo.Renderer">渲染器</param>
        /// <param name="devices" type="Array">设备列表</param>
        /// <returns type="Jyo.Avg" />
        /// </signature>

        /// <field name="showMessageSpeed" type="Number">显示消息的速度(字/毫秒)</field>

        Jyo.Object.call(this);

        // 命令列表
        this.commands = [];

        // 按钮列表
        this.buttons = [];

        // 资源列表
        this.resources = {};

        // 人物列表
        this.persons = [];

        // 分支列表
        this.branchList = [];

        // 变量列表
        this.varList = {};

        // 背景
        this.background = null;

        // 前景
        this.foreground = null;

        // 是否显示对话框
        this.showDialog = true;

        // 消息文本
        this.messageText = null;

        // 显示消息的速度(字/毫秒)
        this.showMessageSpeed = 5000;

        // 人物姓名
        this.nameText = null;

        // 当前运行的命令索引
        this.runIndex = -1;

        // 是否可以运行下一条语句
        this.canRunNext = true;

        constructor.apply(this, arguments);
    };

    function createDialogSettings(obj, rect, textRect, resName, fontName, font, color) {
        /// <summary>创建对话框设置</summary>
        /// <param name="obj" type="Object">保存对象</param>
        /// <param name="rect" type="Jyo.Rectangle">背景框矩形</param>
        /// <param name="textRect" type="Jyo.Rectangle">文字框矩形</param>
        /// <param name="resName" type="String">资源在保存对象中的名称</param>
        /// <param name="fontName" type="String">字体在保存对象中的名称</param>
        /// <param name="font" type="String">字体</param>
        /// <param name="color" type="Jyo.Color">颜色对象</param>
        /// <returns type="Object" />

        var resource = obj[resName];
        if (resource instanceof Array) {
            var _resources = resource;
            resource = _resources[0];
        }
        var obj = {
            rectangle: rect,
            textRectangle: textRect,
            get resource() { return resource; },
            set resource(value) {
                var list = _resources instanceof Array ? value : [value];
                for (var i = 0; i < list.length; i++) {
                    if (typeof list[i] == "string") {
                        list[i] = content.load(list[i]);
                    } else if (list[i] instanceof Jyo.Xnb || list[i] instanceof Jyo.Color) {
                        list[i] = list[i];
                    } else {
                        list[i] = null;
                    }
                }
                resource = list[0];
                _resources instanceof Array && (obj._resources = list);
            },
            get font() {
                return obj[fontName];
            },
            set font(value) {
                this.charSize = renderer.getTextSize("测", value);
                this.twoCharSize = renderer.getTextSize("测试", value);
                this.twoCharTwoLineSize = renderer.getTextSize("测试<br/>测试", value);
                obj[fontName] = value;
            },
            textColor: color
        };
        obj.font = font;
        obj._resources = _resources;
        return obj;
    }

    // 创建Avg游戏框架对象构造器
    var constructor = Jyo.overload().
                               add("Jyo.ContentManager, Jyo.Renderer, Array", function (content, renderer, devices) {
                                   /// <summary>Avg游戏对象构造函数</summary>
                                   /// <param name="content" type="Jyo.ContentManager">资源加载器</param>
                                   /// <param name="renderer" type="Jyo.Renderer">渲染器</param>
                                   /// <param name="devices" type="Array">设备列表</param>

                                   var _this = this;

                                   // 设置资源加载器对象
                                   this.content = content;

                                   // 设置渲染器对象
                                   this.renderer = renderer;

                                   var settingsObj = {
                                       // 消息对话框资源
                                       messageDialogResource: new Jyo.Color("rgba(100,149,237,0.6)"),
                                       // 消息对话框字体
                                       messageDialogFont: null,
                                       // 名称框资源
                                       nameDialogResrouce: new Jyo.Color("rgba(100,149,237,0.6)"),
                                       // 消息对话框字体
                                       nameDialogFont: null,
                                       // 系统框
                                       systemMessageDialogResource: new Jyo.Color("rgba(100,149,237,0.6)"),
                                       // 系统框字体
                                       systemMessageDialogFont: null,
                                       // 选择框
                                       branchDialogResource: [new Jyo.Color("rgba(100,149,237,0.6)"), new Jyo.Color("rgba(178,100,234,0.6)")],
                                       // 选择框字体
                                       branchMessageDialogFont: null
                                   };

                                   // 设置
                                   this.settings = {
                                       // 对话框设置
                                       messageDialog: createDialogSettings(settingsObj,
                                                                                                new Jyo.Rectangle(20, renderer.height - 120, renderer.width - 40, 100),
                                                                                                new Jyo.Rectangle(20, renderer.height - 120, renderer.width - 40, 100),
                                                                                                "messageDialogResource",
                                                                                                "messageDialogFont",
                                                                                                "Bold 20px 新宋体",
                                                                                                Jyo.Colors.white),
                                       // 名称框设置
                                       nameDialog: createDialogSettings(settingsObj,
                                                                                            new Jyo.Rectangle(20, renderer.height - 150, 180, 30),
                                                                                            new Jyo.Rectangle(20, renderer.height - 120, renderer.width - 40, 100),
                                                                                            "nameDialogResrouce",
                                                                                            "nameDialogFont",
                                                                                            "Bold 24px 新宋体",
                                                                                            Jyo.Colors.white),
                                       // 系统对话框设置
                                       systemMessageDialog: createDialogSettings(settingsObj,
                                                                                                           new Jyo.Rectangle(20, renderer.height - 120, renderer.width - 40, 100),
                                                                                                           new Jyo.Rectangle(20, renderer.height - 120, renderer.width - 40, 100),
                                                                                                           "systemMessageDialogResource",
                                                                                                           "systemMessageDialogFont",
                                                                                                           "Bold 20px 新宋体",
                                                                                                           Jyo.Colors.white),
                                       // 分支对话框设置
                                       branchDialog: createDialogSettings(settingsObj,
                                                                                              new Jyo.Rectangle(0, 0, 503, 72),
                                                                                              new Jyo.Rectangle(0, 0, 503, 72),
                                                                                              "branchDialogResource",
                                                                                              "branchMessageDialogFont",
                                                                                              "Bold 20px 新宋体",
                                                                                              Jyo.Colors.white)
                                   };

                                   this.settings.branchDialog.layout = "top2bottom";

                                   // 转场动画
                                   this._transition = new Jyo.Transition(renderer);

                                   this._transition.addEventListener("begin", function () {
                                       /// <summary>转场动画开始</summary>

                                       _this.canRunNext = false;
                                   }, false);

                                   this._transition.addEventListener("end", function () {
                                       /// <summary>转场动画结束</summary>

                                       _this.canRunNext = true;

                                       var currentCommand = _this.commands[this.runIndex];
                                       var nextCommand = _this.commands[this.runIndex + 1];

                                       // 判断是否需要自执行下条命令
                                       if (!!nextCommand && (!!nextCommand.auto || !!currentCommand.auto) && !_this.messageText) _this.runNext(false);
                                   }, false);

                                   // 设备列表
                                   this.devices = devices;

                                   Jyo.Application.addEventListener("ready", function () {
                                       if (devices[-1] == "ok") return;
                                       devices[-1] = "ok";
                                       // 根据设备绑定事件
                                       devices.forEach(function (obj, index) {
                                           if (obj instanceof Jyo.Pointer) {
                                               bindPointer.call(_this, obj);
                                           } else if (obj instanceof Jyo.Keys) {

                                           }
                                       });
                                   }, false);
                               });

    Jyo.Avg.prototype = new Jyo.Object({
        loadScript: Jyo.overload().
                         add("Array", function (data) {
                             /// <summary>加载脚本</summary>
                             /// <param name="data" type="Array">命令列表</param>

                             var _this = this;

                             // 重置执行索引
                             this.runIndex = -1;

                             // 绑定资源加载完成事件
                             _this.content.addEventListener("load", function contentLoaded() {
                                 _this.runNext(false);
                                 _this.content.removeEventListener("load", contentLoaded, false);
                             }, false);

                             // 加载所有外部资源
                             for (var i = 0; i < data.length; i++) {
                                 var resource = data[i].data.resource;
                                 if (!!resource && !_this.resources[resource]) _this.resources[resource] = this.content.load(resource);
                             }

                             _this.commands = data;
                         }),
        runNext: Jyo.overload().
                      add("Boolean", function (isUserClick) {
                          /// <summary>执行下一个命令</summary>
                          /// <param name="isUserClick" type="Boolean">是否为用户触发</param>

                          if (!this.canRunNext) return;

                          if (isUserClick) {
                              if (this.messageText != null) {
                                  if (this.messageText != this._messageText) {
                                      this.messageText = this._messageText;
                                      return;
                                  } else {
                                      this.messageText = null;
                                      this.nameText = null;
                                  }
                              }

                          }

                          this.runIndex++;

                          // 如果执行完了则触发结束事件
                          if (this.runIndex >= this.commands.length) return this.fireEvent("end");

                          var command = this.commands[this.runIndex];

                          // 执行操作函数
                          operateFuns[command.action].call(this, command);

                          var nextCommand = this.commands[this.runIndex + 1];

                          // 判断是否需要自执行下条命令
                          if (!!nextCommand) {
                              if (command.action == "branch" && nextCommand.action == "condition") return;
                              if ((!!nextCommand.auto || !!command.auto) && !this.messageText) this.runNext(false);
                          }
                      }),
        setButton: Jyo.overload().
                        add("String, Array, Number, Number, Boolean, Function", function (tag, resources, x, y, onlyMessage, fun) {
                            /// <summary>设置按钮</summary>
                            /// <param name="tag" type="String">标识符</param>
                            /// <param name="resources" type="Array<String>">资源名称列表</param>
                            /// <param name="x" type="Number">X坐标</param>
                            /// <param name="y" type="Number">Y坐标</param>
                            /// <param name="onlyMessage" type="Boolean">是否只在对话框中显示</param>
                            /// <param name="fun" type="Function">执行函数</param>

                            var btn = {};

                            for (var i = 0; i < resources.length; i++) {
                                if (!this.resources[resources[i]]) this.resources[resources[i]] = this.content.load(resources[i]);
                            }
                            btn.tag = tag;
                            btn.resource = resources[0];
                            btn.vec2 = { x: x, y: y };
                            btn._resources = resources;
                            btn.onlyMessage = !!onlyMessage;
                            btn.fun = fun;
                            this.buttons.push(btn);
                        }),
        draw: Jyo.overload().
                  add("Number", function (currentTime) {
                      /// <summary>绘制</summary>
                      /// <param name="currentTime" type="Number">当前时间</param>

                      // 缓存渲染器
                      var renderer = this.renderer;

                      drawBackground.call(this, currentTime);

                      drawPersons.call(this, currentTime);

                      drawForeground.call(this, currentTime);

                      if (this.nameText != null) {
                          // 绘制人物说话对话框

                          drawMessage.call(this, currentTime, this.messageText, this.settings.messageDialog, true);
                          drawMessage.call(this, currentTime, this.nameText, this.settings.nameDialog, false);
                      } else if (this.messageText != null) {
                          // 绘制系统对白对话框

                          drawMessage.call(this, currentTime, this.messageText, this.settings.systemMessageDialog, true);
                      }

                      if (this.branchList.length) {
                          // 绘制分支选项

                          drawBranch.call(this, currentTime);
                      }

                      !this._dontDrawButtons && drawButtons.call(this, currentTime);

                      this._transition.draw();
                  }),
        update: Jyo.overload().
                     add("Number", function (currecntTime) {
                         /// <summary>更新</summary>
                         /// <param name="currentTime" type="Number">当前时间</param>

                         updateMessage.call(this, currecntTime);

                         this._transition.update(currecntTime);
                     })
    });

    // 操作函数表
    var operateFuns = {
        setBGM: function (command) {
            /// <summary>设置背景音乐</summary>
            /// <param name="command" type="Object">命令对象</param>

            if (!command.data.url) {
                // 没有路径则停止播放音乐

                Jyo.MediaPlayer.stop();
                return;
            }

            var song = Jyo.Song.fromUri(command.data.url);

            song.isLoop = true;

            function playMusic() {
                Jyo.MediaPlayer.play(song);
                document.removeEventListener("touchstart", playMusic, false);
            }

            song.addEventListener("play", function () {
                document.removeEventListener("touchstart", playMusic, false);
            });
            document.addEventListener("touchstart", playMusic, false);
            Jyo.MediaPlayer.play(song);
        },
        setBackground: function (command) {
            /// <summary>设置背景</summary>
            /// <param name="command" type="Object">命令对象</param>

            if (!!command.data.resource) {
                // 设置背景为图片

                this.background = this.resources[command.data.resource];
            } else if (!!command.data.color) {
                // 设置背景为颜色

                this.background = new Jyo.Color(command.data.color);
            } else {
                // 设置背景为空

                this.background = null;
            }
            // 强制绘制一次
            // 避免后续操作受影响
            this.draw(0);
        },
        setForeground: function (command) {
            /// <summary>设置前景</summary>
            /// <param name="command" type="Object">命令对象</param>

            if (!!command.data.resource) {
                // 设置前景为图片

                this.foreground = this.resources[command.data.resource];
            } else if (!!command.data.color) {
                // 设置前景为颜色

                this.foreground = new Jyo.Color(command.data.color);
            } else {
                // 设置前景为空

                this.foreground = null;
            }
            // 强制绘制一次
            // 避免后续操作受影响
            this.draw(0);
        },
        addPerson: function (command) {
            /// <summary>添加/替换人物</summary>
            /// <param name="command" type="Object">命令对象</param>

            // 添加前去重id重复人物
            operateFuns.removePerson.call(this, command);

            var p = this.persons[command.data.id] = command.data,
                    img = this.resources[p.resource],
                    w = img.width,
                    h = img.height,
                    cw = this.renderer.width,
                    ch = this.renderer.height;

            p._opacity = 0;
            p.opacity = p.opacity || 1;
            p.isExiting = false;

            if (typeof p.scale == "object") {
                // 计算缩放值

                w *= (p.scale.x || 1),
                h *= (p.scale.y || 1);
            }

            p.width = w,
            p.height = h;

            // 指示用户是否有自定义坐标
            var isPosition = typeof p.position == "object";

            if (isPosition && typeof p.position.x == "number") {
                p.x = p.position.x;
            } else {
                switch (p.location) {
                    case "left":
                        p.x = (cw >> 2) - (w >> 1);
                        break;
                    case "center":
                        p.x = (cw - w) >> 1;
                        break;
                    case "right":
                        p.x = cw - ((cw >> 2) - (w >> 1)) - w;
                        break;
                    default:
                        p.x = 0;
                        break;
                }
            }

            if (isPosition && typeof p.position.y == "number") {
                p.y = p.position.y;
            } else {
                p.y = ch - h;
            }
        },
        removePerson: function (command) {
            /// <summary>移除人物</summary>
            /// <param name="command" type="Object">命令对象</param>

            var ps = this.persons;

            for (var i = ps.length; i--;) {
                if (ps[i].id == command.data.id) {
                    ps[i].isExiting = true;
                    break;
                }
            }
        },
        message: function (command) {
            /// <summary>显示消息</summary>
            /// <param name="command" type="Object">命令对象</param>

            this.messageText = command.data.text || "";
            this.nameText = command.data.name || null;
            var sd = command.data.showDialog;
            this.showDialog = typeof sd != "undefined" ? !!sd : true;

            /* 
                检测是否一次性无法显示完所有文字
                若是，则分隔并添加到下一次显示
            */
            var settings = this.nameText ? this.settings.messageDialog : this.settings.systemMessageDialog;
            var textSize = settings.twoCharTwoLineSize;
            var textColumn = settings.textColumn = (((settings.textRectangle.width) / (textSize.width / 2)) | 0),
                   textRow = settings.textRow = ((settings.textRectangle.height) / (textSize.height / 2)) | 0;
            var maxLength = settings.maxLength = textColumn * textRow;

            // 分隔为多行
            var newTempStr = [];
            var tempStr = this.messageText.split(/\r\n|\r|\n/ig);
            for (var i = 0; i < tempStr.length; i++) {
                tempStr[i] = tempStr[i].cutString(textColumn);
                newTempStr = newTempStr.concat(tempStr[i]);
            }

            // 根据行数进行分页
            var index = 0;
            var str;
            for (var n = textRow; n < newTempStr.length; n += textRow) {
                if (newTempStr.length - n < textRow) str = newTempStr.slice(n);
                else str = newTempStr.slice(n, n + textRow);

                this.commands.insert(this.runIndex + (index + 1), { action: "message", auto: 0, data: { name: command.data.name, text: str.join("\r\n"), showDialog: sd } });
                index++;
            }

            // 重新设置当前文本
            this.messageText = [""];
            this._messageText = newTempStr.slice(0, textRow);
            this._messageBeginTime = null;
        },
        transition: function (command) {
            /// <summary>过渡动画</summary>
            /// <param name="command" type="Object">命令对象</param>

            this._dontDrawButtons = true;
            this.draw.call(this, Jyo.Application._lastTime);
            this._dontDrawButtons = false;

            this._transition.begin(this.resources[command.data.resource].object, command.data.time, command.data.delay);
        },
        script: function (command) {
            /// <summary>自定义脚本</summary>
            /// <param name="command" type="Object">命令对象</param>

            command.data.call(this);
        },
        branch: function (command) {
            /// <summary>分支</summary>
            /// <param name="command" type="Object">命令对象</param>

            var renderer = this.renderer,
                settings = this.settings.branchDialog,
                rectangle = settings.rectangle,
                font = settings.font,
                bl, b;

            bl = this.branchList = command.data.options;

            var globalRectY = (renderer.height - (rectangle.height * bl.length + rectangle.height * 0.25 * (bl.length - 1))) / 2;
            for (var i = 0; i < bl.length; i++) {
                b = bl[i];

                // 计算分支框显示位置
                switch (settings.layout = (command.data.layout || "top2bottom")) {
                    case "top2bottom":
                        b.rectX = (renderer.width - rectangle.width) / 2;
                        b.rectY = globalRectY + rectangle.height * i + rectangle.height * 0.25 * i;
                        break;
                }

                // 计算文字显示位置
                var textSize = renderer.getTextSize(b.text, font);
                b.x = b.rectX + settings.textRectangle.x + (settings.rectangle.width - textSize.width) / 2,
                b.y = b.rectY + settings.textRectangle.y + (settings.rectangle.height - textSize.height) / 2;
            }
        },
        variable: function (command) {
            /// <summary>设定变量</summary>
            /// <param name="command" type="Object">命令对象</param>

            this.varList[command.data.name] = command.data.value;
        },
        condition: function (command) {
            /// <summary>条件判断</summary>
            /// <param name="command" type="Object">命令对象</param>

            var ops = command.data.options,
                 opt;
            for (var i = 0; i < ops.length; i++) {
                opt = ops[i];
                var value = this.varList[opt.name];
                if ((typeof opt.expression == "function" && opt.expression()) || eval(value + opt.expression)) {
                    if (opt.actions instanceof Array) {
                        this.commands.insert(this.runIndex + 1, opt.actions);
                    }
                    break;
                }
            }
        }
    };

    function bindPointer(obj) {
        /// <summary>绑定指针事件</summary>
        /// <param name="obj" type="Jyo.Pointer">指针对象</param>

        var _this = this;
        var testRect = new Jyo.Rectangle(0, 0, 1, 1);

        obj.addEventListener("pointerstart", function (e) {
            /// <summary>指针按下事件</summary>

            if (!_this.canRunNext) return;

        }, false);

        obj.addEventListener("pointermove", function (e) {
            /// <summary>指针移动事件</summary>

            if (!_this.canRunNext) return;

            testRect.x = e[0].x;
            testRect.y = e[0].y;

            hoverButton.call(_this, testRect);
            hoverBranch.call(_this, testRect);
        }, false);

        obj.addEventListener("pointerend", function (e) {
            /// <summary>指针抬起事件</summary>

            if (!_this.canRunNext) return;

            testRect.x = e[0].x;
            testRect.y = e[0].y;

            if (e[0].id == -3) {
                // 按下右键弹出菜单

                return;
            }

            if (clickButton.call(_this, testRect)) return;

            if (!_this.branchList.length || (_this.branchList.length && clickBranch.call(_this, testRect))) {
                _this.runNext(true);
            }
        }, false);
    }

    function hoverButton(testRect) {
        /// <summary>检查按钮悬停</summary>
        /// <param name="testRect" type="Jyo.Rectangle">测试矩形，鼠标</param>

        var bs = this.buttons;
        var resource, b;
        var isShowMessage = !!this.messageText;
        for (var i = bs.length; i--;) {
            b = bs[i];
            resource = this.resources[b.resource];
            if ((!b.onlyMessage || b.onlyMessage && isShowMessage) && testRect.intersectsWith(b.vec2.x, b.vec2.y, resource.width, resource.height)) {
                b.resource = b._resources[1];
            } else {
                b.resource = b._resources[0];
            }
        }
    }

    function hoverBranch(testRect) {
        /// <summary>检查分支悬停</summary>
        /// <param name="testRect" type="Jyo.Rectangle">测试矩形，鼠标</param>

        var settings = this.settings.branchDialog,
            rectangle = settings.rectangle,
            bl = this.branchList,
            b;

        for (var i = 0; i < bl.length; i++) {
            b = bl[i];

            if (testRect.intersectsWith(b.rectX, b.rectY, rectangle.width, rectangle.height)) {
                b.resource = settings._resources[1];
            } else {
                b.resource = settings._resources[0];
            }
        }
    }

    function clickButton(testRect) {
        /// <summary>点击按钮</summary>
        /// <param name="testRect" type="Jyo.Rectangle">测试矩形，鼠标</param>
        /// <returns type="Boolean" />

        var bs = this.buttons;
        var resource, b;

        var isShowMessage = !!this.messageText;
        var isBreak = false;
        for (var i = bs.length; i--;) {
            b = bs[i];
            resource = this.resources[b.resource];
            if ((!b.onlyMessage || b.onlyMessage && isShowMessage) && testRect.intersectsWith(b.vec2.x, b.vec2.y, resource.width, resource.height)) {
                b.fun && b.fun();
                isBreak = true;
            }
            b.resource = b._resources[0];
        }
        return isBreak;
    }

    function clickBranch(testRect) {
        /// <summary>点击分支</summary>
        /// <param name="testRect" type="Jyo.Rectangle">测试矩形，鼠标</param>
        /// <returns type="Boolean" />

        var settings = this.settings.branchDialog,
            rectangle = settings.rectangle,
            bl = this.branchList,
            b;

        for (var i = 0; i < bl.length; i++) {
            b = bl[i];

            if (testRect.intersectsWith(b.rectX, b.rectY, rectangle.width, rectangle.height)) {
                if (b.actions instanceof Array) {
                    this.commands.insert(this.runIndex + 1, b.actions);
                }
                bl.length = 0;
                return true;
            }
        }
        return false;
    }

    function drawBackground(currentTime) {
        /// <summary>绘制背景</summary>
        /// <param name="currentTime" type="Number">当前时间</param>

        var renderer = this.renderer;

        if (!this.background) {
            renderer.clear();
            return;
        }

        if (this.background instanceof Jyo.Xnb) {
            // 若存在背景图片则绘制

            renderer.drawImage(this.background, 0, 0, renderer.width, renderer.height);
        } else if (this.background instanceof Jyo.Color) {
            // 若存在背景颜色则绘制矩形

            renderer.fillRect(0, 0, renderer.width, renderer.height, this.background);
        }
    }

    function drawForeground(currentTime) {
        /// <summary>绘制前景</summary>
        /// <param name="currentTime" type="Number">当前时间</param>

        var renderer = this.renderer;

        if (this.foreground instanceof Jyo.Xnb) {
            // 若存在前景图片则绘制

            renderer.drawImage(this.foreground, 0, 0, renderer.width, renderer.height);
        } else if (this.foreground instanceof Jyo.Color) {
            // 若存在前景颜色则绘制矩形

            renderer.fillRect(0, 0, renderer.width, renderer.height, this.foreground);
        }
    }

    function drawPersons(currentTime) {
        /// <summary>绘制人物</summary>
        /// <param name="currentTime" type="Number">当前时间</param>

        var renderer = this.renderer;
        var p;
        for (var i = 0; i < this.persons.length; i++) {
            p = this.persons[i];

            if (p._opacity != p.opacity) {
                if (currentTime % 2 == 0) {
                    if (!p.isExiting) {
                        // 人物正在显示
                        p._opacity += 0.1;
                        if (p._opacity >= p.opacity) p._opacity = p.opacity;
                    } else {
                        // 人物正在消失
                        p._opacity -= 0.1;
                        if (p._opacity <= 0) {
                            this.persons.remove(i--);
                            continue;
                        }
                    }
                }
            }

            renderer.drawImage(this.resources[p.resource], p.x, p.y, p.width, p.height, p._opacity);
        }
    }

    function drawMessage(currentTime, text, settings, canWordBreak) {
        /// <summary>绘制消息</summary>
        /// <param name="currentTime" type="Number">当前时间</param>
        /// <param name="text" type="String">绘制文本</param>
        /// <param name="settings" type="Object">对话框设置</param>
        /// <param name="canWordBreak" type="Boolean">是否允许换行</param>

        var renderer = this.renderer,
                x = settings.textRectangle.x,
                y = settings.textRectangle.y,
                font = settings.font;

        if (this.showDialog) {
            if (settings.resource instanceof Jyo.Color) {
                renderer.fillRect(settings.rectangle, settings.resource);
            } else if (settings.resource instanceof Jyo.Xnb) {
                renderer.drawImage(settings.resource, settings.rectangle);
            }
        }

        if (!canWordBreak) {
            var textSize = renderer.getTextSize(text, font);
            x += (settings.rectangle.width - textSize.width) / 2;
            y += (settings.rectangle.height - textSize.height) / 2;
            renderer.drawText(text, x, y, settings.textColor, font);
        } else {
            // 根据lineHeight优化排版
            var lineHeight = settings.textRectangle.height / settings.textRow;
            for (var i = 0; i < text.length; i++) {
                renderer.drawText(text[i], x, y + lineHeight * i, settings.textColor, font);
            }
        }
    }

    function updateMessage(currentTime) {
        /// <summary>更新消息</summary>
        /// <param name="currentTime" type="Number">当前时间</param>

        var _mt = this._messageText;
        var mt = this.messageText;

        var showMessageIndex = 0;
        var showMessageRow = 0;

        if (mt == null || _mt == mt) return;

        for (var i = mt.length; i--; mt[i] = "");

        if (!this._messageBeginTime) {
            this._messageBeginTime = currentTime;
            return;
        }

        var timeSpan = currentTime - this._messageBeginTime;
        var maxLength = this.settings.messageDialog.maxLength || this.settings.systemMessageDialog.maxLength;

        if (timeSpan < this.showMessageSpeed) {
            var num = ((timeSpan / this.showMessageSpeed * maxLength) | 0);
            while (num--) {
                if (typeof _mt[showMessageRow] == "undefined") {
                    this.messageText = this._messageText;
                    break;
                }
                mt[showMessageRow] += _mt[showMessageRow][showMessageIndex];
                showMessageIndex++;
                if (mt[showMessageRow].length >= _mt[showMessageRow].length) {
                    showMessageRow++;
                    showMessageIndex = 0;
                    this.messageText[showMessageRow] = "";
                }
            }
        } else {
            this.messageText = this._messageText;
        }
    }

    function drawBranch(currentTime) {
        /// <summary>绘制分支</summary>
        /// <param name="currentTime" type="Number">当前时间</param>

        var renderer = this.renderer,
            settings = this.settings.branchDialog,
            rectangle = settings.rectangle,
            font = settings.font,
            bl = this.branchList,
            b, res;

        // 上下居中全局增量
        var globalRectY = (renderer.height - (rectangle.height * bl.length + rectangle.height * 0.25 * (bl.length - 1))) / 2;
        for (var i = 0; i < bl.length; i++) {
            b = bl[i];
            res = b.resource || settings.resource;

            rectangle.x = b.rectX;
            rectangle.y = b.rectY;
            if (res instanceof Jyo.Color) {
                renderer.fillRect(rectangle, res);
            } else if (res instanceof Jyo.Xnb) {
                renderer.drawImage(res, rectangle);
            }

            renderer.drawText(b.text, b.x, b.y, settings.textColor, font);
        }
    }

    function drawButtons(currentTime) {
        /// <summary>绘制按钮</summary>
        /// <param name="currentTime" type="Number">当前时间</param>

        var renderer = this.renderer;
        var isShowMessage = !!this.messageText;
        var bs = this.buttons;
        var btn;
        var len = bs.length;
        while (len--) {
            btn = bs[len];
            (!btn.onlyMessage || btn.onlyMessage && isShowMessage) && renderer.drawImage(this.resources[btn.resource], btn.vec2.x, btn.vec2.y);
        }
    }

})(window, document, Jyo);