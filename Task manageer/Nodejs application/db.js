const dataBase = require('mongodb').MongoClient;   // MongoDB databases
const { execFile } = require('child_process');

//const pathToMongoExe = null;
const pathToMongoExe = require('path').join('C:', 'Program Files', 'MongoDB', 'Server', '3.4', 'bin', 'mongod.exe');
let dataBaseUrl = "mongodb://localhost:27017/TaskMenager"; // defaultdataBase address
const usersTable = "users";
const boardsTable = "boards";

// run database in background
// "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"

pathToMongoExe && StartMongo();

function StartMongo(){
    execFile(pathToMongoExe, function(err, data) {
        console.log(err)
        console.log(data.toString());
    });
}

// return random string for password confirmation
function GetRandomString() {
    return Math.random().toString(36).slice(-16);
}

//get date for statuses
function GetDate() {
    let date = new Date();
    return [("0" + date.getHours()).slice(-2), ("0" + date.getMinutes()).slice(-2), ("0" + date.getSeconds()).slice(-2)].join(':') + " " + [("0" + date.getDate()).slice(-2), ("0" + (date.getMonth() + 1)).slice(-2), ("" + date.getFullYear()).slice(-2)].join("-");
}

function Connect() {
    return new Promise(function (fulfill, reject) {
        dataBase.connect(dataBaseUrl, function(err, db) {
            if (err) {
                reject(err);
                return;
            }
            fulfill(db);
        });
    });
}

// mongodb is casesesitive, so if user write his name with different case
// there is need to find his real name (that he has used to sign up)
const GetRealName = function GetRealName(login) {
    return new Promise(function (fulfill, reject) {
        if (login === undefined) {
            reject("User not found.");
            return;
        }
        Connect().then(function (db) {
            db.collection(usersTable).findOne({lowerCaseLogin: login.toLowerCase()}, function (err, user) {
                db.close();
                if (err) {
                    reject(err);
                    return;
                }
                if (user === null) {
                    reject("User not found.");
                    return;
                }
                fulfill(user.login);
            });
        }, reject);
    });
};

const Authorization=function Authorization(login, password){
    return new Promise(function (fulfill, reject) {
        Connect().then(function (db) {
            db.collection(usersTable).findOne({ login: login, password: password }, function (err, result) {
                db.close();
                if (err) {
                    reject(err);
                    return;
                }
                if (result === null) {
                    reject("Invalid login or password.");
                    return;
                }
                fulfill(result);
            });
        }, reject);
    });
};

function GetUser(login) {
    return new Promise(function (fulfill, reject) {
        GetRealName(login).then(function(login){
            Connect().then(function (db) {
                db.collection(usersTable).findOne({ login: login }, function (err, result) {
                    db.close();
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (result === null) {
                        reject("User not found.");
                        return;
                    }
                    fulfill(result);
                });
            }, reject);
        }, reject);
    });
}

function GetUserEmail(login) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).then(function(user){
            if (user.email==="" || user.emailConfimr!==""){
                reject("Confirmed email not found.");
                return;
            }
            fulfill(user.email);
        }, reject);
    });
}

const InsertUser = function InsertUser(login, password) {
    return new Promise(function (fulfill, reject) {
        Connect().then(function (db) {
            db.collection(usersTable).findOne({ lowerCaseLogin: login.toLowerCase() }, function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                if (result !== null) {
                    reject("User already exist.");
                    db.close();
                    return;
                }
                db.collection(usersTable).insertOne({ lowerCaseLogin: login.toLowerCase(), login: login, password: password, email: "", emailConfimr: "", boards: [], invitations:[]}, function (err, result) {
                    db.close();
                    if (err) {
                        reject(err);
                        return;
                    }
                    fulfill(result);
                })
            });
        }, reject);
    });
};

function UpdateUser(login, password, email) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).then(function (user) {
            Connect().then(function (db) {
                if (email) {
                    let rand = GetRandomString();
                    db.collection(usersTable).updateOne({ login: login }, { $set: { password: password, email: email, emailConfimr: rand } }, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            fulfill(rand);
                        }
                        db.close();
                    });    
                }
                else {
                    db.collection(usersTable).updateOne({ login: login }, { $set: { password: password } }, function(err, result) {
                        db.close();
                        if (err) {
                            reject(err);
                            return;
                        }
                        fulfill(result);
                    })
                }
            }, reject);
        });
    });
}

const InsertUserEmail = function InsertUserEmail(login, email) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).then(function (user) {
            Connect().then(function (db) {
                let rand=GetRandomString();
                db.collection(usersTable).updateOne({ login: login }, { $set: { email: email, emailConfimr: rand } }, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        fulfill(rand);
                    }
                    db.close();
                });
            }, reject);
        }, reject);
    });
};

const ConfirmEmail = function ConfirmEmail(login, confirmation) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).then(function (user) {
            if (user.emailConfimr === ""){
                reject("Email is already confirmed.");
                return;
            }
            if (user.emailConfimr === null) {
                reject("User has not specified any email.");
                return;
            }
            if (user.emailConfimr !== confirmation) {
                reject("Confirmation code does not match.");
                return;
            }
            Connect().then(function (db) {
                db.collection(usersTable).updateOne({ login: login }, { $set: { emailConfimr: "" } }, function (err, result) {
                    db.close();
                    if (err) {
                        reject(err);
                        return;
                    }
                    fulfill(result);
                });
            }, reject);
        }, reject);
    });
};

const ResetPassword = function ResetPassword(login, email) {
    return new Promise(function(fulfill, reject) {
        GetUser(name).then(function(user) {
            if (user.email !== email) {
                reject("User email does not match.");
                return;
            }
            Connect().then(function(db) {
                newPassword = GetRandomString();
                db.collection(usersTable).updateOne({ login: name }, { $set: { password: newPassword } }, function(err, result) {
                    db.close();
                    if (err) {
                        reject(err);
                        return;
                    }
                    fulfill({newPassword: newPassword, login: name});
                });
            }, reject);
        }, reject);
    });
};

function GetBoard(name, owner) {
    return new Promise(function (fulfill, reject) {
        Connect().then(function (db) {
            db.collection(boardsTable).findOne({ name: name, owner: owner }, function (err, result) {
                db.close();
                if (err) {
                    reject(err);
                    return;
                }
                if (result===null){
                    reject("Board not found.");
                    return;
                }
                fulfill(result);
            });
        }, reject);
    });
}

let GetBoardUsers=function GetBoardUsers(name, owner){
    return new Promise(function (fulfill, reject) {
        GetBoard(name, owner).then(function(board){
            fulfill({owner:board.owner, members:board.members, invited:board.invitations});
        }, reject);
    });
};

function GetBoards(ids) {
    return new Promise(function (fulfill, reject) {
        Connect().then(function (db) {
            db.collection(boardsTable).find({ _id: { $in: ids } }).toArray(function (err, result) {
                db.close();
                if (err) {
                    reject(err);
                    return;
                }
                if (result === null){
                    reject("Boards not found.");
                    return;
                }
                fulfill(result);
            });
        }, reject);
    });
}

function GetInvitationsInfo(ids) {
    return new Promise(function (fulfill, reject) {
        Connect().then(function (db) {
            db.collection(boardsTable).find({ _id: { $in: ids } }).toArray(function (err, result) {
                db.close();
                if (err) {
                    reject(err);
                    return;
                }
                let InvitationsInfo = [];
                for (let i = 0; i < result.length; i++) {
                    InvitationsInfo.push({ name: result[i].name, owner: result[0].owner });
                }
                fulfill(InvitationsInfo);
            });
        }, reject);
    });
}

let InsertBoard=function InsertBoard(name, owner) {
    return new Promise(function (fulfill, reject) {
        GetBoard(name, owner).then(reject, function () {
            Connect().then(function (db) {
                db.collection(boardsTable).insertOne({ name: name, owner: owner, invitations: [], members: [], tasks:[]  }, function (err, result) {
                    if (err) {
                        reject(err);
                        db.close();
                        return;
                    }
                    db.collection(usersTable).updateOne({ login: owner }, { $push: { boards: result.ops[0]._id } }, function (err, result) {
                        db.close();
                        if (err) {
                            reject(err);
                            return;
                        }
                        fulfill(result);
                    });
                });
            }, reject);
        }, reject);
    });
};

let GetUserBoards=function GetUserBoards(login) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).then(function (user) {
            GetBoards(user.boards).then(function (boards) {
                fulfill(boards);
            }, reject);
        }, reject);
    });
};

let GetUserInvitationsInfo=function GetUserInvitationsInfo(login) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).then(function (user) {
            GetInvitationsInfo(user.invitations).then(function (invitations) {
                fulfill(invitations);
            }, reject);
        }, reject);
    });
};

let InsertInvitation=function InsertInvitation(ownerLogin, login, name, owner) {
    return new Promise(function (fulfill, reject) {
        GetBoard(name, owner).then(function (board) {
            if (board.owner !== ownerLogin) {
                reject(`${ownerLogin} is not owner of this board`);
                return;
            }
            if (board.owner === login) {
                reject(`${ownerLogin} is owner of this board`);
                return;
            }
            for (let invitation of board.invitations) {
                if (invitation === login) {
                    reject(`${login} is already invited`);
                    return;
                }
            }
            for (let member of board.members) {
                if (member === login) {
                    reject(`${login} is already invited`);
                    return;
                }
            }
            GetUser(login).then(function(user) {
                Connect().then(function(db) {
                    db.collection(usersTable).updateOne({ login: login }, { $push: { invitations: board._id } }, function(err, result) {
                        if (err) {
                            reject(err);
                            db.close();
                            return;
                        }
                        db.collection(boardsTable).updateOne({ _id: board._id }, { $push: { invitations: login } }, function(err, result) {
                            db.close();
                            if (err) {
                                reject(err);
                                return;
                            }
                            fulfill(result);
                        });
                    });
                }, reject);
            }, reject);
        }, reject);
    });
};

let AcceptInvitation=function AcceptInvitation(login, name, owner) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).then(function (user) {
            GetBoard(name, owner).then(function (board) {
                let isInvited = false;
                for (let invitation of board.invitations) {
                    if (invitation === login) {
                        isInvited = true;
                    }
                }
                if (isInvited === false) {
                    reject("User has not been invited.");
                    return;
                }
                Connect().then(function (db) {
                    db.collection(usersTable).updateOne({ login: login }, { $pull: { invitations: board._id } }, function (err, result) {
                        if (err) {
                            reject(err);
                            db.close();
                            return
                        }
                        db.collection(boardsTable).updateOne({ _id: board._id }, { $pull: { invitations: login } }, function (err, result) {
                            if (err) {
                                reject(err);
                                db.close();
                                return;
                            }
                            db.collection(boardsTable).updateOne({ _id: board._id }, { $push: { members: login } }, function (err, result) {
                                if (err) {
                                    reject(err);
                                    db.close();
                                    return;
                                }
                                db.collection(usersTable).updateOne({ login: login }, { $push: { boards: board._id } }, function (err, result) {
                                    db.close();
                                    if (err) {
                                        reject(err);
                                        return;
                                    }
                                    fulfill(result);
                                });
                            });
                        });
                    });
                }, reject);
            }, reject);
        }, reject);
    });
};

let RefuseInvitation=function (login, name, owner) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).then(function (user) {
            GetBoard(name, owner).then(function (board) {
                let isInvited = false;
                for (let invitation of board.invitations) {
                    if (invitation === login) {
                        isInvited = true;
                    }
                }
                if (isInvited === false) {
                    reject("User has not been invited.");
                    return;
                }
                Connect().then(function (db) {
                    db.collection(usersTable).updateOne({ login: login }, { $pull: { invitations: board._id } }, function (err, result) {
                        if (err) {
                            reject(err);
                            db.close();
                            return;
                        }
                        db.collection(boardsTable).updateOne({ _id: board._id }, { $pull: { invitations: login } }, function (err, result) {
                            db.close();
                            if (err) {
                                reject(err);
                                return;
                            }
                            fulfill(result);
                        });
                    });
                }, reject);
            }, reject);
        }, reject);
    });
};

let LeaveBoard=function LeaveBoard(login, name, owner) {
    return new Promise(function (fulfill, reject) {
        GetBoard(name, owner).then(function (board) {
            let isMember = false;
            for (let member of board.members) {
                if (member === login) {
                    isMember = true;
                    Connect().then(function(db) {
                        db.collection(boardsTable).updateOne({ _id: board._id }, { $pull: { members: login } }, function(err, result) {
                            if (err) {
                                reject(err);
                                db.close();
                                return;
                            }
                            db.collection(usersTable).updateOne({ login: login }, { $pull: { boards: board._id } }, function (err, result) {
                                db.close();
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                fulfill(result);
                                return;
                            });
                        });
                    }, reject);
                }
            }
            for (let invitation of board.invitations) {
                if (invitation === login) {
                    isMember = true;
                    Connect().then(function(db) {
                        db.collection(boardsTable).updateOne({ _id: board._id }, { $pull: { invitations: login } }, function(err, result) {
                            if (err) {
                                reject(err);
                                db.close();
                                return;
                            }
                            db.collection(usersTable).updateOne({ login: login }, { $pull: { invitations: board._id } }, function (err, result) {
                                db.close();
                                if (err) {
                                    reject(err);
                                }
                                fulfill(result);
                                return;
                            });
                        });
                    }, reject);
                }
            }
            if (!isMember)
                reject("User is not a member.");
        }, reject);
    });
};

let DeleteBoard=function DeleteBoard(login, name, owner) {
    return new Promise(function (fulfill, reject) {
        GetBoard(name, owner).then(function (board) {
            if (board.owner !== login) {
                reject("User is not a board owner.");
                return;
            }
            Connect().then(function (db) {
                for (let member of board.members.length) {
                    db.collection(usersTable).updateOne({ login: member }, { $pull: { boards: board._id } });
                }
                for (let invitation of board.invitations.length) {
                    db.collection(usersTable).updateOne({ login: invitation }, { $pull: { invitations: board._id } });
                }
                db.collection(boardsTable).remove({ name: name, owner: owner }, function (err, result) {
                    db.close();
                    if (err) {
                        reject(err);
                        return;
                    }
                    fulfill(result);
                });
            }, reject);
        }, reject);
    });
};

let InsertTask=function InsertTask(login, board, owner, name, info){
    return new Promise(function (fulfill, reject) {
        GetTask(board, owner, name).then(reject, function (err){
            Connect().then(function (db) {
                db.collection(boardsTable).updateOne({ name: board, owner: owner }, { $push: { tasks: { name: name, statuses:[] } } }, function (err, result) {
                    db.close();
                    if (err) {
                        reject(err);
                        return;
                    }
                    InsertTaskStatus(login, board, owner, name, info, "New").then(fulfill, reject);
                });
            }, reject);
        });
    });
};

function RemoveTask(login, board, owner, name) {
    return new Promise(function (fulfill, reject) {
        GetTask(board, owner, name).then(function (task) {
            Connect().then(function (db) {
                db.collection(boardsTable).updateOne({ name: board, owner: owner }, { $pull: { tasks: { name: name } } }, function (err, result) {
                    db.close();
                    if (err) {
                        reject(err);
                        return;
                    }
                    fulfill(result);
                });
            }, reject);
        }, reject);
    });
}

function GetTask(board, owner, name) {
    return new Promise(function (fulfill, reject) {
        GetBoard(board, owner).then(function (board) {
            for (let task of board.tasks) {
                if (task.name === name) {
                    fulfill(task);
                    return;
                }
            }
            reject("Board not found.");
        }, reject);
    });
}

let GetTaskObservers=function GetTaskObservers(board, owner, name){
    return new Promise(function (fulfill, reject) {
        GetTask(board, owner, name).then(function(task){
            let observers = [];
            for (let status of task.statuses){
                observers.push(status.user);
            }
            fulfill(observers);
        }, reject);
    });
};

let InsertTaskStatus=function InsertTaskStatus(login, board, owner, name, info, type) {
    return new Promise(function (fulfill, reject) {
        if (type !== "New" && type !== "In progress" && type !== "Blocked" && type !== "Finished" && type !== "Resumed") {
            reject("Unknown status of task.");
            return;
        }
        GetTask(board, owner, name).then(function(task) {
            if (task.statuses.length > 0 && task.statuses[task.statuses.length - 1].type === "Finished" && type !== "Resumed"){
                reject(`Only status "Resumed" is allowed after "Finished."`);
            }
            if (task.statuses.length > 0 && type === "Resumed" && task.statuses[task.statuses.length - 1].type !== "Finished") {
                reject(`Status "Resumed" is allowed only after "Finished."`);
                return;
            }
            Connect().then(function(db) {
                db.collection(boardsTable).updateOne({ name: board, owner: owner, "tasks.name": name }, { $push: { "tasks.$.statuses": { type: type, user: login, info: info, date: GetDate() } } }, function(err, result) {
                    db.close();
                    if (err) {
                        reject(err);
                        return;
                    }
                    fulfill(result);
                });
            }, reject);
        }, reject);
    });
}

module.exports = function Start(address = dataBaseUrl){
    dataBaseUrl = address;
    return {
        GetRealName,
        Authorization,
        GetUserEmail,
        ConfirmEmail,
        ResetPassword,
        GetBoardUsers,
        InsertUser,
        InsertUserEmail,
        GetUserBoards,
        GetUserInvitationsInfo,
        InsertBoard,
        AcceptInvitation,
        RefuseInvitation,
        LeaveBoard,
        DeleteBoard,
        InsertTaskStatus,
        InsertInvitation,
        InsertTask,
        RemoveTask,
        UpdateUser,
        GetTaskObservers
    };
};