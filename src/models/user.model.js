export default class UserModel{
    constructor(id, name , email, password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static add(name , email, password){
        const newuser = new UserModel(users.length + 1 , name, email, password);
        users.push(newuser);
    }

    static isvalidate(email, password){
        const result = users.find(p => p.email == email && p.password == password);
        return result ;
    }
}

var users = [];