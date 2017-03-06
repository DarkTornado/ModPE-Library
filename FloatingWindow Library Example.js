/*
FloatingWindow Library Example
Copyleft 2017 Dark Tornado, All rights reserved?
*/

const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var win = null;
var tooMany = false;

function dip2px(ctx, dips) {
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function newLevel() {
    try {
        win = new FloatingWindow();
        win.setTitle("인벤토리 수정");
        win.addToggleText("블록 무한 설치", function() {
            tooMany = true;
        }, function() {
            tooMany = false;
        }, tooMany);
        win.addText("아이템 지급", function() {
            giveItem();
        });
        win.addText("인벤토리 리셋", function() {
            for(var n = 0; n < 36; n++)
                Player.clearInventorySlot(n);
            print("인벤토리가 리셋되었습니다.");
        });
        win.addText("아이템 아이디", function() {
            showItems();
        });
        win.addText("포션 조합법", function() {
            showPotionRecipe();
        });
        win.addText("갑옷 지급", function() {
            showArmorList();
        });
        win.show();
    } catch(e) {
        clientMessage(e + ", " + e.lineNumber);
    }
}

function useItem(x, y, z, i, b, s, it, bd) {
    if(tooMany && i < 255) {
        addItemInventory(i, 1, it);
    }
}

function leaveGame() {
    if(win != null) {
        win.close();
        win = null;
    }
}

function giveItem() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new android.app.AlertDialog.Builder(ctx);
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                var loc1 = new android.widget.TextView(ctx);
                var loc2 = new android.widget.EditText(ctx);
                var loc3 = new android.widget.TextView(ctx);
                var loc4 = new android.widget.EditText(ctx);
                var loc5 = new android.widget.TextView(ctx);
                var loc6 = new android.widget.EditText(ctx);
                loc1.setText("아이템 아이디 : ");
                loc1.setTextSize(18);
                loc2.setHint("아이템 아이디를 입력하세요...");
                loc2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
                loc3.setText("아이템 개수 : ");
                loc3.setTextSize(18);
                loc4.setHint("아이템 개수를 입력하세요...");
                loc4.setInputType(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED);
                loc5.setText("아이템 데미지 : ");
                loc5.setTextSize(18);
                loc6.setHint("아이템 데미지를 입력하세요...");
                loc6.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
                layout.addView(loc1);
                layout.addView(loc2);
                layout.addView(loc3);
                layout.addView(loc4);
                layout.addView(loc5);
                layout.addView(loc6);
                var pad = dip2px(ctx, 5);
                layout.setPadding(pad, pad, pad, pad);
                var scroll = android.widget.ScrollView(ctx);
                scroll.addView(layout);
                dialog.setView(scroll);
                dialog.setTitle("아이템 지급");
                dialog.setNegativeButton("취소", null);
                dialog.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
                    onClick: function(v) {
                        addItemInventory(loc2.getText(), loc4.getText(), loc6.getText());
                        print("지급되었습니다.");
                    }
                }));
                dialog.show();
            } catch(e) {
                clientMessage(e + ", " + e.lineNumber);
            }
        }
    }));
}

function showItems() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new android.app.AlertDialog.Builder(ctx);
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                var web = new android.webkit.WebView(ctx);
                web.setWebChromeClient(new android.webkit.WebChromeClient());
                web.setWebViewClient(new android.webkit.WebViewClient());
                web.loadUrl("http://hydra-media.cursecdn.com/minecraft.gamepedia.com/c/c6/DataValuesPE.png");
                layout.addView(web);
                var scroll = android.widget.ScrollView(ctx);
                scroll.addView(layout);
                dialog.setView(scroll);
                dialog.setTitle("아이템 아이디");
                dialog.setNegativeButton("닫기", null);
                dialog.show();
            } catch(e) {
                clientMessage(e + ", " + e.lineNumber);
            }
        }
    }));
}

function showPotionRecipe() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new android.app.AlertDialog.Builder(ctx);
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                var web = new android.webkit.WebView(ctx);
                web.setWebChromeClient(new android.webkit.WebChromeClient());
                web.setWebViewClient(new android.webkit.WebViewClient());
                web.loadUrl("https://raw.githubusercontent.com/DarkTornado/darkCheater/master/potionRecipe.jpeg");
                layout.addView(web);
                var scroll = android.widget.ScrollView(ctx);
                scroll.addView(layout);
                dialog.setView(scroll);
                dialog.setTitle("포션 조합법");
                dialog.setNegativeButton("닫기", null);
                dialog.show();
            } catch(e) {
                clientMessage(e + ", " + e.lineNumber);
            }
        }
    }));
}

function showArmorList(tf) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new android.app.AlertDialog.Builder(ctx);
                var menus = ["가죽 갑옷 세트", "사슬 갑옷 세트", "철 갑옷 세트", "다이아몬드 갑옷 세트", "금 갑옷 세트"];
                dialog.setItems(menus, new android.content.DialogInterface.OnClickListener({
                    onClick: function(m, w) {
                        switch(w) {
                            case 0:
                                addItemInventory(298, 1, 0);
                                addItemInventory(299, 1, 0);
                                addItemInventory(300, 1, 0);
                                addItemInventory(301, 1, 0);
                                break;
                            case 1:
                                addItemInventory(302, 1, 0);
                                addItemInventory(303, 1, 0);
                                addItemInventory(304, 1, 0);
                                addItemInventory(305, 1, 0);
                                break;
                            case 2:
                                addItemInventory(306, 1, 0);
                                addItemInventory(307, 1, 0);
                                addItemInventory(308, 1, 0);
                                addItemInventory(309, 1, 0);
                                break;
                            case 3:
                                addItemInventory(310, 1, 0);
                                addItemInventory(311, 1, 0);
                                addItemInventory(312, 1, 0);
                                addItemInventory(313, 1, 0);
                                break;
                            case 4:
                                addItemInventory(314, 1, 0);
                                addItemInventory(315, 1, 0);
                                addItemInventory(316, 1, 0);
                                addItemInventory(317, 1, 0);
                                break;
                        }
                        print(menus[w] + "이 지급되었습니다.");
                    }
                }));
                dialog.setTitle("갑옷 종류 선택");
                dialog.setNegativeButton("취소", null);
                dialog.show();
            } catch(e) {
                clientMessage(e + ", " + e.lineNumber);
            }
        }
    }));
}

