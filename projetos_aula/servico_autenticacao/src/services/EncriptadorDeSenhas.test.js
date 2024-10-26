const encriptador = require('./EncriptadorDeSenhas')

const senha = "123456"
let hashGerado = ""

beforeAll(async () => {
    hashGerado = await encriptador.encriptar(senha)
})

it('Comparando senha correta', async () => {
    const resultado = await encriptador.comparar(hashGerado, senha)

    expect(resultado).toBeTruthy()
})

it('Comparando senha incorreta', async () => {
    const senhaIncorreta = "123"

    const resultado = await encriptador.comparar(hashGerado, senhaIncorreta)

    expect(resultado).toBe(false)
})

it('Comparando hash incorreto', async () => {
    const hashEsperado = "$2b$10$R1/cZgM20Rlcp4gx55vTEOl2pTbHZQ5K.VhQKG1xWmhVs915URG0bW"

    const resultadoErrado = await encriptador.comparar(hashEsperado, senha)

    expect(resultadoErrado).toBe(false)
})