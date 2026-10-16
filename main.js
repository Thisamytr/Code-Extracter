const input = document.querySelector("#input");
const extract = document.querySelector("#extract");
const clear = document.querySelector("#clear");



const out = document.querySelector("#out");
const how = document.querySelector("#how");
const code = document.querySelector("#code");

const copy = document.querySelector("#copy");

function extractCode(text) {
    let item = text.match(/➡\s*(.+?)\s*⬅/u);
    console.log(item);
    if (item) {
        return { code: item[1], how: "Found between the arrows" };
    }

    let link = text.match(/advertise(?:%3D|=)([A-Za-z0-9]+)/);
    if (link) {
        return { code: link[1], how: "Found inside the link" };
    }

    return null;
}


document.addEventListener("DOMContentLoaded",loadText);

extract.addEventListener("click", () => {
    const text = input.value.trim();

    const result = extractCode(text);

    out.hidden = false;

    if (result) {
        code.textContent = result.code;
        how.textContent = result.how;
        copy.hidden = false;

        saveTasks(result);
    }
    else {
        code.textContent = "No code found";
        how.textContent = "";
        copy.hidden = true;
    }

})


clear.addEventListener("click",()=>{
    out.hidden = true;
    input.value = "";
})

copy.addEventListener("click",()=>{
    let text = code.innerText;
    // console.log(text);
    let done = ()=>{
        setTimeout(()=>{
            copy.textContent = "Copied ✓";
        },1000);
    }

    if(navigator.clipboard)
    {
        navigator.clipboard.writeText(text)
        .then(done,function(){});
    }
});

function getTasks()
{
    let tasks ;
    if(localStorage.getItem("tasks") === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    return tasks;
}

function saveTasks(task)
{
    let tasks =  getTasks();
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadText()
{
     let tasks =  getTasks();
     const lastTask  = tasks[tasks.length -1];
     if(lastTask)
     {
        out.hidden=false;
        code.textContent = lastTask.code;
        how.textContent = lastTask.how;
        copy.hidden = false;

     }

}
