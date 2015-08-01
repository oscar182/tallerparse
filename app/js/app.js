Parse.initialize("jcAs2JwNoWnQeZASU8V0CBFrbT0comCThuzEisKT", "TX88jKcryN90zyPRXukKpSac5s0E82Jls1uV3sL8");
Parse.User.logOut();

// Inicializar variables
var currentUser; // Usuario actual (en localstorage)
var currentUserData; // Datos completos del usuario

//$('.parse-login').show();
showLoginOrBody();

// Evento submit para el login
$('#login-form').submit(function () {
 login();
 return false;
});

// Evento submit para el registro
$('#signup-form').submit(function () {
 signup();
 return false;
});


//-----------------------------------------------------------------------------------------

// Función de login
function login() {

  // obtener los datos de los campos del formulario
  var usuario = $('#login-username').val();
  var contrasena = $('#login-password').val();

  // llamada a la funcion de parse para login
  Parse.User.logIn(usuario, contrasena, {

    // en caso de que el login con esas credenciales sean correctas
    success: function(user) {
      console.log('login-success');

      // mostrar la ventana correspondiente para usuario autenticado
      showLoginOrBody();
      //alert("login exitoso: "+user.get('username'));


      // limpiar el formulario de login
      $('#login-username').val('');
      $('#login-password').val('');
    },

    // en caso de que el login sea erróneo
    error: function(user, error) {
      console.log('login-error');
      // mostrar popup de error
      alert('Error en inicio de sesión: ' + error.message);
    }
  });
}

//-----------------------------------------------------------------------------------------

// Función de registro
function signup() {

  // obtener los datos de los campos del formulario de registro
  var usuario = $('#signup-username').val();
  var contrasena = $('#signup-password').val();
  var email = $('#signup-email').val();

  // creación de objeto usuario parse
  var user = new Parse.User();

  // setear los valores obtenidos del formulario
  user.set("username", usuario);
  user.set("password", contrasena);
  user.set("email", email);

  // llamar a la función de parse de registro que almacena en la nube al usuario
  user.signUp(null, {

    // en caso de éxito
    success: function(user) {
      console.log('signup-success');

      // mostrar la ventana correspondiente al usuario autenticado
      showLoginOrBody();
      //alert("signup exitoso: "+user.get('username'));

      // limpiar campos del formulario de registro
      $('#signup-username').val('');
      $('#signup-password').val('');
      $('#signup-email').val('');
    },

    // en caso de error
    error: function(user, error) {
      console.log('signup-error');

      // mostrar el error correspondiente
      switch(error.code){
        case 125:
          alert("Dirección de correo inválida");
        break;
        case 142:
          alert(error.message);
        break;
        default:
          alert("Error en registro");
        break;
      } 
    }
  });
}

//-----------------------------------------------------------------------------------------

// Función para mostrar o no el login, dependiendo si está logeado o no
function showLoginOrBody() {

  // obtener el usuario actual
  currentUser = Parse.User.current();

  // en caso de que esté autenticado
  if (currentUser) {

    // mostrar el botón de inscribir en los eventos
  	//$('.boton-inscribir').show();

    // mostrar el cuerpo principal
    $('.parse-body').show();

    // esconder el panel de login y registro
    $('.parse-login').hide();

    // obtener más información del usuario
    currentUser.fetch().then(function (user) {
      
      // almacenar la información
      currentUserData = user;

      // mostrar el nombre del usuario en la página
      $('#user-span').append(currentUserData.get('username'));
      
      // en caso de que el usuario logueado sea administrador, mostrar el formulario de agregar eventos
      //if (currentUserData.get('isAdmin')) {
        $('.section-form').show();
      //}
    });

  // en caso de que no esté autenticado
  } else {

    // quitar el nombre de usuario
    $('#user-span').empty()

    // ocultar el formulario de eventos
    $('.section-form').hide();

    // ocultar los botones de inscripción
    //$('.boton-inscribir').hide();

    // ocultar la pantalla principal
    $('.parse-body').hide();

    // mostrar el login y registro
    $('.parse-login').show();
  }
  // Función logout
function logout() {

  // Función de parse que realiza el deslogueo
  Parse.User.logOut();

  // mostrar la ventana correspondiente al usuario no logueado
  showLoginOrBody();
}

}

