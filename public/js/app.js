document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
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
  
  async function fetchEmpresa(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/empresa/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (response.ok) {
      const empresa = await response.json();
      console.log(empresa);
    } else {
      alert('Erro ao acessar empresa');
    }
  }