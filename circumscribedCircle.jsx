var tg = app.selection[0];
var pt=[];
for (var i=0;i<tg.pathPoints.length;i++)
	pt.push(tg.pathPoints[i].anchor);
var ln=[];
for (i=0;i<3;i++){
	if (i<2){
		ln.push(Math.sqrt(
		(pt[i][0]-pt[i+1][0])*(pt[i][0]-pt[i+1][0])+
		(pt[i][1]-pt[i+1][1])*(pt[i][1]-pt[i+1][1])));
		}else{
			ln.push(Math.sqrt(
			(pt[i][0]-pt[0][0])*(pt[i][0]-pt[0][0])+
			(pt[i][1]-pt[0][1])*(pt[i][1]-pt[0][1])));
			}
	}
var r = ln[0]*ln[1]*ln[2]/
		Math.sqrt (
		(ln[0]+ln[1]+ln[2])*(ln[1]+ln[2]-ln[0])*(ln[0]-ln[1]+ln[2])*(ln[0]+ln[1]-ln[2])
		);
var a1 = (pt[1][0]-pt[0][0])*2;
var b1 = (pt[1][1]-pt[0][1])*2;
var c1 = pt[0][0]*pt[0][0]-pt[1][0]*pt[1][0]+pt[0][1]*pt[0][1]-pt[1][1]*pt[1][1];
var a2 = (pt[2][0]-pt[0][0])*2;
var b2 = (pt[2][1]-pt[0][1])*2;
var c2 = pt[0][0]*pt[0][0]-pt[2][0]*pt[2][0]+pt[0][1]*pt[0][1]-pt[2][1]*pt[2][1];
var ct = [(b1*c2-b2*c1)/(a1*b2-a2*b1), (c1*a2-c2*a1)/(a1*b2-a2*b1)];
app.activeDocument.pathItems.ellipse (ct[1]+r, ct[0]-r, r*2, r*2);
$.writeln(ct)


