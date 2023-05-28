
let themeColor = window.localStorage.getItem('tema');

const body = document.getElementById('body');
const radios = document.querySelectorAll('input[name="theme"]');

//Canviem el tema segons la sel·lecció i la guardem a l'storage
function selectTheme(theme){
    switch (theme){
        case 'dark':
            body.classList.remove('light');
            body.classList.add('dark');
            window.localStorage.setItem('tema', "dark");

        break;
        case 'light':
            body.classList.remove('dark');
            body.classList.add('light');
            window.localStorage.setItem('tema', "light");
        break;
        default:
            break;
    }
}
//Recollim la sel·lecció
radios.forEach(x => {
    x.addEventListener('change', function(){
        selectTheme(this.value);
    })
}); 
//Canviem el check segons la sel·lecció
updateRadio = ( value ) => {
    if( value ==="dark"){
        document.querySelector("#radioDark").checked=true;
        document.querySelector("#radioLight").checked=false;
    }
    else{
        document.querySelector("#radioDark").checked=false;
        document.querySelector("#radioLight").checked=true;
    }
}
//Comprovem si ja hi ha una sel·lecció
if (themeColor) {
    selectTheme(themeColor);
    updateRadio(themeColor);
}

