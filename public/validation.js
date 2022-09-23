// trim white space + submit event listener
document.querySelector("#destinationForm").addEventListener("submit", (event) => {
    event.preventDefault();

    let titleTrim = document.querySelector("#title").value.trim();

    let locationTrim = document.querySelector("#location").value.trim();

    let descriptionTrim = document.querySelector("#description").value.trim();

});