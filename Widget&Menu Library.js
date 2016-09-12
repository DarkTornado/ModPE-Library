/*
Widget&Menu Library
version 1.1
© 2016 Dark Tornado, All rights reserved.
-----
Widget

Widget.Color(Same as android.graphics.Color)
Widget.Color.GREEN
Widget.Color.LTGRAY
Widget.Color.DKGRAY
Widget.Color.NAVY
Widget.Color.BLACK
Widget.Color.MAGENTA
Widget.Color.ORANGE
Widget.Color.RED
Widget.Color.WHITE
Widget.Color.BLUE
Widget.Color.MAROON
Widget.Color.CYAN
Widget.Color.YELLOW
Widget.Color.PURPLE
Widget.Color.GRAY
Widget.Color.argb(int alpha, int red, int green, int blue);
.
.
.

Widget.Gravity(Same as android.view.Gravity)
Widget.Gravity.TOP
Widget.Gravity.BOTTOM
Widget.Gravity.LEFT
Widget.Gravity.RIGHT
Widget.Gravity.CENTER

Widget.InputType.NUMBER  //Can input only number
Widget.InputType.NUMBER_EXPAND  //Can input only number include . and -
Widget.InputType.TEXT  //Can input only text(?)
Widget.InputType.PASSWORD  //Hide what I input.

Widget.screenX  //Screen's width size
Widget.screenY  //Screen's height size

int Widget.dp(int dips);  //Same as dip2px(Context ctx, int dips);
PopupWindow[] Widget.getAll();  //Get all Buttons/TextViews created by Widget Library.
PopupWindow[] Widget.getAllMenus();  //Get all Menus created by Widget Library.
void Widget.removeAll();  //Remove all Buttons/TextViews created by Widget Library.
void Widget.closeAllMenus();  //Get all Menus created by Widget Library.
void Widget.showError(Error error);  //Show error and line number.
PopupWindow Widget.createButton(String txt, void func, int sizeX, int sizeY, Gravity align1, Gravity align2, int pos1, int pos2, void foncLong, Color color, Color txtColor, int txtSize);  //Create a button.
PopupWindow Widget.createButton(String text, int txtSize, Color txtColor, int sizeX, int sizeY, Gravity align1, Gravity align2, int pos1, int pos2);  //Create a Text View.
void Widget.showDialog(String title, String message, String btnValue, android.app.AlertDialog.THEME... theme);  //Show Dialog
void Widget.toast(String message);  //Show Toast


Menu

new Menu();
.setTitle(String title);  //Set Menu's Title.
.setTitleColor(Color color);  //Set Menu's Title's Color.
.setTitleSize(int size);  //Set Menu's Title's Size. Defalut value is 20.
.setColor(Color color);  //Set Menu's Color.
.addText(String text, int textSize, Color textColor);  //Add Text to Menu.
.addInputText(String hint, InputType inputType, Color textColor);  //Add EditText to Menu.
.addToggleButton(String textOn, void onClickOn, String textOff, void onClickOff, Boolean isChecked, Color textColor, Color btnColor);  //Add ToggleButton to Menu
.addToggleButton(String textOn, String onClickOn, String textOff, String onClickOff, Boolean isChecked, Color textColor, Color btnColor);  //Add ToggleButton to Menu
.addButton(String text, void onClick, void longClick, Color textColor, Color btnColor);  //Add Button to Menu.
.addButton(String text, String onClick, String longClick, Color textColor, Color btnColor);  //Add Button to Menu.
.setWidth(int width);  //Set Menu's Width. Defalut value is (Screen's Width)/2.
.setHeight(int height);  //Set Menu's Height. Defalut value is Screen's Height.
.setGravity(Gravity gravity1, Gravity gravity1);  //Set Menu's Gravity. Defalut value is (CENTER, CENTER).
.setFocusable(Boolean isFocusable);  //Set Menu can be focused or not. Defalut value is false.
.setPadding(int pad);  //Set Menu's Padding. Defalut value is dip2px(ctx, 5).
.getWidget(int index);  //Get Widget's Value from menu.
.getWidgetText(int index);  //Get Widget's Text from menu.
.show(int pos1, int pos2);  //Show the menu.
.close();  //Close the menu.
-----

*/

try{
const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
}catch(e){}

var windowArray = [];
var menuArray = [];

function dip2px(ctx, dips) {
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

const Widget = {
    Color: android.graphics.Color,
    Gravity: android.view.Gravity,
    InputType: {
        NUMBER: android.text.InputType.TYPE_CLASS_NUMBER,
        NUMBER_EXPAND: android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL,
        TEXT: android.text.InputType.TYPE_CLASS_TEXT,
        PASSWORD: android.text.InputType.TYPE_CLASS_TEXT | android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD
    },
    screenX: ctx.getWindowManager().getDefaultDisplay().getHeight(),
    screenY: ctx.getWindowManager().getDefaultDisplay().getWidth(),
    dp: function(dips) {
        return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
    },
    getAll: function() {
        return windowArray;
    },
    getAllMenus: function() {
        return menuArray;
    },
    removeAll: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    for(var n = 0; n < windowArray.length; n++) {
                        try {
                            windowArray[n].dismiss();
                        } catch(e) {}
                    }
                    windowArray = [];
                } catch(e) {
                    Widget.showError(e);
                }
            }
        }));
    },
    closeAllMenus: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    for(var n = 0; n < menuArray.length; n++) {
                        try {
                            menuArray[n].dismiss();
                        } catch(e) {}
                    }
                    menuArray = [];
                } catch(e) {
                    Widget.showError(e);
                }
            }
        }));
    },
    showError: function(error) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new android.app.AlertDialog.Builder(ctx);
                    dialog.setTitle("Error From Widget Library");
                    dialog.setMessage(error + "\nLine: " + error.lineNumber);
                    dialog.setNegativeButton("close", null);
                    dialog.show();
                } catch(e) {
                    print(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    createButton: function(txt, func, sizeX, sizeY, align1, align2, pos1, pos2, foncLong, color, txtColor, txtSize) {
        var btn = new android.widget.PopupWindow();
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var layout = new android.widget.RelativeLayout(ctx);
                    var button = new android.widget.Button(ctx);
                    button.setText(txt.toString());
                    if(color != null) button.setBackgroundColor(color);
                    if(txtColor != null) button.setTextColor(txtColor);
                    if(txtSize != null) button.setTextSize(txtSize);
                    button.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(v) {
                            try {
                                if(typeof func == "function") func();
                                else eval(func + "");
                            } catch(e) {
                                Widget.showError(e);
                            }
                        }
                    }));
                    if(foncLong != null) button.setOnLongClickListener(new android.view.View.OnLongClickListener({
                        onLongClick: function(v) {
                            try {
                                if(typeof funcLong == "function") funcLong();
                                else eval(funcLong + "");
                            } catch(e) {
                                Widget.showError(e);
                            }
                            return true;
                        }
                    }));
                    layout.addView(button);
                    btn.setContentView(layout);
                    btn.setWidth(sizeX);
                    btn.setHeight(sizeY);
                    btn.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                    btn.showAtLocation(ctx.getWindow().getDecorView(), align1 | align2, pos1, pos2);
                    return btn;
                } catch(e) {
                    Widget.showError(e);
                }
            }
        }));
        return btn;
    },
    createText: function(text, txtSize, txtColor, sizeX, sizeY, align1, align2, pos1, pos2) {
        var window = new android.widget.PopupWindow();
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var txt = new android.widget.TextView(ctx);
                    txt.setText(text.toString());
                    if(txtSize != null) txt.setTextSize(txtSize);
                    if(txtColor != null) txt.setTextColor(txtColor);
                    layout.addView(txt);
                    var scroll = new android.widget.ScrollView(ctx);
                    scroll.addView(layout);
                    window.setContentView(scroll);
                    window.setWidth(sizeX);
                    window.setHeight(sizeX);
                    window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                    window.showAtLocation(ctx.getWindow().getDecorView(), align1 | align2, pos1, pos2);
                } catch(e) {
                    Widget.showError(e);
                }
            }
        }));
        return window;
    },
    remove: function(window) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    windowArray.splice(windowArray.indexOf(window), 1);
                    window.dismiss();
                } catch(e) {
                    Widget.showError(e);
                }
            }
        }));
    },
    showDialog: function(title, msg, exit, theme) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    if(theme == null) var dialog = new android.app.AlertDialog.Builder(ctx);
                    else var dialog = new android.app.AlertDialog.Builder(ctx, theme);
                    dialog.setTitle(title);
                    dialog.setMessage(msg);
                    if(exit != null) dialog.setNegativeButton(exit, null);
                    dialog.show();
                } catch(e) {
                    Widget.showError(e);
                }
            }
        }));
    },
    toast: function(msg) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var toast = android.widget.Toast.makeText(ctx, msg, android.widget.Toast.LENGTH_LONG);
                    toast.show();
                } catch(e) {
                    Widget.showError(e);
                }
            }
        }));
    }
};


function Menu() {
    this.window = new android.widget.PopupWindow();
    this.title = null;
    this.titleColor = null;
    this.titleSize = 20;
    this.color = null;
    this.widgets = [];
    this.width = 0.5;
    this.height = 1;
    this.align1 = android.view.Gravity.CENTER;
    this.align2 = android.view.Gravity.CENTER;
    this.focus = false;
    this.pad = dip2px(ctx, 5);
}

Menu.prototype = {
    setTitle: function(title) {
        this.title = title;
    },
    setTitleColor: function(color) {
        this.titleColor = color;
    },
    setTitleSize: function(color) {
        this.titleSize = color;
    },
    setColor: function(color) {
        this.color = color;
    },
    addText: function(text, textSize, textColor) {
        var txt = new android.widget.TextView(ctx);
        txt.setText(text);
        txt.setTextSize(textSize);
        if(textColor != null) txt.setTextColor(textColor);
        this.widgets.push(txt);
    },
    addInputText: function(hint, inputType, textColor) {
        var txt = new android.widget.EditText(ctx);
        txt.setHint(hint);
        if(inputType != null) txt.setInputType(inputType);
        if(textColor != null) txt.setTextColor(textColor);
        this.widgets.push(txt);
    },
    addToggleButton: function(textOn, onClickOn, textOff, onClickOff, isChecked, textColor, btnColor) {
        var btnT = new android.widget.ToggleButton(ctx);
        btnT.setTextOn(textOn);
        btnT.setTextOff(textOff);
        if(isChecked != null) btnT.setChecked(isChecked);
        if(textColor != null) btnT.setTextColor(textColor);
        if(btnColor != null) btnT.setBackgroundColor(btnColor);
        btnT.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
            onCheckedChanged: function(toggle, onoff) {
                try {
                    if(onoff) {
                        if(typeof onClickOn == "function") onClickOn();
                        else eval(onClickOn + "");
                    } else {
                        if(typeof onClickOff == "function") onClickOff();
                        else eval(onClickOff + "");
                    }
                } catch(e) {
                    Widget.showError(e);
                }
            }
        }));
        this.widgets.push(btnT);
    },
    addButton: function(text, onClick, longClick, textColor, btnColor) {
        var btn = new android.widget.Button(ctx);
        btn.setText(text);
        if(textColor != null) btn.setTextColor(textColor);
        if(btnColor != null) btn.setBackgroundColor(btnColor);
        btn.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                try {
                    if(typeof onClick == "function") onClick();
                    else eval(onClick + "");
                } catch(e) {
                    Widget.showError(e);
                }
            }
        }));
        if(longClick != null) btn.setOnLongClickListener(new android.view.View.OnLongClickListener({
            onLongClick: function(v) {
                try {
                    if(typeof longClick == "function") longClick();
                    else eval(longClick + "");
                } catch(e) {
                    Widget.showError(e);
                }
                return true;
            }
        }));
        this.widgets.push(btn);
    },
    setWidth: function(width) {
        this.width = width;
    },
    setHeight: function(height) {
        this.height = height;
    },
    setGravity: function(gravity1, gravity2) {
        this.align1 = gravity1;
        this.align2 = gravity2;
    },
    setFocusable: function(isFocusable) {
        this.focus = isFocusable;
    },
    setPadding : function(pad) {
        this.pad = pad;
    },
    getWidget: function(index) {
        return this.widgets[Number(index) - 1];
    },
    getWidgetText: function(index) {
        return this.widgets[Number(index) - 1].getText();
    },
    show: function(pos1, pos2) {
        var cache = this;
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    if(cache.title != null) {
                        var title = new android.widget.TextView(ctx);
                        title.setText(cache.title);
                        if(cache.titleColor != null) title.setTextColor(cache.titleColor);
                        if(cache.titleSize != null) title.setTextSize(cache.titleSize);
                        title.setGravity(android.view.Gravity.CENTER);
                        layout.addView(title);
                    }
                    for(var n = 0; n < cache.widgets.length; n++)
                        layout.addView(cache.widgets[n]);
                    var pad = cache.pad;
                    if(pad > 0) layout.setPadding(pad, pad, pad, pad);
                    var scroll = android.widget.ScrollView(ctx);
                    scroll.addView(layout);
                    cache.window.setContentView(scroll);
                    cache.window.setFocusable(cache.focus);
                    cache.window.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * cache.width);
                    cache.window.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight() * cache.height);
                    if(cache.color != null) cache.window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(cache.color));
                    if(pos1 == null) cache.window.showAtLocation(ctx.getWindow().getDecorView(), cache.align1 | cache.align2, 0, 0);
                    else cache.window.showAtLocation(ctx.getWindow().getDecorView(), cache.align1 | cache.align2, pos1, pos2);
                    menuArray.push(cache.window);
                } catch(e) {
                    Widget.showError(e);
                }
            }
        }));
    },
    close: function() {
        var cache = this.window;
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    cache.dismiss();
                    menuArray.splice(menuArray.indexOf(cache), 1);
                } catch(e) {
                    Widget.showError(e);
                }
            }
        }));
    }
};

