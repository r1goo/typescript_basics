// Variables
const number = 1;
let n: number = 2;

let a = 'hola';
let aaaaa = null;
let b : undefined = undefined

// Funciones
function saludar(name:string){
    console.log("Hola: ", name)
}

saludar("pepe");

// Esto no asigna tipos, sino que renombra las variables.
function saludarObjectWRONG({name: nombre, age: edad}){
    console.log(`Hola ${name}, como estas. Edad ${edad}`);
}

// Forma correcta de hacer la asignacion de tipos
function saludarObjectOK1({name, age} : {name:string, age:number}){
    console.log(`Hola ${name}, como estas. Edad ${age}`);
}
saludarObjectOK1({name:"pepe", age:33})

// Forma correcta de hacer la asignacion de tipos con un objeto.
// Lo malo es que hay que hacer una desectructuracion dentro de la funcion para poder obtener los valores.
function saludarObjectOK2(persona : {name:string, age:number}){
    const {name,age} = persona;
    console.log(`Hola ${name}, como estas. Edad ${age}`);
}

const persona = {name:"pepe", age:66}
saludarObjectOK2(persona);

// El any de las funcion
const sayHiFromFunction = (fn: Function) => {
    fn('Jonny')
}

sayHiFromFunction((name:string) => {
    console.log(`Hola ${name}`);
})

sayHiFromFunction(() => {
    return Math.random()
});

// Tipando el return de mi funcion.
const sayHiFromFunction2 = (fn: (name:string) => void) => {
    fn('Miguel')
}

// Tipar arrow functions
const sumar = (a:number, b:number): number => {
    return a + b;
}

// por un lado el tipo y por el otro la funcion
const restar: (a:number,b:number) => number = (a,b) => {
    return a-b
}

// never
// Caso de uso: Devuelve mensajes de errores.
// Estoy seguro que nunca va a devolver nada
function throwError(message: string): never{
    throw new Error(message);
}

// Inferencia funciones anonimas segun contexto
const avengers = ['spiderman', 'hulk']

avengers.forEach(function (avenger) {
     console.log(avenger.toLocaleLowerCase())
});

// Inferencia en objetos.
let hero = {
    name: 'thor',
    age: 666
};

// No puedo crear propiedades
// hero.power...

function createHero(name:string,age:number){
    return {
        name, age
    }
}

const thor = createHero('Thor',1566)

// TYPE ALIAS
// SIEMPRE EN MAYUSCULA. PASCALCASE
type Hero = {
    readonly id?:HeroId,
    name:string,
    age:number,
    isActive? : boolean
}

// Interception types.
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

// TEMPLATE UNION TYPES
// creacion de tipos para usar dentro de otros tipos
// Nos permite definir la forma que toman nuestros valores
type HeroId = `${string}-${string}-${string}-${string}-${string}`

// COLORES
type HexadecimalColor = `//${string}`

// INVALID COLOR:
// const color: HexadecimalColor = 'ffffff';
const color2: HexadecimalColor = '//ffffff';

// Optionals
type HeroPowerScale = 'local' | 'planetary' | 'galactic'
let ann : number | string

// Return type
// Quiero que me recuperes el tipo de los que devuelve la funcion que tiene el createAdress
function createAddress() {
    return {
        planet: 'Tierra',
        city: 'Barcelona'
    }
}
type Address = ReturnType<typeof createAddress>

// Arrays
// Mal tipado el array
// El se piensa que es un array de type = never.
// const lenguages = []

// const pepe = []
// pepe.push("asd")

const lenguages: string[] = []

lenguages.push('Javascript')
lenguages.push('Javascript')

// Revienta
// lenguages.push(true)

// Array de string o de numbers
const lenguagessPluss: (string|number)[] = []

lenguagessPluss.push('texto puro')
lenguagessPluss.push(666)

// Matrix

type CellValue = 'X' | 'O' | ''
// tupla: Largo fijo.
// indicamos el tamano del array
// array fijos de longitud.

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

// EJEMPLO CON EL RGB

type RGB = [number, number, number]

const black : RGB = [0,0,0]
const white : RGB = [255,255,255]

const coord = [number, number]
const point =  [666,543,666]

// Problema de las tuplas
// podemos hacer un black.push(4) -> quedaria de 4 celdas y se rompe!

type RGB2 = readonly [number, number, number]

///# Enums

// Ejemplo malo.
// Usar una funcion que dependiendo del tipo de valor, haga algo.
// Se mejora usando un enums.

function mostrarMensaje (tipoDeError){
    if (tipoDeError === 'NotFounf'){
        console.log("NOT FOUND")
    }
    else if (tipoDeError === "OTHER_ERROR"){
        console.log("OTHER Fucking ERROR")
    }
}

const ERROR_TYPES = {
    NOT_FOUND: 'Not Found',
    UNAUTHORIZED: 'Unauthorized'
}

function mostrarMensaje2 (tipoDeError : ERROR_){
    if (tipoDeError === 'NotFounf'){
        console.log(ERROR_TYPES.NOT_FOUND)
    }
    else if (tipoDeError === "OTHER_ERROR"){
        console.log(ERROR_TYPES.UNAUTHORIZED)
    }
}

// Comentario.
// Si el enum lo vamos a exportar y lo vamos a usar desde afuera, es mejor usar el const.

//# Aserciones de tipos
const button = document.getElementById('button')
const canvas = document.getElementById('canvas')

// los atributos/propiedades/metodos de cada objeto es diferente.
// Como sabe typescript que estas recuperando un elemento canvas? 
// No funciona en timpo de ejecucion

// Nosotros debemos indicarle de que trata.

// puede devolver un HTMLElement., pero nosotros necesitamos un HTMLElement
// poner la validacion aca, podria ser causa de falla tambien.
const canvas2 = document.getElementById('canvas') as HTMLCanvasElement

// aqui es inferencia, ya que dentro del if el canvas va a poder ser un HTMLCanvasElement.
if (canvas != null && canvas2 instanceof HTMLCanvasElement){
    const ctx = canvas2.getContext('2d'); // <-- ::check
}

// Fetching de datos.

/////// AUTOGENERADO POR QUICKTYPE
export type GitHubAPIResponse = {
    total_count:        number;
    incomplete_results: boolean;
    items:              Item[];
}

export type Item = {
    id:                          number;
    node_id:                     string;
    name:                        string;
    full_name:                   string;
    private:                     boolean;
    owner:                       Owner;
    html_url:                    string;
    description:                 null | string;
    fork:                        boolean;
    url:                         string;
    forks_url:                   string;
    keys_url:                    string;
    collaborators_url:           string;
    teams_url:                   string;
    hooks_url:                   string;
    issue_events_url:            string;
    events_url:                  string;
    assignees_url:               string;
    branches_url:                string;
    tags_url:                    string;
    blobs_url:                   string;
    git_tags_url:                string;
    git_refs_url:                string;
    trees_url:                   string;
    statuses_url:                string;
    languages_url:               string;
    stargazers_url:              string;
    contributors_url:            string;
    subscribers_url:             string;
    subscription_url:            string;
    commits_url:                 string;
    git_commits_url:             string;
    comments_url:                string;
    issue_comment_url:           string;
    contents_url:                string;
    compare_url:                 string;
    merges_url:                  string;
    archive_url:                 string;
    downloads_url:               string;
    issues_url:                  string;
    pulls_url:                   string;
    milestones_url:              string;
    notifications_url:           string;
    labels_url:                  string;
    releases_url:                string;
    deployments_url:             string;
    created_at:                  Date;
    updated_at:                  Date;
    pushed_at:                   Date;
    git_url:                     string;
    ssh_url:                     string;
    clone_url:                   string;
    svn_url:                     string;
    homepage:                    null | string;
    size:                        number;
    stargazers_count:            number;
    watchers_count:              number;
    language:                    Language | null;
    has_issues:                  boolean;
    has_projects:                boolean;
    has_downloads:               boolean;
    has_wiki:                    boolean;
    has_pages:                   boolean;
    has_discussions:             boolean;
    forks_count:                 number;
    mirror_url:                  null;
    archived:                    boolean;
    disabled:                    boolean;
    open_issues_count:           number;
    license:                     License | null;
    allow_forking:               boolean;
    is_template:                 boolean;
    web_commit_signoff_required: boolean;
    topics:                      string[];
    visibility:                  Visibility;
    forks:                       number;
    open_issues:                 number;
    watchers:                    number;
    default_branch:              DefaultBranch;
    score:                       number;
}

export enum DefaultBranch {
    Dev = "dev",
    Main = "main",
    Master = "master",
}

export enum Language {
    HTML = "HTML",
    JavaScript = "JavaScript",
    ObjectiveC = "Objective-C",
    TypeScript = "TypeScript",
}

export type License = {
    key:     string;
    name:    string;
    spdx_id: string;
    url:     null | string;
    node_id: string;
}

export type Owner = {
    login:               string;
    id:                  number;
    node_id:             string;
    avatar_url:          string;
    gravatar_id:         string;
    url:                 string;
    html_url:            string;
    followers_url:       string;
    following_url:       string;
    gists_url:           string;
    starred_url:         string;
    subscriptions_url:   string;
    organizations_url:   string;
    repos_url:           string;
    events_url:          string;
    received_events_url: string;
    type:                Type;
    site_admin:          boolean;
}

export enum Type {
    Organization = "Organization",
    User = "User",
}

export enum Visibility {
    Public = "public",
}
////////////////////////

const API_URL = "https://api.github.com/search/repositories?q=javascript"

const response = await fetch(API_URL);

if (!response.ok){
    throw new Error('Request failed')
}

const dataa = await response.json()

type API_RESPONSE = {
    items: object[]
}
const data = await response.json() as GitHubAPIResponse

// No sabe el tipo de datos, podemos acceder a cualquier fruta, pero no sabe bien
//data.dsfsfsd

const repos = data.items.map(repo => {
 return {
    name: repo.name,
    id: repo.id,
    url: repo.url
 }
})

// INTERFACES

interface Heroe {id: string,
name: string,
age: number,
saludar: () => void
}


interface Producto {
    id: number,
    nombre: string,
    precio: number
}

interface CarritoDeCompras {
    totalPrice: number,
    productos: Producto[]
}

const carrito: CarritoDeCompras = {
    totalPrice: 100,
    productos: [
        {
            id: 1,
            nombre: 'Producto 1',
            precio: 100,
        }
    ]
}

// entender las interfaces
interface Zapatilla extends Producto{
    talla: number
}

//sintaxis 1
interface CarritoOpss {
    add(product: Producto) : void,
    remove(id: number) : void,
    clear(): void
}

//sintaxis 2
interface CarritoOps {
    add:(product: Producto) => void,
    remove: (id: number) => void,
    clear: ()=> void
}

//Narrowing
// cuando es un string podes ver el length
function mostrarLongitud(objeto: number | string){
    if (typeof objeto === 'string'){
        // Aca ya se sabe el tipo de objeto correcto cuando estoy en esta linea.
        return objeto.length
    }
    return objeto.toString().length
}

mostrarLongitud('1')

// Ejemplo avanzado

interface Mario {
    company: 'nintendo',
    nombre: string,
    saltar: () => void,
}

interface Sonic {
    company: string,
    nombre: string,
    correr: () => void
}

type Personaje = Mario | Sonic

function jugarr(Personaje: Personaje){
    console.log(persona.name)
}


//typeguard
// dejame comprobar si perosnaje es sonic y esta funcion determina si o no
function checkIsSonic(personaje: Personaje): personaje is Sonic {
    return (personaje as Sonic).correr === undefined
}


function jugar(personaje: Personaje){
    if (checkIsSonic(personaje)){
        personaje.correr()
    }
}
