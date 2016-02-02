game.EnemyEntity = me.Entity.extend({
  init:function(x, y, settings){
    settings.image="enemy";

    //Area de movimiento
    var width = settings.width;
    var height = settings.height;

    //Configuración del area de collision
    settings.framewidth = settings.width = 32;
    settings.frameheight = settings.height = 48;

    settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

    //Super constructor
    this._super(me.Entity, 'init', [x, y , settings]);

    //Area de movimiento
    x = this.pos.x;
    this.startX = x;
    this.endX   = x + width - settings.framewidth
    this.pos.x  = x + width - settings.framewidth;
    this.walkLeft = false;

    //Walk & jump
    this.body.setVelocity(4, 6);
  },
  update:function(dt){
    if (this.alive) {
      if (this.walkLeft && this.pos.x <= this.startX) {
        this.walkLeft = false;
      } else if (!this.walkLeft && this.pos.x >= this.endX) {
        this.walkLeft = true;
      }
      // make it walk
      this.renderable.flipX(this.walkLeft);
      this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;

      } else {
        this.body.vel.x = 0;
      }

      // update the body movement
      this.body.update(dt);

      // handle collisions against other shapes
      me.collision.check(this);

      // return true if we moved or if the renderable was updated
      return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },
    onCollision : function (response, other) {
      if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
          this.renderable.flicker(750);
        }
        return false;
      }
      // Make all other objects solid
      return true;
    }
});
