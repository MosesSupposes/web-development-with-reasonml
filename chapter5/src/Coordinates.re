type coord = (float, float);

let distance = (p0: coord, p1: coord): float => {
  let (x0, y0) = p0;
  let (x1, y1) = p1;
  sqrt((x0 -. x1) ** 2.0 +. (y0 -. y1) ** 2.0);
};

let startPoint = (3.5, 4.6);
let endPoint = (0.5, 9.6);
let result = distance(startPoint, endPoint);
Js.log(result);
