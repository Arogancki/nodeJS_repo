
var active=null

async function activeFractal(id, text){
    if (active===id) return
    active=id
    const img = document.getElementById("fractalImage")
    img.src=id
    let first= true
    img.onerror = () => {
        if (img.src===window.location.href) return
        if (first){
            first=false
            img.src = '/notExistingUrl'
        }
        img.onload=()=>setTimeout(()=>alert(`Couldn't get an image - 404`),10)
    }
    img.onload=()=>{
        document.getElementById('text').innerHTML=text || ''
    }
}

function deleteFractal(id){
    if (!confirm('Are you sure?'))
        return
    fetch(id, {
        method: "DELETE"
    })
    .then(async res=>{
        if (!res.ok) throw res
        const fractal = document.getElementById(`fractal${id}`)
        fractal.parentNode.removeChild(fractal)
        fractals = fractals.filter(v=>v!==id)
        if (active===id){
            document.getElementById("fractalImage").src=''
            document.getElementById('text').innerHTML=''
        }
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
    const width= document.getElementById('width').value
    const height= document.getElementById('height').value
    const threads= document.getElementById('threads').value
    const main = document.getElementById('main')
    const temp = main.innerHTML
    main.innerHTML = "<h2>SAVING...</h2>"
    fetch('', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({width, height, threads})
    })
    .then(async res=>{
        if (!res.ok) throw res
        const resObj = await res.json()
        fractals.push(resObj.id)
        main.innerHTML = temp

        const ul = document.getElementById('fractalUl')
        const li = document.createElement('li')
        li.id = `fractal${resObj.id}`
        const h11 = document.createElement('h1')
        h11.innerHTML = 'del'
        h11.className='id'
        h11.onclick = () => deleteFractal(resObj.id)
        const h12 = document.createElement('h1')
        h12.innerHTML = resObj.id
        h12.className='id'
        h12.onclick = () => activeFractal(resObj.id)
        li.appendChild(h11)
        li.appendChild(h12)
        ul.insertBefore(li, document.getElementById('lastLi'))
        return activeFractal(resObj.id, `Saved id: ${resObj.id} - threads: ${threads}, time: ${resObj.time}ms`)
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