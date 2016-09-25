package {
	
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.display.Bitmap;
	import flash.display.BitmapData;

	import flash.filters.BlurFilter;
	import flash.geom.Matrix;

	public class SmoothPen {
	
		private var px:Number;
		private var py:Number;
		private var depth:Number;
		
		private var isFirst:Boolean;
		private var drawingPanel:Harmonograph;
		
		private var oldX:Number;
		private var oldY:Number;	
		
		private var lineWidth:Number;
		private var lineColor:uint;
		private var lineAlpha:Number;
		private var s:Shape;
		
		public function SmoothPen(d:Harmonograph) {
			depth = 0;
			drawingPanel = d;
			isFirst = true;
			s = new Shape();
		}
	
		public function setLineStyle(w:Number,c:uint,a:Number):void {
			lineWidth = w;
			lineColor = c;
			lineAlpha = a;
		}
	
		public function smoothTo(x:Number,y:Number):void {
	
			if (isFirst) {
				setPosition(x, y);
				isFirst = false;
			}
	
			var px:Number = this.px;
			var py:Number = this.py;
			this.px = x;
			this.py = y;
			var mx:Number = (px + x) / 2;
			var my:Number = (py + y) / 2;
			drawCurve(px,py,mx,my)
		}
	
		public function endSmooth():void {
			smoothTo(px, py);
			isFirst = true;
		}
	
		public function setAlpha(a:Number):void {
			lineAlpha = a;
		}	

		public function setColor(c:uint):void {
			lineColor = c;
		}	
		
		public function setPosition(x:Number,y:Number):void {
			px = x;
			py = y;
			oldX = x;
			oldY = y;
		}
	
		public function drawCurve(hx:Number,hy:Number,px:Number,py:Number):void {
		
			s.graphics.clear();
			s.graphics.moveTo(oldX, oldY);
			s.graphics.lineStyle(lineWidth, lineColor, lineAlpha);
			s.graphics.curveTo(hx, hy, px, py);
			drawingPanel.myBitmapData.draw(s);
			
			oldX = px;
			oldY = py;
		}
	}
}