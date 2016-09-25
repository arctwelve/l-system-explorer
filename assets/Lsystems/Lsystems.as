package {
	import flash.display.Sprite;
	
	[SWF(width="800", height="600", backgroundColor="#000000")] 
	public class Lsystems extends Sprite {
		
		public function Lsystems() {
			
			stage.frameRate = 1000;
				
			// Sierpinski 7
			/*
			var w:String = "R";
			var p1:String = "L->R+L+R";
			var p2:String = "R->L-R-L";
			var p:Array = new Array(p1, p2);
			var e:Engine = new Engine(400, 40, 60, 60, 4, w, p, 7, this);
			e.renderSteps();
			*/

			// Branching structure 5
			/*
			var w:String = "X";
			var p1:String = "X->F[+X][-X]FX";
			var p2:String = "F->FF";
			var p:Array = new Array(p1,p2);
			var e:Engine = new Engine(400, 600, -90, 50, 4, w, p, 6, this);
			e.renderSteps();
			*/

			// Branching structure 4
			
			var w:String = "X";
			var p1:String = "X->F[+X]F[-X]+X";
			var p2:String = "F->FF";
			var p:Array = new Array(p1,p2);
			var e:Engine = new Engine(400, 600, -90, 20, 4, w, p, 6, this);
			e.renderSteps();
			
			
			
			// Branching structure 1 
			/*
			var w:String = "F";
			var p1:String = "F->F[+F]F[-F]F";
			var p:Array = new Array(p1);
			var e:Engine = new Engine(37, 280, 0, 95, 4, w, p, 5, this);
			e.renderSteps();
			*/
			
			
			// Hilbert Curve
			/*
			var w:String = "X";
			var p1:String = "X->+YF-XFX-FY+";
			var p2:String = "Y->-XF+YFY+FX-";
			var p:Array = new Array(p1, p2);
			var e:Engine = new Engine(40, 30, 90, 90, 5, w, p, 6, this);
			e.renderSteps();
			*/
			
			
			/*
			// Koch Curve - maybe
			var w:String = "F-F-F-F";
			var p1:String = "F->F-F+F+FF-F-F+F";
			var p:Array = new Array(p1);
			var e:Engine = new Engine(390, 90, 90, 90, 4, w, p, 3, this);
			e.renderSteps();
			*/
			/*
			// islands	
			var w:String = "F+F+F+F";
			var p1:String = "F->F+S-FF+F+FF+FS+FF-S+FF-F-FF-FS-FFF";
			var p2:String = "S->SSSSSS";
			var p:Array = new Array(p1,p2);
			var e:Engine = new Engine(230, 120, 90, 90, 4, w, p, 2, this);
			e.renderSteps();
			*/
			
			
			/*
			// Branching structure 2
			var w:String = "F";
			var p1:String = "F->F[+F]F[-F][F]";
			var p:Array = new Array(p1);
			var e:Engine = new Engine(300, 375, -90, 20, 11, w, p, 4, this);
			e.renderSteps();
			*/
			
			
			
			/*
			// Branching structure 3			
			var w:String = "F";
			var p1:String = "F->FF-[-F+F+F]+[+F-F-F]";
			var p:Array = new Array(p1);
			var e:Engine = new Engine(300, 375, -90, 22.5, 10, w, p, 3, this);
			e.renderSteps();
			*/
			
		}
	}
}
// px, py, initialAngle, angleIncrement, segmentLength, axiom, productionsArray, steps








