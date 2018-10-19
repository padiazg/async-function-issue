"use strict"

module.exports = (context, callback) => {
  setTimeout(function() { callback(undefined, {status: "done"}); }, context || 2000);
  // callback(undefined, {status: "done"});
}
