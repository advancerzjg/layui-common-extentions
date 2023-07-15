function registerLauiModule(baseDir, moduleNames) {
    function moduleIsExist(moduleName) {
        var retValue = false;
        for (var o in layui.modules) {
            if (o === moduleName) {
                retValue = true;
                break;
            }
        }

        return retValue;
    }

    var arrModuleName = moduleNames.split(',');

    var moduleConfig = {};
    $.each(arrModuleName, function (i, item) {
        if (moduleIsExist(item) !== true) {
            moduleConfig[item] = "{/}" + baseDir + "/" + item;
        }
    });
    var moduleCount = 0;
    for (var o in moduleConfig) {
        moduleCount++;
    }
    if (moduleCount > 0) {
        layui.extend(moduleConfig);
    }

}