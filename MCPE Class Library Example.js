/*
MCPE Class Library Example
Copyleft 2017 Dark Tornado, All rights reserved?
*/

const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var btn = null;
var btn2 = null;

function dip2px(ctx, dips) {
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function newLevel() {
    makeOldButton();
    makeNewButton();
}

function makeOldButton() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                btn = new android.widget.PopupWindow();
                var button = new mcpelib.gui.Button(ctx);
                button.setText("Old");
                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        showExampleDialog(false);
                    }
                }));
                btn.setContentView(button);
                btn.setWidth(dip2px(ctx, 47));
                btn.setHeight(dip2px(ctx, 90));
                btn.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                btn.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.RIGHT, 0, 0);
            } catch(e) {
                clientMessage(e + ", " + e.lineNumber);
            }
        }
    }));
}

function makeNewButton() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                btn2 = new android.widget.PopupWindow();
                var button = new mcpelib.gui.Button(ctx, true);
                button.setText("New");
                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        showExampleDialog(true);
                    }
                }));
                btn2.setContentView(button);
                btn2.setWidth(dip2px(ctx, 47));
                btn2.setHeight(dip2px(ctx, 90));
                btn2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                btn2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.LEFT, 0, 0);
            } catch(e) {
                clientMessage(e + ", " + e.lineNumber);
            }
        }
    }));
}

function showExampleDialog(isNew) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new mcpelib.window.Dialog(ctx, isNew);
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                var txt = new mcpelib.gui.TextView(ctx, isNew);
                txt.setText("I am TextView");
                txt.setTextSize(16);
                layout.addView(txt);
                var txt2 = new mcpelib.gui.EditText(ctx, isNew);
                txt2.setHint("I am EditText");
                layout.addView(txt2);
                var btn = new mcpelib.gui.Button(ctx, isNew);
                btn.setText("I am Button");
                layout.addView(btn);
                var swi = new mcpelib.gui.Switch(ctx, isNew);
                swi.setText("I am Switch");
                swi.setChecked(false);
                layout.addView(swi.mv());
                dialog.setView(layout);
                dialog.setTitle("I am Dialog");
                dialog.setNegativeButton("Close", null);
                dialog.setPositiveButton("Something", new android.view.View.OnClickListener() {
                    onClick: function(v) {
                        print("늴리랄라?");
                    }
                });
                dialog.show();
            } catch(e) {
                clientMessage(e + ", " + e.lineNumber);
            }
        }
    }));
}

function leaveGame() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            if(btn != null) {
                btn.dismiss();
                btn = null;
            }
            if(btn2 != null) {
                btn2.dismiss();
                btn2 = null;
            }
        }
    }));
}

