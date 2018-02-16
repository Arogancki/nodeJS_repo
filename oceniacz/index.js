const fs = require('fs')

const list = CreateObjFromString(fs.readFileSync('./list.csv', "utf8"))

const config =  CreateObjFromString(fs.readFileSync('./config.csv', "utf8"))

function CreateObjFromString(str){
	var object = {}
	let lines = str.split(/\r?\n/)
	var linesIndex = 0
	for (var line of lines){
		object[linesIndex] = {}
		var valuesIndex = 0
		let values = line.split(';')
		for (var value of values){
			if (value.length==0)
				continue
			object[linesIndex][valuesIndex] = value
			valuesIndex++
		}
		linesIndex++
	}
	delete object[0]
	return object
}

function Generate(kid){
		let desc = ""
		let name = kid[0]
		let sum = 0
		for (var index in kid){
			if (index==0 || kid[index]==0)
				continue
			desc += config[index][kid[index]] + " "
			sum += parseInt(kid[index])
		}
		index = parseInt(index)
		if (name!=undefined){
			desc += config[index+1][Math.round(sum/index)]
			fs.writeFileSync("out/"+name+".txt", desc)
		}
}


for(var index in list){
	Generate(list[index])
}