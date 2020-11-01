/*
 * Bind to JavaScript require() function
 */
[@bs.val] external require : string => string = "";

/*
 * Require bird.png, cat.png, dog.png, and fish.png
 * from the images directory. There is also a file
 * named unknown.png for other species.
 */
require("../images/bird.png");
require("../images/cat.png");
require("../images/dog.png");
require("../images/fish.png");
require("../images/unknown.png");

/*
 * In the `<img>` element, the `src` pathname 
 * is relative to the `build` directory. Webpack
 * will put the `images` directory at the same
 * level as the `index.html` file, so we do
 * not want to use `../` here.
 * 
 * The style for this <div> is inherited from the
 * class="horiz" in the stylesheet, so you don't need
 * to add a style yoursef.
 * 
 * You might want to create a function that generates the
 * src="" attribute so that species that don’t have pictures
 * use the "unknown.png" image.
 * 
 */

let createFileName = (~species: string): string => {
  switch (species) {
    | "bird"
    | "cat"
    | "dog"
    | "fish" => "images/" ++ species ++ ".png"
    | _ => "images/unknown.png"
  }
};

[@react.component]
let make = (~species, ~name) => {
  let file = createFileName(~species=species);
  <div>
    <img src={file} /> /* Your image source goes in this element */
    <span><br /></span>
    /* Display animal name here */
    {ReasonReact.string(name)}
  </div>
};
