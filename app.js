'use strict'



async function listagemContatos(numeroUser) {
    const url = `https://api-whatsapp-2-b1z5.onrender.com/v1/whatsapp/${numeroUser}/contacts`
    const response = await fetch(url)
    const dados = await response.json()
    mostrarListaContatos(dados.contact, dados.user.numero)
}


async function mostrarListaContatos(listaContatos, numeroUser) {
    const container = document.getElementById('lista-contatos')

    container.replaceChildren()

    listaContatos.forEach(contato => {
        const div = document.createElement('div')
        div.classList.add('contato')

        const nome = document.createElement('p')
        nome.textContent = contato.name

        const containerImage = document.createElement('div')
        containerImage.classList.add('foto')

        const img = document.createElement('img')
        img.src = contato.image

        div.append(containerImage, nome)
        containerImage.append(img)
        container.appendChild(div)

        div.addEventListener('click', function () {
            buscarConversasUsuarioContato(numeroUser, contato.numero)
            document.getElementById("conversa").style.display = "flex"
        })
    })
}

async function buscarConversasUsuarioContato(numeroUser, numeroContato) {
    const url = `https://api-whatsapp-2-b1z5.onrender.com/v1/whatsapp/conversation?numberUser=${numeroUser}&numberContact=${numeroContato}`
    const response = await fetch(url)
    const dados = await response.json()
    mostrarConversa(dados.conversation[0])
}



function mostrarConversa(conversation) {
    const container = document.getElementById('mensagens')
    const infoContact = document.getElementById('info-contact')

    infoContact.replaceChildren()

    const divFoto = document.createElement('div')
    divFoto.classList.add('foto')

    const foto = document.createElement('img')
    foto.src = conversation.imagem

    const nome = document.createElement('p')
    nome.textContent = conversation.nome

    divFoto.append(foto)
    infoContact.append(divFoto, nome)

    container.replaceChildren()

    conversation.message.forEach(mensagem => {
        const div = document.createElement("div")
        if (mensagem.sender == 'me') {
            div.classList.add('mensagem_usuario')
        } else {
            div.classList.add("mensagem_contato")
        }
        const texto = document.createElement("p")
        texto.classList.add('texto')
        texto.textContent = mensagem.content

        const hora = document.createElement("p")
        hora.classList.add('hora')
        hora.textContent = mensagem.time

        div.append(texto, hora)
        container.append(div)

    })
}

async function buscarInfosContato(numeroUser) {
    const url = `https://api-whatsapp-2-b1z5.onrender.com/v1/whatsapp/${numeroUser}/profile`
    const response = await fetch(url)
    const dados = await response.json()
    const foto = document.getElementById('profile')
    foto.src = dados.users[0].image

    foto.addEventListener('click', function () {
        mostrarInfosPerfil(dados.users[0])
        document.getElementById("conversa").style.display = "none"
        document.getElementById("usuario").style.display = "flex"
    })
}

function mostrarInfosPerfil(user) {
    const container = document.getElementById('container-infos')
    
    const img = document.createElement('img')
    img.src = user.image

    const divText = document.createElement('div')
    divText.classList.add('texts')

    const name = document.createElement('h3')
    name.textContent = user.nickname

    const account = document.createElement('p')
    account.textContent = user.account

    const number = document.createElement('p')
    number.textContent = user.number
    divText.append(name, account, number)
    container.append(img, divText)
}









listagemContatos('11987876567')
buscarInfosContato('11987876567')