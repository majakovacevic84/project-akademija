export class Depesa {
    _id: string;
    title:string;
    body:string;
    status:string;
    datum:Date;  
    akcija:string='Depesa';
    documentPath:string;

    constructor( _id: string, title:string, body:string,akcija:string, documentPath:string){
        this._id=_id;
        this.title=title;
        this.body=body;
        this.akcija=akcija;
        this.documentPath=documentPath;
    }
}
