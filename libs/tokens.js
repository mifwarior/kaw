var tokens = {
	G: function G(pattern) {
		return function (val) {
			return val > pattern;
		};
	},
	GWQ: function GEQ(pattern) {
		return function (val) {
			return val >= pattern;
		};
	},
	EQ: function EQ(pattern) {
		return function (val) {
			return val === pattern;
		};
	},
	L: function L(pattern) {
		return function (val) {
			return val < pattern;
		};
	},
	LEQ: function LEQ(pattern) {
		return function (val) {
			return val <= pattern;
		};
	},
	Array: function Array() {
		return function (value) {
			if (value instanceof Array) {
				return true;
			}
			else {
				return false;
			}
		};
	}
};