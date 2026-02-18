function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const validEmail = "admin@gmail.com";
    const validPassword = "admin1234";

    if (email === validEmail && password === validPassword) {
        alert("Login success");
        window.location.href = "admin.html";
    } 
    else {
        alert("Wrong email or password");
    }
}
