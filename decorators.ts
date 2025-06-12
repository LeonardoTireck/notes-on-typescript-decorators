// CODE THAT INTERACTS WITH OTHER CODE -> METAPROGRAMMING
// Decorators are functions you can attach to elements of OOP (classes, methods, properties...)

function logger<T extends new (...args: any[]) => any>(
  target: T,
  context: ClassDecoratorContext,
) {
  // It takes two arguments. The target of the decorator as the first, and the extra context of
  // the target.
  console.log("Class logger decorator");
  console.log(target);
  console.log(context);
  // We can also implement a return statement on the decorator, so that it
  // may return a new class for example:
  return class extends target {
    constructor(...args: any[]) {
      super(...args);
      console.log("Class constructor");
      console.log(this);
    }
  };
  // But to do this, we need to be more specific about the type of the target in the logger
  // function. And we can do that by using generics and passing the target type
  // as a new class.
}

// Now let's try the same with a decorator for a method:
// The goal is to create a decorator that will bind the context of the instance to the method.
function autobind(
  _target: (...args: any[]) => any,
  context: ClassMethodDecoratorContext,
) {
  context.addInitializer(function (this: any) {
    this[context.name] = this[context.name].bind(this);
  });
}

//  To attach a decorator to a target, use the @ simbol without calling the function, There's a way to
//  pass arguments to this decorator function that I will explore later.
@logger
class Person {
  name = "Leo";

  @autobind
  greet() {
    console.log(`Hi my name is ${this.name}`);
  }
}

// now we can instantiate a new Person, and that object should have the property name.
const leo = new Person();
const leoSayingHi = leo.greet;
const lara = new Person();
leoSayingHi(); // This works because the context was successfully bound through the decorator.
