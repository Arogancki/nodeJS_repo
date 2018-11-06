
var check1=null
var check2=null

function checkMatrix(id){
    const active = (id, num) => {
        const cb = document.getElementById(`matrix${id}CheckBox`)
        cb.style.backgroundColor='black'
        cb.innerHTML = num
    }
    const deactive = id => {
        const cb = document.getElementById(`matrix${id}CheckBox`)
        cb.style.backgroundColor='transparent'
        cb.innerHTML = ''
    }
    // nie ma zadnego - ustaw 1
    if (check1===null){
        check1 = id
        return active(check1, 1)
    }
    if (check1===id){
        deactive(check1)
        if (check2===null){
            return
        }
        check1=check2
        deactive(check2)
        check2=null
        active(check1, 1)
        return
    }
    if (check2===null){
        check2=id
        return active(check2, 2)
    }
    if (check2===id){
        deactive(check2)
        check2=null
        return
    }
    deactive(check1)
    check1=check2
    active(check1, 1)
    check2=id
    return active(check2, 2)
}

async function activeMatrix(id, text){
    if (!matrixes[id]){
        await fetch(id, {
            method: "GET"
        })
        .then(async res=>{
            if (!res.ok) throw res
            matrixes[id]=(await res.json()).matrix
            return Promise.resolve()
        })
        .catch(async res=>alert(`Error: ${message || res.status}`))
    }
    const table = document.getElementById('table')
    let l =table.rows.length
    for (let i=0; i<l; i++){
        table.deleteRow(-1)
    }
    for (let m_row of matrixes[id]){
        const row = table.insertRow(-1)
        for (let m_col of m_row){
            const cell = row.insertCell(-1)
            cell.innerHTML  = `<input value='${m_col}'></input>`
        }
    }
    document.getElementById('text').innerHTML=text || ''
}

function multiplicate(){
    if (check1===null || check2===null){
        return alert('Choose 2 matrixes first!')
    }
    const threads= document.getElementById('threads').value
    fetch('', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            m1: check1,
            m2: check2,
            threads
        })
    })
    .then(async res=>{
        if (!res.ok) throw res
        const resObj = await res.json()
        matrixes['-1']=resObj.matrix
        checkMatrix(check2)
        checkMatrix(check1)
        return activeMatrix(-1, `Multiplication: threads: ${resObj.threads}, time: ${resObj.time}ms`)
    })
    .catch(async res=>{
        let message
        try {
            message = (await res.json()).message
        }
        catch(e){}
        alert(`Error: ${message || res.status}`)
    })
}

function deleteMatrix(id){
    if (!confirm('Are you sure?'))
        return
    fetch(id, {
        method: "DELETE"
    })
    .then(async res=>{
        if (!res.ok) throw res
        const matrix = document.getElementById(`matrix${id}`)
        matrix.parentNode.removeChild(matrix)
    })
    .catch(async res=>{
        let message
        try {
            message = (await res.json()).message
        }
        catch(e){}
        alert(`Error: ${message || res.status}`)
    })
}

var saving = false
function save(){
    saving=true
    const table = document.getElementById('table')
    const main = document.getElementById('main')
    const temp = main.innerHTML
    main.innerHTML = "<h2>SAVING...</h2>"
    const matrix = []
    for (let row of table.rows){
        matrix.push([])
        const m_row = matrix[matrix.length-1]
        for (let cell of row.cells){
            m_row.push(cell.firstChild.value||0)
        }
    }
    fetch('', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({matrix})
    })
    .then(async res=>{
        if (!res.ok) throw res
        const resObj = await res.json()
        matrixes[resObj.id] = resObj.matrix
        main.innerHTML = temp

        const ul = document.getElementById('matrixUl')
        const li = document.createElement('li')
        li.id = `matrix${resObj.id}`
        const h11 = document.createElement('h1')
        h11.innerHTML = 'del'
        h11.className='id'
        h11.onclick = () => deleteMatrix(resObj.id)
        const h12 = document.createElement('h1')
        h12.innerHTML = resObj.id
        h12.className='id'
        h12.onclick = () => activeMatrix(resObj.id)
        const div = document.createElement('div')
        div.id=`matrix${resObj.id}CheckBox`
        div.className='checkbox'
        div.onclick = () => checkMatrix(resObj.id)
        li.appendChild(h11)
        li.appendChild(h12)
        li.appendChild(div)
        ul.insertBefore(li, document.getElementById('lastLi'))

        return activeMatrix(resObj.id, `Saved id: ${resObj.id}`)
    })
    .catch(async res=>{
        let message
        try {
            message = (await res.json()).message
        }
        catch(e){}
        alert(`Error: ${message || res.status}`)
        main.innerHTML = temp
    })
    .then(_=>{
        saving=false
    })
}

function delRow(){
    const table = document.getElementById('table')
    if (table.rows.length === 1)
        return
    document.getElementById('table').deleteRow(-1)

}

function delCol(){
    const table = document.getElementById('table')
    if (table.rows[0].cells.length === 1)
        return
    let l = table.rows.length
    for (let i=0; i<l; i++){
        table.rows[i].deleteCell(-1)
    }
}

function newCol(){
    const table = document.getElementById('table')
    for (let i=0; i<table.rows.length; i++){
        const row = table.rows[i]
        const cell = row.insertCell(-1)
        cell.id = `${row.id}column${row.cells.length}`
        cell.innerHTML  = `<input value='0'></input>`
    }
}

function newRow(){
    const table = document.getElementById('table')
    const row = table.insertRow(-1)
    row.id=`row${table.rows.length}`
    for (let i=1; i<=table.rows[0].cells.length; i++){
        const cell = row.insertCell(-1)
        cell.id = `${row.id}column${i}`
        cell.innerHTML  = `<input value='0'></input>`
    }
}