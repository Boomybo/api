
let input = document.getElementById("search"),
    container = document.getElementById("container"),
    form = document.getElementById("form"),
    autocomplete = document.getElementById("autocomplete-container");


async function getRepositories(value) {
    return await fetch(`https://api.github.com/search/repositories?q=${value}&per_page=5`)    
}

function closeAllLists() {
    let arr = Array.from(document.getElementsByClassName("childElement"));
        arr.forEach(elem => elem.remove());
}

let unname = () => {
    getRepositories(input.value)
        .then(res => res.json())
        .then(val => {

            let arr = val.items.map(val=>val);

            arr.forEach(val => {
                let child = document.createElement("div");
                child.classList.add("childElement");
                child.innerHTML = val.name;
                autocomplete.append(child);

                child.addEventListener("click", function() {
                    input.value = "";
                    closeAllLists();
                    
                    let block, spanName, spanOwner, spanStars, deleteButton; 

                    block = document.createElement("div");
                    block.classList.add("newBlock");
                    form.after(block);

                    spanName = document.createElement("span");
                    spanName.classList.add("span-name");
                    spanName.innerHTML = `Name: ${val.name}`;
                    block.append(spanName);

                    spanOwner = document.createElement("span");
                    spanOwner.classList.add("span-name");
                    spanOwner.innerHTML = `Owner: ${val.owner.login}`;
                    block.append(spanOwner);

                    spanStars = document.createElement("span");
                    spanStars.classList.add("span-name");
                    spanStars.innerHTML = `Stars: ${val.stargazers_count}`;
                    block.append(spanStars);

                    deleteButton = document.createElement("button");
                    deleteButton.classList.add("close");
                    block.append(deleteButton);

                    deleteButton.addEventListener("click", () => {
                        block.remove();
                    })
                })
            })

            input.addEventListener("keydown", function(e){
                closeAllLists();
            })
        })
        .catch(e => console.log(e));
}



function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay)
    }
}

input.addEventListener("input", debounce(unname, 500))
