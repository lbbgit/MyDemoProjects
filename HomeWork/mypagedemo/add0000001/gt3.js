/*
(function() {
    var lang = "en";
    var $ = function(id) { return document.getElementById(id); }
    var Tasks = {
        show: function(obj) {
            obj.className = '';
            return this;
        },
        hide: function(obj) {
            obj.className = 'hide';
            return this;
        },
        //STORE dom
        $addItemDiv: $('addItemDiv'),
        $addItemInput: $('addItemInput'),
        $txtTaskTitle: $('txtTaskTitle'),
        $taskItemList: $('taskItemList'),
        //POINTER
        index: window.localStorage.getItem('Tasks:index'),
        //INIT
        init: function() {
            if (!Tasks.index) {
                window.localStorage.setItem('Tasks:index', Tasks.index = 0);
            }
            //INIT EVENT
            //OPEN ADD INPUT TEXTBOX 
            Tasks.$addItemDiv.addEventListener('click', function() {
                Tasks.show(Tasks.$addItemInput).hide(Tasks.$addItemDiv);
                Tasks.$txtTaskTitle.focus();
            }, true);
            //ENTER TO ADD
            Tasks.$txtTaskTitle.addEventListener('keyup', function(ev) {
                var ev = ev || window.event;
                if (ev.keyCode == 13) {
                    var task = {
                        id: 0,
                        task_item: $('txtTaskTitle').value,
                        add_time: new Date(),
                        is_finished: false
                    };
                    Tasks.Add(task);
                    Tasks.AppendHtml(task);
                    Tasks.$txtTaskTitle.value = '';
                    Tasks.hide(Tasks.$addItemInput).show(Tasks.$addItemDiv);
                }
                ev.preventDefault();
            }, true);
            //CANCEL
            Tasks.$txtTaskTitle.addEventListener('blur', function() {
                Tasks.$txtTaskTitle.value = '';
                Tasks.hide(Tasks.$addItemInput).show(Tasks.$addItemDiv);
            }, true);
            //INIT DATA
            if (window.localStorage.length - 1) {
                var task_list = [];
                var key;
                for (var i = 0, len = window.localStorage.length; i < len; i++) {
                    key = window.localStorage.key(i);
                    if (/task:\d+/.test(key)) {
                        task_list.push(JSON.parse(window.localStorage.getItem(key)));
                    }
                }
                for (var i = 0, len = task_list.length; i < len; i++) {
                    Tasks.AppendHtml(task_list[i]);
                }
            }
        },
        //ADD
        Add: function(task) {
            //REFRESH POINTE
            window.localStorage.setItem('Tasks:index', ++Tasks.index);
            task.id = Tasks.index;
            window.localStorage.setItem("task:" + Tasks.index, JSON.stringify(task));
        },
        //MEND
        Edit: function(task) {
            window.localStorage.setItem("task:" + task.id, JSON.stringify(task));
        },
        //DEL
        Del: function(task) {
            window.localStorage.removeItem("task:" + task.id);
        },
        AppendHtml: function(task) {
            var oDiv = document.createElement('div');
            oDiv.className = 'taskItem';
            oDiv.setAttribute('id', 'task_' + task.id);
            var addTime = new Date(task.add_time);
            var timeString = addTime.getMonth() + '-' + addTime.getDate() + ' ' + addTime.getHours() + ':' + addTime.getMinutes() + ':' + addTime.getSeconds();
            oDiv.setAttribute('title', timeString);
            var oLabel = document.createElement('label');
            oLabel.className = task.is_finished ? 'off' : 'on';
            var oSpan = document.createElement('span');
            oSpan.className = 'taskTitle';
            var oText = document.createTextNode(task.task_item);
            oSpan.appendChild(oText);
            oDiv.appendChild(oLabel);
            oDiv.appendChild(oSpan);
            //INIT EVENT
            oDiv.addEventListener('click', function() {
                if (!task.is_finished) {
                    task.is_finished = !task.is_finished;
                    var lbl = this.getElementsByTagName('label')[0];
                    lbl.className = (lbl.className == 'on') ? 'off' : 'on';
                    Tasks.Edit(task);
                } else {
                    if (confirm('�Ƿ�ȷ��Ҫɾ�����\r\n\r\n���ȷ��ɾ�������ȡ����Ϊδ��ɡ�')) {
                        Tasks.Del(task);
                        Tasks.RemoveHtml(task);
                    } else {
                        task.is_finished = !task.is_finished;
                        var lbl = this.getElementsByTagName('label')[0];
                        lbl.className = (lbl.className == 'on') ? 'off' : 'on';
                        Tasks.Edit(task);
                    }
                }
            }, true);
            Tasks.$taskItemList.appendChild(oDiv);
        },
        RemoveHtml: function(task) {
            var taskListDiv = Tasks.$taskItemList.getElementsByTagName('div');
            for (var i = 0, len = taskListDiv.length; i < len; i++) {
                var id = parseInt(taskListDiv[i].getAttribute('id').substring(5));
                if (id == task.id) {
                    Tasks.$taskItemList.removeChild(taskListDiv[i]);
                    break;
                }
            }
        }
    }
    Tasks.init();
})();
*/

var lang = "en";
var $ = function(id) { return document.getElementById(id); }
var Tasks = {
    show: function(obj) {
        obj.className = '';
        return this;
    },
    hide: function(obj) {
        obj.className = 'hide';
        return this;
    },
    //STORE dom
    $addItemDiv: $('addItemDiv'),
    $addItemInput: $('addItemInput'),
    $txtTaskTitle: $('txtTaskTitle'),
    $taskItemList: $('taskItemList'),
    //POINTER
    index: window.localStorage.getItem('Tasks:index'),
    //INIT
    init: function() {
        if (!Tasks.index) {
            window.localStorage.setItem('Tasks:index', Tasks.index = 0);
        }
        /*INIT EVENT*/
        //OPEN ADD INPUT TEXTBOX 
        Tasks.$addItemDiv.addEventListener('click', function() {
            Tasks.show(Tasks.$addItemInput).hide(Tasks.$addItemDiv);
            Tasks.$txtTaskTitle.focus();
        }, true);
        //ENTER TO ADD
        Tasks.$txtTaskTitle.addEventListener('keyup', function(ev) {
            var ev = ev || window.event;
            if (ev.keyCode == 13) {
                var task = {
                    id: 0,
                    task_item: $('txtTaskTitle').value,
                    add_time: new Date(),
                    is_finished: false
                };
                Tasks.Add(task);
                Tasks.AppendHtml(task);
                Tasks.$txtTaskTitle.value = '';
                Tasks.hide(Tasks.$addItemInput).show(Tasks.$addItemDiv);
            }
            ev.preventDefault();
        }, true);
        //CANCEL
        Tasks.$txtTaskTitle.addEventListener('blur', function() {
            Tasks.$txtTaskTitle.value = '';
            Tasks.hide(Tasks.$addItemInput).show(Tasks.$addItemDiv);
        }, true);
        //INIT DATA
        if (window.localStorage.length - 1) {
            var task_list = [];
            var key;
            for (var i = 0, len = window.localStorage.length; i < len; i++) {
                key = window.localStorage.key(i);
                if (/task:\d+/.test(key)) {
                    task_list.push(JSON.parse(window.localStorage.getItem(key)));
                }
            }
            for (var i = 0, len = task_list.length; i < len; i++) {
                Tasks.AppendHtml(task_list[i]);
            }
        }
    },
    //ADD
    Add: function(task) {
        //REFRESH POINTE
        window.localStorage.setItem('Tasks:index', ++Tasks.index);
        task.id = Tasks.index;
        window.localStorage.setItem("task:" + Tasks.index, JSON.stringify(task));
    },
    //MEND
    Edit: function(task) {
        window.localStorage.setItem("task:" + task.id, JSON.stringify(task));
    },
    //DEL
    Del: function(task) {
        window.localStorage.removeItem("task:" + task.id);
    },
    AppendHtml: function(task) {
        var oDiv = document.createElement('div');
        oDiv.className = 'taskItem';
        oDiv.setAttribute('id', 'task_' + task.id);
        var addTime = new Date(task.add_time);
        var timeString = addTime.getMonth() + '-' + addTime.getDate() + ' ' + addTime.getHours() + ':' + addTime.getMinutes() + ':' + addTime.getSeconds();
        oDiv.setAttribute('title', timeString);
        var oLabel = document.createElement('label');
        oLabel.className = task.is_finished ? 'off' : 'on';
        var oSpan = document.createElement('span');
        oSpan.className = 'taskTitle';
        var oText = document.createTextNode(task.task_item);
        oSpan.appendChild(oText);
        oDiv.appendChild(oLabel);
        oDiv.appendChild(oSpan);
        //INIT EVENT
        oDiv.addEventListener('click', function() {
            if (!task.is_finished) {
                task.is_finished = !task.is_finished;
                var lbl = this.getElementsByTagName('label')[0];
                lbl.className = (lbl.className == 'on') ? 'off' : 'on';
                Tasks.Edit(task);
            } else {
                if (confirm('�Ƿ�ȷ��Ҫɾ�����\r\n\r\n���ȷ��ɾ�������ȡ����Ϊδ��ɡ�')) {
                    Tasks.Del(task);
                    Tasks.RemoveHtml(task);
                } else {
                    task.is_finished = !task.is_finished;
                    var lbl = this.getElementsByTagName('label')[0];
                    lbl.className = (lbl.className == 'on') ? 'off' : 'on';
                    Tasks.Edit(task);
                }
            }
        }, true);
        Tasks.$taskItemList.appendChild(oDiv);
    },
    RemoveHtml: function(task) {
        var taskListDiv = Tasks.$taskItemList.getElementsByTagName('div');
        for (var i = 0, len = taskListDiv.length; i < len; i++) {
            var id = parseInt(taskListDiv[i].getAttribute('id').substring(5));
            if (id == task.id) {
                Tasks.$taskItemList.removeChild(taskListDiv[i]);
                break;
            }
        }
    }
}
Tasks.init();