/*
FloatingWindow Library
version 2.2
© 2016 Dark Tornado, All rights reserved.

new FloatingWindow();
.setTitle(String title);
.setTitleColor(Color color);
.addText(String text, void func);
.addText(String text, String func);
.addToggleText(String text, void func1, void func2, boolean isChecked);
.addToggleText(String text, void func1, String func2, boolean isChecked);
.addToggleText(String text, String func1, void func2, boolean isChecked);
.addToggleText(String text, String func1, String func2, boolean isChecked);
.setColor(int Color);
.setDrawable(Drawable drawable);
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

function dip2px(ctx, dips){
return Math.ceil(dips*ctx.getResources().getDisplayMetrics().density);
}

function FloatingWindow() {
    this.window = new PopupWindow(ctx);
    this.title = "";
    this.titleColor = Color.BLUE;
    this.color = Color.argb(110, 100, 255, 100);
    this.drawable = null;
    this.layout = new LinearLayout(ctx);
    this.dp = function(dips) {
        return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
    };
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
                    if(typeof func == "function") func();
                    else eval(func + "");
                } catch(e) {
                    print(e);
                }
            }
        }));
        this.layout.addView(txt);
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
                            if(typeof func1 == "function") func1();
                            else eval(func1 + "");
                            txt.setTextColor(Color.YELLOW);
                            break;
                        case Color.YELLOW:
                            if(typeof func2 == "function") func2();
                            else eval(func2 + "");
                            txt.setTextColor(Color.WHITE);
                            break;
                    }
                } catch(e) {
                    print(e);
                }
            }
        }));
        this.layout.addView(txt);
    },
    setColor: function(color) {
        this.color = color;
    },
    setDrawable: function(drawable) {
        this.drawable = drawable;
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
                                    cache.window.update(dip2px(ctx, 100), dip2px(ctx, 130));
                                } else {
                                    layout.removeView(scroll);
                                    cache.window.update(dip2px(ctx, 100), dip2px(ctx, 30));
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
                    cache.window.setWidth(dip2px(ctx, 100));
                    cache.window.setHeight(dip2px(ctx, 130));
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
}


