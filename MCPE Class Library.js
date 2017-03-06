/*
MCPE Class Library
version 2.1
© 2016-2017 Dark Tornado, All rights reserved.

String mcpelib.info.Name
String mcpelib.info.Developer
String mcpelib.info.Version

TextView mcpelib.gui.TextView(Context ctx, boolean useBlackText);
EditText mcpelib.gui.EditText(Context ctx, boolean useNewGui, boolean notUseFullScreenKeyboard);
Button mcpelib.gui.Button(Context ctx, boolean useNewGui, boolean useSound);
object mcpelib.gui.Switch(Context ctx, boolean useBlackText);
object mcpelib.gui.CheckBox(Context ctx, boolean useBlackText);

object mcpelib.window.Dialog(Context ctx, boolean useNewGui, boolean useSound);
object mcpelib.window.Window(Context ctx, boolean useNewGui);
object mcpelib.window.FloatingWindow(Context ctx, boolean useNewGui);
*/


const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

const white = android.graphics.Color.WHITE;
const black = android.graphics.Color.BLACK;
const yellow = android.graphics.Color.YELLOW;

var guis = [];
var bitmaps = [];
var localBitmaps = [];
var useLocalBitmap = false;
var font = null;

const mcpelib = {};

mcpelib.info = {
    Name: "MCPE Class Library",
    Developer: "Dark Tornado",
    Version: "2.1"
};

const Utils = {
    toast: function(msg) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                var toast = android.widget.Toast.makeText(ctx, msg, android.widget.Toast.LENGTH_LONG);
                toast.show();
            }
        }));
    },
    getDp: function(dips) {
        return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
    },
    showDialog: function(title, msg) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new android.app.AlertDialog.Builder(ctx);
                    dialog.setTitle(title);
                    dialog.setMessage(msg);
                    dialog.setNegativeButton("Close", null);
                    dialog.show();
                } catch(e) {
                    Utils.toast(e);
                }
            }
        }));
    },
    openSettings: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new android.app.AlertDialog.Builder(ctx);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var local = new android.widget.Switch(ctx);
                    local.setText("Use Image in SD Card");
                    local.setChecked(useLocalBitmap);
                    local.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(toggle, onoff) {
                            useLocalBitmap = onoff;
                        }
                    }));
                    layout.addView(local);
                    var dump = new android.widget.Button(ctx);
                    dump.setText("Dump Class");
                    dump.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(v) {
                            Utils.showDialog("Dump Class", "mcpelib.info.Name;\nmcpelib.info.Developer;\nmcpelib.info.Version;\n\nmcpelib.gui.TextView(Context ctx, boolean useDarkText);\nmcpelib.gui.EditText(Context ctx, boolean useNewGui, boolean notUseFullScreenKeyboard);\nmcpelib.gui.Button(Context ctx, boolean useNewGui, boolean useSound);\nmcpelib.gui.Switch(Context ctx, boolean useDarkText);\n\nmcpelib.window.Dialog(Context ctx, boolean useNewGui, boolean useSound);");
                        }
                    }));
                    layout.addView(dump);
                    var txt = new android.widget.TextView(ctx);
                    txt.setText("Version : " + mcpelib.info.Version + "\nDeveloper : " + mcpelib.info.Developer + "\nThis ModPE Script is a ModPE Library. If you enable is Library, you can use the ModPEs which include MCPE Class Library.");
                    txt.setTextSize(17);
                    layout.addView(txt);
                    var maker = new android.widget.TextView(ctx);
                    maker.setText("\n© 2016 Dark Tornado, All rights reserved.\n");
                    maker.setTextSize(12);
                    maker.setGravity(android.view.Gravity.CENTER);
                    layout.addView(maker);
                    var pad = Utils.getDp(10);
                    layout.setPadding(pad, pad, pad, pad);
                    var scroll = new android.widget.ScrollView(ctx);
                    scroll.addView(layout);
                    dialog.setView(scroll);
                    dialog.setTitle("MCPE Class Library");
                    dialog.setNegativeButton("Close", null);
                    dialog.show();
                } catch(e) {
                    Utils.toast(e);
                }
            }
        }));
    },
    save: function(name, msg) {
        try {
            var file = new java.io.File(sdcard + "/darkTornado/MCPEClassLibrary/" + name + ".txt");
            var fos = new java.io.FileOutputStream(file);
            var str = new java.lang.String(msg);
            fos.write(str.getBytes());
            fos.close();
        } catch(e) {
            Utils.showError(e);
        }
    },
    read: function(name) {
        try {
            var file = new java.io.File(sdcard + "/darkTornado/MCPEClassLibrary/" + name + ".txt");
            if(!(file.exists())) return "";
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
            Utils.showError(e);
        }
    },
    exportLibrary: function() { //Original Sorce from Astro
        var script = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
        var so = org.mozilla.javascript.ScriptableObject;
        for(var n = 0; n < script.size(); n++) {
            var scope = script.get(n).scope;
            if(!so.hasProperty(scope, "mcpelib")) so.putProperty(scope, "mcpelib", mcpelib);
        }
        net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod("onLibraryLoaded", ["MCPE Class Library", "2.1", "Dark Tornado"]);
    },
    showError: function(e) {
        try {
            Utils.showDialog("Error in MCPE Class Library", e + "\nAt: " + e.lineNumber);
        } catch(e) {
            Utils.toast(e);
        }
    },
    playSound: function() {
        new java.lang.Thread({
            run: function() {
                java.lang.Thread.sleep(100);
                Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "random.click", 10, 1);
            }
        }).start();
    },
    createFontFile: function() {
        try {
            var url = new java.net.URL("https://www.dropbox.com/s/dn4weguewj5ixaf/minecraft.ttf?dl=1");
            var con = url.openConnection();
            if(con != null) {
                con.setConnectTimeout(5000);
                con.setUseCaches(false);
                var bis = new java.io.BufferedInputStream(con.getInputStream());
                var file = new java.io.File(sdcard + "/darkTornado/MCPEClassLibrary/mcpefont.tff");
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
            Utils.showError(e);
            Utils.showDialog("File is not Found", "You should connect to the Internet to do download additional font file and restart Blocklauncher.");
        }
    },
    downloadImage: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    if(Utils.checkInternet()) {
                        var uri = new android.net.Uri.parse("https://www.dropbox.com/s/k9awcmacdbc9bmw/buttonImages.png?dl=1");
                        var dm = new android.app.DownloadManager.Request(uri);
                        dm.setTitle("MCPE Class Library");
                        dm.setDescription("Downloading file...");
                        dm.setDestinationInExternalPublicDir("darkTornado/MCPEClassLibrary", "images.png");
                        dm.setNotificationVisibility(1);
                        ctx.getSystemService(android.content.Context.DOWNLOAD_SERVICE).enqueue(dm);
                    }
                } catch(e) {
                    Utils.showError(e);
                }
            }
        }));
    },
    checkInternet: function() {
        try {
            var cm = ctx.getSystemService(android.content.Context.CONNECTIVITY_SERVICE);
            if(cm.getNetworkInfo(cm.TYPE_WIFI).isConnected()) return true;
            else if(cm.getNetworkInfo(cm.TYPE_MOBILE).isConnected()) return true;
            else return false;
        } catch(e) {
            return false;
        }
    }
};

const BitmapManager = {
    generateBitmaps: function() {
        try {
            var matrix = new android.graphics.Matrix(); 
            matrix.postScale(-1, -1);
            guis[0] = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png"));
            guis[1] = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png"));
            guis[2] = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/newgui/ButtonWithBorder.png"));
            guis[3] = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/newgui/ButtonWithBorderPressed.png"));
            guis[4] = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/gui.png"));
            guis[5] = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/newgui/buttons/checkbox/checkbox_unchecked.png"));
            guis[6] = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/newgui/buttons/checkbox/checkbox_checked.png"));
            bitmaps[0] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[0], 8, 32, 8, 8), Utils.getDp(8), Utils.getDp(8), false);
            bitmaps[1] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[0], 0, 32, 8, 8), Utils.getDp(8), Utils.getDp(8), false);
            bitmaps[2] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[0], 0, 32, 8, 8, matrix, false), Utils.getDp(8), Utils.getDp(8), false);
            bitmaps[3] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[1], 160, 206, 38, 19), Utils.getDp(76), Utils.getDp(38), false);
            bitmaps[4] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[1], 198, 206, 38, 19), Utils.getDp(76), Utils.getDp(38), false);
            try {
                bitmaps[5] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[2], 0, 0, 7, 7), Utils.getDp(7), Utils.getDp(7), false);
                bitmaps[6] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[3], 0, 0, 7, 7), Utils.getDp(7), Utils.getDp(7), false);
            } catch(err) {
                Utils.showDialog("MCPE's version is too low", "You should update Minecraft PE or enable \"Minecraft Button Support.modpkg\".");
            }
            bitmaps[7] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[4], 0, 86, 200, 20), Utils.getDp(100), Utils.getDp(10), false);
            bitmaps[8] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[4], 0, 46, 200, 20), Utils.getDp(100), Utils.getDp(10), false);
            try {
                bitmaps[9] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[5], 0, 0, 16, 13), Utils.getDp(32), Utils.getDp(26), false);
                bitmaps[10] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[6], 0, 0, 16, 13), Utils.getDp(32), Utils.getDp(26), false);
            } catch(err) {
                Utils.showDialog("MCPE's version is too low", "You should update Minecraft PE or enable \"Minecraft Button Support 2.1.modpkg\".");
            }
        } catch(e) {
            Utils.showError(e);
        }
    },
    generateLocalBitmaps: function() {
        try {
            var matrix = new android.graphics.Matrix(); 
            matrix.postScale(-1, -1);
            guis[5] = new android.graphics.BitmapFactory.decodeFile(sdcard + "/darkTornado/MCPEClassLibrary/images.png");
            localBitmaps[0] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[5], 0, 0, 150, 56), Utils.getDp(150), Utils.getDp(57), false);
            localBitmaps[1] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[5], 0, 57, 150, 56), Utils.getDp(150), Utils.getDp(57), false);
            localBitmaps[2] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[5], 0, 57, 150, 57, matrix, false), Utils.getDp(150), Utils.getDp(57), false);
            localBitmaps[3] = bitmaps[3];
            localBitmaps[4] = bitmaps[4];
            localBitmaps[5] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[5], 150, 0, 150, 56), Utils.getDp(150), Utils.getDp(57), false);
            localBitmaps[6] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[5], 150, 57, 150, 56), Utils.getDp(150), Utils.getDp(57), false);
            localBitmaps[7] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[5], 150, 114, 150, 30), Utils.getDp(150), Utils.getDp(30), false);
            localBitmaps[8] = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guis[5], 0, 114, 150, 30), Utils.getDp(150), Utils.getDp(30), false);
            localBitmaps[9] = bitmaps[9];
            localBitmaps[10] = bitmaps[10];
        } catch(e) {
            Utils.showError(e);
        }
    },
    getDrawable: function(type) {
        try {
            if(type == 3 || type == 4) return new android.graphics.drawable.BitmapDrawable(bitmaps[type]);
            else if(useLocalBitmap) return new android.graphics.drawable.BitmapDrawable(localBitmaps[type]);
            else return BitmapManager.getNinePatchDrawable(type);
        } catch(e) {
            Utils.showError(e);
        }
    },
    getNinePatchDrawable: function(type) { //Original Sorce from 아보가토맨
        try {
            var cache = Utils.getDp(3);
            var NO_COLOR = 0x00000001;
            var buffer = java.nio.ByteBuffer.allocate(56).order(java.nio.ByteOrder.nativeOrder());
            buffer.put(0x01);
            buffer.put(0x02);
            buffer.put(0x02);
            buffer.put(0x02);
            buffer.putInt(0);
            buffer.putInt(0);
            buffer.putInt(0);
            buffer.putInt(0);
            buffer.putInt(0);
            buffer.putInt(0);
            buffer.putInt(0);
            buffer.putInt(cache - 1);
            buffer.putInt(cache);
            buffer.putInt(cache - 1);
            buffer.putInt(cache);
            buffer.putInt(NO_COLOR);
            buffer.putInt(NO_COLOR);
            var drawable = new android.graphics.drawable.NinePatchDrawable(ctx.getResources(), bitmaps[type], buffer.array(), new android.graphics.Rect(), null);
            return drawable;
        } catch(e) {
            Utils.showError(e);
        }
    }
};

new java.lang.Thread({
    run: function() {
        for(;;) {
            java.lang.Thread.sleep(100);
            if(Server.getAddress() != null) {
                serverConnectedHook(Server.getAddress(), Server.getPort());
                break;
            }
        }
    }
}).start();

try {
    var folder = new java.io.File(sdcard + "/darkTornado/MCPEClassLibrary/");
    folder.mkdirs();
    if(Utils.read("useLocal") == "true") localBitmaps = true;
    BitmapManager.generateBitmaps();
    var file = new java.io.File(sdcard + "/darkTornado/MCPEClassLibrary/images.png");
    if(file.exists()) BitmapManager.generateLocalBitmaps();
    else Utils.downloadImage();
    var file2 = new java.io.File(sdcard + "/darkTornado/MCPEClassLibrary/mcpefont.tff");
    if(!file2.exists()) Utils.createFontFile();
    font = new android.graphics.Typeface.createFromFile(file2);
    var file3 = new java.io.File(sdcard + "/darkTornado/MCPEClassLibrary/.nomedia");
    file3.createNewFile();
} catch(e) {
    print(e);
}

mcpelib.gui = {
    TextView: function(ctx, useBlackText) {
        try {
            var txt = new android.widget.TextView(ctx);
            if(useBlackText) txt.setTextColor(black);
            else txt.setTextColor(white);
            txt.setTypeface(font);
            var pad = Utils.getDp(3);
            txt.setPadding(pad, pad, pad, pad);
            return txt;
        } catch(e) {
            Utils.showError(e);
        }
    },
    EditText: function(ctx, useNewGui, noFull) {
        try {
            var txt = new android.widget.EditText(ctx);
            txt.setTextColor(white);
            txt.setTypeface(font);
            if(useNewGui) txt.setBackgroundDrawable(BitmapManager.getDrawable(8));
            else txt.setBackgroundDrawable(BitmapManager.getDrawable(1));
            var pad = Utils.getDp(3);
            txt.setPadding(pad, pad, pad, pad);
            if(noFull) txt.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_FULLSCREEN);
            return txt;
        } catch(e) {
            Utils.showError(e);
        }
    },
    Button: function(ctx, useNewGui, useSound) {
        try {
            var btn = new android.widget.Button(ctx);
            if(useNewGui) {
                btn.setTextColor(black);
                btn.setBackgroundDrawable(BitmapManager.getDrawable(5));
            } else {
                btn.setTextColor(white);
                btn.setBackgroundDrawable(BitmapManager.getDrawable(0));
            }
            btn.setTypeface(font);
            btn.setOnTouchListener(new android.view.View.OnTouchListener() {
                onTouch: function(v, ev) {
                    if(ev.action == android.view.MotionEvent.ACTION_DOWN || ev.action == android.view.MotionEvent.ACTION_MOVE) {
                        if(useNewGui) {
                            btn.setTextColor(white);
                            btn.setBackgroundDrawable(BitmapManager.getDrawable(6));
                        } else {
                            btn.setBackgroundDrawable(BitmapManager.getDrawable(1));
                        }
                    } else {
                        if(useNewGui) {
                            btn.setTextColor(black);
                            btn.setBackgroundDrawable(BitmapManager.getDrawable(5));
                        } else {
                            btn.setBackgroundDrawable(BitmapManager.getDrawable(0));
                        }
                        if(useSound) Util.playSound()
                    }
                    return false;
                }
            });
            return btn;
        } catch(e) {
            Utils.showError(e);
        }
    },
    Switch: function(ctx, useBlackText) {
        try {
            this.layout = new android.widget.LinearLayout(ctx);
            this.txt = new android.widget.TextView(ctx);
            this.btn = new android.widget.ToggleButton(ctx);
            this.layout.setOrientation(0);
            this.layout.setWeightSum(10);
            this.txt.setTextSize(16);
            if(useBlackText) this.txt.setTextColor(black);
            else this.txt.setTextColor(white);
            this.txt.setTypeface(font);
            this.txt.setGravity(android.view.Gravity.LEFT | android.view.Gravity.CENTER_VERTICAL);
            this.txt.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -2, 9));
            this.btn.setText("");
            this.btn.setTextOn("");
            this.btn.setTextOff("");
            this.btn.setGravity(android.view.Gravity.LEFT | android.view.Gravity.CENTER_VERTICAL);
            this.btn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(Utils.getDp(76), Utils.getDp(38), 1));
            this.btn.setBackgroundDrawable(BitmapManager.getDrawable(3));
            this.btn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    if(v.isChecked()) v.setBackgroundDrawable(BitmapManager.getDrawable(4));
                    else v.setBackgroundDrawable(BitmapManager.getDrawable(3));
                }
            }));
        } catch(e) {
            Utils.showError(e);
        }
    },
    CheckBox: function(ctx, useBlackText) {
        try {
            this.layout = new android.widget.LinearLayout(ctx);
            this.layout.setOrientation(0);
            this.check = new android.widget.ToggleButton(ctx);
            this.check.setText("");
            this.check.setTextOn("");
            this.check.setTextOff("");
            this.check.setLayoutParams(new android.widget.LinearLayout.LayoutParams(Utils.getDp(32), Utils.getDp(26)));
            this.check.setGravity(android.view.Gravity.LEFT | android.view.Gravity.CENTER_VERTICAL);
            this.check.setBackgroundDrawable(BitmapManager.getDrawable(9));
            this.check.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    if(v.isChecked()) v.setBackgroundDrawable(BitmapManager.getDrawable(10));
                    else v.setBackgroundDrawable(BitmapManager.getDrawable(9));
                }
            }));
            this.txt = new mcpelib.gui.TextView(ctx);
            if(useBlackText) this.txt.setTextColor(black);
            else this.txt.setTextColor(white);
            this.txt.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -2));
            this.txt.setGravity(android.view.Gravity.LEFT | android.view.Gravity.CENTER_VERTICAL);
        } catch(e) {
            Utils.showError(e);
        }
    }
};

mcpelib.gui.Switch.prototype = {
    constructor: mcpelib.gui.Switch,
    setText: function(txt) {
        this.txt.setText(txt);
    },
    setTextColor: function(color) {
        this.txt.setTextColor(color);
    },
    setChecked: function(isChecked) {
        if(isChecked) this.btn.setBackgroundDrawable(BitmapManager.getDrawable(4));
        else this.btn.setBackgroundDrawable(BitmapManager.getDrawable(3));
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

mcpelib.gui.CheckBox.prototype = {
    constructor: mcpelib.gui.CheckBox,
    setText: function(txt) {
        this.txt.setText(" " + txt);
    },
    setTextColor: function(color) {
        this.txt.setTextColor(color);
    },
    setChecked: function(isChecked) {
        if(isChecked) this.check.setBackgroundDrawable(BitmapManager.getDrawable(10));
        else this.check.setBackgroundDrawable(BitmapManager.getDrawable(9));
        this.check.setChecked(isChecked);
    },
    setOnCheckedChangeListener: function(listener) {
        this.check.setOnCheckedChangeListener(listener);
    },
    setLayoutParams: function(params) {
        this.layout.setLayoutParams(params);
    },
    setId: function(id) {
        this.check.setId(id);
    },
    getId: function() {
        return this.check.getId();
    },
    setPadding: function(pad, pad, pad, pad) {
        this.layout.setPadding(pad, pad, pad, pad);
    },
    mv: function() {
        this.layout.addView(this.check);
        this.layout.addView(this.txt);
        return this.layout;
    }
};

mcpelib.window = {
    Dialog: function(ctx, useNewGui, useSound) {
        this.dialog = new android.widget.PopupWindow();
        this.title = null;
        this.titleColor = yellow;
        this.msg = null;
        this.pBtn = null;
        this.nBtn = null;
        this.view = null;
        this.useNewGui = useNewGui;
        this.useSound = useSound;
    },
    Window: function(ctx, useNewGui) {
        this.window = new android.widget.PopupWindow();
        this.title = null;
        this.titleColor = yellow;
        this.view = null;
        this.useNewGui = useNewGui;
        this.makeScroll = false;
    },
    FloatingWindow: function(ctx, useNewGui) {
        this.window = new android.widget.PopupWindow();
        this.layout = new android.widget.LinearLayout(ctx);
        this.layout.setOrientation(1);
        this.layout.setGravity(android.view.Gravity.CENTER);
        this.title = null;
        this.view = null;
        this.useNewGui = useNewGui;
        this.canDrag = true;
        var Gravity = android.view.Gravity;
        this.gravityArray = [Gravity.LEFT | Gravity.TOP, Gravity.CENTER | Gravity.TOP, Gravity.RIGHT | Gravity.TOP, Gravity.LEFT | Gravity.CENTER, Gravity.CENTER, Gravity.RIGHT | Gravity.CENTER, Gravity.LEFT | Gravity.BOTTOM, Gravity.CENTER | Gravity.BOTTOM, Gravity.RIGHT | Gravity.BOTTOM];
        this.gravity = 0;
        this.pos = [0, 0];
    },
};

mcpelib.window.Dialog.prototype = {
    constructor: mcpelib.window.Dialog,
    close: function() {
        try {
            this.dialog.dismiss();
        } catch(e) {
            Utils.showError(e);
        }
    },
    setTitle: function(str) {
        this.title = str.toString();
    },
    setTitleColor: function(color) {
        this.titleColor = color;
    },
    setMessage: function(str) {
        this.msg = str.toString();
    },
    setPositiveButton: function(str, onClick) {
        try {
            this.pBtn = new mcpelib.gui.Button(ctx, this.useNewGui);
            this.pBtn.setText(str);
            var margin = new android.view.ViewGroup.MarginLayoutParams(-2, -2);
            var mar = Utils.getDp(10);
            margin.setMargins(mar, Utils.getDp(15), mar, mar);
            this.pBtn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
            if(onClick != null) this.pBtn.setOnClickListener(onClick);
            var cache = this;
            this.pBtn.setOnTouchListener(new android.view.View.OnTouchListener({
                onTouch: function(v, ev) {
                    if(ev.action == android.view.MotionEvent.ACTION_DOWN || ev.action == android.view.MotionEvent.ACTION_MOVE) {
                        if(cache.useNewGui) {
                            cache.pBtn.setBackgroundDrawable(BitmapManager.getDrawable(6));
                            cache.pBtn.setTextColor(white);
                        } else {
                            cache.pBtn.setBackgroundDrawable(BitmapManager.getDrawable(1));
                        }
                    } else if(ev.action == android.view.MotionEvent.ACTION_UP) {
                        if(cache.useNewGui) {
                            cache.pBtn.setBackgroundDrawable(BitmapManager.getDrawable(5));
                            cache.pBtn.setTextColor(black);
                        } else {
                            cache.pBtn.setBackgroundDrawable(BitmapManager.getDrawable(0));
                        }
                        new android.os.Handler().postDelayed(new java.lang.Runnable({
                            run: function() {
                                cache.dialog.dismiss();
                            }
                        }), 50);
                        if(cache.useSound) Util.playSound();
                    }
                    return false;
                }
            }));
        } catch(e) {
            Utils.showError(e);
        }
    },
    setNegativeButton: function(str, onClick) {
        try {
            this.nBtn = new mcpelib.gui.Button(ctx, this.useNewGui);
            this.nBtn.setText(str);
            var margin = new android.view.ViewGroup.MarginLayoutParams(-2, -2);
            var mar = Utils.getDp(10);
            margin.setMargins(mar, Utils.getDp(15), mar, mar);
            this.nBtn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
            if(onClick != null) this.nBtn.setOnClickListener(onClick);
            var cache = this;
            this.nBtn.setOnTouchListener(new android.view.View.OnTouchListener() {
                onTouch: function(v, ev) {
                    if(ev.action == android.view.MotionEvent.ACTION_DOWN || ev.action == android.view.MotionEvent.ACTION_MOVE) {
                        if(cache.useNewGui) {
                            cache.nBtn.setBackgroundDrawable(BitmapManager.getDrawable(6));
                            cache.nBtn.setTextColor(white);
                        } else {
                            cache.nBtn.setBackgroundDrawable(BitmapManager.getDrawable(1));
                        }
                    } else if(ev.action == android.view.MotionEvent.ACTION_UP) {
                        if(cache.useNewGui) {
                            cache.nBtn.setBackgroundDrawable(BitmapManager.getDrawable(5));
                            cache.nBtn.setTextColor(black);
                        } else {
                            cache.nBtn.setBackgroundDrawable(BitmapManager.getDrawable(0));
                        }
                        new android.os.Handler().postDelayed(new java.lang.Runnable({
                            run: function() {
                                cache.dialog.dismiss();
                            }
                        }), 50);
                        if(cache.useSound) Util.playSound();
                    }
                    return false;
                }
            });
        } catch(e) {
            Utils.showError(e);
        }
    },
    setView: function(layout) {
        this.view = layout;
    },
    show: function() {
        try {
            var layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(1);
            if(this.title != null) {
                var title = new mcpelib.gui.TextView(ctx);
                title.setText(this.title);
                title.setTextSize(25);
                title.setTextColor(this.titleColor);
                title.setGravity(android.view.Gravity.CENTER);
                if(this.useNewGui) title.setBackgroundDrawable(BitmapManager.getDrawable(7));
                else title.setBackgroundDrawable(BitmapManager.getDrawable(2));
                var pad = Utils.getDp(10);
                title.setPadding(pad, pad, pad, Utils.getDp(15));
            }
            if(this.msg != null) {
                var text = new android.widget.TextView(ctx);
                text.setText(this.msg);
                if(this.useNewGui) text.setTextColor(black);
                else text.setTextColor(white);
                text.setTextSize(18);
                text.setTypeface(font);
                var pad = Utils.getDp(5);
                text.setPadding(pad, pad, pad, Utils.getDp(15));
                layout.addView(text);
            }
            var btnLayout = new android.widget.LinearLayout(ctx);
            btnLayout.setOrientation(0);
            if(this.nBtn != null) {
                if(this.pBtn != null) this.nBtn.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 1 / 3 - Utils.getDp(25));
                else this.nBtn.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 2 / 3 - Utils.getDp(40));
                btnLayout.addView(this.nBtn);
            }
            if(this.pBtn != null) {
                if(this.nBtn != null) this.pBtn.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 1 / 3 - Utils.getDp(25));
                else this.pBtn.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 2 / 3 - Utils.getDp(40));
                btnLayout.addView(this.pBtn);
            }
            if(this.view != null) layout.addView(this.view);
            layout.addView(btnLayout);
            var pad = Utils.getDp(15);
            layout.setPadding(pad, pad, pad, pad);
            var scroll = new android.widget.ScrollView(ctx);
            scroll.addView(layout);
            var layout2 = new android.widget.LinearLayout(ctx);
            layout2.setOrientation(1);
            if(this.title != null) layout2.addView(title);
            layout2.addView(scroll);
            this.dialog.setContentView(layout2);
            this.dialog.setFocusable(true);
            if(this.useNewGui) this.dialog.setBackgroundDrawable(BitmapManager.getDrawable(5));
            else this.dialog.setBackgroundDrawable(BitmapManager.getDrawable(0));
            this.dialog.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 2 / 3);
            this.dialog.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight() * 4 / 5);
            this.dialog.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
        } catch(e) {
            Utils.showError(e);
        }
    }
};

mcpelib.window.Window.prototype = {
    constructor: mcpelib.window.Window,
    close: function() {
        try {
            this.window.dismiss();
        } catch(e) {
            Utils.showError(e);
        }
    },
    setTitle: function(str) {
        this.title = str.toString();
    },
    setTitleColor: function(color) {
        this.titleColor = color;
    },
    setView: function(view) {
        this.view = view;
    },
    setCanScroll: function(canScroll) {
        this.makeScroll = canScroll;
    },
    show: function() {
        try {
            var pad = Utils.getDp(15);
            var layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(1);
            if(this.title != null) {
                var title = new mcpelib.gui.TextView(ctx);
                title.setText(this.title);
                title.setTextSize(25);
                title.setTextColor(this.titleColor);
                title.setGravity(android.view.Gravity.CENTER);
                if(this.useNewGui) title.setBackgroundDrawable(BitmapManager.getDrawable(7));
                else title.setBackgroundDrawable(BitmapManager.getDrawable(2));
                var pad = Utils.getDp(10);
                title.setPadding(pad, pad, pad, Utils.getDp(16));
                layout.addView(title);
            }
            if(this.view != null) {
                var cacheLayout = new android.widget.LinearLayout(ctx);
                cacheLayout.setOrientation(1);
                cacheLayout.addView(this.view);
                cacheLayout.setPadding(pad, pad, pad, pad);
                if(this.makeScroll) {
                    var scroll = new android.widget.ScrollView(ctx);
                    scroll.addView(cacheLayout);
                    layout.addView(scroll);
                } else {
                    layout.addView(cacheLayout);
                }
            }
            this.window.setContentView(layout);
            this.window.setFocusable(true);
            if(this.useNewGui) this.window.setBackgroundDrawable(BitmapManager.getDrawable(5));
            else this.window.setBackgroundDrawable(BitmapManager.getDrawable(0));
            this.window.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth());
            this.window.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
            this.window.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
        } catch(e) {
            Utils.showError(e);
        }
    }
};

mcpelib.window.FloatingWindow.prototype = {
    constructor: mcpelib.window.FloatingWindow,
    close: function() {
        try {
            this.window.dismiss();
        } catch(e) {
            Utils.showError(e);
        }
    },
    setTitle: function(txt) {
        this.title = txt;
    },
    addText: function(text, func) {
        try {
            var txt = new mcpelib.gui.TextView(ctx, this.useNewGui);
            txt.setText(text);
            txt.setTextSize(15);
            txt.setGravity(android.view.Gravity.CENTER);
            if(func != null) txt.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    try {
                        if(typeof func == "function") func();
                        else eval(func + "");
                    } catch(e) {
                        Utils.showError(e);
                    }
                }
            }));
            var pad = Utils.getDp(1);
            txt.setPadding(pad, pad, pad, pad);
            this.layout.addView(txt);
        } catch(e) {
            Utils.showError(e);
        }
    },
    addToggleText: function(text, func1, func2, isOn) {
        try {
            var useNew = this.useNewGui;
            var txt = new mcpelib.gui.TextView(ctx, useNew);
            txt.setText(text);
            if(isOn) txt.setTextColor(yellow);
            txt.setTextSize(15);
            txt.setGravity(android.view.Gravity.CENTER);
            txt.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    try {
                        switch(txt.getTextColors().getDefaultColor()) {
                            case yellow:
                                if(typeof func2 == "function") func2();
                                else eval(func2 + "");
                                if(useNew) txt.setTextColor(black);
                                else txt.setTextColor(white);
                                break;
                            default:
                                if(typeof func1 == "function") func1();
                                else eval(func1 + "");
                                txt.setTextColor(yellow);
                                break;
                        }
                    } catch(e) {
                        Utils.showError(e);
                    }
                }
            }));
            var pad = Utils.getDp(1);
            txt.setPadding(pad, pad, pad, pad);
            this.layout.addView(txt);
        } catch(e) {
            Utils.showError(e);
        }
    },
    setPosition: function(gravityId, x, y) {
        this.gravity = this.gravityArray[gravityId];
        this.dragType = gravityId;
        this.pos = [x, y];
    },
    show: function() {
        try {
            var window = this.window;
            var layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(1);
            var title = new mcpelib.gui.TextView(ctx);
            title.setText(this.title);
            title.setTextColor(yellow);
            title.setTextSize(17);
            title.setGravity(android.view.Gravity.CENTER);
            if(this.useNewGui) title.setBackgroundDrawable(BitmapManager.getDrawable(7));
            else title.setBackgroundDrawable(BitmapManager.getDrawable(2));
            var pad = Utils.getDp(4);
            title.setPadding(pad, pad, pad, Utils.getDp(6));
            layout.addView(title);
            pad = Utils.getDp(2);
            this.layout.setPadding(pad, pad, pad, pad);
            var scroll = new android.widget.ScrollView(ctx);
            scroll.addView(this.layout);
            scroll.setPadding(pad, pad, pad, pad);
            layout.addView(scroll);
            title.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    try {
                        if(layout.getChildCount() == 1) {
                            layout.addView(scroll);
                            window.update(Utils.getDp(120), Utils.getDp(150));
                        } else {
                            layout.removeView(scroll);
                            window.update(Utils.getDp(120), -2);
                        }
                    } catch(e) {
                        Utils.showError(e);
                    }
                }
            }));
            var longTouchCheck = false;
            var dragType = this.dragType;
            title.setOnLongClickListener(new android.view.View.OnLongClickListener({
                onLongClick: function(v) {
                    longTouchCheck = true;
                    return true;
                }
            }));
            title.setOnTouchListener(new android.view.View.OnTouchListener({
                onTouch: function(v, ev) {
                    try {
                        if(longTouchCheck) {
                            switch(ev.action) {
                                case android.view.MotionEvent.ACTION_MOVE:
                                    var eX = ev.getRawX();
                                    var eY = ev.getRawY();
                                    var sX = ctx.getWindowManager().getDefaultDisplay().getWidth();
                                    var sY = ctx.getWindowManager().getDefaultDisplay().getHeight();
                                    var wS = [window.getWidth(), window.getHeight()];
                                    if(dragType == 0) window.update(eX, eY, wS[0], wS[1]);
                                    else if(dragType == 1) window.update(eX - sX / 2, eY, wS[0], wS[1]);
                                    else if(dragType == 2) window.update(sX - eX, eY, wS[0], wS[1]);
                                    else if(dragType == 3) window.update(eX, eY - sY / 2, wS[0], wS[1]);
                                    else if(dragType == 4) window.update(eX - sX / 2, eY - sY / 2, wS[0], wS[1]);
                                    else if(dragType == 5) window.update(sX - eX, eY - sY / 2, wS[0], wS[1]);
                                    else if(dragType == 6) window.update(eX, sY - eY, wS[0], wS[1]);
                                    else if(dragType == 7) window.update(eX - sX / 2, sY - eY, wS[0], wS[1]);
                                    else if(dragType == 8) window.update(sX - eX, sY - eY, wS[0], wS[1]);
                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                    longTouchCheck = false;
                                    break;
                            }
                        }
                        return false;
                    } catch(e) {
                        Utils.showError(e);
                    }
                }
            }));
            window.setContentView(layout);
            window.setWidth(Utils.getDp(120));
            window.setHeight(Utils.getDp(150));
            if(this.useNewGui) window.setBackgroundDrawable(BitmapManager.getDrawable(5));
            else window.setBackgroundDrawable(BitmapManager.getDrawable(0));
            window.showAtLocation(ctx.getWindow().getDecorView(), this.gravity, this.pos[0], this.pos[1]);
        } catch(e) {
            Utils.showError(e);
        }
    }
};


function selectLevelHook() {
    Utils.exportLibrary();
}

function serverConnectedHook(ip, port) {
    Utils.exportLibrary();
}

function chatHook(str) {
    if(str == "mcpeclasslibset") {
        Utils.openSettings();
        preventDefault();
    }
}

function changeLocalImageSettingHook(useLocal) {
    useLocalBitmap = useLocal;
    if(useLocal) {
        var file = new java.io.File(sdcard + "/darkTornado/MCPEClassLibrary/images.png");
        if(file.exists()) BitmapManager.generateLocalBitmaps();
        else Utils.showDialog("File is not Found", "You should connect to the Internet to do download additional image file and restart Blocklauncher.");
    }
}

