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

  // We can also return a new function here, that will replace the original function.
  // This is really powerful because not only you can change the original method,
  // you can add a new behavior after/before the method is called, like writing something
  // to a file, making an http request and so on...
  // And because the target refers to the unchanged version of the function, the binding we did
  // previously will not work because it refers to the context, which happens after.
  // The workaround is to use the apply() method after the target. It will open a window to pass a context
  // to the function being called before actually calling it.
  // return function (this: any) {
  // console.log('Executing original function')
  // target.apply(this);
  // }
}

//  To attach a decorator to a target, use the @ symbol without calling the function, There's a way to
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
