import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";
import { ui } from ".../api/ui/UI";
import { Color } from ".../api/ui/properties/Color";
import { Aspect } from "../api/ui/properties/Aspect";
import { Sound } from "../api/Sound";
import { Cost } from "../api/Costs";

var id = "sky.ad";
var name = "Antimatter Dimensions";
var version = "Alpha Preview Ver. 1.0";
var description = "ANTIMATTER DIMENSIONS EXP VER\n" +
"a game based on Antimatter Dimensions\n" +
"https://ivark.github.io\n" +
"Alpha Preview Ver. 1.0" + "\n" +
"Stage : 1 to 1.79e308 AM";
var authors = "sky";
var version_number = 1;


var news = {
    current: "welcome back to Antimatter Dimensions!",
    stats: {
        count: 0
    },
    news : [
        // true
        "while (true) { try_catch_bugs(); }",
        "9th dimension doesn't exist.",
        "isn't this exponential idle?",
        "(empty message that contain nothing)",
        "do you know? One minute equals sixty seconds!",
        "-",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "^^vv<><>BA",
        "import \"tree\"",
        "a long news messages!!!!!!!!!!!!!!!!!!!1! qwertyuiopasdfghjklznm",
        "any more livers?",
        "Antimatter Dimensions.mp1.79e308",
        "EXP-AM UPDATE v1.4.4 : The Dimension doesn't exist.",
        "Me trying to break js file : \\\" \\\" (more \\ and \" here)",
        "maybe one more line? \n\n ok",
        "@user#6942 : we need an update",
        "Please insert Disc-1 to continue playing AntiDim.",
        "\\\\rho = \\\\sqrt{3} - whoops! Latex failed",
        "how many times have you ever seen this newsticker?",
        "get 1 AM now! just report some bugs.",
        "I will rate this 1 star - fnerds",
        "any new ideas of this ct?",
        "sadly, newsticker can't be too long",
        "I guess you are watching random news here!",
        "new theory - \\\\dot{\\\\rho} = 1, done!",
        "I am boring to add this newsticker",
        "[antimatter.dim.jpg]",
        // stars collection (lol)
        "[#----] 1 star rating",
        "[##---] 2 stars rating",
        "[###--] 3 stars rating",
        "[####-] 4 stars rating",
        "[#####] 5 stars rating",
        
    ],
    time: 0,
    tick: (dt) => {
        
        news.time += dt;
        if (news.time > 8) {
            news.stats.count += 1;
            news.current = news.news[Math.floor(Math.random() * news.news.length)];
            news.time = 0;
        }
        
    }
}

var Antimatter = BigNumber.TEN;
var InfinityPoint = BigNumber.ZERO;

var AntiDim;
AntiDimReset();

function AntiDimReset() {
    AntiDim = [
        new dimensionConstruct(10,3,0),
        new dimensionConstruct(100, 4,1),
        new dimensionConstruct(1e4, 5,2),
        new dimensionConstruct(1e6, 6,3),
        new dimensionConstruct(1e9, 8,4),
        new dimensionConstruct(1e13, 10,5),
        new dimensionConstruct(1e18, 12,6),
        new dimensionConstruct(1e24, 15,7)
    ]
}

var InfDim, TimeDim;

var Tickspeed = {
    value: BigNumber.ONE,
    multiplier: bf(1.125),
    count: bf(0)
}

function resetTickspeed () {
    Tickspeed.value = bf(1);
    Tickspeed.count = bf(0);
}

function exportTickspeed() {
    return {
        value: Tickspeed.value.toString(),
        multiplier: Tickspeed.multiplier.toString(),
        count: Tickspeed.count.toString()
    }
}

function dimensionConstruct(cost, exp, id) {
    this.id = id;
    this.count = BigNumber.ZERO;
    this.boughtCount = BigNumber.ZERO;
    this.baseCost = BigNumber.from(cost);
    this.incCost = BigNumber.from(exp);
    this.level = BigNumber.ZERO;
    this.mul = bf(1);
    this.cost = () => {
        return this.baseCost * (this.level != BigNumber.ZERO ? (BigNumber.TEN.pow(this.level * this.incCost)) : BigNumber.ONE)
    }
    this.buy = function(mode){
        if (mode == 10) {
            let max = (Antimatter / this.cost()).min(bf(10) - this.boughtCount % bf(10)).floor();
            Antimatter -= this.cost() * max;
            this.count += BigNumber.from(max);
            this.boughtCount += BigNumber.from(max);
            this.level = (this.boughtCount / BigNumber.TEN).floor();
            return max > 0;
        } else {
            if (! (Antimatter >= this.cost())) return false;
            Antimatter -= this.cost();
            this.count += BigNumber.from(1);
            this.boughtCount += BigNumber.from(1);
            this.level = (this.boughtCount / BigNumber.TEN).floor();
            return true;
        }
    }
    this.multiplier = () => {
        return BigNumber.TWO.pow(this.level) * this.mul * Ach_mul * (this.id == 7 ? getSacEff() : bf(1));
    }
    this.exportSave = () => {
        return {
            "count": this.count.toString(),
            "boughtCount": this.boughtCount.toString(),
            "baseCost": this.baseCost.toString(),
            "incCost": this.incCost.toString(),
            "level": this.level.toString(),
            "mul": this.mul.toString()
        }
    }
}

function importDim(val){
    let dim = [];
    for (let i = 0; i < val.length; i++) {
        dim.push(new dimensionConstruct(0,0,i));
        let cl = ["count","boughtCount","baseCost","incCost","level","mul"];
        for (let j = 0; j < cl.length; j++) {
            dim[i][cl[j]] = BigNumber.from(val[i][cl[j]]);
        }
    }
    return dim;
}

function exportDim(dim) {
    let e = [];
    for (let i = 0; i < dim.length; i++) {
        e.push(dim[i].exportSave());
    }
    return e;
}

// autos
var automation = {
    buyer: {
        tickspeed: new autobuyerConstruct(5, 1e140),
        d1: new autobuyerConstruct(1.5, 1e30),
        d2: new autobuyerConstruct(2, 1e40),
        d3: new autobuyerConstruct(2.5, 1e50),
        d4: new autobuyerConstruct(3, 1e60),
        d5: new autobuyerConstruct(4, 1e70),
        d6: new autobuyerConstruct(5, 1e80),
        d7: new autobuyerConstruct(6, 1e90),
        d8: new autobuyerConstruct(7.5, 1e100),
    }
}

function autobuyerConstruct(inv, unlockCost) {
    
    this.isbought = false;
    this.baseInterval = inv;
    this.baseCost = bf(1);
    this.unlockCost = bf(unlockCost);
    this.cost = () => {
        return this.baseCost * bf(2).pow(bf(this.level))
    };
    this.level = 0;
    this.interval = () => {
        return this.isbought ? this.baseInterval * bf(Math.pow(0.6,this.level)) : Infinity;
    };
    this.isOn = true;
    this.lastBought = Date.now() / 1000;
}

// single export
function autobuyerExport(sigab) {
    return {
        isbought: sigab.isbought,
        baseInterval: sigab.baseInterval,
        baseCost: sigab.baseCost.toString(),
        unlockCost: sigab.unlockCost.toString(),
        level: sigab.level,
        isOn: sigab.isOn
    }
}

// all export
function exportAutobuyer(){
    let obj = {tickspeed: autobuyerExport(automation.buyer.tickspeed)};
    for (let i = 1; i <= 8; i++) {
        obj[`d${i}`] = autobuyerExport(automation.buyer[`d${i}`]);
    }
    return obj;
}

function importAutobuyer(ab) {
    let data = {};
    let names = ["tickspeed","d1","d2","d3","d4","d5","d6","d7","d8"];
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        data[name] = new autobuyerConstruct(ab[name].baseInterval,ab[name].unlockCost);
        data[name].level = ab[name].level;
        data[name].isbought = ab[name].isbought;
        data[name].baseCost = bf(ab[name].baseCost);
        data[name].isOn = ab[name].isOn;
    }
    return data;
}

// functions

// big number from
function bf(str) {
    return BigNumber.from(str);
}


// progress to infinity. in [0,1], input = AM with [0,1.79e308]
var progress = {
    inf: 0
};

var count = {
    inf: bf(0)
}

var buyMode = 10;

// all unlock conditions
var unl = {
    isInfUnlocked: () => Antimatter.value > (BigNumber.TWO.pow(bf(1024))),
    isTickspeedUnlocked: () => AntiDim[1].count > 0,
    normalDimUnlock: () => (dimboost + bf(4)).min(bf(8)).toNumber()
}

// prestige
var galaxy = bf(0);
var dimboost = bf(0);

var Ach_mul = bf(1);

var sacrificed = bf(0);

var getSacEff = (sac=sacrificed) => {
    return bf(1).max((sac+1).log10()/bf(10)).pow(bf(2));
}

var page = 0;

var BigCrunch = () => {
    page = 0;
    InfinityPoint += bf(1);
    AntiDimReset();
    Antimatter = bf(10);
    count.inf += bf(1);
    galaxy = bf(0);
    dimboost = bf(0);
    var sacrificed = bf(0);
    resetTickspeed();
    reloadUI();
    endGame.show();
}

var endGame = ui.createPopup({
    title: "yay!",
    content: ui.createLabel({text: "Well done! You have compeleted all content of the game in alpha preview.\nthe game have reseted.\nStay tuned for new update!"})
})

var getMainPanel = () => {
    if (Antimatter >= bf('1.79e308')) {
        return ui.createButton({text:"Big Crunch", fontSize: 30, onClicked: BigCrunch})
    }
    let btns = (name, row, onc) => {
        return ui.createButton({text:name,row:row,fontSize:20,onClicked:()=>{page=onc; reloadUI(); Sound.playClick(); }});
    }
    return ui.createStackLayout({children:[ui.createScrollView({
        children: [
            ui.createGrid({
                rowDefinitions: ["1*","1*","1*","4","1*","4","1*"],
                children: [
                    btns("Antimatter",0,1),
                    btns("Automation",1,2),
                    btns("Challenge",2,3),
                    ui.createProgressBar({progress: ()=> progress.inf,row:3}),
                    btns("Infinity",4,4) 
                ]
            })
        ]
    })]})
}
var getDimensionPanel = () => 
{
    return ui.createScrollView({
        children: [
            ui.createStackLayout({
                children: [
                    ui.createGrid({
                        columnDefinitions: ["1*","2*","1*"],
                        children: [
                            ui.createButton({
                                column: 0,
                                text: ()=> buyMode == 10 ? "Buy 10" : "Buy 1", 
                                onClicked: ()=> {if(buyMode == 10){buyMode = 1}else{buyMode = 10} Sound.playClick();}
                            }),
                            ui.createButton({
                                column: 1,
                                text: "Buy Max",
                                onClicked: ()=> { buyMaxNormalDim(); Sound.playClick(); }
                            }),
                            ui.createButton({column:2})
                        ]
                    }),
                    ui.createGrid({
                        rowDefinitions: ["1*","1*","1*","1*","1*","1*","1*","1*","1*","1*","1*"],
                        children: getDimensionView()
                    })
                ]
            })
        ]
    })
}

var buyTickSpeed = () => {
    let cost = bf(10).pow(Tickspeed.count + bf(3));
    if (Antimatter >= cost){
        Antimatter -= cost;
        Tickspeed.count += 1;
        Tickspeed.value *= Tickspeed.multiplier;
        return true;
    }
    return false;
}

// dimension main panel
var getDimensionView = () => {
    let dims = [];
    // tickspeed
    dims.push(ui.createFrame({
        row:0,
        cornerRadius: 8,
        heightRequest: 50,
        content: ui.createGrid({
            columnDefinitions: ["1*","1*","1*"],
            children: [
                ui.createLatexLabel({text:"Tickspeed",column: 0, fontSize: 15, horizontalOptions: LayoutOptions.CENTER,verticalOptions: LayoutOptions.CENTER}),
                ui.createGrid({
                    rowDefinitions: ["1*","1*"],
                    column: 1,
                    horizontalOptions: LayoutOptions.CENTER,
                    children: [
                        ui.createLabel({text:()=>Tickspeed.value.toString(3), row:0,verticalOptions: LayoutOptions.CENTER, horizontalOptions: LayoutOptions.CENTER}),
                        ui.createLabel({text:()=>`x${Tickspeed.multiplier.toString()}`, row:1, horizontalOptions: LayoutOptions.CENTER}),
                    ]
                }),
                ui.createButton({
                    column:2,
                    text: () => `cost: ${bf(10).pow(Tickspeed.count + bf(3))}`,
                    onClicked: () => {
                        buyTickSpeed();
                        Sound.playClick();
                    }
                })
            ]
        })
    }));
    // dims
    for (let i = 0; i < unl.normalDimUnlock(); i++) {
        dims.push(ui.createFrame({
            row: i+1,
            cornerRadius: 5,
            heightRequest: 50,
            content: ui.createGrid({
                columnDefinitions: ["1*","1*","1*"],
                children: [
                    // dim text
                    ui.createLatexLabel({text:`Dimension ${i+1}`,column: 0, fontSize: 15, horizontalOptions: LayoutOptions.CENTER,verticalOptions: LayoutOptions.CENTER}),
                    ui.createGrid({
                        rowDefinitions: ["1*","1*"],
                        column: 1,
                        horizontalOptions: LayoutOptions.CENTER,
                        children: [
                            // count & mult
                            ui.createLabel({text:()=>AntiDim[i].count.toString(0), row:0,verticalOptions: LayoutOptions.CENTER,horizontalOptions: LayoutOptions.CENTER}),
                            ui.createLabel({text:()=>`x${AntiDim[i].multiplier().toString()}`, row:1, horizontalOptions: LayoutOptions.CENTER}),
                        ]
                    }),
                    // buy button
                    ui.createButton({
                        column:2,
                        text: () => `cost:${AntiDim[i].cost().toString(2)}`,
                        onClicked: () => {
                            AntiDim[i].buy(buyMode);
                            Sound.playClick();
                        }
                    })
                ]
            })
        }));
    }
    // prestige
    let getDBtext = () => {
        if (dimboost > bf(4)) {
            return `Dim Boost (${getDBcost()} 8th Dim)(${dimboost.toString(0)})`
        } else return `Dim Shift (20 ${unl.normalDimUnlock()}th Dim)(${dimboost.toString(0)})`
    }
    let getDBcost = () => {
        if (dimboost > bf(4)) {
            return bf(20) + bf(15) * (dimboost - 4);
        } else {
            return bf(20);
        }

    }
    let buyDB = () => {
        Sound.playClick();
        if (unl.normalDimUnlock() < 8 && AntiDim[unl.normalDimUnlock()-1].count >= bf(20)) {
            AntiDimReset();
            dimboost += bf(1);
            Antimatter = bf(10);
            for (let i = 0; i < dimboost.min(8); i++) {
                AntiDim[i].mul *= bf(2).pow(dimboost-bf(i));
            }
            resetTickspeed();
            sacrificed = bf(0);
            reloadUI();
        } else if (unl.normalDimUnlock() == 8 && AntiDim[7].count >= getDBcost()) {
            AntiDimReset();
            Antimatter = bf(10);
            dimboost += bf(1);
            for (let i = 0; i < dimboost.min(8); i++) {
                AntiDim[i].mul *= bf(2).pow(dimboost-bf(i));
            }
            resetTickspeed();
            sacrificed = bf(0);
            reloadUI()
        }
        
    }
    let getGcost = () => {
        let n = bf(80);
        let g = galaxy;
        let m = bf(60);
        return n + g * m;
    }
    let getGtext = () => {
        return `Galaxy (${getGcost()} 8th Dim)(${galaxy.toString(0)})`
    }
    let buyG = () => {
        Sound.playClick();
        if (AntiDim[7].count >= getGcost()) {
            Antimatter = bf(10);
            AntiDimReset();
            dimboost = bf(0);
            galaxy += bf(1);
            //Tickspeed.multiplier += bf(0.02);
            sacrificed = bf(0);
            resetTickspeed();
            reloadUI();
        }
    }
    // db & galaxy
    dims.push(ui.createGrid({
        row:unl.normalDimUnlock()+1,
        columnDefinitions: ["1*","1*"],
        children: [
            ui.createButton({column:0,text: getDBtext, onClicked: buyDB}),
            ui.createButton({column:1,text: getGtext, onClicked: buyG})
        ]
    }));
    // sac
    if (dimboost > bf(4)) {
        let getSacText = () => `Dimensional Sacrifice (x${(getSacEff(AntiDim[0].count)/getSacEff()).max(bf(1))})`;
        // had to use label bc of the text effect of button
        dims.push(ui.createFrame({
            row: 10,
            cornerRadius: 5,
            content: ui.createLabel({
                text: getSacText,
                verticalOptions: LayoutOptions.CENTER,horizontalOptions: LayoutOptions.CENTER,
                onTouched: (e)=> {
                    if (e.type == TouchType.SHORTPRESS_RELEASED || e.type == TouchType.LONGPRESS_RELEASED) {
                        Sound.playClick();
                        if (!((getSacEff(AntiDim[0].count)/getSacEff()).max(bf(1)) == bf(1))) {
                            sacrificed = AntiDim[0].count;
                            for (let l=0; l<7; l++) {
                                AntiDim[l].count = AntiDim[l].boughtCount;
                            }
                        }
                    }
                }
            })
        }))
    }
    return dims;
}

var getAutomationPanel = () => {
    return ui.createScrollView({
        content: ui.createGrid({
            rowDefinitions:["1*","1*","1*","1*","1*","1*","1*","1*","1*"],
            children: getAutomationView()
        })
    })
}

var getAutomationView = () => {
    let autos = [];
    for (let j = 0; j <= 8; j++) {
        let i = `d${j}`;
        if (j == 0) {
            i = 'tickspeed';
        }
        let desc = j == 0 ? i : `dimension ${j}`;
        let upgradeDesc = () => {
            //if (j == 1) {
            //    return `Upgrade - ${1} IP`;
            //} else {
                return "You can't upgrade"
            //}
        }
        let getColor = () => {
            //if (j == 1) {
            //    return Color.fromRgb(1,1,1);
            //} else {
                return Color.fromRgb(0.5,0.5,0.5);
            //}
        }
        let toggle = ui.createSwitch({column:3, horizontalOptions: LayoutOptions.CENTER, verticalOptions: LayoutOptions.CENTER, isToggled: automation.buyer[i].isOn});
        toggle.onTouched = (e) => {
            if (e.type == TouchType.SHORTPRESS_RELEASED || e.type == TouchType.LONGPRESS_RELEASED) {
                toggle.isToggled = !toggle.isToggled;
                automation.buyer[i].isOn = toggle.isToggled;
            }
        }
        //toggle.onToggled = () => {automation.buyer[i].isOn = toggle.isToggled};

        if (automation.buyer[i].isbought) {
            autos.push(ui.createFrame({
                row: j,
                cornerRadius: 10,
                heightRequest: ui.screenHeight / 13,
                content: ui.createGrid({
                    columnDefinitions: ["1*","3*"],
                    children: [
                        ui.createLatexLabel({column:0,text:`${desc} autobuyer`,horizontalOptions: LayoutOptions.CENTER,verticalOptions: LayoutOptions.CENTER}),
                        ui.createFrame({
                            column:1,
                            cornerRadius: 15,
                            content: ui.createGrid({
                                columnDefinitions: ["2*","4*","4*","2*"],
                                children: [
                                    ui.createLabel({column:0,text: ()=> `inv :${automation.buyer[i].baseInterval} s`,verticalOptions: LayoutOptions.CENTER, horizontalOptions: LayoutOptions.CENTER, fontSize:15}),
                                    ui.createButton({column:1, text: upgradeDesc, textColor: getColor()}),
                                    ui.createButton({column:2, text: "Buy 10", textColor: Color.fromRgb(0.5,0.5,0.5)}),
                                    toggle
                                ]
                            })
                        })
                    ]
                })
            }))
        } else {
            
            autos.push(ui.createButton({row:j,text: `Unlock ${desc} Autobuyer - ${automation.buyer[i].unlockCost}`, onClicked: ()=> {
                // user buy autobuyer
                Sound.playClick();
                if (Antimatter >= automation.buyer[i].unlockCost) {
                    Antimatter -= automation.buyer[i].unlockCost
                    automation.buyer[i].isbought = true;
                    reloadUI();
                }
            }}))
        }
    }
    return autos;
}

var get2DGraphValue = () => (bf(1) + Antimatter.abs()).log10().toNumber();

var panel = ui.createStackLayout({
    children: [getMainPanel()]
});
var getUpgradeListDelegate = () => panel

function reloadUI() {
    if (page == 0) panel.children = [getMainPanel()];
    else if (page == 1) panel.children = [getDimensionPanel()];
    else if (page == 2) panel.children = [getAutomationPanel()];
    else panel.children = [getMainPanel()];
}

function buyMaxNormalDim() {
    while(buyTickSpeed()){}
    for (let i = unl.normalDimUnlock()-1; i >= 0; i--) {
        while(AntiDim[i].buy(10)){}
    }
}

var getEquationOverlay = () => {
    return ui.createStackLayout({
        children: [
            ui.createGrid({
                columnDefinitions: ["0*","2*","20*","2*","0*"],
                rowDefinitions: ["0*","6*","20*","4*"],
                children: [
                    // back arrow
                    ui.createImage({source: ImageSource.RESET,column:1, row: 1, onTouched: e => {if(e.type == TouchType.PRESSED){ page = 0; reloadUI(); Sound.playClick(); }}}),
                    ui.createImage({source: ImageSource.SETTINGS,column:3, row: 1, onTouched: e => {if(e.type == TouchType.PRESSED){ setting.show(); Sound.playClick(); }}}),
                    // news
                    ui.createLabel({column:2, row:3, horizontalOptions: LayoutOptions.CENTER, textColor: Color.fromRgb(0.5,0.5,0.5), fontSize:12,text:()=> news.current})
                ]
            })
        ]
    })
}

var setting = ui.createPopup({
    title: 'Settings',
    content: ui.createGrid({
        rowDefinitions: ["2*","1*","1*","1*"],
        children: [
            ui.createLabel({row:0,text:"there is no setting yet.", fontSize: 20, horizontalOptions: LayoutOptions.CENTER}),
            ui.createLabel({row:1,text: version, horizontalOptions: LayoutOptions.CENTER}),
            ui.createProgressBar({row:2,progress:0}),
            ui.createLabel({row:3, text:()=> `You have seen a total of ${news.stats.count} news.`}),
        ]
    })
})

var getPrimaryEquation = () => {
    let r = `\\text{You have ${Antimatter} Antimatter.}`
    if (count.inf > bf(0)) r += `\\\\ \\text{You have ${InfinityPoint.toString(0)} Infinity Points.}`
    return r
}



var getInternalState = () => {
    let adim = exportDim(AntiDim);
    let adgame = JSON.stringify({
        Antimatter: Antimatter.toString(),
        IP: InfinityPoint.toString(),
        Tickspeed: exportTickspeed(),
        Dimensions: {
            AntiDim: adim
        },
        DimBoost: dimboost.toString(),
        Galaxy: galaxy.toString(),
        news: news.stats,
        stats: {
            inf: count.inf.toString()
        },
        automation: {
            buyer: exportAutobuyer()
        },
        sac: sacrificed.toString()
    })
    log('exported save')
    return adgame;
} 
var setInternalState = (adgame) => {
    if (adgame == '') return;
    adgame = JSON.parse(adgame);
    Antimatter = BigNumber.from(adgame.Antimatter);
    AntiDim = importDim(adgame.Dimensions.AntiDim);
    Tickspeed.value = bf(adgame.Tickspeed.value);
    Tickspeed.multiplier = bf(adgame.Tickspeed.multiplier.toString());
    Tickspeed.count = bf(adgame.Tickspeed.count.toString());
    dimboost = bf(adgame.DimBoost);
    galaxy = bf(adgame.Galaxy);
    InfinityPoint = bf(adgame.IP);
    news.stats.count = adgame.news.count;
    count.inf = bf(adgame.stats.inf);

    automation.buyer = importAutobuyer(adgame.automation.buyer);
    sacrificed = bf(adgame.sac);
    log('loaded save');
}

var tick = (elapsedTime,b) => {
    if (!game.isCalculatingOfflineProgress) news.tick(elapsedTime);

    if (Antimatter >= bf('1.79e308') && page != -1) {
        Antimatter = bf('1.8e308');
        page = -1;
        reloadUI();
        return;
    }
    if (Antimatter >= bf('1.79e308')) {
        Antimatter = bf('1.79e308');
        return;
    }
    tickAutoBuy();
    Ach_mul = Ach_stats.mul();
    let dt = BigNumber.from(elapsedTime * 4);
    for (let i = 0; i < 8; i++){
        if (i == 0) {
            Antimatter += AntiDim[0].multiplier() * AntiDim[0].count * elapsedTime;
        } else {
            //log(`${AntiDim[i].id} - ${AntiDim[i].multiplier()}`)
            AntiDim[i-1].count += AntiDim[i].multiplier() * bf(0.1) * AntiDim[i].count * Tickspeed.value * elapsedTime;
        }
    }
    if (count.inf == bf(0)) progress.inf = (Antimatter.log10() / bf(308)).toNumber();
    else progress.inf = 1;
    if (progress.inf > 1) { progress.inf = 1; }
    Tickspeed.multiplier = bf(1.125) + bf(0.04) * galaxy;  // doubled since too slow
    Tickspeed.value = Tickspeed.multiplier.pow(Tickspeed.count);
    theory.invalidatePrimaryEquation();
    

} 


function tickAutoBuy() {
    for (let j = 0; j <= 8; j++) {
        let i = j == 0 ? "tickspeed" : `d${j}`;
        if (automation.buyer[i].isbought && automation.buyer[i].isOn && Date.now() / 1000 - automation.buyer[i].interval().toNumber() > automation.buyer[i].lastBought) {
            if (j == 0) {
                buyTickSpeed();
            } else { 
                if (j > unl.normalDimUnlock()) continue;
                AntiDim[j-1].buy(10);
            }
            automation.buyer[i].lastBought = Date.now() / 1000;
        }
    }
}


var Ach_C = {
    r1: theory.createAchievementCategory(1, "row 1"),
    r2: theory.createAchievementCategory(2, "row 2"),
    s: theory.createAchievementCategory(3, "secret"),
}

var Ach = {
    r11: theory.createAchievement(1011, Ach_C.r1, "You gotta start somewhere", "Buy a 1st Antimatter Dimension.", () => AntiDim[0].count > 0),
    r12: theory.createAchievement(1012, Ach_C.r1, "100 Antimatter is a lot", "Buy a 2nd Antimatter Dimension.", () => AntiDim[1].count > 0),
    r13: theory.createAchievement(1013, Ach_C.r1, "Half life 3 CONFIRMED", "Buy a 3rd Antimatter Dimension.", () => AntiDim[2].count > 0),
    r14: theory.createAchievement(1014, Ach_C.r1, "L4D: Left 4 Dimensions", "Buy a 4th Antimatter Dimension.", () => AntiDim[3].count > 0),
    r15: theory.createAchievement(1015, Ach_C.r1, "5 Dimension Antimatter Punch", "Buy a 5th Antimatter Dimension.", () => AntiDim[4].count > 0),
    r16: theory.createAchievement(1016, Ach_C.r1, "We couldn't afford 9", "Buy a 6th Antimatter Dimension.", () => AntiDim[5].count > 0),
    r17: theory.createAchievement(1017, Ach_C.r1, "Not a luck related achievement", "Buy a 7th Antimatter Dimension.", () => AntiDim[6].count > 0),
    r18: theory.createAchievement(1018, Ach_C.r1, "90 degrees to Infinity", "Buy a 8th Antimatter Dimension.", () => AntiDim[7].count > 0),
    r21: theory.createAchievement(1021, Ach_C.r2, "To Infinity!", "Go Infinite.", () => count.inf > bf(0)),
    r22: theory.createAchievement(1022, Ach_C.r2, "Fake News", "Encounter total 50 news messages.", () => news.stats.count >= 50),
    r23: theory.createAchievement(1023, Ach_C.r2, "The 9th Dimension is a lie", "have exactly 99 8th Antimatter Dimensions.", () => AntiDim[7].count == bf(99)),
    r24: theory.createAchievement(1024, Ach_C.r2, "Antimatter Apocalypse", "Get over 1e80 antimatter.", () => Antimatter > bf(1e80)),
    r25: theory.createAchievement(1025, Ach_C.r2, "Boosting to the max", "Buy 10 Dimension Boosts.", () => dimboost >= bf(10)),
    r26: theory.createAchievement(1026, Ach_C.r2, "You gotta past the Big Wall", "Buy an Antimatter Galaxy.", () => galaxy > bf(0)),
    r27: theory.createAchievement(1027, Ach_C.r2, "Double Galaxy", "Buy 2 Antimatter Galaxies.", () => galaxy >= bf(2)),
    r28: theory.createAchievement(1028, Ach_C.r2, "There's no point in doing that", "toggle buy mode to x1 after one infinity.", () => count.inf > bf(0) && buyMode == 1),

    // massive spoiler !!
    s11: theory.createSecretAchievement(2011, Ach_C.s, "News Lover", "Encounter total 1000 news.", " just wait for it", () => news.stats.count >= 1000),s12: theory.createSecretAchievement(2012, Ach_C.s, "We need POWER", "Get x1000 multiplier from Sac", " something related to 8th...?", () => getSacEff() >= bf(1000))
}

var Ach_stats = {
    count: () => {
        let unlocked = 0;
        for (let i = 1; i < 3; i++) {
            for (let j = 1; j < 9; j++) {
                if (Ach[`r${i}${j}`].isUnlocked) { unlocked++; }
            }
        }
        return unlocked;
    },
    row_compeleted: () => {
        let r = 0;
        for (let i = 1; i < 3; i++) {
            for (let j = 1; j < 9; j++) {
                if (! Ach[`r${i}${j}`].isUnlocked) break;
                else if (j == 8) { r++; }
            }
        }
        return r;
    },
    mul: () => bf(1.03).pow(bf(Ach_stats.count())) * bf(1.5).pow(bf(Ach_stats.row_compeleted()))
}