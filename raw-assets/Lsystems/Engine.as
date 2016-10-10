package {
	import flash.display.Sprite;
	import flash.events.Event;
	
	
	public class Engine {
		
		private var px:Number;
		private var py:Number;
		private var d:Number;
		private var words:String;
		
		private var a:Number;
		private var rad:Number;
		private var productions:Array;
		
		private var stack:Array;
		private var sprite:Sprite;
		private var stepCount:int;
		
		
		public function Engine(
				px:Number, 
				py:Number, 
				initialAngle:Number, 
				angleIncrement:Number, 
				segmentLength:int,
				axiom:String,
				productionsArray:Array,
				steps:int,
				sprite:Sprite) {		
				
			this.px = px;
			this.py = py;
			this.sprite = sprite;
			
			d = segmentLength;
			words = axiom;
			
			stack = new Array();
			a = angleIncrement * (Math.PI / 180);
			rad = initialAngle * (Math.PI / 180);
			productions = productionsArray;
			stepCount = 0;
			
			// set up the cursor
			sprite.graphics.lineStyle(0, 0xffffff, 100);
			sprite.graphics.moveTo(px, py);
			
			// separate and store the productions as targets (a) and replacements (X)
			// where the production is a -> X
			var targets:Array = new Array();
			var replacements:Array = new Array();
			
			for (var x:int = 0; x < this.productions.length; x++) {
				var prod:Array = this.productions[x].split("->");
				targets[x] = prod[0];	
				replacements[x] = prod[1];	
			}
			
			// build the string based on the number of steps
			for (var i:int = 0; i < steps; i++) {
				for (var j:int = 0; j < targets.length; j++) {
					
					var t:String = targets[j];
					var r:String = replacements[j];
				
					// to correctly change the string we need to keep the 
					// values from being replaced more than once in a pass,
					// so temporarily make them lower case
					r = replacements[j].toLowerCase();	
					words = replaceStr(words, t, r); 
				}
				words = words.toUpperCase();	
			}
			
			words = replaceStr(words, "X", ""); 
			words = replaceStr(words, "Y", ""); 

		}		
	
		public function renderSteps():void {
			sprite.addEventListener(Event.ENTER_FRAME, renderSingleStep);
		}
		
		
		private function replaceStr(str:String, sfrom:String, sto:String):String {
			return str.split(sfrom).join(sto); 
		}
	
			
		private function renderSingleStep(evt:Event):void {
			var instr:String = words.charAt(stepCount);
			renderInstruction(instr);
			
			if (stepCount++ >= words.length - 1) {
				sprite.removeEventListener(Event.ENTER_FRAME, renderSingleStep);
			}
		}
	
		
		private function renderInstruction (instr:String):void {
			
			var c:Cursor;
			
			switch(instr) {
				case 'R' :
				case 'L' :
				case 'F' :
					px = px + d * Math.cos(rad);
					py = py + d * Math.sin(rad);
					sprite.graphics.lineTo(px, py);
					break;
				case 'S' :
					px = px + d * Math.cos(rad);
					py = py + d * Math.sin(rad);
					sprite.graphics.moveTo(px, py);
					break;
				case '-' :
					rad += a;
					break;
				case '+' :
					rad -= a;
					break;
				case '[':
					c = new Cursor(px, py, rad);
					stack.push(c);
					break;	
				case ']':
					c = stack.pop();
					px = c.px;
					py = c.py; 
					rad = c.rad;
					sprite.graphics.moveTo(px, py);
					break;
				default :
					trace("unknown command: " + instr);
			}
		}
	}
}
