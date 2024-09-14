// const bcrypt = require('bcryptjs');

// // Gera um novo hash para a senha "123"
// async function hashSenha() {
//     const senha = '123';
//     const saltRounds = 10;
//     const hash = await bcrypt.hash(senha, saltRounds);
//     console.log('Novo hash gerado:', hash);
// }

// hashSenha();

// // Hash conhecido para a senha "123"
// const hashConhecido = '$2a$10$52Au901721caUkptIoZb/.yrzVYm/QXv520WNgHYCbQw9/Hhp86Xq';

// // Comparar senha com o hash
// bcrypt.compare('123', hashConhecido, function(err, result) {
//     if (result) {
//         console.log('As senhas coincidem!');
//     } else {
//         console.log('As senhas NÃO coincidem!');
//     }
// }); 

