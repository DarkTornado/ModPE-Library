//Flying Machine
//Made by Dark Tornado
//version 0.2.0

var btnWindow = null;
var fm = false;
var fm2 = null;
var fx, fy, fz;
var fm3 = false;
var fm3a = 0;


function dip2px(ctx, dips){
return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function newLevel(){
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
try{
btnWindow = new android.widget.PopupWindow();
var layout = new android.widget.RelativeLayout(ctx);
var button = new android.widget.Button(ctx);
button.setText("FM");
button.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(viewarg) {
flyingMachine();
}}));
layout.addView(button);

btnWindow.setContentView(layout);
btnWindow.setWidth(dip2px(ctx, 60));
btnWindow.setHeight(dip2px(ctx, 40));
btnWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
btnWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 170, 160);
}catch(error){
print("Failed to load button.");
}
} }));
}



function flyingMachine(){
if(fm==false){
fm = true;
fm2 = Player.getEntity();
clientMessage("Flying Machine on");
fm3 = false;
}
else if(fm==true){
fm = false;
clientMessage("Flying Machine off");
fm3 = true;
}

}


function modTick(){
if(fm==true){
fx = Entity.getX(fm2);
fy = Entity.getY(fm2)-2;
fz = Entity.getZ(fm2);
for(var xx=fx-2;xx<fx+3;xx++)
for(var yy=fy-1;yy<fy+1;yy++)
for(var zz=fz-2;zz<fz+3;zz++)
if(getTile(xx, yy, zz)==247){
setTile(xx, yy, zz, 0);
}
for(var xx=fx-1;xx<fx+2;xx++)
for(var zz=fz-1;zz<fz+2;zz++)
if(getTile(xx, fy, zz)==0){
setTile(xx, fy, zz, 247);
}


}

if(fm3==true){
fx = Entity.getX(fm2);
fy = Entity.getY(fm2)-5;
fz = Entity.getZ(fm2);
if(getTile(fx, fy, fz)!=0){
for(var xx=fx-1;xx<fx+2;xx++)
for(var zz=fz-1;zz<fz+2;zz++)
setTile(xx, fy+2, zz, 30);
fm3 = false;
fm3a = 15;
}
}
if(fm3a!=0){
fm3a--;
}
if(fm3a==1){
for(var xx=fx-1;xx<fx+2;xx++)
for(var zz=fz-1;zz<fz+2;zz++)
setTile(xx, fy+2, zz, 0);
}

}



function leaveGame(){
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
if(btnWindow!=null){
btnWindow.dismiss();
btnWindow=null;
}
}}));
}