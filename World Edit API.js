/*
World Edit API
© 2016 Dark Tornado, All rights reserved.

int WorldEdit.fill(int startX, int endX, int startY, int endY, int startZ, int endZ, int blockId, int blockDamage);
int WorldEdit.replace(int startX, int endX, int startY, int endY, int startZ, int endZ, int blockId1, int blockId2);
int WorldEdit.change(int startX, int endX, int startY, int endY, int startZ, int endZ, int blockId1, int blockDamage1, int blockId2, int blockDamage2);
int WorldEdit.unreplace(int startX, int endX, int startY, int endY, int startZ, int endZ, int blockId1, int blockId2);
int WorldEdit.unchange(int startX, int endX, int startY, int endY, int startZ, int endZ, int blockId1, int blockDamage1, int blockId2, int blockDamage2);
int WorldEdit.remove(int startX, int endX, int startY, int endY, int startZ, int endZ);
int WorldEdit.wall(int startX, int endX, int startY, int endY, int startZ, int endZ, int blockId, int blockDamage, boolean keepTerrain);
void WorldEdit.circle(int x, int y, int z, int radius, int blockId, int blockDamage, boolean isFilled);
void WorldEdit.cylinder(int x, int y, int z, int radius, int height, int blockId, int blockDamage, boolean isFilled);
void WorldEdit.sphere(int x, int y, int z, int radius, int blockId, int blockDamage, boolean isFilled);
void WorldEdit.freeze(int startX, int endX, int startY, int endY, int startZ, int endZ);
*/

const WorldEdit = {
    fill: function(x1, x2, y1, y2, z1, z2, b, bd) {
        var count = 0;
        for(var xx = x1; xx < x2 + 1; xx++) {
            for(var yy = y1; yy < y2 + 1; yy++) {
                for(var zz = z1; zz < z2 + 1; zz++) {
                    setTile(xx, yy, zz, b, bd);
                    count++;
                }
            }
        }
        return count;
    },
    replace: function(x1, x2, y1, y2, z1, z2, b1, b2) {
        var count = 0;
        for(var xx = x1; xx < x2 + 1; xx++) {
            for(var yy = y1; yy < y2 + 1; yy++) {
                for(var zz = z1; zz < z2 + 1; zz++) {
                    if(getTile(xx, yy, zz) == b1) {
                        setTile(xx, yy, zz, b2);
                        count++;
                    }
                }
            }
        }
        return count;
    },
    change: function(x1, x2, y1, y2, z1, z2, b1, bd1, b2, bd2) {
        var count = 0;
        for(var xx = x1; xx < x2 + 1; xx++) {
            for(var yy = y1; yy < y2 + 1; yy++) {
                for(var zz = z1; zz < z2 + 1; zz++) {
                    if(getTile(xx, yy, zz) == b1 && Level.getData(xx, yy, zz) == bd1) {
                        setTile(xx, yy, zz, b2, bd2);
                        count++;
                    }
                }
            }
        }
        return count;
    },
    unreplace: function(x1, x2, y1, y2, z1, z2, b1, b2) {
        var count = 0;
        for(var xx = x1; xx < x2 + 1; xx++) {
            for(var yy = y1; yy < y2 + 1; yy++) {
                for(var zz = z1; zz < z2 + 1; zz++) {
                    if(getTile(xx, yy, zz) != b1) {
                        setTile(xx, yy, zz, b2);
                        count++;
                    }
                }
            }
        }
        return count;
    },
    unchange: function(x1, x2, y1, y2, z1, z2, b1, bd1, b2, bd2) {
        var count = 0;
        for(var xx = x1; xx < x2 + 1; xx++) {
            for(var yy = y1; yy < y2 + 1; yy++) {
                for(var zz = z1; zz < z2 + 1; zz++) {
                    if(!(getTile(xx, yy, zz) == b1 && Level.getData(xx, yy, zz) == bd1)) {
                        setTile(xx, yy, zz, b2, bd2);
                        count++;
                    }
                }
            }
        }
        return count;
    },
    remove: function(x1, x2, y1, y2, z1, z2) {
        var count = 0;
        for(var xx = x1; xx < x2 + 1; xx++) {
            for(var yy = y1; yy < y2 + 1; yy++) {
                for(var zz = z1; zz < z2 + 1; zz++) {
                    setTile(xx, yy, zz, 0);
                    count++;
                }
            }
        }
        return count;
    },
    wall: function(x1, x2, y1, y2, z1, z2, b, bd, tf) {
        var count = 0;
        if(tf) {
            for(var yy = y1; yy < y2 + 1; yy++) {
                for(var xx = x1; xx < x2 + 1; xx++) {
                    setTile(xx, yy, z1, b, bd);
                    setTile(xx, yy, z2, b, bd);
                    count += 2;
                }
                for(var zz = z1 + 1; zz < z2; zz++) {
                    setTile(x1, yy, zz, b, bd);
                    setTile(x2, yy, zz, b, bd);
                    count += 2;
                }
            }
        } else {
            for(var xx = x1; xx < x2 + 1; xx++) {
                for(var yy = y1; yy < y2 + 1; yy++) {
                    for(var zz = z1; zz < z2 + 1; zz++) {
                        setTile(xx, yy, zz, b, bd);
                        count++;
                    }
                }
            }
            for(var xx = x1 + 1; xx < x2; xx++) {
                for(var yy = y1; yy < y2 + 1; yy++) {
                    for(var zz = z1 + 1; zz < z2; zz++) {
                        setTile(xx, yy, zz, 0);
                        count--;
                    }
                }
            }
        }
        return count;
    },
    circle: function(x, y, z, r, b, bd, tf) {
        for(var n = -r; n < r + 1; n++) {
            for(var m = -r; m < r + 1; m++) {
                var cir = Math.pow(n, 2) + Math.pow(m, 2);
                if(tf) {
                    if(cir <= Math.pow(r, 2)) setTile(x + n, y, z + m, b, bd);
                } else {
                    if(cir >= Math.pow(r - 1, 2) && cir <= Math.pow(r, 2)) setTile(x + n, y, z + m, b, bd);
                }
            }
        }
    },
    cylinder: function(x, y, z, r, h, b, bd, tf) {
        for(var o = 0; o < h; o++) {
            for(var n = -r; n < r + 1; n++) {
                for(var m = -r; m < r + 1; m++) {
                    var cir = Math.pow(n, 2) + Math.pow(m, 2);
                    if(tf) {
                        if(cir <= Math.pow(r, 2)) setTile(x + n, y + o, z + m, b, bd);
                    } else {
                        if(cir >= Math.pow(r - 1, 2) && cir <= Math.pow(r, 2)) setTile(x + n, y + o, z + m, b, bd);
                    }
                }
            }
        }
    },
    sphere: function(x, y, z, r, b, bd, tf) {
        for(var n = -r; n < r + 1; n++) {
            for(var m = -r; m < r + 1; m++) {
                for(var o = -r; o < r + 1; o++) {
                    var sph = Math.pow(n, 2) + Math.pow(m, 2) + Math.pow(o, 2);
                    if(tf) {
                        if(sph <= Math.pow(r, 2)) setTile(x + n, y + m, z + o, b, bd);
                    } else {
                        if(sph >= Math.pow(r - 1, 2) && sph <= Math.pow(r, 2)) setTile(x + n, y + m, z + o, b, bd);
                    }
                }
            }
        }
    },
    freeze: function(x1, x2, y1, y2, z1, z2) {
        for(var xx = x1; xx < x2 + 1; xx++) {
            for(var yy = y1; yy < y2 + 1; yy++) {
                for(var zz = z1; zz < z2 + 1; zz++) {
                    if(getTile(xx, yy, zz) == 8 || getTile(xx, yy, zz) == 9) {
                        setTile(xx, yy, zz, 79);
                    } else if(getTile(xx, yy, zz) == 10 || getTile(xx, yy, zz) == 11) {
                        setTile(xx, yy, zz, 49);
                    }
                }
            }
        }
    }
};

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

function selectLevelHook() {
    var script = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
    var so = org.mozilla.javascript.ScriptableObject;
    for(var n = 0; n < script.size(); n++) {
        var scope = script.get(n).scope;
        if(!so.hasProperty(scope, "WorldEdit")) so.putProperty(scope, "WorldEdit", WorldEdit);
    }
    net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod("onLibraryLoaded", ["MCPE Class Library", "2.1", "Dark Tornado"]);
}



