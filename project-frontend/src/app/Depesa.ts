export class Depesa {
    _id: string;
    title:string;
    body:string;
    status:string;
    datum:Date;  
    akcija:string='Depesa';

    constructor( _id: string, title:string, body:string,akcija:string){
        this._id=_id;
        this.title=title;
        this.body=body;
        this.akcija=akcija;
    }
}
