---
title: "From OOP to Go"
date: "2023-01-29"
description: "Understand Go from OOP perspective"
subject: ["go", "oop"]
---

#### Creating an Object

You create an object in go by defining a struct type and creating an instance of that struct.

```go
type Person struct {
    Name string
    Age int
}

func main() {
    p := Person{Name: "John", Age: 30}
    fmt.Println(p)
}

```

Alternative ways to create an instance:

```go
p := Person{"John", 30}
```

Or,

```go
p := new(Person)
```

This creates a pointer to a new instance of the struct and initialises all fields to their zero or default value. Equivalent to:

```go
p := &Person{}
```

Example of default values for different data types:

```
int : 0
float : 0.0
bool: false
string: ""
struct: all its fields are set to their zero values
pointer: nil
slice: nil
map: nil
chan: nil
```

#### Encapsulation

Bundling of data along with its methods in a single unit to restrict direct access of fields and methods is encapsulation.
Encapsulation is achieved by using access modifiers such as "private", "protected", and "public" to control access to the
fields and methods of a class in pure OOP language like Java. It is slightly different in go.

By convention, fields and methods that start with an uppercase letter are considered public and can be
accessed by any code, while fields and methods that start with a lowercase letter are considered private
and can only be accessed within the same package. It's worth noting that this is a convention and is not enforced
by the Go compiler.

```go
type BankAccount struct {
	accountNumber string
	balance       float64
}

func (b *BankAccount) Deposit(amount float64) {
	b.balance += amount
}

func (b *BankAccount) Withdraw(amount float64) {
	if b.balance >= amount {
		b.balance -= amount
	}
}

func (b *BankAccount) Balance() float64 {
	return b.balance
}
```

##### Reference:

- [Methods and Receivers](https://gobyexample.com/methods)

#### Abstraction

Hiding unnecessary details to reduce complexity and focus on essential features only is abstraction.
For example, When making coffee, we only care about providing coffee, water, milk etc to the coffee machine
and don’t care about how the machine prepares the specified type of coffee.

```go
package main

import "fmt"

type Coffee interface {
	Get(coffeeType string)
}

type CoffeeMachine struct {
	waterQuantity  int
	milkQuantity   int
	coffeeQuantity int
}

func (c *CoffeeMachine) Get(coffeeType string) {
	fmt.Println("Here's your coffee.")
}

func GetCoffee(v Coffee) {
	v.Get("Espresso")
}

func main() {
	machine := CoffeeMachine{waterQuantity: 100, milkQuantity: 150, coffeeQuantity: 2000}
	GetCoffee(&machine)
}
```

Here, CoffeMachine struct implements Coffee interface and GetCoffee function only needs to know that it can get
coffee and not how coffee is prepared.

#### Inheritance

Composition or struct embedding can be used to emulate inheritance in go.

If a struct includes another struct as an anonymous field then it’s struct embedding. The embedded struct
is flattened into the outer struct, and it's not possible to distinguish between fields and methods that belong
to the outer struct and those that belong to the embedded struct.

```go
package main

import "fmt"

type Parent struct {
	Name string
}

func (p *Parent) PrintName() {
	fmt.Println(p.Name)
}

type Child struct {
	Parent // struct embedding
	Age    int
}

func main() {
	c := &Child{Parent{"John"}, 10}
	c.PrintName() // prints "John"
}
```

On the other hand, if a struct includes a field that references another struct, then it's a composition.

```go
package main

import "fmt"

type Animal struct {
	Name string
}

func (a *Animal) Speak() {
	fmt.Println(a.Name, "says hello")
}

type Dog struct {
	an Animal
}

func (d *Dog) WagsTail() {
	fmt.Println(d.an.Name, "wags tail")
}

func main() {
	d := &Dog{Animal{Name: "Kuro"}}
	d.an.Speak() // Kuro says hello
	d.WagsTail() // Kuro wags tail
}
```

#### Polymorphism

Polymorphism is the ability of an object to take on multiple forms. In object-oriented programming,
it refers to the ability of a single function or method to operate on multiple types of data. This allows
for more generic and reusable code, as well as more flexible and extensible systems.

In Go, polymorphism is achieved through interfaces. An interface is a type that defines a set of methods.
Any struct that implements those methods is said to implement the interface, and can be treated as an instance
of the interface type.

Here's an example of how to define an interface and have different structs implement it:

```go
package main

import (
	"fmt"
	"math"
)

type Shape interface {
	Area() float64
}

type Rectangle struct {
	Width, Height float64
}

func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

type Circle struct {
	Radius float64
}

func (c Circle) Area() float64 {
	return math.Pi * c.Radius * c.Radius
}

func main() {
	var s Shape = Rectangle{5, 10}
	fmt.Println(s.Area()) // prints "50"
	s = Circle{10}
	fmt.Println(s.Area()) // prints "314.1592653589793"
}
```

In the above example, the Shape interface defines an Area() method. The Rectangle and Circle structs each implement
this method in their own way, but both can be assigned to the variable s of type Shape, because both structs implements
the Area() method which is defined in the Shape interface. This is polymorphism in action, where one function
(in this case the Area() method) can operate on multiple types of data (in this case the Rectangle and Circle structs).

Another way to achieve polymorphism is to use a function that takes an interface as an argument, and can operate on any
struct that implements that interface. Here's an example:

```go
package main

import "fmt"

func printArea(s Shape) {
	fmt.Println(s.Area())
}

func main() {
	r := Rectangle{5, 10}
	c := Circle{10}
	printArea(r) // prints "50"
	printArea(c) // prints "314.1592653589793"
}
```
