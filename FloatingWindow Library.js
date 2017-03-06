/*
FloatingWindow Library
version 2.4
© 2016-2017 Dark Tornado, All rights reserved.

new FloatingWindow();
.setTitle(String title);
.setTitleColor(Color color);
.addText(String text, void func);
.addToggleText(String text, void func1, void func2, boolean isChecked);
.addExitText(String text);
.setColor(int Color);
.setDrawable(Drawable drawable);
.setWidth(int sizeX);
.setHeight(int sizeY);
.getText(int index);
.show();
.close();
*/


const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

const PopupWindow = android.widget.PopupWindow;
const Color = android.graphics.Color;
const LinearLayout = android.widget.LinearLayout;
const ScrollView = android.widget.ScrollView;
const TextView = android.widget.TextView;
const View = android.view.View;
const MotionEvent = android.view.MotionEvent;
const Gravity = android.view.Gravity;
const ColorDrawable = android.graphics.drawable.ColorDrawable;
const Thread = java.lang.Thread;
const Runnable = java.lang.Runnable;
const ScriptManager = net.zhuoweizhang.mcpelauncher.ScriptManager;
const ScriptableObject = org.mozilla.javascript.ScriptableObject;

function dip2px(ctx, dips) {
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function FloatingWindow() {
    this.window = new PopupWindow(ctx);
    this.title = "";
    this.titleColor = Color.BLUE;
    this.color = Color.argb(110, 100, 255, 100);
    this.drawable = null;
    this.layout = new LinearLayout(ctx);
    this.txtArr = [];
    this.cb = null;
    this.size = [dip2px(ctx, 100), dip2px(ctx, 130)];
}

FloatingWindow.prototype = {
    setTitle: function(text) {
        this.title = text;
    },
    setTitleColor: function(color) {
        this.titleColor = color;
    },
    addText: function(text, func) {
        var txt = new TextView(ctx);
        txt.setText(text);
        txt.setTextColor(Color.WHITE);
        txt.setTextSize(15);
        txt.setGravity(Gravity.CENTER);
        if(func != null) txt.setOnClickListener(new View.OnClickListener({
            onClick: function(v) {
                try {
                    func();
                } catch(e) {
                    print(e);
                }
            }
        }));
        this.layout.addView(txt);
        this.txtArr.push(txt);
    },
    addToggleText: function(text, func1, func2, tf) {
        var txt = new TextView(ctx);
        txt.setText(text);
        if(tf) txt.setTextColor(Color.YELLOW);
        else txt.setTextColor(Color.WHITE);
        txt.setTextSize(15);
        txt.setGravity(Gravity.CENTER);
        txt.setOnClickListener(new View.OnClickListener({
            onClick: function(v) {
                try {
                    switch(txt.getTextColors().getDefaultColor()) {
                        case Color.WHITE:
                            func1();
                            txt.setTextColor(Color.YELLOW);
                            break;
                        case Color.YELLOW:
                            func2();
                            txt.setTextColor(Color.WHITE);
                            break;
                    }
                } catch(e) {
                    print(e);
                }
            }
        }));
        this.layout.addView(txt);
        this.txtArr.push(txt);
    },
    setColor: function(color) {
        this.color = color;
    },
    setDrawable: function(drawable) {
        this.drawable = drawable;
    },
    getText: function(index) {
        if(index == -1) return this.cb;
        else return this.txtArr[index];
    },
    show: function() {
        var cache = this;
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    cache.layout.setOrientation(1);
                    cache.layout.setGravity(Gravity.CENTER);
                    var title = new TextView(ctx);
                    title.setText(cache.title);
                    title.setTextColor(cache.titleColor);
                    title.setTextSize(17);
                    title.setGravity(Gravity.CENTER);
                    var pad = dip2px(ctx, 1);
                    title.setPadding(pad, pad, pad, pad);
                    pad = dip2px(ctx, 2);
                    cache.layout.setPadding(pad, pad, pad, pad);
                    var scroll = new ScrollView(ctx);
                    scroll.addView(cache.layout);
                    var layout = new LinearLayout(ctx);
                    layout.setOrientation(1);
                    layout.addView(title);
                    layout.addView(scroll);
                    title.setOnClickListener(new View.OnClickListener({
                        onClick: function(v) {
                            try {
                                if(layout.getChildCount() == 1) {
                                    layout.addView(scroll);
                                    cache.window.update(cache.size[0], cache.size[1]);
                                } else {
                                    layout.removeView(scroll);
                                    cache.window.update(cache.size[0], -2);
                                }
                            } catch(e) {
                                print(e);
                            }
                        }
                    }));
                    var longTouchCheck = false;
                    title.setOnLongClickListener(new View.OnLongClickListener({
                        onLongClick: function(v) {
                            longTouchCheck = true;
                            return true;
                        }
                    }));
                    title.setOnTouchListener(new View.OnTouchListener({
                        onTouch: function(v, ev) {
                            try {
                                if(longTouchCheck) {
                                    switch(ev.action) {
                                        case MotionEvent.ACTION_MOVE:
                                            cache.window.update(ev.getRawX(), ev.getRawY(), cache.window.getWidth(), cache.window.getHeight());
                                            break;
                                        case MotionEvent.ACTION_UP:
                                            longTouchCheck = false;
                                            break;
                                    }
                                }
                                return false;
                            } catch(e) {
                                print(e);
                            }
                        }
                    }));
                    cache.window.setContentView(layout);
                    cache.window.setWidth(cache.size[0]);
                    cache.window.setHeight(cache.size[1]);
                    if(cache.drawable != null) cache.window.setBackgroundDrawable(cache.drawable);
                    else cache.window.setBackgroundDrawable(new ColorDrawable(cache.color));
                    cache.window.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, dip2px(ctx, 90), dip2px(ctx, 90));
                } catch(e) {
                    print(e);
                }
            }
        }));
    },
    close: function() {
        var window = this.window;
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    if(window != null) window.dismiss();
                } catch(e) {
                    print(e);
                }
            }
        }));
    },
    addExitText: function(txt) {
        if(txt == null) txt = "닫기";
        this.cb = new TextView(ctx);
        this.cb.setText(txt);
        this.cb.setTextColor(Color.WHITE);
        this.cb.setTextSize(15);
        this.cb.setGravity(Gravity.CENTER);
        var window = this.window;
        this.cb.setOnClickListener(new View.OnClickListener({
            onClick: function(v) {
                try {
                    window.dismiss();
                } catch(e) {
                    print(e);
                }
            }
        }));
        this.layout.addView(this.cb);
    },
    setWidth: function(value) {
        this.size[0] = value;
    },
    setHeight: function(value) {
        this.size[1] = value;
    }
};

new Thread({
    run: function() {
        for(;;) {
            Thread.sleep(100);
            if(Server.getAddress() != null) {
                serverConnectedHook(Server.getAddress(), Server.getPort());
                break;
            }
        }
    }
}).start();

function selectLevelHook() {
    exportLibrary();
}

function serverConnectedHook(ip, port) {
    exportLibrary();
}

function exportLibrary() {
    var script = ScriptManager.scripts;
    var so = ScriptableObject;
    for(var n = 0; n < script.size(); n++) {
        var scope = script.get(n).scope;
        if(!so.hasProperty(scope, "FloatingWindow")) so.putProperty(scope, "FloatingWindow", FloatingWindow);
    }
    ScriptManager.callScriptMethod("onLibraryLoaded", ["FloatingWindow Library", "2.4", "Dark Tornado"]);
}

