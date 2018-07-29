export class Komentar {
    _id: string;
id_tiketa: string;
komentar: string;
datum: Date;

constructor(_id: string, id_tiketa: string,  komentar: string){
    this._id=_id;
    this.id_tiketa=id_tiketa;
    this.komentar= komentar;

}
}