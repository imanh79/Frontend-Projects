let shopItemsData = [{
        id: "jfhgbvnscs",
        name: "Shoes one",
        price: 45,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        img: "./image/680102.jpg",
    },
    {
        id: "ioytrhndcv",
        name: "Shoes two",
        price: 100,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        img: "./image/680104.jpg",
    },
    {
        id: "wdeswdebsn",
        name: "Shoes three",
        price: 25,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        img: "./image/680084.jpg",
    },
    {
        id: "thyfhcbcv",
        name: "Shoes four",
        price: 300,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        img: "./image/680086.jpg",
    },
];
const boxes = document.querySelectorAll('.box');
const btn = document.querySelectorAll(".button");
const add = document.querySelectorAll(".button-add");
const selectedItems = [];
const boxshoping = document.querySelector(".box-shoping")
const shopicon = document.querySelector(".fa-bag-shopping")
const iconx = document.querySelector(".fa-x");
const number = document.querySelector(".num")
const totalp = document.querySelector(".total-span")
let num = 1;
let totalPrice = 0;

function calculateTotalPrice() {
    totalPrice = selectedItems.reduce((total, item) => total + parseFloat(item.price), 0);
    console.log(totalPrice);
}

add.forEach((button, index) => {
    button.addEventListener('click', () => {
        const selectedItem = {
            id: index,
            name: boxes[index].querySelector('.title').textContent,
            desc: boxes[index].querySelector('.desc').textContent,
            img: boxes[index].querySelector('.img img').src,
            price: boxes[index].querySelector('.price').textContent,
        };

        // Check if item already exists
        const itemIndex = selectedItems.findIndex(item => item.id === selectedItem.id);
        if (itemIndex === -1) {
            selectedItems.push(selectedItem);
            // Create new box element and append it to the DOM
            const newBox = document.createElement('div');
            newBox.classList.add('box-node');
            newBox.setAttribute('data-id', selectedItem.id); // Set the ID of the box element
            newBox.innerHTML = `
                <div class="img2">
                    <img src="${selectedItem.img}" alt="">
                </div>
                <div class="parent-node">
                <h2 class="title2">${selectedItem.name}</h2>
                <p class="desc2">${selectedItem.desc}</p>
                <div class="parent-btn">
                <span class="desc22">${selectedItem.price}</span>
                <button class="removenode"><i class="fa-solid fa-trash"></i></button></div></div>`;
            boxshoping.appendChild(newBox)
            number.innerHTML = selectedItems.length
            calculateTotalPrice()
            console.log(selectedItems);
            totalp.textContent = " " + totalPrice + "$"
        }
    });
});

document.addEventListener('click', e => {
    if (e.target.classList.contains('fa-trash')) {
        const boxElement = e.target.closest('.box-node');
        const boxId = boxElement.getAttribute('data-id'); // Get the ID of the box element
        const itemIndex = selectedItems.findIndex(item => item.id == boxId);
        if (itemIndex !== -1) {
            // Remove the box element from DOM
            selectedItems.splice(itemIndex, 1); // Remove the item from selectedItems
            boxElement.remove();
            number.innerHTML = selectedItems.length
            calculateTotalPrice()
            console.log(totalPrice);
            console.log(selectedItems);
            totalp.textContent = " " + totalPrice + "$"
        }
    }
});


for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    const itemData = shopItemsData[i];
    box.querySelector('.title').textContent = itemData.name;
    box.querySelector('.desc').textContent = itemData.desc;
    box.querySelector('.price').textContent = itemData.price + "$";
    box.querySelector('.img img').src = itemData.img;
}


shopicon.addEventListener("click", () => {
    boxshoping.style.display = "block";
    boxshoping.style.opacity = 1;
    boxshoping.style.zIndex = 99;
    boxshoping.style.border = "1px solid #94949457";
    // document.querySelector(".container-box").style.pointerEvents = "none"; // غیرفعال کردن رویدادهای ماوس
    document.querySelector(".container-box").style.opacity = 0.5;
});

iconx.addEventListener("click", () => {
    boxshoping.style.display = "none";
    // document.querySelector(".container-box").style.pointerEvents = "visible"; // غیرفعال کردن رویدادهای ماوس
    document.querySelector(".container-box").style.opacity = 1;
});