document.getElementById('empresaForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const nameCompany = document.getElementById('nameCompany').value;
    const CNPJ = document.getElementById('cnpj').value;
    const CEP = document.getElementById('cep').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const street = document.getElementById('street').value;
    const neighborhood = document.getElementById('neighborhood').value;
    const number = document.getElementById('number').value;
    const complement = document.getElementById('complement').value;
    const date = document.getElementById('date').value;
    const filials = document.getElementById('filials').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) {
        throw new Error('Login falhou');
      }
  
      const data = await response.json();
      localStorage.setItem('token', data.token);
      alert('Login bem-sucedido!');
  
      // Redirecionar para a página principal ou dashboard
      window.location.href = '/views/index.html';
    } catch (error) {
      alert(error.message);
    }
  });
