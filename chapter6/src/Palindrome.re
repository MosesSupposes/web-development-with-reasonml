let rec isPalindrome = (s: string): bool => {
  let len = Js.String.length(s);
  if (len <= 1) {
    true;
  } else if (Js.String.get(s, 0) != Js.String.get(s, len - 1)) {
    false;
  } else {
    isPalindrome(Js.String.slice(~from=1, ~to_=len - 1, s));
  };
};

Js.log(isPalindrome("civic")); // true
Js.log(isPalindrome("deed")); // true
Js.log(isPalindrome("runner")); // false

// this is inneficient
let repeatWithReduce = (s: string, n: int): string => {
  Belt.Array.reduce(
    Belt.Array.range(0, n - 1), "", (accumulator: string, _item: int) => {
    accumulator ++ s
  });
};

let rec repeatRec = (s: string, accumulator: string, n: int) => {
  switch (n) {
  | 0 => accumulator
  | _ => repeatRec(s, accumulator ++ s, n - 1)
  };
};

Js.log(repeatRec("ha", "", 4)); // hahahaha

// Does it bother you that you have to provide the empty string as a starting value of the accumulator? Would you rather have just two parameters as in the first version that used reduce? You can do that by wrapping a version of repeatRec in a two-argument function:
let repeat = (s: string, n: int) => {
  let rec repeatHelper = (accumulator: string, counter: int): string => {
    switch (counter) {
    | 0 => accumulator
    | _ => repeatHelper(accumulator ++ s, counter - 1)
    };
  };
  repeatHelper("", n);
};

Js.log(repeat("ha", 4)); // hahahaha
// This technique of making the recursive function a “helper” function and wrapping it in a more appealing interface is a very common technique in functional programming.

let testString = repeat("a", 50000);
// let rec repeatTest = (n: int, accumulatedTime: float): float => {
//   switch (n) {
//   | 0 => accumulatedTime
//   | _ =>
//     let startTime = Js.Date.now();
//     let _ = isPalindrome(testString);
//     let endTime = Js.Date.now();
//     repeatTest(n - 1, accumulatedTime +. (endTime -. startTime));
//   };
// };
let repeatTest = (n: int): float => {
  let rec repeatTestHelper = (tries: int, accumulatedTime: float): float => {
    switch (tries) {
    | 0 => accumulatedTime
    | _ =>
      let startTime = Js.Date.now();
      let _ = isPalindrome(testString);
      let endTime = Js.Date.now();
      repeatTestHelper(tries - 1, accumulatedTime +. (endTime -. startTime));
    };
  };
  repeatTestHelper(n, 0.0);
};

let totalTime = repeatTest(1000);
Js.log2("Average time in seconds: ", totalTime /. 1000.0);
