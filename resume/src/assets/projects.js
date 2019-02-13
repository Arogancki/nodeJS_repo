const path = require('path')
    , tags = require('./tags')
    , fs = require('fs-extra')
    , config = require('../config')
    , { log } = require('../helpers/log')

const projects = createImageLinks([{
    title: "Master thesis",
    desc: "My master thesis \"A comparative analysis of selected frameworks of Node.js technology\" containing practices and methods comparison and example application implementation in Express, Sails, Meteor frameworks.",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/Master%20thesis",
    tags: [tags.javaScript, tags.nodeJs, tags.express, tags.meteor, tags.sails, tags.bootstrap, tags.mongodb, tags.html, tags.css]
}, {
    title: "Resume",
    desc: "A project representing my skils, experience and sympathy to programming",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/resume",
    tags: [tags.javaScript, tags.nodeJs, tags.express, tags.bootstrap, tags.sass, tags.html, tags.css]
}, {
    title: "Task manager",
    desc: "An Aplication created during writing my engineer's degree studies for task managing in organized teams. It provides clean interface and smooth communication between team members.",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/Task%20manager",
    tags: [tags.javaScript, tags.nodeJs, tags.express, tags.angular, tags.react, tags.html, tags.css, tags.mongodb]
}, {
    title: "WebSync chat",
    desc: "A global text chat made on webRTC standart.",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/chat",
    tags: [tags.javaScript, tags.nodeJs, tags.angular, tags.typeScript, tags.html, tags.sass, tags.cSharp]
}, {
    title: "Face recognition",
    desc: "A simple library recognizing people on images using external Microsoft cognitive API.",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/faceRecognition",
    tags: [tags.javaScript]
}, {
    title: "My npm avid account",
    desc: "A collection of my shared libraries in npm service, made during my work in Avid Poland.",
    github: "https://www.npmjs.com/~artur.ziemba.avid",
    tags: [tags.npm, tags.javaScript]
}, {
    title: "My npm private account",
    desc: "A collection of my shared libraries in npm service.",
    github: "https://www.npmjs.com/~arogancki",
    tags: [tags.npm, tags.javaScript]
}, {
    title: "Video chat",
    desc: "A video chat made with Cisco Frozen Mountain library on webRTC standart.",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/react%20webex%20integration",
    tags: [tags.react, tags.javaScript, tags.html, tags.css]
}, {
    title: "VS code extension",
    desc: "An extension for vs code for adding any web application (client or service).",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/vscode%20extension",
    tags: [tags.javaScript, tags.nodeJs, tags.express, tags.react]
}, {
    title: "watcher",
    desc: "A service following changes on any web service.",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/watcher",
    tags: [tags.javaScript, tags.nodeJs]
}, {
    title: "weather app",
    desc: "A weather forecast applications which adjust application background to current wheather. It uses external APIs for checking the weather and finding suitable images.",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/weather%20app",
    tags: [tags.javaScript, tags.nodeJs, tags.mongodb, tags.express]
}, {
    title: "Volume of any shape calculator",
    desc: "An application that calculates and visualizes a volume of any geometric shape with The Monte Carlo algorithm and cubes method.",
    github: "https://github.com/Arogancki/Computational-mathematics",
    tags: [tags.ccpp, tags.algorithms, tags.openGl, tags.oop]
}, {
    title: "bash",
    desc: "My simple scripts made during studying bash console.",
    github: "https://github.com/Arogancki/scripts",
    tags: [tags.bash, tags.algorithms]
}, {
    title: "IoT simulator",
    desc: "A IoT environment simulator. It creates and communicates devices in a common network using IoT communication standards.",
    github: "https://github.com/Arogancki/C-dot.net-Thread-IoT-simulation",
    tags: [tags.cSharp, tags.oop]
}, {
    title: "Simple spring app",
    desc: "Example Java Spring server",
    github: "https://github.com/Arogancki/Spring",
    tags: [tags.spring, tags.java, tags.sql]
}, {
    title: "Notes player",
    desc: "An application which connects to sound card and plays input text files containing music notes.",
    github: "https://github.com/Arogancki/MFC-notes-player",
    tags: [tags.ccpp, tags.oop]
}, {
    title: "Geometry soldiers",
    desc: "A computer 3d shooter game, made for Szczecin Gamedev Talents competition. It provides two different game modes, different character classes, smart enemies and level gaining. It earned the third place in the competion.",
    github: "https://github.com/Arogancki/OpenGL-game-Geometry-Soldiers",
    tags: [tags.ccpp, tags.oop, tags.openGl]
}, {
    title: "my compilator MKlab",
    desc: "A c-like language compilator. It provides basic arithmetic operations, loops, conditional statements, memory managment, functions, structures, static and dynamic arrays.",
    github: "https://github.com/Arogancki/my_compilator_mklab",
    tags: [tags.ccpp, tags.oop, tags.algorithms]
}, {
    title: "MOS device simulator",
    desc: "A simple MOS device simulator communicating by TCP/IP sockets.",
    github: "https://github.com/Arogancki/mos_device_simulation",
    tags: [tags.java, tags.networking, tags.oop]
}, {
    title: "java SE console apps",
    desc: "Simple console applications made during studying java (standard edition).",
    github: "https://github.com/Arogancki/java",
    tags: [tags.java, tags.oop]
}, {
    title: "workers list",
    desc: "A workers list managment application. It exchanges data with peers by different communication strategies (JDBC, TCP/IP, RMI, JNDI, JAXB, JAXWS).",
    github: "https://github.com/Arogancki/java/tree/master/worker%20list",
    tags: [tags.java, tags.oop, tags.networking, tags.sql]
}, {
    title: "dining philosophers problem",
    desc: "A multi-agent application in JADE environment showing dining philosophers problem.",
    github: "https://github.com/Arogancki/java/tree/master/jade/my%20projects/Dining%20philosophers%20problem",
    tags: [tags.java]
}, {
    title: "matrixes",
    desc: "A multi-agent application in JADE environment presenting communication between a service provider and clients",
    github: "https://github.com/Arogancki/java/tree/master/jade/my%20projects/Matrixes",
    tags: [tags.java]
}, {
    title: "big data and machine learning",
    desc: "Scripts using big data algorithms in order to conclude and present data from huge data bases and algorithms of machine learning automating processes of selected problems.",
    github: "https://github.com/Arogancki/big-data-and-machine-learning",
    tags: [tags.bigData, tags.python, tags.machineLearning, tags.matlab]
}, {
    title: "safety documents exchange",
    desc: "My work on project consisting of creating web application for safety documents exchange with Diffie Hellman algorithm. In the project I was responsible for the whole backend, integration with UI and providing runtime and deploying environment. The most significant pressure was around application safety.",
    github: "https://github.com/Arogancki/safety-documents-exchange/tree/master/app",
    tags: [tags.javaScript, tags.nodeJs, tags.react, tags.bootstrap, tags.express, tags.css, tags.html]
}, {
    title: "my node.js multithreading library",
    desc: "An application presenting capabilities of my node.js multithreading library - creating, synchronization, termination of threads working on common problem.",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/parallel%20programming",
    tags: [tags.javaScript, tags.nodeJs, tags.html, tags.css, tags.express]
}, {
    title: "remindMeNear",
    desc: "An application that sends alerts when a user is near a certain place.",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/mapReminder",
    tags: [tags.javaScript, tags.nodeJs, tags.html, tags.css, tags.express, tags.dynamodb]
}, {
    title: "Shoot targets",
    desc: "A computer 3d shooter game where a player's goal is to shoot the highest number of targets.",
    github: "https://github.com/Arogancki/OpenGl-Projects/tree/master/collect%20stars%20Opengl",
    tags: [tags.ccpp, tags.oop, tags.openGl]
}, {
    title: "Pendulum simulator",
    desc: "A simulator of physical pendulum and double pendulum.",
    github: "https://github.com/Arogancki/OpenGl-Projects/tree/master/pendulum%20simulation%20OpenGl",
    tags: [tags.ccpp, tags.oop, tags.openGl, tags.algorithms]
}, {
    title: "Dynamic random labirynth game",
    desc: "A computer game where a player needs to find all hiden items in randomly generated labirynth.",
    github: "https://github.com/Arogancki/OpenGl-Projects/tree/master/rand%20dynamic%20labirynth%20Open%20gl",
    tags: [tags.ccpp, tags.oop, tags.openGl, tags.algorithms]
}, {
    title: "Crawler",
    desc: "A simple web pages crawler.",
    github: "https://github.com/Arogancki/network_programming/tree/master/Crawler",
    tags: [tags.java, tags.networking]
}, {
    title: "FTP client",
    desc: "An FTP client getting data from any FTP server.",
    github: "https://github.com/Arogancki/network_programming/tree/master/FTPclient",
    tags: [tags.java, tags.networking]
}, {
    title: "POP3 client",
    desc: "An email client that communicates with any POP3 service.",
    github: "https://github.com/Arogancki/network_programming/tree/master/Pop3",
    tags: [tags.java, tags.networking]
}, {
    title: "SMTP client",
    desc: "A SMTP client that communicates with any SMTP service.",
    github: "https://github.com/Arogancki/network_programming/tree/master/SMTP",
    tags: [tags.java, tags.networking]
}, {
    title: "Base 64 conventer",
    desc: "A any file to base 64 conventer.",
    github: "https://github.com/Arogancki/network_programming/tree/master/base64",
    tags: [tags.java, tags.networking]
}, {
    title: "Dynamic table",
    desc: "A data structure implementation - dynamic table.",
    github: "https://github.com/Arogancki/data-structures-and-algorithm/blob/master/Dynamic%20Table.c",
    tags: [tags.ccpp, tags.algorithms]
}, {
    title: "Doubly linked list",
    desc: "A data structure implementation - doubly linked list.",
    github: "https://github.com/Arogancki/data-structures-and-algorithm/blob/master/Lista%20dwukierunkowa.c",
    tags: [tags.ccpp, tags.algorithms]
}, {
    title: "Min-Max heap",
    desc: "A data structure implementation - min-max heap.",
    github: "https://github.com/Arogancki/data-structures-and-algorithm/blob/master/minmax%20heap.cpp",
    tags: [tags.ccpp, tags.algorithms]
}, {
    title: "Dijkstra vs A*",
    desc: "Execution times and results comparison achieved by implemented algorithms of finding the shortest path - Dijkstra's and A*.",
    github: "https://github.com/Arogancki/data-structures-and-algorithm/blob/master/Dijkstra%20vs%20Astar.cpp",
    tags: [tags.ccpp, tags.algorithms]
}, {
    title: "BST tree (DSW algorithm)",
    desc: "A data structure implementation - bst tree with DWS balancing algorithm.",
    github: "https://github.com/Arogancki/data-structures-and-algorithm/blob/master/BST%2BDSW.cpp",
    tags: [tags.ccpp, tags.algorithms]
}, {
    title: "AVL tree",
    desc: "A data structure implementation - AVL tree.",
    github: "https://github.com/Arogancki/data-structures-and-algorithm/blob/master/AVL.cpp",
    tags: [tags.ccpp, tags.algorithms]
}, {
    title: "Game of Life",
    desc: "An implementation of Conway's game of life on a few competing threads. It generates .gif file with game animation.",
    github: "https://github.com/Arogancki/all-c/tree/master/Game%20of%20Life",
    tags: [tags.ccpp, tags.oop, tags.algorithms]
}, {
    title: "Labirynth console game",
    desc: "A console game where a player needs to defeat a in background working thread in going through randomly generated labirynth.",
    github: "https://github.com/Arogancki/all-c/tree/master/Dynamic%20Random%20Labirynth%20build",
    tags: [tags.ccpp, tags.oop, tags.algorithms]
}, {
    title: "Hamming code",
    desc: "A Hamming code (7.4) coder and decoder implementation.",
    github: "https://github.com/Arogancki/all-c/blob/master/hamming%20code%20(bit%20verison%207%204%20)/ConsoleApplication3.cpp",
    tags: [tags.ccpp, tags.algorithms]
}, {
    title: "Linux socket communicator",
    desc: "A console application, simple comunicator to chat between linux users.",
    github: "https://github.com/Arogancki/all-c/tree/master/linux%20programing/communicator",
    tags: [tags.ccpp, tags.networking]
}, {
    title: "Linux brute force",
    desc: "A script that uses a brute force technique in order to match the password from a input file to system users.",
    github: "https://github.com/Arogancki/all-c/tree/master/linux%20programing/password%20hacking",
    tags: [tags.ccpp, tags.networking]
}, {
    title: "Static file server",
    desc: "A file sharing server that works on TCP/IP socket",
    github: "https://github.com/Arogancki/all-c/tree/master/advanced%20c%23/2/Server",
    tags: [tags.cSharp, tags.networking]
}, {
    title: "Face recognition matlab",
    desc: "A script which finds faces on images.",
    github: "https://github.com/Arogancki/matlab/blob/master/face%20recognition/Untitled.m",
    tags: [tags.matlab, tags.algorithms]
}, {
    title: "Genetic algorithm",
    desc: "A script solving a Knapsack problem with a genetic algorithm.",
    github: "https://github.com/Arogancki/matlab/tree/master/genetic%20algorithm",
    tags: [tags.matlab, tags.algorithms, tags.machineLearning]
}, {
    title: "Image processing - edge detection",
    desc: "A script which finds edges on images.",
    github: "https://github.com/Arogancki/matlab/tree/master/image%20processing/Edge%20detection",
    tags: [tags.matlab, tags.algorithms]
}, {
    title: "Image processing - circle detection",
    desc: "A script which finds circles on images.",
    github: "https://github.com/Arogancki/matlab/tree/master/image%20processing/circle%20detection",
    tags: [tags.matlab, tags.algorithms]
}])

function createImageLinks(obj){
    obj.forEach((v)=>{
        v.img = path.join('/', 'images', 'projects', `${v.title.toLowerCase().replace('*', '')}.png`)
        fs.exists(path.join(config.APP_PUBLIC, v.img)).then(exists=>{
            if (!exists){
                log(`Img for project "${v.title}" not found`)
            }
        })
    })
    return obj
}

(function checkIfAllTagsAreUsed(){
    Object.values(tags).forEach(tag=>{
        if (!projects.find(project=>project.tags.includes(tag))){
            throw new Error(`Tag ${tag} is not used!!`)
        }
    })
})();

module.exports = Object.freeze(projects)