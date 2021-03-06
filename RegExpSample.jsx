var grepper = function(obj, ofst, tglen, re){ //obj:Story ofst:CharacterOffset tglen:targets length re:REObject
	var result =new Array();
	var swp,st,ed;
	var pos = 0, len = 0;
	var tgcStyle,tgpStyle,cstyle,pstyle,tg,tgtStr;

	if (ls0.selection.index==0){ //get target characterStyle
		cstyle= null;
		} else {
			cstyle = charStyles.list()[ls0.selection.index-1];
			}
	if (ls1.selection.index==0){ //get target paragraphStyle
		pstyle= null;
		} else {
			pstyle = paraStyles.list()[ls1.selection.index-1];
			}

	var tmp="";
	for (var j=0;j<ofst;j++) tmp+="`";
	tgtStr = tmp + obj.textRange.contents.substr(ofst,tglen);
	while(re.test(tgtStr)){
		st = tgtStr.match(re)+"";
		swp = "";
		for(var i=0;i<st.length;i++) swp += "`";
		pos = tgtStr.indexOf(st);
		len = st.length;
		if (r0.value||(cstyle==null&&pstyle==null)){
			result.push([pos, len]);
			} else {
				tgcStyle = obj.characters[pos+ofst].characterStyles;
				tgpStyle = obj.characters[pos+ofst].paragraphStyles;
				//if (tgcStyle!=cstyle&&cstyle!=null) continue;
				//if (tgpStyle!=pstyle&&pstyle!=null) continue;
				result.push([pos, len]);
				}
		tgtStr = tgtStr.replace(st, swp);
		}
	return result;
	}


var replacer = function (txRange, tg, str){ //txRange:textRange, tg:targetArray, str:swapString,
	var c = new Array();
	var i,j,cstyle,tmp;
	var fl = 0;
	var num =tg.length;
	if (ls2.selection.index==0){
		cstyle= null;
		} else {
			cstyle = charStyles.list()[ls2.selection.index-1];
			}
	if (cstyle==null&&!r0.value){//||ls3.selection.index==0&&!r0.value){
		alert("No Style selected.");
		return false
		}
	for (i=0;i<num;i++){
		c = tg.pop();
		centerView (getFrame(txRange,c[0]));
		tgtSlection (txRange.parent.textRange, c[0], c[1]);
		if (!allReplace) {
			fl = confirmReplace();
			if (fl==-1) return null;
			if (fl==0) continue;
			if (fl==2) allReplace= true;
			}
		if (r2.value||(ls3.selection.index!=0&&ckbx.value)) {
			str = txRange.parent.textRange.characters[c[0]].contents, tmp = "";
			for (j=c[0]+c[1]-1;j>c[0];j--) {
				tmp = txRange.parent.textRange.characters[j].contents + tmp;
				txRange.parent.textRange.characters[j].remove();
				}
			str += tmp;
			} else {
				for (j=c[0]+c[1]-1;j>c[0];j--) txRange.parent.textRange.characters[j].remove();
				}
		if(r1.value||r2.value) {
			cstyle.applyTo(txRange.parent.textRange.characters[c[0]], true);
			}
		if(ls3.selection.index!=0&&ckbx.value){
			txRange.parent.textRange.characters[c[0]].characterAttributes.alternateGlyphs 
			= getGryph();
				}
		txRange.parent.textRange.characters[c[0]].characters.addBefore(str);
		txRange.parent.textRange.characters[c[0]+str.length].remove();
		doReplace++;
		redraw();
		}
	return true;
	}


function get_stRange(slct){
	var frms = new Array();
	var strys = new Array();
	var st = new Array();
	var tmp = new Array();

	//get textFrames in each stories
	for (var i=0;i<slct.length;i++) if (slct[i].typename=='TextFrame') frms.push(slct[i]);
	var j=0,k=0;
	while (frms.length>0){
		st[j] = new Array();
		loop = frms[0].textRange.parent.textFrames.length;
		for (i=0;i<loop;i++){
			for (k=0;k<frms.length;k++){
				if (frms[0].textRange.parent.textFrames[i]==frms[k]){
					st[j].push(frms[k]);
					frms.splice(k,1);
					break;
					}
				}
			}
		if (st[j].length>0) j++;
		}

	for (i=0;i<st.length;i++){
		ofst = st[i][0].textRange.characterOffset - 1;
		len = st[i][0].characters.length;
		if (st[i].length>1){
			for (j=1;j<st[i].length;j++){
				if (st[i][j-1].nextFrame==st[i][j]){
					len += st[i][j].characters.length;
					} else {
						strys.push([st[i][0].textRange.parent, ofst, len]);
						ofst = st[i][j].textRange.characterOffset - 1;
						len = st[i][j].characters.length;
						}
				}
			strys.push([st[i][0].textRange.parent, ofst, len]);
			} else {
				strys.push([st[i][0].textRange.parent, ofst, len]);
				}
		}
	strys.sort();
	strys.reverse();
	return strys;
	}

function getPosition(txFrame){ //txFrame:TextFrame  return texRanges characteroffset and contents length 
	var tgtRange = txFrame.textRange;
	var st = txFrame.textRange.characterOffset-1;
	var len = txFrame.characters.length;
	return [tgtRange, st, len];
	}


function getGryph(){
	var result;
	switch(ls3.selection.index){
		case 1:
		result = AlternateGlyphsForm.DEFAULTFORM;
		break;
		case 2:
		result = AlternateGlyphsForm.EXPERT;
		break;
		case 3:
		result = AlternateGlyphsForm.FULLWIDTH;
		break;
		case 4:
		result = AlternateGlyphsForm.HALFWIDTH;
		break;
		case 5:
		result = AlternateGlyphsForm.JIS04FORM;
		break;
		case 6:
		result = AlternateGlyphsForm.JIS78FORM;
		break;
		case 7:
		result = AlternateGlyphsForm.JIS83FORM;
		break;
		case 8:
		result = AlternateGlyphsForm.JIS90FORM;
		break;
		case 9:
		result = AlternateGlyphsForm.PROPORTIONALWIDTH;
		break;
		case 10:
		result = AlternateGlyphsForm.QUARTERWIDTH;
		break;
		case 11:
		result = AlternateGlyphsForm.THIRDWIDTH;
		break;
		case 12:
		result = AlternateGlyphsForm.TRADITIONAL;
		break;
		default:
		result = AlternateGlyphsForm.DEFAULTFORM;
		break;
		}
	return result;
	}


//building user interface
//--------gets Document styles---------------------------------------------
var  items0,items1 = new Array();

var charStyles= {
	styles: app.activeDocument.characterStyles,
	list: function(){
		var result = new Array();
		for (var i=0;i<this.styles.length;i++){
			result.push(this.styles[i]);
			}
		return result;
		},
	names: function(){
		var result = new Array();
		for (var i=0;i<this.styles.length;i++){
			result.push(this.styles[i].name);
			}
		return result;
		}
	}

var paraStyles = {
	styles: app.activeDocument.paragraphStyles,
	list: function(){
		var result = new Array();
		for (var i=0;i<this.styles.length;i++){
			result.push(this.styles[i]);
			}
		return result;
		},
	names: function(){
		var result = new Array();
		for (var i=0;i<this.styles.length;i++){
			result.push(this.styles[i].name);
			}
		return result;
		}
	}

var items0 = charStyles.names();
var items1 = paraStyles.names();
items0.unshift('––––––––––');
items1.unshift('––––––––––');
var gryphfrm = ["––––––––––","DEFAULTFORM","EXPERT","FULLWIDTH","HALFWIDTH",
				"JIS04FORM","JIS78FORM","JIS83FORM","JIS90FORM",
				"PROPORTIONALWIDTH","QUARTERWIDTH","THIRDWIDTH",
				"TRADITIONAL"];

var allReplace=false;
var doReplace = 0;

//-----make window object-----------------------------------------------------------------------------
var targetObj = ['selection', 'document', 'activeLayer'];
var d = new Window ('dialog', 'RE Grep for AI', undefined);
	d.location = [40,40];
	var pnl0 = d.add('panel', undefined, 'RegExp Strings');
		var g0= pnl0.add("group",undefined,"");
		g0.orientation = "row";
			var stTx0 = g0.add('statictext', undefined, 'find');
			stTx0.characters = 7;
			var vTx0 = g0.add('edittext', undefined , '', {multiline:true});
			vTx0.characters = 40;
		var g1= pnl0.add("group",undefined,"");
		g1.orientation = "row";
			var stTx1 = g1.add('statictext', undefined , 'replace');
			stTx1.characters = 7;
			var vTx1 = g1.add('edittext', undefined, '', {multiline:true});
			vTx1.characters = 40;

	var gp0 = d.add("group",undefined,"");
	gp0.alignment = "top";
		 var pnl1 = gp0.add('panel', undefined, 'Options');
		 pnl1.alignment = "left";
			var r0 = pnl1.add('radiobutton', undefined, "don't change styles");
			var r1 = pnl1.add('radiobutton', undefined, 'change with styles');
			var r2 = pnl1.add('radiobutton', undefined, 'change only styles');
			r0.value = true;
			var ckbx = pnl1.add('checkbox',undefined, 'change with gryphs');
			ckbx.value = false;
			var g6 = pnl1.add("group",undefined,"");
			var stTx6 = g6.add('statictext', undefined , 'select target');
			var ls4 = g6.add('dropdownlist', undefined, targetObj);
			ls4.selection = 0;
			
		var gp1 =gp0.add("group",undefined,"");
		gp1.orientation = "column";
		//gp1.alignment = "left";
			var p0 = gp1.add('panel',undefined, 'search styles') ;
				var g2 = p0.add("group",undefined,"");
					var stTx2 = g2.add('statictext', undefined , 'character style');
					var ls0 = g2.add('dropdownlist', undefined, items0);
				var g3 = p0.add("group",undefined,"");
					var stTx3 = g3.add('statictext', undefined , 'paragraph style');
					var ls1 = g3.add('dropdownlist', undefined, items1);
					ls0.selection=0;
					ls1.selection=0;
				
			var p1 = gp1.add('panel', undefined, 'replace styles') ;
				var g4 = p1.add("group",undefined,"");
					var stTx4 = g4.add('statictext', undefined , 'character style');
					var ls2 = g4.add('dropdownlist', undefined, items0);
				var g5 = p1.add("group",undefined,"");
					var stTx5 = g5.add('statictext', undefined , 'alternate gryph');
					var ls3 = g5.add('dropdownlist', undefined, gryphfrm);
					ls2.selection=0;
					ls3.selection=0;
			
	
	var bt = d.add("group",undefined,""); //button
	bt.orientation = "row";
	var btn0 = bt.add('button', undefined, 'cancel', {name:'cancel'});
	var btn1 = bt.add('button', undefined , 'apply', {name:'ok'});
	btn1.onClick = function (){
		if(main()){
			alert ("Total replaced targets = " + doReplace);
			}
		};
d.show();


//---------main function-------------------------------------------------------
function main(){
	d.close();
	var REPLACE = vTx1.text;
	var seTgt = eval('/' + vTx0.text + '/');

	switch(ls4.selection.index){
		case 0: //selection
		var tgArray = new Array();
		var targets = app.activeDocument.selection;
		if (targets.typename=='TextRange') {
			resultArray = grepper(targets.parent, targets.characterOffset-1, targets.length, seTgt);
			if (replacer(targets, resultArray, REPLACE)==null) return false;
			return true;
			}
		var tgRange = new Array();
		tgRange = get_stRange(targets);
		for (var i=0;i<tgRange.length;i++){
			resultArray = grepper(tgRange[i][0], tgRange[i][1], tgRange[i][2], seTgt);
			if (resultArray.length==0) continue;
			if (replacer(tgRange[i][0].textRange, resultArray, REPLACE)==null) return false;
			}
		return true;
		break;

		case 1: //document
		var targets = app.activeDocument.stories;
		for (var i=0;i<targets.length;i++){
			resultArray = grepper(targets[i], 0, targets[i].characters.length, seTgt);
				if (resultArray.length==0) continue;
				if (replacer(targets[i].textRange, resultArray, REPLACE)==null) return false;
			}
		return true;
		break;
		
		case 2: //layer
		var targets = app.activeDocument.activeLayer.stories;
		for (var i=0;i<targets.length;i++){
			resultArray = grepper(targets[i], 0, targets[i].characters.length, seTgt);
			if (resultArray.length==0) continue;
			if (replacer(targets[i], resultArray, REPLACE)==null) return false;
			}
		return true;
		break;			

		default: 
		return false;
		}
	}

//--make view-------------------------------------------------------------------
function getFrame(tg, pos){ //tg:TextRanges 
	var result = new Array();
	var frame = tg.parent.textFrames;
	var tgLen = tg.characters.length;
	var ofst = tg.characterOffset;
	for (var i=0;i<frame.length;i++){
		ofst -= frame[i].characters.length;
		if (ofst<=0) return frame[i];
		}
	}

function tgtSlection(obj, fstPos, len){
	obj.characters[fstPos].select(false);
	for (var i=fstPos+1;i<fstPos+len;i++){
		obj.characters[i].select(true);
		}
	redraw();
	}

function centerView(obj){
	var x = obj.position[0] + obj.width/2;
	var y = obj.position[1] + obj.height/2;
	app.activeDocument.activeView.centerPoint = [x, y];
	app.activeDocument.activeView.zoom= 1.5;
	}

//--confirm window----------------------------------------------------------------
function confirmReplace(){
	var result
	var cWin = new Window('dialog', 'Replace the target?', [100,100,400,170]);
	var stTx = cWin.add('statictext', [10,10,250,25] , "");
	var bt0 = cWin.add('button', [10,35,60,55], 'cancel', {name:'exit'});
	var bt1 = cWin.add('button', [70,35,130,55], 'skip', {name:'skip'});
	var bt2 = cWin.add('button', [140,35,200,55], 'replace', {name:'replace'});
	bt2.active = true;
	var bt3 = cWin.add('button', [210,35,270,55], 'all', {name:'all'});
	bt0.onClick = function (){
		result=-1;
		cWin.close();
		};
	bt1.onClick = function (){
		result=0;
		cWin.close();
		};
	bt2.onClick = function (){
		result=1;
		cWin.close();
		};
	bt3.onClick = function (){
		result=2;
		cWin.close();
		};
	cWin.show();
	return result;
	}
