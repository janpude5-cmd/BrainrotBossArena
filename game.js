//======================================
// Brainrot Boss Arena Ver1.0
// Game.js Chapter1
//======================================

//----------------------------
// お金
//----------------------------

let money = 1000;

//----------------------------
// 編成（最大5体）
//----------------------------

let team = [
    "ロウ",
    "ポチ",
    "キノコ",
    "スピーカー",
    "メカうさぎ"
];

//----------------------------
// 所持キャラ
//----------------------------

let characters = [

{
    name:"ロウ",
    power:150,
    hp:300,
    rarity:"N",
    trait:"なし"
},

{
    name:"ポチ",
    power:170,
    hp:320,
    rarity:"N",
    trait:"なし"
},

{
    name:"キノコ",
    power:180,
    hp:340,
    rarity:"N",
    trait:"なし"
},

{
    name:"スピーカー",
    power:200,
    hp:350,
    rarity:"N",
    trait:"なし"
},

{
    name:"メカうさぎ",
    power:230,
    hp:380,
    rarity:"N",
    trait:"なし"
}

];

//----------------------------
// ボス
//----------------------------

let bosses=[

{
name:"Beginner Bot",
power:500,
hp:700,
drop:15,
trait:"ダメージ30%軽減"
},

{
name:"Stone Golem",
power:800,
hp:1200,
drop:12,
trait:"防御UP"
},

{
name:"Wild Beast",
power:1200,
hp:1800,
drop:10,
trait:"攻撃速度UP"
},

{
name:"Dark Knight",
power:1800,
hp:2500,
drop:8,
trait:"クリティカル"
},

{
name:"Lava Giant",
power:2600,
hp:3400,
drop:6,
trait:"回復"
},

{
name:"Shadow King",
power:3800,
hp:5000,
drop:5,
trait:"攻撃UP"
},

{
name:"Anti Hero",
power:5000,
hp:7000,
drop:3,
trait:"惑星攻撃"
},

{
name:"Anubis",
power:6500,
hp:9000,
drop:3,
trait:"冥界の槍"
},

{
name:"Hack Tack",
power:15000,
hp:18000,
drop:1,
trait:"Time Lock"
}

];

//----------------------------
// 更新
//----------------------------

function updateMoney(){

document.getElementById("money").innerHTML=
"💰 "+money+"G";

}

updateMoney();

console.log("Brainrot Boss Arena 起動成功！");
//======================================
// Game.js Chapter3
// ボスバトル
//======================================

let currentBoss = null;
let bossHP = 0;
let battleLoop = null;

// バトル開始
function startBattle(index){

    currentBoss = JSON.parse(JSON.stringify(bosses[index]));
    bossHP = currentBoss.hp;

    homeScreen.style.display = "none";
    battleScreen.style.display = "block";

    document.getElementById("bossName").innerHTML =
        "👑 " + currentBoss.name;

    document.getElementById("battleLog").innerHTML =
        "⚔️ バトル開始！<br>";

    updateBossHP();

    if(battleLoop) clearInterval(battleLoop);

    battleLoop = setInterval(autoBattle,1000);

}

// ボスHPバー
function updateBossHP(){

    let percent =
        (bossHP/currentBoss.hp)*100;

    document.getElementById("bossHP").style.width =
        percent+"%";

}

// オートバトル
function autoBattle(){

    // 味方総攻撃
    let damage=0;

    team.forEach(name=>{

        let c=characters.find(x=>x.name==name);

        if(c){

            damage+=c.power;

        }

    });

    bossHP-=damage;

    document.getElementById("battleLog").innerHTML+=
    "💥 チームが "+damage+
    " ダメージ！<br>";

    updateBossHP();

    if(bossHP<=0){

        bossHP=0;

        clearInterval(battleLoop);

        battleWin();

        return;

    }

}
//======================================
// Game.js Chapter4
// ボス攻撃システム
//======================================

// 味方HP
let teamHP = [100,100,100,100,100];

// スタン状態
let stun = false;
let stunTap = 0;

// バトル開始時
function resetTeamHP(){

    teamHP = [100,100,100,100,100];

}

// Chapter3のstartBattleの最後に追加
// resetTeamHP();

//==========================
// ボス攻撃
//==========================

function bossAttack(){

    if(stun) return;

    // 生きているキャラ
    let alive=[];

    teamHP.forEach((hp,index)=>{

        if(hp>0){

            alive.push(index);

        }

    });

    if(alive.length==0){

        clearInterval(battleLoop);

        alert("💀 全滅しました…");

        showHome();

        return;

    }

    // ランダム攻撃
    let target=
        alive[Math.floor(Math.random()*alive.length)];

    let damage=
        Math.floor(currentBoss.power/250);

    teamHP[target]-=damage;

    if(teamHP[target]<0){

        teamHP[target]=0;

    }

    document.getElementById("battleLog").innerHTML+=

    "👹 "+currentBoss.name+
    " の攻撃！<br>"+

    team[target]+" に "+
    damage+" ダメージ！<br><br>";

}

//==========================
// ボス必殺技
//==========================

function bossSkill(){

    if(stun) return;

    if(currentBoss.name=="Anti Hero"){

        document.getElementById("battleLog").innerHTML+=
        "🌍 惑星投げ！！<br>";

    }

    else if(currentBoss.name=="Anubis"){

        document.getElementById("battleLog").innerHTML+=
        "🔱 冥界の槍！！<br>";

    }

    else if(currentBoss.name=="Hack Tack"){

        document.getElementById("battleLog").innerHTML+=
        "⌚ Time Lock！！<br>";

    }

    stun = true;
    stunTap = 0;

    document.getElementById("battleLog").innerHTML+=
    "⚫ スタン！画面を3回クリック！<br>";

}

//==========================
// スタン解除
//==========================

document.addEventListener("click",()=>{

    if(!stun) return;

    stunTap++;

    if(stunTap>=3){

        stun=false;

        document.getElementById("battleLog").innerHTML+=
        "✨ スタン解除！<br>";

    }

});

//==========================
// ボス行動
//==========================

setInterval(()=>{

    if(currentBoss==null) return;

    if(battleScreen.style.display=="none") return;

    // 通常攻撃
    bossAttack();

    // 15%で必殺技
    if(Math.random()<0.15){

        bossSkill();

    }

},2500);
//======================================
// Game.js Chapter5
// 勝利・宝箱・ドロップ
//======================================

// 勝利
function battleWin(){

    document.getElementById("battleLog").innerHTML +=
    "<br>🏆 "+currentBoss.name+" を倒した！<br>";

    clearInterval(battleLoop);

    setTimeout(openChest,1500);

}

//=====================
// 宝箱
//=====================

function openChest(){

    let r=Math.random();

    let message="";

    // ボスドロップ
    if(r<currentBoss.drop/100){

        characters.push({

            name:currentBoss.name,
            power:currentBoss.power*0.85,
            hp:currentBoss.hp*0.60,
            rarity:"BOSS",
            trait:currentBoss.trait

        });

        message=
        "👑 "+currentBoss.name+
        " が仲間になった！！";

    }

    // ストエレ
    else if(r<(currentBoss.drop+7)/100){

        characters.push({

            name:"🍓 ストエレ",
            power:2800,
            hp:5000,
            rarity:"SPECIAL",
            trait:"味方攻撃+10%"

        });

        message="🍓 ストエレGET！！";

    }

    // みゃうる
    else if(r<(currentBoss.drop+17)/100){

        characters.push({

            name:"🦉 みゃうる",
            power:3200,
            hp:5500,
            rarity:"SPECIAL",
            trait:"攻撃速度UP"

        });

        message="🦉 みゃうるGET！！";

    }

    // コイン
    else{

        const coins=[300,500,800,1000,1500];

        let getCoin=
        coins[Math.floor(Math.random()*coins.length)];

        money+=getCoin;

        updateMoney();

        message=
        "🪙 "+getCoin+
        "G 手に入れた！";

    }

    alert("🎁 宝箱\n\n"+message);

    saveGame();

    showHome();

}
//======================================
// Game.js Chapter6
// 編成システム
//======================================

function openTeam(){

let text="👥 編成\n\n";

characters.forEach((c,index)=>{

text+=
`${index+1}. ${c.name}
⚔️ ${c.power}
⭐ ${c.rarity}

`;

});

let select=prompt(
text+
"\n使いたいキャラの番号を入力"
);

if(select==null)return;

let index=parseInt(select)-1;

if(characters[index]){

let slot=prompt(
"何番に入れる？\n1〜5"
);

slot=parseInt(slot)-1;

if(slot>=0 && slot<5){

team[slot]=characters[index].name;

alert(
characters[index].name+
"を"+(slot+1)+"番に編成！"
);

}

}

saveGame();

}
//======================================
// Brainrot Boss Arena
// game.js Ver1.0
//======================================

let money = 1000;


// 編成
let team = [
"ロウ",
"ポチ",
"キノコ",
"スピーカー",
"メカうさぎ"
];


// キャラクター
let characters = [

{
name:"ロウ",
power:150,
hp:300,
rarity:"N"
},

{
name:"ポチ",
power:170,
hp:320,
rarity:"N"
},

{
name:"キノコ",
power:180,
hp:350,
rarity:"N"
},

{
name:"スピーカー",
power:200,
hp:380,
rarity:"N"
},

{
name:"メカうさぎ",
power:230,
hp:400,
rarity:"N"
},

{
name:"🍓ストエレ",
power:2800,
hp:5000,
rarity:"SPECIAL"
},

{
name:"🦉みゃうる",
power:3200,
hp:5500,
rarity:"SPECIAL"
}

];


// BOSS
let bosses=[

{
name:"Beginner Bot",
power:500,
hp:2000,
drop:15
},

{
name:"Stone Golem",
power:800,
hp:4000,
drop:12
},

{
name:"Wild Beast",
power:1200,
hp:7000,
drop:10
},

{
name:"Dark Knight",
power:2000,
hp:12000,
drop:8
},

{
name:"Lava Giant",
power:3500,
hp:20000,
drop:6
},

{
name:"Shadow King",
power:5500,
hp:35000,
drop:5
},

{
name:"Anti Hero",
power:12000,
hp:80000,
drop:3
},

{
name:"Anubis",
power:20000,
hp:150000,
drop:3
},

{
name:"Hack Tack",
power:40000,
hp:300000,
drop:1
}

];


console.log("Brainrot Boss Arena 起動！");
//======================================
// バトルシステム Ver1
//======================================

let currentBoss = null;
let bossHP = 0;


// ボス挑戦ボタン
document.getElementById("bossBtn").onclick = function(){

    let choice = prompt(
        "👑 挑戦するBOSS番号\n\n" +
        bosses.map((b,i)=>
        (i+1)+". "+b.name+
        " 戦闘力:"+b.power+
        " HP:"+b.hp
        ).join("\n")
    );

    if(choice){

        startBattle(Number(choice)-1);

    }

};


// バトル開始
function startBattle(index){

    currentBoss = bosses[index];

    bossHP = currentBoss.hp;


    document.getElementById("homeScreen").style.display="none";

    document.getElementById("battleScreen").style.display="block";


    document.getElementById("bossName").innerHTML =
    "👑 "+currentBoss.name;


    document.getElementById("battleLog").innerHTML =
    "⚔️ "+currentBoss.name+" 出現！<br>";


    battle();

}


// 戦闘
function battle(){

    let damage = 0;


    team.forEach(name=>{

        let c = characters.find(x=>x.name==name);

        if(c){

            damage += c.power;

        }

    });


    bossHP -= damage;


    document.getElementById("battleLog").innerHTML +=
    "💥 味方の攻撃！ "+
    damage+
    "ダメージ！<br>";


    let hpPercent =
    (bossHP/currentBoss.hp)*100;


    document.getElementById("bossHP").style.width =
    hpPercent+"%";


    if(bossHP<=0){

        winBattle();

    }else{

        setTimeout(battle,1000);

    }

}


// 勝利
function winBattle(){

    document.getElementById("battleLog").innerHTML +=
    "🏆 勝利！！<br>";

    alert(
    "🎁 宝箱を手に入れた！"
    );

}
