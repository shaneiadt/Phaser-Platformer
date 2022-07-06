class BaseEntity extends Phaser.Physics.Arcade.Sprite {
  addCollider = (object: Phaser.GameObjects.GameObject, callback?: () => void): void => {
    this.scene.physics.add.collider(this, object, callback);
  };
}

export default BaseEntity;
