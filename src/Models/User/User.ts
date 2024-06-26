class User {

    codigo: number;
    nome: string;
    cpf: string;
    contato: string;

    constructor(

        codigo: number,
        nome: string,
        cpf: string,
        contato: string,

    ) { 
        this.codigo = codigo;
        this.nome = nome;
        this.cpf = cpf; 
        this.contato = contato;
    }

    public getCodigo() {

        return this.codigo;

    }

    public setCodigo(codigo: number) {

        this.codigo = codigo;

    }

    public getNome() {

        return this.nome;

    }

    public setNome(nome: string) {

        this.nome = nome;

    }

    public getCpf() {

        return this.cpf;

    }

    public setCpf(cpf: string) {

        this.cpf = cpf

    }

    public getContato() {

        return this.contato;

    }

    public setContato(contato: string) {

        this.contato = contato;

    }

    public static fromJson(json: User): User {
        return new User(
            json.codigo,
            json.nome,
            json.cpf,
            json.contato,
        )
    }

}

export default User;