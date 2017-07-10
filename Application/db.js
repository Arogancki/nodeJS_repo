var dataBase = require('mongodb').MongoClient;   // MongoDB databases
var Promise = require('promise');               // asynchronous returns from functions
var dataBaseUrl = "mongodb://localhost:27017/TaskMenagerApp1Test"; //dataBase address

var usersTable = "users";
var boardsTable = "boards";

// remember to run run database in background
// "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"

function GetRandomString() {
    return Math.random().toString(36).slice(-16);
}

function Connect() {
    return new Promise(function (fulfill, reject) {
        dataBase.connect(dataBaseUrl, function (err, db) {
            if (err) {
                reject(err);
            }
            fulfill(db);
        });
    });
}

var Authorization=function (login, password) {
    return new Promise(function (fulfill, reject) {
        Connect().done(function (db) {
            db.collection(usersTable).findOne({ login: login, password: password }, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    if (result != null) {
                        fulfill(true);
                    }
                    else {
                        fulfill(false);
                    }
                }
                db.close();
            });
        });
    });
}

function GetUser(login) {
    return new Promise(function (fulfill, reject) {
        Connect().done(function (db) {
            db.collection(usersTable).findOne({ login: login }, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    fulfill(result);
                }
                db.close();
            });
        });
    });
}

function InsertUser(login, password) {
    return new Promise(function (fulfill, reject) {
        Connect().done(function (db) {
            db.collection(usersTable).findOne({ login: login }, function (err, result) {
                if (err) reject(err);
                if (result != null) {
                    fulfill(false);
                    db.close();
                } else {
                    db.collection(usersTable).insertOne({ login: login, password: password, email: "", emailConfimr: "" }, function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            fulfill(true);
                        }
                        db.close();
                    });
                }
            });
        });
    });
}

function UpdateUser(login, newLogin, password) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).done(function (user) {
            if (user == null) {
                fulfill(false);
            }
            else {
                if (newLogin == "") {
                    newLogin = user.login;
                }
                if (password == "") {
                    password = user.password;
                }
                GetUser(newLogin).done(function (newUser) {
                    if (newUser != null) {
                        fulfill(false);
                    }
                    else {
                        Connect().done(function (db) {
                            db.collection(usersTable).updateOne({ login: login }, { $set: { login: newLogin, password: password } }, function (err, result) {
                                if (err) {
                                    reject(err);
                                } else {
                                    fulfill(true);
                                }
                                db.close();
                            });
                        });
                    }
                });
            }
        });
    });
}

function InsertUserEmail(login, email) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).done(function (user) {
            if (user == null) {
                fulfill(false);
            }
            else {
                Connect().done(function (db) {
                    db.collection(usersTable).updateOne({ login: login }, { $set: { email: email, emailConfimr: GetRandomString() } }, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            fulfill(true);
                        }
                        db.close();
                    });
                });
            }
        });
    });
}

function ConfirmEmail(login, confirmation) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).done(function (user) {
            if (user == null) {
                fulfill(1); // user doesn't exist
                return;
            }
            if (user.emailConfimr == null) {
                fulfill(2); // user hasn't specify email
                return;
            }
            Connect().done(function (db) {
                if (user.emailConfimr !== confirmation) {  // confirmation code is different - erase email
                    db.collection(usersTable).updateOne({ login: login }, { $set: { email: "", emailConfimr: "" } }, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            fulfill(3);
                        }
                        db.close();
                    });
                }
                else { // confirmation code is equal - accept email
                    db.collection(usersTable).updateOne({ login: login }, { $set: { emailConfimr: "" } }, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            fulfill(0);
                        }
                        db.close();
                    });
                }
            });
        });
    });
}

function ResetPassword(login, email){
	return new Promise(function (fulfill, reject) {
        GetUser(login).done(function (user) {
            if (user == null) {
                fulfill(false); // user doesn't exist
                return;
            }
            if (user.email != email) {
                fulfill(false); // user email doesn't match
                return;
            }
            Connect().done(function (db) {
				newPassword=GetRandomString();
                db.collection(usersTable).updateOne({ login: login }, { $set: { password:newPassword } }, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        fulfill(newPassword);
                    }
                    db.close();
                });
            });
        });
    });
}

function GetBoard(name, owner) {
    return new Promise(function (fulfill, reject) {
        Connect().done(function (db) {
            db.collection(boardsTable).findOne({ name: name, owner: owner }, function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    fulfill(result);
                }
                db.close();
            });
        });
    });
}

function GetBoards(ids) {
    return new Promise(function (fulfill, reject) {
        Connect().done(function (db) {
            db.collection(boardsTable).find({ _id: { $in: ids } }).toArray(function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    fulfill(result);
                }
                db.close();
            });
        });
    });
}

function GetInvitationsInfo(ids) {
    return new Promise(function (fulfill, reject) {
        Connect().done(function (db) {
            db.collection(boardsTable).find({ _id: { $in: ids } }).toArray(function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    var InvitationsInfo = [];
                    for (var i = 0; i < result.length; i++) {
                        InvitationsInfo.push({ name: result[i].name, owner: result[0].owner });
                    }
                    fulfill(InvitationsInfo);
                }
                db.close();
            });
        });
    });
}

function InsertBoard(name, owner) {
    return new Promise(function (fulfill, reject) {
        GetBoard(name, owner).done(function (board) {
            if (board != null) {
                fulfill(false);
            }
            else {
                Connect().done(function (db) {
                    db.collection(boardsTable).insertOne({ name: name, owner: owner }, function (err, result) {
                        if (err) {
                            reject(err);
                            db.close();
                        }
                        else {
                            db.collection(usersTable).updateOne({ login: owner }, { $push: { boards: result.ops[0]._id } }, function (err, result) {
                                if (err) {
                                    reject(err);
                                } else {
                                    fulfill(true);
                                }
                                db.close();
                            });
                        }
                    });
                });
            }
        });
    });
}

function GetUserBoards(login) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).done(function (user) {
            if (user == null) {
                fulfill(null);
            }
            else {
                GetBoards(user.boards).done(function (boards) {
                    fulfill(boards);
                });
            }
        });
    });
}

function GetUserInvitationsInfo(login) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).done(function (user) {
            if (user == null) {
                fulfill(null);
            }
            else {
                GetInvitationsInfo(user.invitations).done(function (invitations) {
                    fulfill(invitations);
                });
            }
        });
    });
}

function InsertInvitation(login, name, owner) {
    return new Promise(function (fulfill, reject) {
        GetBoard(name, owner).done(function (board) {
            if (board == null) {
                fulfill(1); // boards doesn't exist
                return;
            }
            if (board.owner == user) {
                fulfill(2); // user is an owner
                return;
            }
            for (var i = 0; i < board.invitations.length; i++) {
                if (board.invitations[i] == login) {
                    fulfill(3); // user is already invited
                    return;
                }
            }
            for (var i = 0; i < board.members.length; i++) {
                if (board.members[i] == login) {
                    fulfill(4); // user is a member already
                    return;
                }
            }
            Connect().done(function (db) {
                db.collection(usersTable).updateOne({ login: login }, { $push: { invitations: board._id } }, function (err, result) {
                    if (err) {
                        reject(err);
                        db.close();
                    } else {
                        db.collection(boardsTable).updateOne({ _id: board._id }, { $push: { invitations: login } }, function (err, result) {
                            if (err) {
                                reject(err);
                            } else {
                                fulfill(0);
                            }
                            db.close();
                        });
                    }
                });
            });
        });
    });
}

function AcceptInvitation(login, name, owner) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).done(function (user) {
            if (user == null) {
                fulfill(1); // user doesn't exist
                return;
            }
            else {
                GetBoard(name, owner).done(function (board) {
                    if (board == null) {
                        fulfill(2); // board doesn't exist or user was not invited
                        return;
                    }
                    var isInvited = false;
                    for (var i = 0; i < board.invitations.length; i++) {
                        if (board.invitations[i] == login) {
                            isInvited = true;
                        }
                    }
                    if (isInvited == false) {
                        fulfill(2); // board doesn't exist or user was not invited
                        return;
                    }
                    Connect().done(function (db) {
                        db.collection(usersTable).updateOne({ login: login }, { $pull: { invitations: board._id } }, function (err, result) {
                            if (err) {
                                reject(err);
                                db.close();
                            } else {
                                db.collection(boardsTable).updateOne({ _id: board._id }, { $pull: { invitations: login } }, function (err, result) {
                                    if (err) {
                                        reject(err);
                                        db.close();
                                    } else {
                                        db.collection(boardsTable).updateOne({ _id: board._id }, { $push: { members: login } }, function (err, result) {
                                            if (err) {
                                                reject(err);
                                            } else {
                                                fulfill(0);
                                            }
                                            db.close();
                                        });
                                    }
                                });
                            }
                        });
                    });
                });
            }
        });
    });
}

function RefuseInvitation(login, name, owner) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).done(function (user) {
            if (user == null) {
                fulfill(1); // user doesn't exist
                return;
            }
            else {
                GetBoard(name, owner).done(function (board) {
                    if (board == null) {
                        fulfill(2); // board doesn't exist or user was not invited
                        return;
                    }
                    var isInvited = false;
                    for (var i = 0; i < board.invitations.length; i++) {
                        if (board.invitations[i] == login) {
                            isInvited = true;
                        }
                    }
                    if (isInvited == false) {
                        fulfill(2); // board doesn't exist or user was not invited
                        return;
                    }
                    Connect().done(function (db) {
                        db.collection(usersTable).updateOne({ login: login }, { $pull: { invitations: board._id } }, function (err, result) {
                            if (err) {
                                reject(err);
                                db.close();
                            } else {
                                db.collection(boardsTable).updateOne({ _id: board._id }, { $pull: { invitations: login } }, function (err, result) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        fulfill(0);
                                    }
                                    db.close();
                                });
                            }
                        });
                    });
                });
            }
        });
    });
}

function IsBoardOwner(login, name) {
    return new Promise(function (fulfill, reject) {
        GetBoard(name, login).done(function (board) {
            if (board != null) {
                fulfill(true);
            }
            else {
                fulfill(false);
            }
        });
    });
}

function LeaveBoard(login, name, owner) {
    return new Promise(function (fulfill, reject) {
        GetBoard(name, owner).done(function (board) {
            var IsMember = false;
            for (var i = 0; i < board.members.length; i++)
                if (board.members[i] == login) {
                    IsMember = true;
                }
            if (IsMember === false) {
                fulfill(false);
            }
            else {
                Connect().done(function (db) {
                    db.collection(boardsTable).updateOne({ _id: board._id }, { $pull: { members: login } }, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            fulfill(0);
                        }
                        db.close();
                    });
                });
            }
        });
    });
}

function DeleteBoard(login, name, owner) {
    return new Promise(function (fulfill, reject) {
        GetBoard(name, owner).done(function (board) {
            if (board.owner != login) {
                fulfill(false);
            }
            else {
                Connect().done(function (db) {
                    for (var i = 0; i < board.members.length; i++) {
                        db.collection(usersTable).updateOne({ login: board.members[i] }, { $pull: { boards: boards._id } });
                    }
                    for (var i = 0; i < board.invitations.length; i++) {
                        db.collection(usersTable).updateOne({ login: board.invitations[i] }, { $pull: { boards: invitations._id } });
                    }
                    db.collection(boardsTable).remove({ name: name, owner: owner }, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            fulfill(true);
                        }
                        db.close();
                    });
                });
            }
        });
    });
}

function InsertTask(login, board, owner, name, info) {
    return new Promise(function (fulfill, reject) {
        GetTasks(board, owner, name).done(function (task) {
            if (task != null) {
                fulfill(false);
            } else {
                Connect().done(function (db) {
                    db.collection(boardsTable).updateOne({ name: board, owner: owner }, { $push: { tasks: { name: name } } }, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            InsertTaskStatus(login, board, owner, name, info, "New").done(function (isInserted) {
                                fulfill(true);
                            });
                        }
                        db.close();
                    });
                });
            }
        });
    });
}

function RemoveTask(login, board, owner, name) {
    return new Promise(function (fulfill, reject) {
        GetTasks(board, owner, name).done(function (task) {
            if (task == null) {
                fulfill(false);
            }
            else {
                Connect().done(function (db) {
                    db.collection(boardsTable).updateOne({ name: board, owner: owner }, { $pull: { tasks: { name: name } } }, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            fulfill(true);
                        }
                        db.close();
                    });
                });
            }
        });
    });
}

function GetTasks(board, owner, name) {
    return new Promise(function (fulfill, reject) {
        GetBoard(board, owner).done(function (_board) {
            for (var i = 0; i < _board.tasks.length; i++) {
                if (_board.tasks[i].name == name) {
                    fulfill(_board.tasks[i]);
                    return;
                }
            }
            fulfill(null);
        });
    });
}

function InsertTaskStatus(login, board, owner, task, info, type) {
    return new Promise(function (fulfill, reject) {
        GetTasks(board, owner, name).done(function (task) {
            if (task != null) {
                fulfill(false);
            } else {
                Connect().done(function (db) {
                    db.collection(boardsTable).updateOne({ name: board, owner: owner, tasks: { name: name } }, { $push: { statuses: { type: type, user: login, info: info, date: 1 } } }, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            fulfill(true);
                        }
                        db.close();
                    });
                });
            }
        });
    });
}

module.exports = {
    Authorization
};