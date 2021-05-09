# RS SCHOOL - Node.js - Task 1 Caesar cipher CLI tool

Caesar cipher CLI tool is a tool that encodes and decodes a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher).

## Installation

- Clone (or fork and then clone) this repo to your computer
- Go to the project's folder
- Intall **node_modules** running the following command on your terminal

```shell
$ npm install
```
*Note:* If you are checking the task: *Caesar cipher CLI tool*, you can find all the functional code on the branch **caesar-cipher-cli**

---

## Get started

There are 2 ways to use the program on the command line:

1. Invoking directly the main file (in this case *index.js*) **from the project's folder** with this command


```shell
$ node index.js [options]
```

2. Using the programm's name **my_caesar_cli**

For this second way, you need to run before the following command **from the project's folder**

```shell
$ sudo npm install -g .
```
After this the programm **can run globally, from any folder**

```shell
$ my_caesar_cli [options]
```
---

## Options

CLI tool accepts 4 options (short alias or full name):

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

The *shift* and the *action* are required. The *input* and the *output* files can be omited. In this case you will see the result on the command line.

To stop the tool just press Ctrl+C.

*Note:* If you want to have an output on a file, and you are running the tool not from the project's folder, you may need to specify the path to the file.



---

## Usage examples

1. _-a (--action)_ is **encode**

```bash
$ my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```
> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

```bash
$ my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
```
> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

2. _-a (--action)_ is **decode**  
_Decoding encoded initial string with the same -s(--shift) number produces the initial string._

```bash
$ my_caesar_cli --action decode --shift 7 --input encoded.txt --output plain.txt
```

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

> plain.txt
> `This is secret. Message about "_" symbol!`

3. _Negative shift handling_

```bash
$ my_caesar_cli --action encode --shift -1 --input plain.txt --output encoded.txt
```

> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!`
