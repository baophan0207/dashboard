/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Locale
 */
"use strict"; // Hard code this for now.

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Locale = {
  isRTL: function isRTL() {
    return false;
  },
  getDirection: function getDirection() {
    return 'LTR';
  }
};
var _default = Locale;
exports["default"] = _default;