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


    /*
    ############################################################################################################################
    
    SaveDiagramByJson
    
    ############################################################################################################################
    */
    SaveDiagramByJson(UserID:string, DiagramId:string, DiagramTitle:string, DiagramJson:string ){
        
        
        // {
        //     "userid" : "test",
        //     "diagramid" : "test",
        //     "diagramtitle"  : "test",
        //     "diagramjson" :
        //     [
        //         {"FillColor":"lightgreen","LineColor":"gray","Type":"BoxBase","x":10,"y":10,"Width":100,"Height":100,"Title":"0","Id":"3d3f0bb2-cbd1-fac9-6517-15a587608084"},
        //         {"FillColor":"lightgreen","LineColor":"gray","Type":"BoxBase","x":10,"y":10,"Width":100,"Height":100,"Title":"1","Id":"d00454bd-93f5-05ad-f36c-6c5b523ac46c"}
        //     ]
        // }

        let body = JSON.stringify({
            userid : UserID,
            diagramid : DiagramId,
            diagramtitle : DiagramTitle,
            diagramjson : DiagramJson
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:62988/api/Diagram2', body, options).map(res=>res.json());

    }

    /*
    ############################################################################################################################
    
    OpenDiagram
    
    ############################################################################################################################
    */
    OpenDiagram(key1:string,key2:string){

        let body = new URLSearchParams();

        body.append("key1",key1);
        body.append("key2",key2);
        
        return this.http.get('http://localhost:62988/api/Diagram2/getdiagram', {search:body.toString()} ).map(res=>res.json());
        
    }

}//class