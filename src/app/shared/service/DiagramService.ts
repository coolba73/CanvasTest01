import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class DiagramService{

    url : string = 'http://localhost:62988/api/Diagram';

    constructor(private http : Http){}


    /*
    ############################################################################################################################
    
    SaveDiagram
    
    ############################################################################################################################
    */
    SaveDiagram(UserID:string, DiagramId:string, DiagramTitle:string, DiagramJson:string) {


        let body = new URLSearchParams();

        body.append("UserId", UserID);
        body.append("DiagramId", DiagramId);
        body.append("DiagramTitle", DiagramTitle);
        body.append("DiagramJson", DiagramJson);

        console.log(DiagramJson);

        // console.log(body.toString());

        // let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        // let options = new RequestOptions({headers:headers, method:"post" });

        // return this._http.post(this.url, body.toString(), options).map(res=>res.json());

        // 실행 되는 코드
        // ===================================================================
        
        // var params : string = `UserID=${UserID}&DiagramId=${DiagramId}&DiagramTitle=${DiagramTitle}&DiagramJson=${DiagramJson}`;

        var params = body.toString();

        return this.http.post(this.url +'?'+ params,undefined).map(res=>res.json());
        // ===================================================================

    }//SaveDiagrma

}//class