let age: ref(int) = ref(22);

let birthday = (a: ref(int)): unit => {
  a := a^ + 1;
};

birthday(age);
Js.log(age^); // 23
// This is the same as above
Js.log(age.contents); // 23
