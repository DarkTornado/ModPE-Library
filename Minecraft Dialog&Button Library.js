/*
Minecraft Dialog&Button Library
© 2015-2016 Dark Tornado, All rights reserved.
version 1.0 beta

var dialog = new MinecraftDialog();
.setTitle(String title);
.setMessage(String msg);
.setPositiveButton(String value, void func);
.setNegativeButton(String value, void func);
.close();
.setView(View view);
.show();

MinecraftButton is same as android.widget.Button;
But, cannnot use android.view.View.OnTouchListener;
*/


const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var guiFile = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png"));
var btnBack1 = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guiFile, 8, 32, 8, 8), dip2px(ctx, 8), dip2px(ctx, 8), false);
var btnBack2 = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guiFile, 0, 32, 8, 8), dip2px(ctx, 8), dip2px(ctx, 8), false);
var matrix = new android.graphics.Matrix();
matrix.postScale(-1, -1);
var btnBack3 = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guiFile, 0, 32, 8, 8, matrix, false), dip2px(ctx, 8), dip2px(ctx, 8), false);


function btnBack(type) {
    if (type == 1) return createNinePatch(btnBack1, dip2px(ctx, 3), dip2px(ctx, 3), dip2px(ctx, 3), dip2px(ctx, 3));
    if (type == 2) return createNinePatch(btnBack2, dip2px(ctx, 3), dip2px(ctx, 3), dip2px(ctx, 3), dip2px(ctx, 3));
    if (type == 3) return createNinePatch(btnBack3, dip2px(ctx, 3), dip2px(ctx, 3), dip2px(ctx, 3), dip2px(ctx, 3));
}


function createNinePatch(bitmap, x, y, xx, yy) { //Original Sorce from 아보가토맨(https://github.com/affogatoman)
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
    buffer.putInt(y - 1);
    buffer.putInt(yy);
    buffer.putInt(x - 1);
    buffer.putInt(xx);
    buffer.putInt(NO_COLOR);
    buffer.putInt(NO_COLOR);
    var drawable = new android.graphics.drawable.NinePatchDrawable(ctx.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), null);
    return drawable;
}


function MinecraftDialog() {
    this.dialog = new android.widget.PopupWindow();
    this.title = "";
    this.msg = "";
    this.pBtn = false;
    this.pStr = "";
    this.pFunc = function() {};
    this.nBtn = false;
    this.nStr = "";
    this.nFunc = function() {};
    this.view = null;
    this.list = false;
}

MinecraftDialog.prototype = {
    close: function() {
        try {
            this.dialog.dismiss();
        } catch (e) {
            print(e);
        }
    },
    setTitle: function(str) {
        this.title = str.toString();
    },
    setMessage: function(str) {
        this.msg = str.toString();
    },
    setPositiveButton: function(str, func) {
        this.pBtn = true;
        this.pStr = str.toString();
        this.pFunc = func;
    },
    setNegativeButton: function(str, func) {
        this.nBtn = true;
        this.nStr = str.toString();
        this.nFunc = func;
    },
    setView: function(layout) {
        this.view = layout;
    },
    show: function() {
        try {
            var dialog = this.dialog;
            var layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(1);
            var title = new android.widget.TextView(ctx);
            title.setText(this.title);
            title.setTextSize(25);
            title.setTextColor(android.graphics.Color.YELLOW);
            title.setGravity(android.view.Gravity.CENTER);
            title.setBackgroundDrawable(btnBack(3));
            var pad = dip2px(ctx, 10);
            title.setPadding(pad, pad, pad, pad);
            var text = new android.widget.TextView(ctx);
            text.setText(this.msg);
            text.setTextColor(white);
            text.setTextSize(20);
            layout.addView(text);
            var btnLayout = new android.widget.LinearLayout(ctx);
            btnLayout.setOrientation(0);
            if (this.nBtn) {
                var btnN = new android.widget.Button(ctx);
                var funcN = this.nFunc;
                btnN.setText(this.nStr);
                btnN.setTextColor(white);
                btnN.setBackgroundDrawable(btnBack(1));
                if (this.pBtn) btnN.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 1 / 3 - dip2px(ctx, 15));
                else btnN.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 2 / 3 - dip2px(ctx, 30));
                btnN.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        try {
                            if (funcN != null) funcN();
                            dialog.dismiss();
                        } catch (e) {
                            print(e);
                        }
                    }
                }));
                btnN.setOnTouchListener(new android.view.View.OnTouchListener({
                    onTouch: function(v, ev) {
                        if (ev.action == android.view.MotionEvent.ACTION_DOWN) {
                            btnN.setBackgroundDrawable(btnBack(2));
                        } else {
                            btnN.setBackgroundDrawable(btnBack(1));
                        }
                        return false;
                    }
                }));
                btnLayout.addView(btnN);
            }
            if (this.pBtn) {
                var btnP = new android.widget.Button(ctx);
                var funcP = this.pFunc;
                btnP.setText(this.pStr);
                btnP.setTextColor(white);
                btnP.setBackgroundDrawable(btnBack(1));
                if (this.nBtn) btnP.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 2 / 3 - dip2px(ctx, 15));
                else btnP.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 1 / 3 - dip2px(ctx, 30));
                btnP.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        try {
                            if (funcP != null) funcP();
                            dialog.dismiss();
                        } catch (e) {
                            print(e);
                        }
                    }
                }));
                btnP.setOnTouchListener(new android.view.View.OnTouchListener({
                    onTouch: function(v, ev) {
                        if (ev.action == android.view.MotionEvent.ACTION_DOWN) {
                            btnP.setBackgroundDrawable(btnBack(2));
                        } else {
                            btnP.setBackgroundDrawable(btnBack(1));
                        }
                        return false;
                    }
                }));
                btnLayout.addView(btnP);
            }
            if (this.view != null) layout.addView(this.view);
            var blank = new android.widget.TextView(ctx);
            blank.setText("   ");
            blank.setTextSize(20);
            layout.addView(blank);
            layout.addView(btnLayout);
            var svParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.FILL_PARENT, android.widget.RelativeLayout.LayoutParams.FILL_PARENT);
            var scroll = new android.widget.ScrollView(ctx);
            var pad = dip2px(ctx, 15);
            scroll.setPadding(pad, pad, pad, pad);
            scroll.setLayoutParams(svParams);
            scroll.addView(layout);
            var layout2 = new android.widget.LinearLayout(ctx);
            layout2.setOrientation(1);
            layout2.addView(title);
            layout2.addView(scroll);
            dialog.setContentView(layout2);
            dialog.setFocusable(true);
            dialog.setBackgroundDrawable(btnBack(1));
            dialog.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 2 / 3);
            dialog.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight() * 4 / 5);
            dialog.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, 0, 0);
        } catch (e) {
            clientMessage(e + ", " + e.lineNumber);
        }
    }


};


function MinecraftButton(ctx) {
    var btn = new android.widget.Button(ctx);
    btn.setBackgroundDrawable(btnBack(1));
    btn.setTextColor(white);
    btn.setOnTouchListener(new android.view.View.OnTouchListener({
        onTouch: function(v, ev) {
            if (ev.action == android.view.MotionEvent.ACTION_DOWN) {
                btn.setBackgroundDrawable(btnBack(2));
            } else {
                btn.setBackgroundDrawable(btnBack(1));
            }
            return false;
        }
    }));
    return btn;
}


function selectLevelHook() {
    var script = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
    var so = org.mozilla.javascript.ScriptableObject;
    for(var n = 0; n < script.size(); n++) {
        var scope = script.get(n).scope;
        if(!so.hasProperty(scope, "MinecraftDialog"))
            so.putProperty(scope, "MinecraftDialog", MinecraftDialog);
        if(!so.hasProperty(scope, "MinecraftButton"))
            so.putProperty(scope, "MinecraftButton", MinecraftButton);
    }
}
