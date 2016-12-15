/*
File Library
© 2016 Dark Tornado, All rights reserved.
version 2.0

void File.copy(String path1, String path2, boolean useNioPackage);
void File.copyFolder(String path1, String path2, boolean useNioPackage);
void File.copyFromWeb(String url, String path);
void File.createFile(String path);
void File.createFolder(String path);
void File.download(String path, String file, String url);
Boolean File.exists(String path);
File[] File.getList(String path);
Boolean File.isFile(String path);
Boolean File.isFolder(String path);
void File.move(String path1, String path2);
String File.read(String path);
String File.readFromWeb(String url);
void File.remove(String path);
void File.removeFolder(String path);
void File.unZip(String path1, String path2, Boolean makeFolder);
void File.write(String path, String value);
*/
const File = {
    createFolder: function(path) {
        try {
            var folder = new java.io.File(path);
            folder.mkdirs();
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    createFile: function(path) {
        try {
            var file = new java.io.File(path);
            file.createNewFile();
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    write: function(path, name, value) {
        try {
            var file = new java.io.File(path);
            var fos = new java.io.FileOutputStream(file);
            var str = new java.lang.String(value);
            fos.write(str.getBytes());
            fos.close();
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    read: function(path) {
        try {
            var file = new java.io.File(path);
            if(!file.exists()) {
                return "";
            }
            var fis = new java.io.FileInputStream(file);
            var isr = new java.io.InputStreamReader(fis);
            var br = new java.io.BufferedReader(isr);
            var str = br.readLine();
            var line = "";
            while((line = br.readLine()) != null) {
                str += "\n" + line;
            }
            fis.close();
            isr.close();
            br.close();
            return str;
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    remove: function(path) {
        try {
            var file = new java.io.File(path);
            if(file.exists()) {
                file.delete();
            }
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    move: function(path1, path2) {
        try {
            var file1 = new java.io.File(path1);
            var file2 = new java.io.File(path2);
            file1.renameTo(file2);
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    getList: function(path) {
        try {
            var file = new java.io.File(path);
            var dir = file.list().sort();
            var dir2 = [],
                dir3 = [];
            for(var n = 0; n < dir.length; n++) {
                var ff = new java.io.File(path + "/" + dir[n]);
                if(ff.isDirectory()) {
                    dir2.push(dir[n]);
                } else {
                    dir3.push(dir[n]);
                }
            }
            for(var m = 0; m < dir3.length; m++) {
                dir2.push(dir3[m]);
            }
            return dir2;
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    removeFolder: function(path) {
        try {
            var folder = new java.io.File(path);
            net.zhuoweizhang.mcpelauncher.Utils.clearDirectory(folder);
            folder.delete();
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    unZip: function(path1, path2, tf) {
        try {
            if(tf) {
                var folder = new java.io.File(path2);
                folder.mkdir();
                var pp = path2.toString().split("/");
                path2 = path2 + pp[pp.length - 1].substring(0, lastIndexOf("."));
            }
            var fis = new java.io.FileInputStream(path1);
            var zis = new java.util.zip.ZipInputStream(fis);
            var entry;
            while((entry = zis.getNextEntry()) != null) {
                var fos = new java.io.FileOutputStream(path2 + "/" + entry.getName());
                var buf = new java.nio.ByteBuffer.allocate(1024).array();
                var len;
                while((len = zis.read(buf)) > 0) {
                    fos.write(buf, 0, len);
                }
                zis.closeEntry();
                fos.close();
            }
            zis.close();
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    download: function(path, file, url) {
        var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var uri = new android.net.Uri.parse(url);
                    var dm = new android.app.DownloadManager.Request(uri);
                    dm.setTitle("File Download");
                    dm.setDescription("Downloading...");
                    dm.setDestinationInExternalPublicDir(path, file);
                    dm.setNotificationVisibility(1);
                    ctx.getSystemService(android.content.Context.DOWNLOAD_SERVICE).enqueue(dm);
                } catch(e) {
                    print(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    copy: function(path1, path2, useNio) {
        try {
            var file1 = new java.io.File(path1);
            var file2 = new java.io.File(path2);
            var fis, fos;
            if(useNio) {
                fis = new java.io.FileInputStream(file1).getChannel();
                fos = new java.io.FileOutputStream(file2).getChannel();
                fis.transferTo(0, fis.size(), fos);
            } else {
                fis = new java.io.FileInputStream(file1);
                fos = new java.io.FileOutputStream(file2);
                var bis = new java.io.BufferedInputStream(fis);
                var bos = new java.io.BufferedOutputStream(fos);
                var buf;
                while((buf = bis.read()) != -1) {
                    bos.write(buf);
                }
                bis.close();
                bos.close();
            }
            fis.close();
            fos.close();
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    isFolder: function(path) {
        try {
            var file = new java.io.File(path);
            if(file.isDirectory()) {
                return true;
            } else {
                return false;
            }
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    isFile: function(path) {
        try {
            var file = new java.io.File(path);
            if(file.isFile()) {
                return true;
            } else {
                return false;
            }
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    exists: function(path) {
        try {
            var file = new java.io.File(path);
            return file.exists();
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    copyFolder: function(path1, path2, useNio) {
        try {
            var file1 = new java.io.File(path1);
            if(file1.isDirectory()) {
                var file3 = new java.io.File(path2, file1.getName());
                file3.mkdirs();
                var child = file1.list();
                for(var n = 0; n < child.length; n++) {
                    var file4 = new java.io.File(file1, child[n]);
                    if(file4.isDirectory()) {
                        File.copyFolder(file4, file3, useNio);
                    } else {
                        File.copy(file4, new java.io.File(file3, child[n]), useNio);
                    }
                }
            } else {
                File.copy(path1, path2, useNio);
            }
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    copyFromWeb: function(url, path) {
        try {
            url = new java.net.URL(url);
            var con = url.openConnection();
            if(con != null) {
                con.setConnectTimeout(5000);
                con.setUseCaches(false);
                var bis = new java.io.BufferedInputStream(con.getInputStream());
                var file = new java.io.File(path);
                var fos = new java.io.FileOutputStream(file);
                var bos = new java.io.BufferedOutputStream(fos);
                var buf;
                while((buf = bis.read()) != -1) {
                    bos.write(buf);
                }
                bis.close();
                bos.close();
                con.disconnect();
                fos.close();
            }
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    },
    readFromWeb: function(url) {
        try {
            var str = "";
            url = new java.net.URL(url);
            var con = url.openConnection();
            if(con != null) {
                con.setConnectTimeout(5000);
                con.setUseCaches(false);
                var isr = new java.io.InputStreamReader(con.getInputStream());
                var br = new java.io.BufferedReader(isr);
                str = br.readLine();
                var line = "";
                while((line = br.readLine()) != null) {
                    str += "\n" + line;
                }
                br.close();
                con.disconnect();
            }
            return str.toString();
        } catch(e) {
            print(e + ", " + e.lineNumber);
        }
    }
};

new java.lang.Thread({
    run: function() {
        for(;;) {
            java.lang.Thread.sleep(100);
            if(Server.getAddress() != null) {
                selectLevelHook();
                break;
            }
        }
    }
}).start();

function selectLevelHook() {
    var script = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
    var so = org.mozilla.javascript.ScriptableObject;
    for(var n = 0; n < script.size(); n++) {
        var scope = script.get(n).scope;
        if(!so.hasProperty(scope, "File")) {
            so.putProperty(scope, "File", File);
        }
    }
}