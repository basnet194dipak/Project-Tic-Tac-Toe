



// build a grid
function build_playground() {
    playground = document.querySelector(".playground")
    for (let i = 0; i < 9; i++) {
        div = document.createElement("button")
        div.setAttribute("id", i)
        div.innerText = i
        div.addEventListener("click", () => {
            // fill this later
        })
        playground.appendChild(div)
    }


}
document.addEventListener("DOMContentLoaded", () => {
    build_playground()
})