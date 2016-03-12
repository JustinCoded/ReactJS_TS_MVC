## What is Composability
- a group of things that are simple individually, but can be put together to create something more usefull. 

![](https://i.imgur.com/4trNW.jpg)

## Why use React? 
- Components over HTML Templates 
 - Uses a series of components to build up views
 - Unified markup and view logic make for easier to maintain app.
 - Because we aren't doing manual string concat there is less opertunity for XSS attacks.
- Speed
 - Hold virtual dom and runs diffs during updates to only change what's needed 
 
## Tooling 
- Gulp - Task runner    
[http://gulpjs.com](http://gulpjs.com)

    - Move stuff arround
    - Clean
    - Compiles Frontend code
        - Babel
        - TypeScript
        - JSX (React)
        - Less/Sass    
    - Merges files 
        - css
        - JS, JSX
        - TS, TSX
        - images
    - Lots of extensions (composable)
 
 - npm - Node Package Manager   
 [https://npmjs.com](https://npmjs.com)
    - Package manger for Javascript
    - Global    
      ```
      npm install -g *{pkg name here}*
      ```
    - Project 
      ```
      // Create package.json
      npm init
      
      // Install frameworks
      npm install *{pkg name here}* --save
      
      // Install tools
      npm install *{pkg name here}* --save-dev
      ```    
  
  - tsd - TypeScript Definition Manager     
  [http://definitelytyped.org/tsd/](http://definitelytyped.org/tsd/)   
    - Intellisense & Type info for JS libs
    ```
        tsd init
        tsd install *{def pkg name here}* --save
    ```
        
 - Visual Studio 2013
    - Can work => more CLI
 - Visual Studio 2015
    - Better GUI support for frontend tooling (gulp, npm, etc...)  

 ## Libraries & Frameworks
 - React & ReactDOM 
    - Main libraries for ReactJS 
 - Redux
    - Predictable state container for JavaScript apps
    - App state can only be changed by submitting an __Action__ to the __Store__
    - Allows you to track stat mutations easily 
 - TypeScript
    - Staticly typed way to deal with Javascript
    - Adds classes into the mix
    - Developed by Anders Hejlsberg, one of the lead architects of C# 
 - Gulp       
    - gulp-browserify
    - gulp-typescript
    - gulp-clean
    - gulp-concat
    
## Demo
- Focus on getting everything installed and working

 1. Start new ASP.NET 4.6.1 Empty Project w/ MVC
 2. Add package manager files
    - tsd.json, tsconfig.json, package.json, gulpfile.js    
 3. Add npm packages      
    ```
    npm install --save react react-dom redux
    npm install --save-dev typescript tsd gulp gulp-concat gulp-typescript gulp-clean redux-devtools
    ```
 4. Add tsd files
    ```
        tsd install react-global redux jquery --save
    ```
 5. Setup Gulpfile.js
    ```
        /// <binding BeforeBuild='default' Clean='clean' />

        /*
        This file in the main entry point for defining Gulp tasks and using Gulp plugins.
        Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
        */
        var gulp = require("gulp");
        var concat = require("gulp-concat");
        var clean = require("gulp-clean");
        var ts = require("gulp-typescript");
        var tsProject = ts.createProject("tsconfig.json");

        var paths = {
            components: ["Content/**/*.tsx", "Content/**/*.ts"],
            npmJsLibs: [
                'node_modules/react/dist/react-with-addons.js',
                'node_modules/react-dom/dist/react-dom.js',
                'node_modules/redux/dist/redux.js'
            ],
            build: ["build/"]
        };

        // Delete the dist directory
        gulp.task("clean", function () {
            return gulp.src(paths.build)
            .pipe(clean());
        });

        gulp.task("default", ["scripts", "libs"]);

        gulp.task("scripts", function () {
            return gulp.src(paths.components)
                .pipe(ts(tsProject))
                .pipe(concat('bundle.js'))
                .pipe(gulp.dest("build/js"));
        });

        gulp.task("libs", function() {
            return gulp.src(paths.npmJsLibs)
                .pipe(concat('libs.js'))
                .pipe(gulp.dest("build/js"));
        });
    ```
 6. Setup Default MVC 
    - Create Content/Components
    - Add images folder
    - Add HomeController
    - Add Home/Index view w/ layout
    - Update Site Name in Layout
    - Add @render("Scripts", false) to layout
    - Add Scripts section to Index page
    - Add empty div to Index page w/ id="content"
    
7. Hook up React
    - Create Main.tsx in Content/Components
    - Add Main class and props
    ```
    interface IMainProps {
        model: IProduct[]; 
    }
    
    interface IProduct {
        Title: string;
        SKU: string; 
        Brand: string;
        Price: number; 
        Image: string; 
    }
        
    class Main extends React.Component<IMainProps, {}> {

    }
    ```
    - Add static create function
    ```
    static create(elementId: string) { 
        const render = () => {
            ReactDOM.render(
                <Main />,
                document.getElementById(elementId));
        };
        render();
    };
    ```
    - Add render() 
    ```
     render() {
       
        return (
            <div className="container">
               Hello World!
            </div>
           
        );
    }
    ```
    - Run App to show it's hooked up
    - Add pipe in model from MVC Model
    ```
     <script>
        MainProductPage.create("content", @Html.Raw(Json.Encode(Model)));
     </script>
    ```
    - Added model params to create()
    ```
    static create(elementId: string, model: IProduct[]) {
        console.log('initial model', model);

        const render = () => {
            ReactDOM.render(
                <MainProductPage model={model} />,
                document.getElementById(elementId));
        };
        render();
    };
    ```
    - Run app view console
    - Now create Product class
    ```
    class Product extends React.Component<IProductProps, {}> {
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
                            </div>                   
                        </div>
                    </div>
                </div>
            );
        }
    }
    ```
    - Map products from Main render() 
    ```
     render() {
        var products = this.props.model.map((product, index) =>
            <div key={index}>
                <Product Title={product.Title} SKU={product.SKU} Price={product.Price} Image={product.Image} Brand={product.Brand} />
            </div>);

        return (
            <div className="container">
                {products}
            </div>
           
        );
    }
    ```
    
## __THE END__
    
    
    
    