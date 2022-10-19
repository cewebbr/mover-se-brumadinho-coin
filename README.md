<h1 align="center"><img src="https://user-images.githubusercontent.com/16292535/150152830-a0077ec7-d677-4e19-b282-04401bb5a060.png" alt="logos Ceweb.br NIC.br CGI.br " width="250" height="auto"></h1>

<h1 align="center">
    <img src="https://ceweb.br/media/imgs/Moverse_na_Web_banner-site.jpg" alt="Vamos transformar Brumadinho. Projeto Mover-se na WEB!" width="450" height="auto">
</h1>


<h1 align="center"> BrumadinhoCoin </h1>

O projeto BrumadinhoCoin faz parte da chamada pública [CGI.br/NIC.br/Ceweb.br nº 01/2019
Mover-Se na Web – Articulação Pró-Brumadinho](https://ceweb.br/projetos/chamada.html)

[![Software License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://github.com/mas-cli/mas/blob/main/LICENSE)

<br/>

#  Descrição da solução

O projeto **BrumadinhoCoin**: *uma moeda ambiental solidária* foi idealizado de modo a fornecer uma solução tecnológica a ser aplicada nas questões de preservação e/ou recuperação do meio ambiente e, ao mesmo tempo, fomentar a economia local. Motivado pelo desastre ambiental ocorrido pelo rompimento de barragem na cidade de Brumadinho – MG em 2019, o projeto busca oferecer apoio tecnológico a pessoas físicas ou jurídicas que tenham interesse em patrocinar financeiramente a execução de ações ambientais conectando-as às pessoas que tem interesse em executar tais ações ambientais.

### Papeis e suas descrições

-  Contratante: responsável por cadastrar a ação ambiental a ser executada e sua descrição, alem de patrocinar o montante a ser pago.
-  Executor: ator interessado em executar a ação, enviar as provas digitais de execução (fotos e vídeos) e ao término da ação é recompensado financeiramente.
-  Autoridade: responsável por validar as provas digitais e validar a execução (ou não) liberando a transferência de valores entre o contratante e o executor.

#  Instalação

### Tecnologias utilizadas

#### PWA.

- [React](https://pt-br.reactjs.org/)
- [MUI](https://mui.com/)
- [Firebase](https://firebase.google.com/)
- [IPFS](https://ipfs.tech/)

#### Smart Contract
- [Hardhat](https://hardhat.org/)
- [Solidity](https://docs.soliditylang.org/en/v0.8.17/)
- [Ethereum](https://ethereum.org/)
- [Ropsten Testnet](https://ropsten.etherscan.io/)

## Executando a aplicação

### Pré-requisitos (Software e/ou Hardware)

Liste aqui todos os pré-requisitos no modelo abaixo.

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/). 

Para executar o projeto deve-se:
1. Compilar o smart contract e fazer deploy numa testenet (por padrão o projeto usa a Ropsten)

### 1. Compilar o smart contract e fazer deploy na Ropsten

Como material auxiliar pode-se consultar o site oficial da [Ethereum](https://ethereum.org/) que contém o [tutorial](https://ethereum.org/pt/developers/tutorials/hello-world-smart-contract/) de como realizar o deploy na Ropsten.

Por padrão o projeto utiliza a [Alchemy](https://www.alchemy.com/) como plataforma de integracao com a Ropsten <br />
para tal deve-se: 
- Criar uma conta na [Alchemy](https://www.alchemy.com/)
- Criar uma [Alchemy Key](https://docs.alchemy.com/docs/alchemy-quickstart-guide#1key-create-an-alchemy-key) selecionando a Ropsten no parâmetro `Network`
- [Criar uma conta Ethereum](https://ethereum.org/pt/developers/tutorials/hello-world-smart-contract/#step-3)
- [Adicionar Ether a essa conta](https://ethereum.org/pt/developers/tutorials/hello-world-smart-contract/#step-4)

em seguida podemos configurar o projeto:

```bash
# Clone este repositório
$ git clone https://github.com/cewebbr/mover-se-brumadinho-coin

# Acesse a pasta do projeto do smart contract no terminal
$ cd mover-se-brumadinho-coin/Bcoin-SmartContracts/

# Crie um arquivo `.env` na raiz do projeto

$ cp .env-exemple .env
```
em seguida:
- configure a variável `ROPSTEN_URL` com a versão `https` da Alchemy Key criada anteriormente
- configure a variável `ROPSTEN_SIGNER` com a chave privada da conta Ethereum criada anteriormente


```bash
# Instale as dependências
$ npm install

# Execute o script `deploy`
$ npm run deploy

```

Salve o endereço do contrato, que será exibido no final da execução do script (esse endereço será usado pelo WPA).

###  2. Configuração das variáveis de ambientes

Abra o arquivo `.env` na raiz do projeto e configure as variáveis de ambiente

```
twitter_api_key=""
twitter_api_secret=""
secret=""
DATABASE_URL=""
```
###  3. Executando a aplicação
```bash
# Execute a aplicação em modo de desenvolvimento
$ python server.py

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```

</br>

#### Solução de problemas

Descreva aqui caso existam problemas conhecidos, como pacotes, conflitos entre versões e se possível, como resolver ou um artigo que auxilie na solução. Caso não existir, omitir a seção.

<br/>

### Equipe responsável pelo projeto 

- Antonio Augusto de Aragão           - UFF - Coordenador - arocha@ic.uff.br
- Fabiano da Guia Rocha               - IFMT - Pessoa desenvolvedora - fabiano.rocha@ifmt.edu.br
- Luiz Filipe de Jesus do Nascimento  - IFMT - Pessoa desenvolvedora - luiz.nascimento@estudante.ifmt.edu.br

</br>


# Sobre o [Ceweb.br](https://ceweb.br/sobre-o-ceweb-br/), [NIC.br](https://www.nic.br/sobre/) e [CGI.br](https://cgi.br/sobre/)

### Ceweb.br - Centro de Estudos sobre Tecnologias Web
O Centro de Estudos sobre Tecnologias Web (Ceweb.br) foi criado como um departamento do Núcleo de Informação e Coordenação do Ponto BR (NIC.br) para viabilizar a participação da comunidade brasileira no desenvolvimento global da Web e subsidiar a formulação de políticas públicas. O Ceweb.br nasce inspirado pelos princípios e projetos já desenvolvidos pelo Escritório Brasileiro do W3C (World Wide Web Consortium), hospedado e apoiado pelo NIC.br no Brasil desde 2008, com a missão de promover atividades que estimulem o uso de tecnologias abertas e padronizadas na Web.


### NIC.br - Núcleo de Informação e Comunicação do Ponto BR
O Núcleo de Informação e Coordenação do Ponto BR - NIC.br foi criado para implementar as decisões e os projetos do Comitê Gestor da Internet no Brasil - CGI.br, que é o responsável por coordenar e integrar as iniciativas e serviços da Internet no País.


### CGI.br - Comitê Gestor da Internet no Brasil
O Comitê Gestor da Internet no Brasil tem a atribuição de estabelecer diretrizes estratégicas relacionadas ao uso e desenvolvimento da Internet no Brasil e diretrizes para a execução do registro de Nomes de Domínio, alocação de Endereço IP (Internet Protocol) e administração pertinente ao Domínio de Primeiro Nível ".br". Também promove estudos e recomenda procedimentos para a segurança da Internet e propõe programas de pesquisa e desenvolvimento que permitam a manutenção do nível de qualidade técnica e inovação no uso da Internet

### Equipe Ceweb.br

<ul>
    <li>Amanda Marques</li> 
    <li>Ana Eliza</li>
    <li>Beatriz Rocha</li>
    <li>Caroline Burle</li>
    <li>Diego Cerqueira</li>
    <li>Diogo Cortiz</li>
    <li>Juliana Ribeiro</li>
    <li>Reinaldo Ferraz</li>
    <li>Selma de Morais</li>
    <li>Vagner Diniz</li>
</ul>
