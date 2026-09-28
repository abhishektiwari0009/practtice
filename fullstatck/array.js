const user = {
    name: "Abhishek",
    age: 21,
    height: 178,

    f() {
    return this.name;
}
}

console.log(user.f())