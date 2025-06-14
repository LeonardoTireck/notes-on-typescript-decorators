// CODE THAT INTERACTS WITH OTHER CODE -> METAPROGRAMMING
// Decorators are functions you can attach to elements of OOP (classes, methods, properties...)
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
function logger(target, context) {
    // It takes two arguments. The target of the decorator as the first, and the extra context of
    // the target.
    console.log("Class logger decorator");
    console.log(target);
    console.log(context);
    // We can also implement a return statement on the decorator, so that it
    // may return a new class for example:
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            console.log("Class constructor");
            console.log(_this);
            return _this;
        }
        return class_1;
    }(target));
    // But to do this, we need to be more specific about the type of the target in the logger
    // function. And we can do that by using generics and passing the target type
    // as a new class.
}
// Now let's try the same with a decorator for a method:
// The goal is to create a decorator that will bind the context of the instance to the method.
function autobind(target, context) {
    context.addInitializer(function () {
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
// Now I'll do a decorator for a field, also called property.
// the target in this case needs to be undefined because the decorator will always
// run before the property gets initialized.
function addTireckToField(target, context) {
    console.log(target); // Undefined
    console.log(context);
    // Like always, I can return a new value for that field, after or before doing
    // something with it's value.
    return function (initialValue) {
        console.log(initialValue);
        return "".concat(initialValue, " Tireck");
    };
}
// Now imagine you want to pass dynamic values to the decorator in it's pointer (@)
// The way to do that is to wrap the decorator function inside another function,
// and use that to pass a parameter.
function addAfterField(stringToAdd) {
    return function addAfterFieldDecorator(target, context) {
        return function (initialValue) {
            return "".concat(initialValue, " ").concat(stringToAdd);
        };
    };
}
//  To attach a decorator to a target, use the @ symbol without calling the function, There's a way to
//  pass arguments to this decorator function that I will explore later.
var Person = function () {
    var _classDecorators = [logger];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _greet_decorators;
    var Person = _classThis = /** @class */ (function () {
        function Person_1() {
            this.name = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _name_initializers, "Leo"));
            __runInitializers(this, _name_extraInitializers);
        }
        Person_1.prototype.greet = function () {
            console.log("Hi my name is ".concat(this.name));
        };
        return Person_1;
    }());
    __setFunctionName(_classThis, "Person");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [addAfterField("Tireck")];
        _greet_decorators = [autobind];
        __esDecorate(_classThis, null, _greet_decorators, { kind: "method", name: "greet", static: false, private: false, access: { has: function (obj) { return "greet" in obj; }, get: function (obj) { return obj.greet; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Person = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Person = _classThis;
}();
// now we can instantiate a new Person, and that object should have the property name.
var leo = new Person();
var leoSayingHi = leo.greet;
var lara = new Person();
leoSayingHi(); // This works because the context was successfully bound through the decorator.
