// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

/// <reference path="../../typings/tsd.d.ts"/>


interface ProductProps {
    Title: string;
    SKU: string;
    Brand: string;
    Price: number;
    Image: string;
    store: Redux.Store;
}

class ProductComponent extends React.Component<ProductProps, {}> {

    addItemToCart = function (itemSKU: string) {
        console.log("Clicked Add to Cart");
        this.props.store.dispatch({ type: "ADD-TO-CART", sku: itemSKU });
    };

    render() {
        return (
            <div className="col-md-4">
                <div className="panel panel-default">
                    <div className="panel-heading">{this.props.Title}</div>
                    <div className="panel-body">
                        <img src={"../Content/images/" + this.props.Image } height="120" width="120" />
                        <div>
                            <div>Brand: {this.props.Brand}</div>
                            <div>SKU: {this.props.SKU}</div>
                            <div>Price: ${this.props.Price}</div>
                            <button className="glyphicon glyphicon-shopping-cart" onClick={ () => this.addItemToCart(this.props.SKU) }></button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


interface MainProps {
    model: Product[];
    store: Redux.Store;
}

interface State {
    items: string[];
}

interface AddItem {
    type: string;
    sku: string;
}

class MainProductPage extends React.Component<MainProps, {}> {

    static create(elementId: string, model: Product[]) {
        console.log('initial model', model);

        const reducer = (state: State, action: AddItem): any => {
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

        const store = Redux.createStore(reducer, { items: new Array<string>() });

        const render = () => {
            ReactDOM.render(
                <MainProductPage model={model} store={store} />,
                document.getElementById(elementId));
        };
        store.subscribe(() => {
            console.log(JSON.stringify(store.getState()));
        });
        render();
    };

    render() {
        var products = this.props.model.map((product, index) =>
            <div key={index}>
                <ProductComponent Title={product.Title} SKU={product.SKU} Brand={product.Brand} Price={product.Price} Image={product.Image} store={this.props.store}  />
            </div>);

        return (
            <div className="container">
                {products}
            </div>

        );
    }




}