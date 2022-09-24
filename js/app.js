const ez = document.querySelector("#ez")
const ze = document.querySelector("#ze")
const inputs = document.querySelector(".wrapper__input")
const inputs2 = document.querySelector(".wrapper__input2")
ez.addEventListener("click", (e) => {
    // ez.classList.remove("fa-eye")
    if (ez.classList.contains("fa-eye")) {
        ez.classList.toggle("fa-eye-slash")
        ez.classList.toggle("fa-eye")
        inputs.type = "password"
    } else {
        ez.classList.toggle("fa-eye-slash")
        ez.classList.toggle("fa-eye")
        inputs.type = "email"
    }
});
ze.addEventListener("click", (e) => {
    if (ze.classList.contains("fa-eye")) {
        ze.classList.toggle("fa-eye-slash")
        ze.classList.toggle("fa-eye")
        inputs2.type = "text"
    } else {
        ze.classList.toggle("fa-eye-slash")
        ze.classList.toggle("fa-eye")
        inputs2.type = "password"
    }
    // ze.classList.remove("fa-eye")

});