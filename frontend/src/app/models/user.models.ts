
export class UserModel {

    email:string
    password:string
}


export class UserSignModel extends UserModel{
    passwordConfirmation:string
}