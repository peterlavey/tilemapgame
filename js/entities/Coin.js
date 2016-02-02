game.CoinEntity = me.CollectableEntity.extend({
  init:function(x, y, settings){
    this._super(me.CollectableEntity, 'init', [x, y, settings]);
  },
  onCollision:function(response, other){
    game.data.score += 250;
    me.audio.play("cling");
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    me.game.world.removeChild(this);
    return false;
  }
});
