"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = require("vue-router");

var _About = _interopRequireDefault(require("./components/About"));

var _Books = _interopRequireDefault(require("./components/Books.vue"));

var _Chart = _interopRequireDefault(require("./components/Chart.vue"));

var _BookDetaild = _interopRequireDefault(require("./components/BookDetaild"));

var _FullScreenEditBook = _interopRequireDefault(require("./components/FullScreenEditBook.vue"));

var _FullScreenNewBook = _interopRequireDefault(require("./components/FullScreenNewBook.vue"));

var _Page = _interopRequireDefault(require("./components/Page404.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Router = (0, _vueRouter.createRouter)({
  history: (0, _vueRouter.createWebHistory)(),
  routes: [{
    path: "/",
    component: _Books["default"]
  }, {
    path: "/about",
    component: _About["default"]
  }, {
    path: "/chart",
    component: _Chart["default"]
  }, {
    path: "/book/:id",
    component: _BookDetaild["default"],
    props: true
  }, {
    path: "/book/:id/edit",
    component: _FullScreenEditBook["default"],
    props: true
  }, {
    path: "/book/new",
    component: _FullScreenNewBook["default"]
  }, {
    path: "*",
    component: _Page["default"]
  }]
});
var _default = Router;
exports["default"] = _default;