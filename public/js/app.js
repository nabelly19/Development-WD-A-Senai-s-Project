async function handleRegister(event) {
  event.preventDefault();

  const formRegData = {
    nameCompany : document.getElementById('nameCompany').value,
    CNPJ : document.getElementById('cnpj').value,
    CEP : document.getElementById('cep').value,
    country : document.getElementById('country').value,
    state : document.getElementById('state').value,
    city : document.getElementById('city').value,
    street : document.getElementById('street').value,
    neighborhood : document.getElementById('neighborhood').value,
    number : document.getElementById('number').value,
    complement : document.getElementById('complement').value,
    date : document.getElementById('date').value,
    filials : document.getElementById('filials').value,
    password : document.getElementById('password').value,
    confirmpassword : document.getElementById('confirmpassword').value,
  };

  if (formRegData.password !== formRegData.confirmpassword) {
    alert('As senhas não coincidem!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formRegData),
    });

    if (!response.ok) 
      throw new Error('Registro falhou');

    const data = await response.json();
    localStorage.setItem('token', data.token);

    alert('Registro bem-sucedido!');
    // Redirecionar para a página principal
    window.location.href = '/views/homepage.ejs';
  } catch (error) {
    alert(error.message);
  }
}

async function handleLogin(event) {
  event.preventDefault();

  const formLoginData = {
    login : document.getElementById('login').value,
    password : document.getElementById('password').value,
  };

  try {
    const response = await fetch('http://localhost:300/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formLoginData),
    });

    if(!response.ok) {
      throw new Error('Login falhou');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);

    alert('Login bem-sucedido!');
    window.location.href = '/views/homepage.ejs';
  } catch (error) {
    alert(error.message);
  }
}

document.getElementById('formLogin').addEventListener('submit', handleLogin);
document.getElementById('empresaForm').addEventListener('submit', handleRegister);


   
