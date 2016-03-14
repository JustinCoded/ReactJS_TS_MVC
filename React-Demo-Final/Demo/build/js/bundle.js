// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/tsd.d.ts"/>
var ProductComponent = (function (_super) {
    __extends(ProductComponent, _super);
    function ProductComponent() {
        _super.apply(this, arguments);
        this.addItemToCart = function (itemSKU) {
            console.log("Clicked Add to Cart");
            this.props.store.dispatch({ type: "ADD-TO-CART", sku: itemSKU });
        };
    }
    ProductComponent.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", {className: "col-md-4"}, React.createElement("div", {className: "panel panel-default"}, React.createElement("div", {className: "panel-heading"}, this.props.Title), React.createElement("div", {className: "panel-body"}, React.createElement("img", {src: "../Content/images/" + this.props.Image, height: "120", width: "120"}), React.createElement("div", null, React.createElement("div", null, "Brand: ", this.props.Brand), React.createElement("div", null, "SKU: ", this.props.SKU), React.createElement("div", null, "Price: $", this.props.Price), React.createElement("button", {className: "glyphicon glyphicon-shopping-cart", onClick: function () { return _this.addItemToCart(_this.props.SKU); }}))))));
    };
    return ProductComponent;
}(React.Component));
var MainProductPage = (function (_super) {
    __extends(MainProductPage, _super);
    function MainProductPage() {
        _super.apply(this, arguments);
    }
    MainProductPage.create = function (elementId, model) {
        console.log('initial model', model);
        var reducer = function (state, action) {
            switch (action.type) {
                case 'ADD-TO-CART':
                    var newItems = state.items;
                    newItems.push(action.sku);
                    return {
                        items: newItems
                    };
                default:
                    return state;
            }
        };
        var store = Redux.createStore(reducer, { items: new Array() });
        var render = function () {
            ReactDOM.render(React.createElement(MainProductPage, {model: model, store: store}), document.getElementById(elementId));
        };
        store.subscribe(function () {
            console.log(JSON.stringify(store.getState()));
        });
        render();
    };
    ;
    MainProductPage.prototype.render = function () {
        var _this = this;
        var products = this.props.model.map(function (product, index) {
            return React.createElement("div", {key: index}, React.createElement(ProductComponent, {Title: product.Title, SKU: product.SKU, Brand: product.Brand, Price: product.Price, Image: product.Image, store: _this.props.store}));
        });
        return (React.createElement("div", {className: "container"}, products));
    };
    return MainProductPage;
}(React.Component));


