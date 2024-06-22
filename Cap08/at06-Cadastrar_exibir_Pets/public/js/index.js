
var urlServidor = "http://localhost:3200"
function toggleMenu(){
    let btnToggleMenu
    btnToggleMenu = document.getElementById('btnToggleMenu');
    if (btnToggleMenu.getAttribute('aria-expanded')){
        btnToggleMenu.click()
    }
    
}
