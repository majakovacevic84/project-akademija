
export class Ticket {
    _id: string;
    title:string;
    body:string;
    status:string;
    datum: Date;
    dodijeljen:string;
    documentPath:string;
    akcija:string='Tiket';

    constructor( _id: string, title:string, body:string,documentPath:string, akcija:string){
        this._id=_id;
        this.title=title;
        this.body=body;
        this.documentPath=documentPath;
        this.akcija=akcija;

    }
}



