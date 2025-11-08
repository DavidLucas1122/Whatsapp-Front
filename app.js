'use strict'



async function listagemContatos() {
    const url = `https://api-whatsapp-2-b1z5.onrender.com/v1/whatsapp/11987876567/contacts`
    const response = await fetch(url)
    const dados = await response.json()
    mostrarListaContatos(dados.contact)
}


async function mostrarListaContatos(listaContatos) {
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

        div.addEventListener('click', () => buscarConversasUsuarioContato(contato.numero))
    })
}

async function buscarConversasUsuarioContato(numeroContato) {
    const url = `https://api-whatsapp-2-b1z5.onrender.com/v1/whatsapp/conversation?numberUser=11987876567&numberContact=${numeroContato}`
    const response = await fetch(url)
    const dados = await response.json()
    mostrarConversa(dados.conversation[0])
}
    


async function mostrarConversa(conversation) {

    const container = document.getElementById('mensagens')
    const infoUser = document.getElementById('info-user')

    infoUser.replaceChildren()

    const divFoto = document.createElement('div')
    divFoto.classList.add('foto')

    const foto = document.createElement('img')
    foto.src = conversation.imagem

    const nome = document.createElement('p')
    nome.textContent = conversation.nome

    divFoto.append(foto)
    infoUser.append(divFoto, nome)

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











listagemContatos()