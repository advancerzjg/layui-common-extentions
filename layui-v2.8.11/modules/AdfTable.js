/**
 * 自定义Table
 */

layui.define(function (exports) {
    var $ = layui.$;
    var moduleName = "AdfTable";

    //构造函数
    var Class = function (opt) {

        this.config = {
            defaultData: {},
            fields: [],
            data: [],
            tplRow: "",
            headerHtml: ""
        }
        var that = this;
        $.extend(that.config, opt);

        //初始Table
        that.InitTable();

        //如果有行模板则使用行模板,如果没有则使用fields来构造模板

        //行模板
        that.SetRowTemplate();

        //渲染
        that.Render();

        //事件
        that.InitEvents();
    };


    Class.prototype.InitTable = function () {
        //创建
        var config = this.config;
        var tableId = config.id;

        //初始化表格
        var headerInfo = "";
        var colsGroup = "";
        $.each(config.fields, function (i, item) {
            headerInfo += "<th>" + item.caption + "</th>";
            if (item.width === "0") {
                colsGroup += "<col />";
            } else {
                colsGroup += "<col width='" + item.width + "' />";
            }
        });

        headerInfo = "<thead><tr>" + headerInfo + "</tr></thead>";
        colsGroup = "<colgroup>" + colsGroup + "</colgroup>";
        config.headerHtml = headerInfo;

        $("#" + tableId).append(colsGroup).append(headerInfo).append("<tbody></tbody>");
    }

    Class.prototype.Render = function () {
        //创建
        var config = this.config;
        var tableId = config.id;
        var data = config.data;
        //初始化表格
        var tplRow = config.tplRow;
        $.each(data, function (i, item) {
            var rowHtml = "";
            layui.laytpl(tplRow).render(item, function (html) {
                rowHtml = html;
            });

            $("#" + tableId + ">tbody").append("<tr>" + rowHtml + "</tr>");
        });
    }

    //设置行模板
    Class.prototype.SetRowTemplate = function () {

        // 如果有行模板
        var config = this.config;
        var rowHtml = "";
        if (config.hasOwnProperty("tplRowId")) {
            var tplRowId = config.tplRowId;
            rowHtml = $("#" + tplRowId).html();
        } else {
            $.each(config.fields, function (i, item) {
                rowHtml += "<td>" + item.tpl + "</td>";
            });
        }

        config.tplRow = rowHtml;


    }
    //根据一个Json创建一个元素
    Class.prototype.AddRows = function (rowDatas) {
        var config = this.config;
        var tableId = config.id;
        var tplRow = config.tplRow;
        $.each(rowDatas, function (i, item) {
            var rowHtml = "";
            layui.laytpl(tplRow).render(item, function (html) {
                rowHtml = html;
            });

            $("#" + tableId + ">tbody").append("<tr>" + rowHtml + "</tr>");
        });
    }

    Class.prototype.DeleteRow = function () {
        var config = this.config;
        var tableId = config.id;
    }

    //当前的data.将input select radio checkbox等拿到数据
    Class.prototype.GetData = function () {
        var config = this.config;
        var tableId = config.id;
    }

    Class.prototype.RegisterRowElemChange = function (doFunc) {
        var config = this.config;
        var tableId = config.id;

        $("body").on("input propertychange", "#" + tableId + ">tbody input," + "#" + tableId + ">tbody select", doFunc);
    }

    Class.prototype.RegisterRowElemClick = function (doFunc) {
        var config = this.config;
        var tableId = config.id;

        $("body").on("click", "#" + tableId + ">tbody input", doFunc);
    }

    Class.prototype.RegisterRowEvent = function (eventName, elem, doFunc) {
        var config = this.config;
        var tableId = config.id;

        $("body").on(eventName, "#" + tableId + ">tbody " + elem, doFunc);
    }

    //初始化事件
    Class.prototype.InitEvents = function () {
        var that = this;
        var config = this.config;
        console.log(config);
        var addRowElem = config.addRowElem;
        var deleteRowElem = config.deleteRowElem;
        console.log("addRowElem", addRowElem);

        $("body").on("click", addRowElem, function () {
            var arrData = [];
            arrData.push(config.defaultData);
            that.AddRows(arrData);
        });

        $("body").on("click", deleteRowElem, function () {
            //找到所在的tr
            var curParents = $(this).parents();
            $.each(curParents, function (i, item) {
                if ($(item).prop("nodeName").toLowerCase() === "tr") {
                    $(item).remove();
                    return false;
                }
            });
        });
    }

    //外部接口
    var adfTable = {
        Create: function (opt) {
            var o = new Class(opt);
            return o;
        }
    }

    exports(moduleName, adfTable);
});