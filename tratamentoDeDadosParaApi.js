btnEnviar = document.querySelector('#btnEnviar');

  btnEnviar.addEventListener('click',(e) => {
    e.preventDefault();

    // Seleciona o formulário pelo ID
    const form = document.querySelector("#meuFormulario");

    // Cria um objeto FormData a partir do formulário
    const formData = new FormData(form);

    // Cria um objeto vazio para armazenar os dados do formulário
    const dadosDoFormulario = {};

    // Itera sobre os pares chave/valor do objeto FormData e armazena-os no objeto de dados do formulário
    for (let chave of formData.keys()) {
      dadosDoFormulario[chave] = formData.get(chave);
    }

    // Verificando se o cargo e a quantidade de vendedores cumpre o escopo exigido
    if(dadosDoFormulario.role == 'gestor_de_vendas' && dadosDoFormulario.qtdVendedores == '4_ou_mais'){
      //Pegando os dados da empresa
      const dadosEmpresa = {
        name: dadosDoFormulario.legalName,
        customFields: {
          quantidade_de_vendedores: dadosDoFormulario.qtdVendedores,
        }
      }
      
      //Pegando os dados da pessoa
      const dadosPessoa = {
        name: dadosDoFormulario.name,
        contact : {
          email: dadosDoFormulario.email
        },
        role: dadosDoFormulario.role,
      }

      //Pegando os dados do negocio
      const dadosNegocio = {
        title: dadosDoFormulario.legalName,
      }

      // POST para o cadastro de empresas
      fetch("https://api.agendor.com.br/v3/organizations/upsert", {
        method: "POST",
        body: JSON.stringify(dadosEmpresa),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          Authorization: `Token 37d7a09f-5328-4d72-a154-0db3d5d85167`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao enviar os dados");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });

      // POST para o cadastro de pessoas
      fetch("https://api.agendor.com.br/v3/people/upsert", {
        method: "POST",
        body: JSON.stringify(dadosPessoa),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          Authorization: `Token 37d7a09f-5328-4d72-a154-0db3d5d85167`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao enviar os dados");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });

        // POST para o cadastro de negócios
      fetch("https://api.agendor.com.br/v3/organizations/31865980/deals", {
        method: "POST",
        body: JSON.stringify(dadosNegocio),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          Authorization: `Token 37d7a09f-5328-4d72-a154-0db3d5d85167`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao enviar os dados");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
        
        // Limpando o form
        form.reset();
    } else{
      //Caso o escopo exigido não seja cumprido formulário sera enviado normalmente sem captar os dados pro CRM
      form.submit();
    }
  })