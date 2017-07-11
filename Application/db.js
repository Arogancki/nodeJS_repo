var dataBase = require('mongodb').MongoClient;   // MongoDB databases
var Promise = require('promise');               // asynchronous returns from functions
var dataBaseUrl = "mongodb://localhost:27017/TaskMenagerAppTestX"; //dataBase address

var usersTable = "users";
var boardsTable = "boards";

// run database in background
// "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"
var exec = require('child_process').exec;
exec('\"C:\\Program Files\\MongoDB\\Server\\3.4\\bin\\mongod.exe\"', function (error, stdout, stderr) {
    console.log(stdout);
    console.error(error);
    console.error(stderr);
});

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

// mongodb is casesesitive, so if user write his name with different case
// there is need to find his real name (that he has used to sign up)
var GetRealName = function (login) {
    return new Promise(function (fulfill, reject) {
        if (login === undefined) {
            fulfill(null);
            return;
        }
        Connect().done(function (db) {
            db.collection(usersTable).findOne({ lowerCaseLogin: login.toLowerCase() }, function (err, user) {
                if (err) {
                    reject(err);
                } else {
                    if (user != null) {
                        fulfill(user.login);
                    }
                    else {
                        fulfill(null);
                    }
                }
                db.close();
            });
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

function GetUserEmail(login) {
	return new Promise(function (fulfill, reject) {
		GetUser(login).done(function(user){
			if (user!=null && user.email!="" && user.emailConfimr==""){
				fulfill(user.email);
			}
			else{
				fulfill(null);
			}
		});
	});
}

var InsertUser=function (login, password) {
    return new Promise(function (fulfill, reject) {
        Connect().done(function (db) {
            db.collection(usersTable).findOne({ lowerCaseLogin: login.toLowerCase() }, function (err, result) {
                if (err) reject(err);
                if (result != null) {
                    fulfill(false);
                    db.close();
                } else {
                    db.collection(usersTable).insertOne({ lowerCaseLogin: login.toLowerCase(), login: login, password: password, email: "", emailConfimr: "" }, function (err, result) {
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

function UpdateUser(login, password) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).done(function (user) {
            if (user == null) {
                fulfill(false);
            }
            else {
                Connect().done(function (db) {
                    db.collection(usersTable).updateOne({ login: login }, { $set: { password: password } }, function (err, result) {
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

var InsertUserEmail = function (login, email) {
    return new Promise(function (fulfill, reject) {
        GetUser(login).done(function (user) {
            if (user == null) {
                fulfill(false);
            }
            else {
                Connect().done(function (db) {
					var rand=GetRandomString();
                    db.collection(usersTable).updateOne({ login: login }, { $set: { email: email, emailConfimr: rand } }, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            fulfill(rand);
                        }
                        db.close();
                    });
                });
            }
        });
    });
}

var ConfirmEmail = function (login, confirmation) {
    return new Promise(function (fulfill, reject) {
        GetRealName(login).done(function (realLogin) {
            if (realLogin == null) {
                fulfill(1); // user doesn't exist
                return;
            }
            else {
                login = realLogin;
            }
            GetUser(login).done(function (user) {
                if (user == null) {
                    fulfill(1); // user doesn't exist
                    return;
                }
		    	if (user.emailConfimr == ""){
		    		fulfill(4); // user has already confirmed an email
                    return;
		    	}
                if (user.emailConfimr == null) {
                    fulfill(2); // user hasn't specify email
                    return;
                }
                Connect().done(function (db) {
                    if (user.emailConfimr === confirmation) {  // confirmation code is ok
		    			db.collection(usersTable).updateOne({ login: login }, { $set: { emailConfimr: "" } }, function (err, result) {
                            if (err) {
                                reject(err);
                            } else {
                                fulfill(0);
                            }
                        });
                    }
		    		db.close();
                });
            });
        });
    });
}

var ResetPassword = function (login, email) {
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
            login = user.lowerCaseLogin;
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

var GetBoardUsers=function (name, owner){
	return new Promise(function (fulfill, reject) {
		GetBoard.done(function(board){
			if (board!=null){
				fulfill({owner:board.owner, members:board.members, invited:board.invitations});
			}
			else{
				fulfill(null);
			}
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

var InsertBoard=function (name, owner) {
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

var GetUserBoards=function (login) {
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

var GetUserInvitationsInfo=function (login) {
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

var InsertInvitation=function (ownerLogin, login, name, owner) {
    return new Promise(function (fulfill, reject) {
        GetBoard(name, owner).done(function (board) {
            if (board == null) {
                fulfill(1); // boards doesn't exist
                return;
            }
			 if (board.owner != ownerLogin) {
                fulfill(5); // LOGINOWNER isn't an owner
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
            GetUser(login).done(function(user) {
                if (user == null) {
                    fulfill(6); // user doesn't exist
                    return;
                } else {
                    Connect().done(function(db) {
                        db.collection(usersTable).updateOne({ login: login }, { $push: { invitations: board._id } }, function(err, result) {
                            if (err) {
                                reject(err);
                                db.close();
                            } else {
                                db.collection(boardsTable).updateOne({ _id: board._id }, { $push: { invitations: login } }, function(err, result) {
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
                }
            });
        });
    });
}

var AcceptInvitation=function (login, name, owner) {
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

var RefuseInvitation=function (login, name, owner) {
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

var LeaveBoard=function (login, name, owner) {
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
                            fulfill(true);
                        }
                        db.close();
                    });
                });
            }
        });
    });
}

var DeleteBoard=function (login, name, owner) {
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

var InsertTask=function (login, board, owner, name, info) {
    return new Promise(function (fulfill, reject) {
        GetTask(board, owner, name).done(function (task) {
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
        GetTask(board, owner, name).done(function (task) {
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

function GetTask(board, owner, name) {
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

var GetTaskObservers=function (board, owner, task){
	return new Promise(function (fulfill, reject) {
		GetTask(board, owner, name).done(function(task){
			if (task!=null){
				var observers=[];
				for (var i=0; i<task.statuses.length; i++){
					observers.push({user:task.statuses[i].user});
				}
				fulfill(observers);
			}
			else{
				fulfill(null);
			}
		});
	});
}

var InsertTaskStatus=function (login, board, owner, task, info, type) {
    return new Promise(function (fulfill, reject) {
        GetTask(board, owner, name).done(function (task) {
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