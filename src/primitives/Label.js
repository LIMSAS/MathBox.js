/**
 * Text label at specified position
 * implemented from:
 * https://github.com/ichuang/MathBox.js/
 * https://github.com/fourplusone/MathBox.js
 */

MathBox.Label = function(options) {
  // Allow inheritance constructor
  if (options === null) {
    return;
  }

  MathBox.Primitive.call(this, options);
};

MathBox.Label.prototype = _.extend(new MathBox.Primitive(null), {

  defaults: function() {
    return {
      position: [0, 0, 0],
      facing: 1,
      distance: 15,
      style: {
        color: new THREE.Color(0x707070),
      },
      text: ''
    };
  },

  renderables: function() {
    return [ this.labels ];
  },

  type: function() {
    return 'label';
  },

  adjust: function(viewport, camera) {
    var options = this.get(),
    // Axis vector direction for labels
    p = [0, 0, 0];
    p[options.facing] = 1;
    var labelTangent = this.labelTangent;
    labelTangent.set.apply(labelTangent, p);
    this.labels.show(true);

    var position = options.position;
    var labelPoint = this.labelPoint;
    labelPoint.set.apply(labelPoint, position);
  },

  make: function() {
    var options = this.get(),
        position = options.position,
        text = options.text,
        distance = options.distance,
        style = this.style,
        labelTangent = this.labelTangent = new THREE.Vector3(),
        labelPoint  = this.labelPoint = new THREE.Vector3();

    var labelOptions = { dynamic: true, distance: distance };
    labelPoint.set.apply(labelPoint, position);
    // label text callback
    var callback = function(i) {
      return text;
    }.bind(this);

    this.labels = new MathBox.Renderable.Labels([labelPoint], labelTangent, callback, labelOptions, style);
  },

});

MathBox.Label.validateArgs = function(options) {
  return options;
};

MathBox.Primitive.types.label = MathBox.Label;
