// // number
// function number(a = 10){
//     console.log(a *10);
// }
// number()

// //string
// function string(b = "hello"){
//     console.log(b.concat(" world"));
// }
// string()

// //boolean
// function boolean(c = true){
//  if(c = 1){
//     console.log("hello abhishek")
//  }
// }
// boolean()

// //null
// function  Null(d = null){
//     console.log(d)
// }
// Null()


// //undefined
// function Undefined(e){
//     console.log(e);
// }
// Undefined()


// //array
// function array1(arr = [10, 20, 30]){
//     console.log(arr)
// }
// array1()


// //object
// function object(obj = {
//     user: "abhishek",
//     age: 20
// }){
//     console.log(obj);
    
// }
// object()


// // return datatype
// function number1(num){
//     return num+1;
// }
// console.log(number1(55))

// let hello = "hello world"; 
// function string1(str){
//     return str.concat(" world");
// }
// console.log(string1("hello"))

// function boolean1(boo){
//  if(boo = true){
//     console.log("hello abhishek");
//  }
// }
// boolean1(true)

// function Null1(d){
//     return d;
// }
// console.log(Null1(null));


// function Undefined1(f){
//     return f;
// }
// console.log(Undefined1());

// function array(brr){
//     return brr;
// }
// console.log(array([10,20,30,40]));



// function obj1(obj2){
//     return obj2;
// }
// console.log(obj1({user1: "abhishek", age: 21}));


let arr = [1,2,3,4,5]
// function sumofarray(arr){
//     let sum = 0;
//     for(let i = 0; i < arr.length; i++){
//         sum = sum + arr[i]
//     }
//     return sum
// }
// let res = sumofarray(arr)
// console.log(res)

function largest (arr){
    let largest = arr[0]
    for(let i = 1; i < arr.length ; i++){
        if(arr[i] > largest){
            largest = arr[i]
        }
    }
    return largest;
}
console.log(largest(arr))



function smallest (arr){
    let smallest = arr[0]
    for(let i = 1; i < arr.length ; i++){
        if(arr[i] < smallest){
            smallest = arr[i]
        }
    }
    return smallest;
}
console.log(smallest(arr))



