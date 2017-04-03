/*
Support Widget Library
© 2016 Dark Tornado, All rights reserved.

support.widget.Switch(Context ctx);

void .setText(String txt);
void .setTextColor(Color color);
void .setTextSize(int Size);
void .setChecked(boolean isChecked);
void .setOnCheckedChangeListener(View.OnClickListener, listener);
void .setId(int id);
int .getId();
void .setLayoutParams(LayoutParams params);
void .setPadding(int pad, int pad, int pad, int pad);
LinearLayout .mv();
*/

const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

var gui = null;
var bitmaps = [];

const BitmapManager = {
    generateBitmaps: function() {
        try {
            gui = new android.graphics.BitmapFactory.decodeFile(sdcard + "/darkTornado/supportWidgetLibrary/Switch.png");
            bitmaps[0] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(gui, 0, 0, 190, 80), dip2px(ctx, 190), dip2px(ctx, 80), false);
            bitmaps[1] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(gui, 0, 80, 190, 80), dip2px(ctx, 190), dip2px(ctx, 80), false);
        } catch(e) {
            print(e);
        }
    },
    getDrawable: function(type) {
        try {
            if(type == 1) return new android.graphics.drawable.BitmapDrawable(bitmaps[0]);
            if(type == 2) return new android.graphics.drawable.BitmapDrawable(bitmaps[1]);
        } catch(e) {
            print(e);
        }
    }
};


const support = {
    widget: {
        Switch: function(ctx) {
            try {
                this.layout = new android.widget.LinearLayout(ctx);
                this.txt = new android.widget.TextView(ctx);
                this.btn = new android.widget.ToggleButton(ctx);
                this.layout.setOrientation(0);
                this.layout.setWeightSum(10);
                this.txt.setTextSize(16);
                this.txt.setTextColor(android.graphics.Color.WHITE);
                this.txt.setGravity(android.view.Gravity.LEFT | android.view.Gravity.CENTER_VERTICAL);
                this.txt.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -2, 9));
                this.btn.setText("");
                this.btn.setTextOn("");
                this.btn.setTextOff("");
                this.btn.setGravity(android.view.Gravity.LEFT | android.view.Gravity.CENTER_VERTICAL);
                this.btn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(dip2px(ctx, 79), dip2px(ctx, 31), 1));
                this.btn.setBackgroundDrawable(BitmapManager.getDrawable(2));
                this.btn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        if(v.isChecked()) v.setBackgroundDrawable(BitmapManager.getDrawable(1));
                        else v.setBackgroundDrawable(BitmapManager.getDrawable(2));
                    }
                }));
            } catch(e) {
                print(e);
            }
        }
    }
};

support.widget.Switch.prototype = {
    setText: function(txt) {
        this.txt.setText(txt);
    },
    setTextColor: function(color) {
        this.txt.setTextColor(color);
    },
    setTextSize: function(size) {
        this.txt.setTextSize(size);
    },
    setChecked: function(isChecked) {
        if(isChecked) this.btn.setBackgroundDrawable(BitmapManager.getDrawable(1));
        else this.btn.setBackgroundDrawable(BitmapManager.getDrawable(2));
        this.btn.setChecked(isChecked);
    },
    setOnCheckedChangeListener: function(listener) {
        this.btn.setOnCheckedChangeListener(listener);
    },
    setLayoutParams: function(params) {
        this.layout.setLayoutParams(params);
    },
    setId: function(id) {
        this.btn.setId(id);
    },
    getId: function() {
        return this.btn.getId();
    },
    setPadding: function(pad, pad, pad, pad) {
        this.layout.setPadding(pad, pad, pad, pad);
    },
    mv: function() {
        this.layout.addView(this.txt);
        this.layout.addView(this.btn);
        return this.layout;
    }
};

function dip2px(ctx, dips) {
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

var folder = new java.io.File(sdcard + "/darkTornado/supportWidgetLibrary/");
folder.mkdirs();
var file1 = new java.io.File(sdcard + "/darkTornado/supportWidgetLibrary/.nomedia");
file1.createNewFile();
var file2 = new java.io.File(sdcard + "/darkTornado/supportWidgetLibrary/Switch.png");
if(!file2.exists()) {
    if(checkInternet()) download();
    else print("Please connect to the Internet and restart Blocklauncher.\n인터넷에 연결한 상태로 다시 블록런처를 실행해주세요.");
}
BitmapManager.generateBitmaps();
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

function download() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var uri = new android.net.Uri.parse("https://raw.githubusercontent.com/DarkTornado/ModPE-Library/master/images/Switch.png");
                var dm = new android.app.DownloadManager.Request(uri);
                dm.setTitle("Image file for Library");
                dm.setDescription("File Downloading...");
                dm.setDestinationInExternalPublicDir("darkTornado/supportWidgetLibrary", "Switch.png");
                dm.setNotificationVisibility(1);
                ctx.getSystemService(android.content.Context.DOWNLOAD_SERVICE).enqueue(dm);
            } catch(e) {
                print("Download failed.\nError : " + e);
            }
        }
    }));
}

function checkInternet() {
    try {
        var cm = ctx.getSystemService(android.content.Context.CONNECTIVITY_SERVICE);
        var mobile = cm.getNetworkInfo(cm.TYPE_MOBILE);
        var wifi = cm.getNetworkInfo(cm.TYPE_WIFI);
        if(mobile.isConnected() || wifi.isConnected()) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        try {
            if(wifi.isConnected()) {
                return true;
            }
        } catch(err) {
            Dak.toast(err);
        }
    }
}

function selectLevelHook() {
    var script = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
    var so = org.mozilla.javascript.ScriptableObject;
    for(var n = 0; n < script.size(); n++) {
        var scope = script.get(n).scope;
        if(!so.hasProperty(scope, "support")) so.putProperty(scope, "support", support);
    }
}

