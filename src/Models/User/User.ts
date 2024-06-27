class User {

    digital: string;
    nome: string;
    cpf: string;
    contato: string;

    constructor(

        digital: string,
        nome: string,
        cpf: string,
        contato: string,

    ) { 
        this.digital = digital;
        this.nome = nome;
        this.cpf = cpf; 
        this.contato = contato;
    }

    public getDigital() {

        return this.digital;

    }

    public setDigital(digital: string) {

        this.digital = digital;

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
            json.digital,
            json.nome,
            json.cpf,
            json.contato,
        )
    }

}

export default User;