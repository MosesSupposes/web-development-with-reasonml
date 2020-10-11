/**
 * Destrucuting variants
 */

type score =
  | Score(int);

type percent =
  | Percent(float);

let calcPercent = (score: score, max: score): percent => {
  let Score(s) = score; // destructure the score variable into 's'
  let Score(m) = max; // destructure the max variable into 'm'
  Percent(float_of_int(s) /. float_of_int(m) *. 100.0);
};
