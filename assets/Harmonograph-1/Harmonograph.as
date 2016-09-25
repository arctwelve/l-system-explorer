package {
	import flash.display.Sprite;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	
	import flash.events.Event;
	import flash.display.MovieClip;
	
	
	[SWF(width="800", height="600", backgroundColor="#000000")] 
	public class Harmonograph extends Sprite {
		
		private var penAlpha:Number = 0.5;
		private var penColor:uint = 0xffffff;
		private var penWeight:int = 0;
		
		private var isRotary:Boolean = false;
		private var isOpenPhase:Boolean = true;				// matters if isRotary is false
		private var isCounterCurrent:Boolean = false;		// matters if isRotary is true
		
		private var amp:Number = 290;						// amplitude
		private var intervalA:Number = 400;					// Period of motion
		private var intervalB:Number = 100;
		
		private var decay:Number = 0.07;					// rate of decay
		private var timeStep:Number = 5;					// lower values = slower drawing speed, softer curves
															// very high numbers give unpredictable, but usually nice, results
				
		
		// pendulum 1
		private var Ax:Number = amp;
		private var Tx:Number = intervalA;					
		
		// pendulum 2
		private var Ay:Number = amp;
		private var Ty:Number = intervalB;
		
		// pendulum 3 -- has full range of motion
		private var p3Ax:Number = amp;						
		private var p3Tx:Number = intervalB;						
		
		private var p3Ay:Number = amp;
		private var p3Ty:Number = intervalA;
		
		
		private var t:Number = 0;
		private var TWOPI:Number = 2 * Math.PI;
		private var halfStageW:Number = 800 / 2;
		private var halfStageH:Number = 600 / 2;
		private var p3x:Number =  0;
		private var p3y:Number =  0;
		
		private var pen:SmoothPen;
		private var drawCount:int = 0;
		
		private var r:Number = 0;
		private var g:Number = 0;
		private var b:Number = 0;
		
		public var myBitmapData:BitmapData;
		
		public function Harmonograph() {
			
			stage.frameRate = 50;
			
			var bdWidth:Number = 800;
			var bdHeight:Number = 600;
			var bdTransparent:Boolean = false;
			var bdFillColorARGB:uint = 0xFF000000;
			
			myBitmapData = new BitmapData(bdWidth, 
                bdHeight, 
                bdTransparent,
                bdFillColorARGB);
			
			addChild(new Bitmap(myBitmapData));
			
			pen = new SmoothPen(this);
			pen.setLineStyle(penWeight, penColor, penAlpha);
			addEventListener(Event.ENTER_FRAME, run);
		}
		
		
		private function run(e:Event):void {
					
			if (Ax > 0) Ax -= decay;
			if (Ay > 0) Ay -= decay;
			if (p3Ax > 0) p3Ax -= decay;
			if (p3Ay > 0) p3Ay -= decay;
			
			if (Ax <= 0 && Ay <= 0 && p3Ax <= 0 && p3Ay <= 0) {
				removeEventListener(Event.ENTER_FRAME, run);
			}
			
			t += timeStep;
			var TWOPI_T:Number = TWOPI * t;
			
			var y:Number;
			var x:Number = Ax * Math.sin( TWOPI_T / Tx );
			if (isOpenPhase && !isRotary) {
				y = Ay * Math.sin( TWOPI_T / Ty );
			} else {
				y = Ay * Math.cos( TWOPI_T / Ty );
			}
			
			if (isRotary) {
				p3x = p3Ax * Math.sin( TWOPI_T / p3Tx );
				p3y = p3Ay * Math.cos( TWOPI_T / p3Ty );
			}
			
			x += halfStageW + p3x;
			
			if (isCounterCurrent && isRotary) {
				y += halfStageH - p3y;
			} else {
				y += halfStageH + p3y;
			}
		
			// little fix:  draws after 4 steps - avoids initial drawing line.
			if (t > timeStep * 4) {
				pen.setAlpha(penAlpha);
			}
			
			// shift color
			/*
			if (r < 255) {
				r += 1;
			} else if (g < 255) {
				g += 0.1;
			} else if (b < 255) {
				b += 0.1;
			}
			
			var c:Number = r<<16 | g<<8 | b;
			pen.setColor(r<<16 | g<<8 | b);
			*/
			pen.smoothTo(x, y);
		}
	}
}


