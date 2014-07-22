module ExpenseTracker.Services {

    export class DownloadHelper extends Component {

        public static Name: string = 'DownloadHelper';
        constructor() {
            super();
        }

        public download(data: any, status: number, headers: (headerName?: string) => string): void {
            
            var filename = headers("x-filename") || "download.bin";
            var contentType = headers("content-type") || "application/octet-stream";

            if (navigator.msSaveBlob) {
                var blob = new Blob([data], { type: contentType });
                navigator.msSaveBlob(blob, filename);
            }
            else {
                var urlCreator = (<any>window).URL || (<any>window).webkitURL || (<any>window).mozURL || (<any>window).msURL;
                if (urlCreator) {
                    var link = document.createElement("a");
                    if ("download" in link) {
                        var blob = new Blob([data], { type: contentType });
                        var url = urlCreator.createObjectURL(blob);
                        link.setAttribute("href", url);
                        link.setAttribute("download", filename);
                        var event = document.createEvent('MouseEvents');
                        (<any>event).initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
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

        }

    }

    angular.module('ExpenseTracker.Services').factory(DownloadHelper.Name, () => new DownloadHelper());

}     