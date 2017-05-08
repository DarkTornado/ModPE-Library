/*
Login API
© 2017 Dark Tornado, All rights reserved.
무단 수정 필수!(?)
*/

const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

const Login = {
    isLogined: false,
    loginData: {
        id: null,
        password: null
    },
    infoUrl: "여기에 웹상에 있는 회원 정보들이 들어있는 파일의 주소 입력",
    toast: function(msg) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                var Login.toast = new android.widget.Toast.makeText(ctx, msg, android.widget.Toast.LENGTH_LONG);
                Login.toast.show();
            }
        }));
    },
    getDp: function(dips) {
        return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
    },
    loginDialog: function(hide) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new android.app.AlertDialog.Builder(ctx);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var hide = new android.widget.CheckBox(ctx);
                    hide.setText("비밀번호 숨기기");
                    hide.setChecked(hide);
                    hide.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(check, onoff) {
                            if (onoff) txt4.setInputType(android.text.InputType.TYPE_CLASS_TEXT | android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD);
                            else txt4.setInputType(android.text.InputType.TYPE_CLASS_TEXT);
                        }
                    }));
                    layout.addView(hide);
                    var txt1 = new android.widget.TextView(ctx);
                    var txt2 = new android.widget.EditText(ctx);
                    txt1.setText("아이디 : ");
                    txt1.setTextSize(18);
                    txt2.setHint("아이디를 입력하세요...");
                    layout.addView(txt1);
                    layout.addView(txt2);
                    var txt3 = new android.widget.TextView(ctx);
                    var txt4 = new android.widget.EditText(ctx);
                    txt3.setText("비밀번호 : ");
                    txt3.setTextSize(18);
                    txt4.setHint("비밀번호를 입력하세요...");
                    txt4.setInputType(android.text.InputType.TYPE_CLASS_TEXT | android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD);
                    layout.addView(txt3);
                    layout.addView(txt4);
                    var pad = Login.getDp(10);
                    layout.setPadding(pad, pad, pad, pad);
                    var scroll = android.widget.ScrollView(ctx);
                    scroll.addView(layout);
                    dialog.setView(scroll);
                    dialog.setTitle("로그인");
                    dialog.setNegativeButton("취소", null);
                    dialog.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
                        onClick: function(v) {
                            if (txt2.getText().toString() == "") {
                                Login.toast("아이디가 입력되지 않았습니다...");
                            } else if (txt4.getText().toString() == "") {
                                Login.toast("비밀번호가 입력되지 않았습니다...");
                            } else {
                                Login.toast("서버로부터 데이터를 받아오고 있습니다...");
                                Login.login(txt2.getText().toString(), txt4.getText().toString());
                            }
                        }
                    }));
                    dialog.show();
                } catch (e) {
                    Login.toast(e);
                }
            }
        }));
    },
    login: function(id, password) {
        new java.lang.Thread({
            run: function() {
                try {
                    var data = Login.getMembersData().toString().split("\n");
                    var loginCheck = true;
                    for (var n = 0; n < data.length; n++) {
                        var cache = data[n].split("::");
                        if (id == cache[0] && password == cache[1]) {
                            Login.isLogined = true;
                            Login.loginData.id = id;
                            Login.loginData.password = password;
                            Login.toast("로그인되었습니다.");
                            break;
                        }
                    }
                    if (loginCheck) {
                        Login.toast("해당 아이디를 찾을 수 없거나, 비밀번호가 일치하지 없습니다.");
                    }
                } catch (e) {
                    Login.toast("인터넷 연결을 확인해주세요");
                    return;
                    Login.toast(e);
                }
            }
        }).start();
    },
    logoutDialog: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new android.app.AlertDialog.Builder(ctx);
                    dialog.setTitle("로그아웃");
                    dialog.setMessage("로그아웃 하시겠습니까?");
                    dialog.setNegativeButton("아니요", null);
                    dialog.setPositiveButton("네", new android.content.DialogInterface.OnClickListener({
                        onClick: function(v) {
                            Login.isLogined = false;
                            Login.loginData = {
                                id: null,
                                password: null
                            };
                            Login.toast("로그아웃 되었습니다.");
                        }
                    }));
                    dialog.show();
                } catch (e) {
                    Login.toast(e);
                }
            }
        }));
    },
    getMembersData: function() {
        try {
            var url = new java.net.URL(Login.infoUrl);
            var con = url.openConnection();
            if (con != null) {
                con.setConnectTimeout(5000);
                con.setUseCaches(false);
                var isr = new java.io.InputStreamReader(con.getInputStream());
                var br = new java.io.BufferedReader(isr);
                var str = br.readLine();
                var line = "";
                while ((line = br.readLine()) != null) {
                    str += "\n" + line;
                }
                isr.close();
                br.close();
                con.disconnect();
            }
            return Login.decodeInfo(str.toString());
        } catch (e) {
            return;
            Login.toast(e);
        }
    },
    decodeInfo: function(info) { //http://darktornado.dothome.co.kr/LoginApiEncoder.html에서 회원 정보 암호화 가능
        var str = android.util.Base64.decode(str.toString(), 0);
        var str2 = new java.lang.String(str2, "UTF-8");
        return str2;
    }
};


