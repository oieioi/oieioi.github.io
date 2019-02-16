// Generated by CoffeeScript 1.4.0

/*
 フィボナッチ渦巻きを書く
*/


(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.FibUzumaki = (function(_super) {

    __extends(FibUzumaki, _super);

    /**
    * コンストラクタ
    * @param {object} ctx キャンバスコンテキスト
    */


    function FibUzumaki(ctx) {
      this.ctx = ctx;
      FibUzumaki.__super__.constructor.call(this);
    }

    /**
    * フィボナッチ渦巻きを出力する
    * @param {number} n 渦巻きの本数
    * @param {number} x 渦巻きの中心点のx座標
    * @param {number} y 渦巻きの中心点のy座標
    * @param {number} radius 渦巻きの角度
    * @param {boolean} uzuMuki 渦巻きの向き
    * @param {number} saisyo 渦巻きの最初の半径
    */


    FibUzumaki.prototype.drawUzumaki = function(n, x, y, radius, uzuMuki, saisyo) {
      var fib, hankei, i, nextRad, position, _results;
      position = {
        x: x,
        y: y
      };
      i = 1;
      _results = [];
      while (i < n) {
        fib = this.getFib(i);
        hankei = saisyo * fib;
        nextRad = this.getNextRad(radius, uzuMuki);
        this.draw(position.x, position.y, hankei, radius, nextRad, uzuMuki, i);
        position = this.getNextPosition(position.x, position.y, radius, saisyo, i, uzuMuki);
        radius = nextRad;
        _results.push(i++);
      }
      return _results;
    };

    /**
    * 円を一つ書く
    * TODO: 色を指定できるようにする
    * @param {number} x 中心点x
    * @param {number} y 中心点y
    * @param {number} radius 半径
    * @param {number} startAngle 初めの角度
    * @param {number} endAngle   終わりの角度
    * @param {number} anticlockwise 円の向き
    * @param {number} n
    */


    FibUzumaki.prototype.draw = function(x, y, radius, startAngle, endAngle, anticlockwise, n) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = anticlockwise ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 255, 0.5)';
      this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
      return this.ctx.stroke();
    };

    /**
    * 右回りか左回りに90度すすめた角度を返す
    * @param {number} inRad 元の角度
    * @param {boolean} uzuMuki 進める方向
    * @return {number} 90度進めた角度
    */


    FibUzumaki.prototype.getNextRad = function(inRad, uzuMuki) {
      var rad;
      if (uzuMuki) {
        rad = inRad - ((1 / 2) * Math.PI);
      } else {
        rad = inRad + ((1 / 2) * Math.PI);
      }
      return rad;
    };

    /**
    * 始点x, yと角度と距離から移動先の先の座標を返す
    * @param {number} 移動元のx座標
    * @param {number} 移動元のy座標
    * @param {number} 渦巻きの傾き
    * @param {number} 一巻き目の半径
    * @param {number} 何巻目のうずか
    * @param {boolean} うずの向き
    * @return {object} {x:x座標,y:y座標}
    */


    FibUzumaki.prototype.getNextPosition = function(inX, inY, rad, saisyo, n, uzuMuki) {
      var fib, moveX, moveY, retPosition;
      fib = this.getFib(n - 1);
      moveX = (Math.sin(rad)) * (saisyo * fib);
      moveY = (Math.cos(rad)) * (saisyo * fib);
      if (uzuMuki) {
        retPosition = {
          x: inX - moveX,
          y: inY + moveY
        };
      } else {
        retPosition = {
          x: inX + moveX,
          y: inY - moveY
        };
      }
      return retPosition;
    };

    return FibUzumaki;

  })(window.Fibonacci);

}).call(this);
