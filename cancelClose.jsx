#targetengine session

if (app.eventListeners.itemByName('test')!=null){
    app.eventListeners.itemByName('test').remove();
    }
var w = new Window('palette', 'いいのかなぁ?',undefined);
w.add('statictext',undefined,'本当に閉じるの？閉じちゃうの？？？');
var bt1 = w.add('button', undefined , 'やっぱダメ〜');
var bt2 = w.add('button', undefined , '閉じろ');
bt1.onClick = function (){
	w.close();
	}
bt2.onClick = function(){
	w.close();
	app.eventListeners.itemByName('test').remove();
	app.activeDocument.close();
	addLsnr ();
	}

function addLsnr(){
	var el = app.addEventListener(
		"beforeClose",
		function cb(e){
			e.preventDefault();
			e.stopPropagation();
			w.show();
		});
	el.name = "test";
	}

addLsnr ();

