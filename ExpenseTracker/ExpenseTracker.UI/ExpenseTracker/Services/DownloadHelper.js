var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var DownloadHelper = (function (_super) {
            __extends(DownloadHelper, _super);
            function DownloadHelper() {
                _super.call(this);
            }
            DownloadHelper.prototype.download = function (data, status, headers) {
                var filename = headers("x-filename") || "download.bin";
                var contentType = headers("content-type") || "application/octet-stream";

                if (navigator.msSaveBlob) {
                    var blob = new Blob([data], { type: contentType });
                    navigator.msSaveBlob(blob, filename);
                } else {
                    var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                    if (urlCreator) {
                        var link = document.createElement("a");
                        if ("download" in link) {
                            var blob = new Blob([data], { type: contentType });
                            var url = urlCreator.createObjectURL(blob);
                            link.setAttribute("href", url);
                            link.setAttribute("download", filename);
                            var event = document.createEvent('MouseEvents');
                            event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                            link.dispatchEvent(event);
                        } else {
                            var blob = new Blob([data], { type: "application/octet-stream" });
                            var url = urlCreator.createObjectURL(blob);
                            window.location = url;
                        }
                    } else {
                        console.log("Download not supported");
                    }
                }
            };
            DownloadHelper.Name = 'DownloadHelper';
            return DownloadHelper;
        })(ExpenseTracker.Component);
        Services.DownloadHelper = DownloadHelper;

        angular.module('ExpenseTracker.Services').factory(DownloadHelper.Name, function () {
            return new DownloadHelper();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=DownloadHelper.js.map
