
<h1>Links de interes</h1>
https://www.youtube.com/watch?v=L1ZSk-vPVKI
https://www.markdownguide.org/basic-syntax/


# Variables
const number = 1;
let n: number = 2;

let a = 'hola';
let aaaaa = null;
let b : undefined = undefined

# Funciones
function saludar(name:string){
    console.log("Hola: ", name)
}

saludar("pepe");

# Esto no asigna tipos, sino que renombra las variables.
function saludarObjectWRONG({name: nombre, age: edad}){
    console.log(`Hola ${name}, como estas. Edad ${edad}`);
}

# Forma correcta de hacer la asignacion de tipos
function saludarObjectOK1({name, age} : {name:string, age:number}){
    console.log(`Hola ${name}, como estas. Edad ${age}`);
}
saludarObjectOK1({name:"pepe", age:33})

# Forma correcta de hacer la asignacion de tipos con un objeto.
# Lo malo es que hay que hacer una desectructuracion dentro de la funcion para poder obtener los valores.
function saludarObjectOK2(persona : {name:string, age:number}){
    const {name,age} = persona;
    console.log(`Hola ${name}, como estas. Edad ${age}`);
}

const persona = {name:"pepe", age:66}
saludarObjectOK2(persona);

# El any de las funcion
const sayHiFromFunction = (fn: Function) => {
    fn('Jonny')
}

sayHiFromFunction((name:string) => {
    console.log(`Hola ${name}`);
})

sayHiFromFunction(() => {
    return Math.random()
});

# Tipando el return de mi funcion.
const sayHiFromFunction2 = (fn: (name:string) => void) => {
    fn('Miguel')
}

# Tipar arrow functions
const sumar = (a:number, b:number): number => {
    return a + b;
}

# por un lado el tipo y por el otro la funcion
const restar: (a:number,b:number) => number = (a,b) => {
    return a-b
}

# **never**
# Caso de uso: Devuelve mensajes de errores.
# Estoy seguro que nunca va a devolver nada
function throwError(message: string): never{
    throw new Error(message);
}

# Inferencia funciones anonimas segun contexto
const avengers = ['spiderman', 'hulk']

avengers.forEach(function (avenger) {
     console.log(avenger.toLocaleLowerCase())
});

# Inferencia en objetos.
let hero = {
    name: 'thor',
    age: 666
};

# No puedo crear propiedades
# hero.power...

function createHero(name:string,age:number){
    return {
        name, age
    }
}

const thor = createHero('Thor',1566)

# TYPE ALIAS
# SIEMPRE EN MAYUSCULA. PASCALCASE
type Hero = {
    readonly id:HeroId,
    name:string,
    age:number,
    isActive? : boolean
}

# Interception types.
type HeroBasicInfo = {
    readonly id:HeroId,
    name:string,
    age:number
}

type HeroProperties = {
    readonly
}

function createHeroWithType (name:string,age:number): Hero{
    return {
        id: crypto.randomUUID(),name, age
    }
}

function createHeroWithObject(input: HeroBasicInfo): Hero {
    const {name,age,id} = input
    return {id, name, age, isActive: true}
}

# TEMPLATE UNION TYPES
# creacion de tipos para usar dentro de otros tipos
type HeroId = `${string}-${string}-${string}-${string}-${string}`

# COLORES
type HexadecimalColor = `#${string}`

# INVALID COLOR:
# const color: HexadecimalColor = 'ffffff';
const color2: HexadecimalColor = '#ffffff';

# Optionals
type HeroPowerScale = 'local' | 'planetary' | 'galactic'
let ann : number | string

# Return type
# Quiero que me recuperes el tipo de los que devuelve la funcion que tiene el createAdress
function createAddress() {
    return {
        planet: 'Tierra',
        city: 'Barcelona'
    }
}
type Address = ReturnType<typeof createAddress>

# Arrays
# Mal tipado el array
# const lenguages = []

const lenguages: string[] = []

lenguages.push('Javascript')
lenguages.push('Javascript')

# Revienta
# lenguages.push(true)

# Array de string o de numbers
const lenguagessPluss: (string|number)[] = []

lenguagessPluss.push('texto puro')
lenguagessPluss.push(666)

# Matrix

type CellValue = 'X' | 'O' | ''
# tupla: Largo fijo.

type GameBoard = [
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue]
]
const gameBoard: GameBoard = [
    ['X', 'O' , 'O'],
    ['O', 'X' , ''],
    ['',  'O' , 'X']
]
