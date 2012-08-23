// Generated by CoffeeScript 1.3.3
var $,
  __hasProp = {}.hasOwnProperty;

$ = ender;

describe("Opentip - Drawing", function() {
  var adapter, opentip;
  adapter = Opentip.adapters["native"];
  opentip = null;
  beforeEach(function() {
    return Opentip.adapter = adapter;
  });
  afterEach(function() {
    var prop, _ref;
    for (prop in opentip) {
      if (!__hasProp.call(opentip, prop)) continue;
      if ((_ref = opentip[prop]) != null) {
        if (typeof _ref.restore === "function") {
          _ref.restore();
        }
      }
    }
    if (opentip != null) {
      if (typeof opentip.deactivate === "function") {
        opentip.deactivate();
      }
    }
    return $(".opentip-container").remove();
  });
  describe("_draw()", function() {
    beforeEach(function() {
      var triggerElementExists;
      triggerElementExists = false;
      opentip = new Opentip(adapter.create("<div></div>"), "Test", {
        delay: 0
      });
      return sinon.stub(opentip, "_triggerElementExists", function() {
        return true;
      });
    });
    it("should abort if @redraw not set", function() {
      sinon.stub(opentip, "debug");
      opentip.backgroundCanvas = document.createElement("canvas");
      opentip.redraw = false;
      opentip._draw();
      return expect(opentip.debug.callCount).to.be(0);
    });
    it("should abort if no canvas not set", function() {
      sinon.stub(opentip, "debug");
      opentip.redraw = true;
      opentip._draw();
      return expect(opentip.debug.callCount).to.be(0);
    });
    return it("should draw if canvas and @redraw", function() {
      sinon.stub(opentip, "debug");
      opentip.backgroundCanvas = document.createElement("canvas");
      opentip.redraw = true;
      opentip._draw();
      expect(opentip.debug.callCount).to.be.above(0);
      return expect(opentip.debug.args[0][0]).to.be("Drawing background.");
    });
  });
  describe("_getPathStemMeasures()", function() {
    it("should just return the same measures if borderWidth is 0", function() {
      var stemBase, stemLength, _ref;
      _ref = opentip._getPathStemMeasures(6, 10, 0), stemBase = _ref.stemBase, stemLength = _ref.stemLength;
      expect(stemBase).to.be(6);
      return expect(stemLength).to.be(10);
    });
    it("should properly calculate the pathStem information if borderWidth > 0", function() {
      var stemBase, stemLength, _ref;
      _ref = opentip._getPathStemMeasures(6, 10, 3), stemBase = _ref.stemBase, stemLength = _ref.stemLength;
      expect(stemBase).to.be(3.767908047326835);
      return expect(stemLength).to.be(6.2798467455447256);
    });
    return it("should throw an exception if the measures aren't right", function() {
      return expect(function() {
        return opentip._getPathStemMeasures(6, 10, 40);
      }).to.throwError();
    });
  });
  return describe("_getColor()", function() {
    var cavans, ctx, dimensions, gradient;
    dimensions = {
      width: 200,
      height: 100
    };
    cavans = document.createElement("canvas");
    ctx = cavans.getContext("2d");
    gradient = ctx.createLinearGradient(0, 0, 1, 1);
    ctx = sinon.stub(ctx);
    gradient = sinon.stub(gradient);
    ctx.createLinearGradient.returns(gradient);
    it("should just return the hex color", function() {
      return expect(Opentip.prototype._getColor(ctx, dimensions, "#f00")).to.be("#f00");
    });
    it("should just return rgba color", function() {
      return expect(Opentip.prototype._getColor(ctx, dimensions, "rgba(0, 0, 0, 0.3)")).to.be("rgba(0, 0, 0, 0.3)");
    });
    it("should just return named color", function() {
      return expect(Opentip.prototype._getColor(ctx, dimensions, "red")).to.be("red");
    });
    return it("should create and return gradient", function() {
      var color;
      color = Opentip.prototype._getColor(ctx, dimensions, [[0, "black"], [1, "white"]]);
      expect(gradient.addColorStop.callCount).to.be(2);
      return expect(color).to.be(gradient);
    });
  });
});
