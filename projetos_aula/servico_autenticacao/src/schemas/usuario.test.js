const usuarioSchema = require('./usuario')

it('Comparando usuário válido', () => {
    const usuario = {
        nome: "Nome do usuário",
        email: "email@mail.com",
        senha: "123456"
    }

    expect(usuarioSchema.parse(usuario)).toStrictEqual(usuario)
})

it('Comparando usuário com e-mail inválido', () => {
    const usuario = {
        nome: "Nome do usuário",
        email: "email",
        senha: "123456"
    }

    try{
        usuarioSchema.parse(usuario)
    }catch(err){
        const erros = err.errors

        expect(erros[0].validation).toBe('email')
        expect(erros[0].code).toBe('invalid_string')
        expect(erros[0].message).toBe('Deve preencher um e-mail válido.')
    }
})

it('Comparando usuário com nome com menos de 05 caracteres', () => {
    const usuario = {
        nome: "Nome",
        email: "email@mail.com",
        senha: "123456"
    }

    try{
        usuarioSchema.parse(usuario)
    }catch(err){
        const erros = err.errors

        expect(erros[0].path).toContain('nome')
        expect(erros[0].code).toBe('too_small')
        expect(erros[0].message).toBe('Deve ter no mínimo 05 caracteres.')
    }
})

it('Comparando usuário com senha com menos de 06 caracteres', () => {
    const usuario = {
        nome: "Nome do usuário",
        email: "email@mail.com",
        senha: "1234"
    }

    try{
        usuarioSchema.parse(usuario)
    }catch(err){
        const erros = err.errors

        expect(erros[0].path).toContain('senha')
        expect(erros[0].code).toBe('too_small')
        expect(erros[0].message).toBe('Deve ter no mínimo 06 caracteres.')
    }
})

it('Comparando usuário sem nenhum dado', () => {
    const usuario = {
    }

    try{
        usuarioSchema.parse(usuario)
    }catch(err){
        const erros = err.errors
        
        erros.forEach(erro => {
            expect(erro.code).toBe('invalid_type')
            expect(erro.expected).toBe('string')
            expect(erro.message).toBe('Campo obrigatório.')
        })
    }
})