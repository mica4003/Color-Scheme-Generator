const colorEl = document.getElementById("color")
const getColorBtn = document.getElementById("get-color-btn")
let colorGrid = document.getElementById("color-grid")
const colorModeSelect = document.getElementById("color-mode")
let colorMode = ""
let colorArray = []
let hexArray = []
const hexGrid = document.getElementById("hex-grid")

colorModeSelect.addEventListener("change", function () {
    colorMode = colorModeSelect.value // Update colorMode when the selection changes
})

getColorBtn.addEventListener("click", function (e) {
    e.preventDefault()
    let hexCode = colorEl.value.replace("#", "")
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${colorMode}&count=5`)
        .then(res => res.json())
        .then(data => {
            colorArray = Object.values(data.colors)
            hexArray = colorArray.map((item) => item.hex.value)
            // Clear previous color boxes and hex codes
            colorGrid.innerHTML = ""
            hexGrid.innerHTML = ""
            // Display the color scheme and corresponding hex codes
            for (const color of hexArray) {
                const colorBox = document.createElement("div")
                colorBox.classList.add("color-box")
                colorBox.style.backgroundColor = color
                colorGrid.appendChild(colorBox)

                const hexDiv = document.createElement("div")
                hexDiv.classList.add("hex-div")
                hexDiv.textContent = color
                hexGrid.appendChild(hexDiv)
                
                colorBox.addEventListener("click", () => copyToClipboard(color))
                hexDiv.addEventListener("click", () => copyToClipboard(color))
            }
        })
})  
function displayColorScheme(colors) {
    // Loop through the colors and create color boxes
    for (const color of colors) {
        const colorBox = document.createElement("div")
        colorBox.classList.add("color-box")
        colorBox.style.backgroundColor = color
        colorGrid.appendChild(colorBox)
    // Create div element to display the hex code
        const hexDiv = document.createElement("div")
        hexDiv.classList.add("hex-div")
        hexDiv.textContent = color
        hexGrid.appendChild(hexDiv)
    }
}

function copyToClipboard(text) {
    const dummyTextarea = document.createElement('textarea')
    dummyTextarea.value = text
    document.body.appendChild(dummyTextarea)
    dummyTextarea.select()
    document.execCommand('copy')
    document.body.removeChild(dummyTextarea)
    alert('Copied to clipboard: ' + text)
}


