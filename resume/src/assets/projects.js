const path = require('path')
    , tags = require('./tags')

const projects = createImageLinks([{
    title: "Master thesis",
    desc: ", sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/Master%20thesis",
    tags: [tags.javaScript, tags.nodeJs, tags.express, tags.meteor, tags.sails, tags.bootstrap, tags.mongodb, tags.html, tags.css]
}, {
    title: "Resume",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/resume",
    tags: [tags.javaScript, tags.nodeJs, tags.express, tags.bootstrap, tags.sass, tags.html, tags.css]
}, {
    title: "Task manager",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/Task%20manager",
    tags: [tags.javaScript, tags.nodeJs, tags.express, tags.angular, tags.react, tags.html, tags.css, tags.mongodb]
}, {
    title: "WebSync chat",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/chat",
    tags: [tags.javaScript, tags.nodeJs, tags.angular, tags.typeScript, tags.html, tags.sass, tags.cSharp]
}, {
    title: "Face recognition",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/faceRecognition",
    tags: [tags.javaScript]
}, {
    title: "My npm avid account",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://www.npmjs.com/~artur.ziemba.avid",
    tags: [tags.npm, tags.javaScript]
}, {
    title: "My npm private account",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://www.npmjs.com/~arogancki",
    tags: [tags.npm, tags.javaScript]
}, {
    title: "Video chat",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/react%20webex%20integration",
    tags: [tags.react, tags.javaScript, tags.html, tags.css]
}, {
    title: "VS code extension",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/vscode%20extension",
    tags: [tags.javaScript, tags.nodeJs, tags.express, tags.react]
}, {
    title: "watcher",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/watcher",
    tags: [tags.javaScript, tags.nodeJs]
}, {
    title: "weather app",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/weather%20app",
    tags: [tags.javaScript, tags.nodeJs, tags.mongodb, tags.express]
}, {
    title: "Volume of any shape calculator",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/kkolodziejczak/Computational-mathematics",
    tags: [tags.cpp, tags.algorithms, tags.openGl, tags.oop]
}, {
    title: "bash",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/scripts",
    tags: [tags.bash, tags.algorithms]
}, {
    title: "IoT simulator",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/C-dot.net-Thread-IoT-simulation",
    tags: [tags.cSharp, tags.oop]
}, {
    title: "Simple spring app",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/Spring",
    tags: [tags.spring, tags.java]
}, {
    title: "Notes player",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/MFC-notes-player",
    tags: [tags.cpp, tags.oop]
}, {
    title: "Geometry soldiers",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/OpenGL-game-Geometry-Soldiers",
    tags: [tags.cpp, tags.oop, tags.openGl]
}, {
    title: "my compilator MKlab",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/my_compilator_mklab",
    tags: [tags.cpp, tags.oop, tags.algorithms]
}, {
    title: "MOS device simulator",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/mos_device_simulation",
    tags: [tags.java, tags.networking, tags.oop]
}, {
    title: "java SE console apps",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/java",
    tags: [tags.java, tags.oop]
}, {
    title: "Shoot targets",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/OpenGl-Projects/tree/master/collect%20stars%20Opengl",
    tags: [tags.cpp, tags.oop, tags.openGl]
}, {
    title: "Pendulum simulator",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/OpenGl-Projects/tree/master/pendulum%20simulation%20OpenGl",
    tags: [tags.cpp, tags.oop, tags.openGl, tags.algorithms]
}, {
    title: "Dynamic random labirynth game",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/OpenGl-Projects/tree/master/rand%20dynamic%20labirynth%20Open%20gl",
    tags: [tags.cpp, tags.oop, tags.openGl, tags.algorithms]
}, {
    title: "Crawler",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/network_programming/tree/master/Crawler",
    tags: [tags.java, tags.networking]
}, {
    title: "FTP client",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/network_programming/tree/master/FTPclient",
    tags: [tags.java, tags.networking]
}, {
    title: "POP3 client",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/network_programming/tree/master/Pop3",
    tags: [tags.java, tags.networking]
}, {
    title: "SMTP client",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/network_programming/tree/master/SMTP",
    tags: [tags.java, tags.networking]
}, {
    title: "Base 64 conventer",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/network_programming/tree/master/base64",
    tags: [tags.java, tags.networking]
}, {
    title: "Dynamic table",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/data-structures-and-algorithm/blob/master/Dynamic%20Table.c",
    tags: [tags.c, tags.algorithms]
}, {
    title: "Doubly linked list",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/data-structures-and-algorithm/blob/master/Lista%20dwukierunkowa.c",
    tags: [tags.c, tags.algorithms]
}, {
    title: "Min-max heap",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/data-structures-and-algorithm/blob/master/minmax%20heap.cpp",
    tags: [tags.cpp, tags.algorithms]
}, {
    title: "Dijkstra vs Astar",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Aroganckii/data-structures-and-algorithm/blob/master/Dijkstra%20vs%20Astar.cpp",
    tags: [tags.cpp, tags.algorithms]
}, {
    title: "BST tree (DSW algorithm)",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/data-structures-and-algorithm/blob/master/BST%2BDSW.cpp",
    tags: [tags.cpp, tags.algorithms]
}, {
    title: "AVL tree",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/data-structures-and-algorithm/blob/master/AVL.cpp",
    tags: [tags.cpp, tags.algorithms]
}, {
    title: "OpenMP projects",
    desc: "open mp projects game of life matrix multiplication fractal generation",
    github: "https://github.com/Arogancki/OpenMP",
    tags: [tags.c, tags.cpp, tags.algorithms]
}, {
    title: "Game of Life",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/all-c/tree/master/Game%20of%20Life",
    tags: [tags.cpp, tags.oop, tags.algorithms]
}, {
    title: "Labirynth console game",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/all-c/tree/master/Dynamic%20Random%20Labirynth%20build",
    tags: [tags.cpp, tags.oop, tags.algorithms]
}, {
    title: "Hamming code",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/all-c/blob/master/hamming%20code%20(bit%20verison%207%204%20)/ConsoleApplication3.cpp",
    tags: [tags.c, tags.algorithms]
}, {
    title: "Linux socket communicator",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/all-c/tree/master/linux%20programing/communicator",
    tags: [tags.c, tags.networking]
}, {
    title: "Linux brute force",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/all-c/tree/master/linux%20programing/password%20hacking",
    tags: [tags.c, tags.networking]
}, {
    title: "Static file server",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/all-c/tree/master/advanced%20c%23/2/Server",
    tags: [tags.cSharp, tags.networking]
}, {
    title: "Face recognition matlab",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/matlab/blob/master/face%20recognition/Untitled.m",
    tags: [tags.matlab, tags.algorithms]
}, {
    title: "Genetic algorithm",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/matlab/tree/master/genetic%20algorithm",
    tags: [tags.matlab, tags.algorithms]
}, {
    title: "Image processing - edge detection",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/matlab/tree/master/image%20processing/Edge%20detection",
    tags: [tags.matlab, tags.algorithms]
}, {
    title: "Image processing - circle detection",
    desc: "sed do iusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/matlab/tree/master/image%20processing/circle%20detection",
    tags: [tags.matlab, tags.algorithms]
}])

function createImageLinks(obj){
    obj.forEach((v)=>v.img = path.join('/', 'images', 'projects', `${v.title.toLowerCase()}.png`))
    return obj
}

(function checkIfAllTagsAreUsed(){
    Object.values(tags).forEach(tag=>{
        if (!projects.find(project=>project.tags.includes(tag)))
            throw new Error(`Tag ${tag} is not used!!`)
    })
})()

module.exports = Object.freeze(projects)