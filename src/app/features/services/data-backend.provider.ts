import { IDataBackendProvider } from "./data-backend.provider.interface";
import { Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import { ServiceNotificationEventModel } from '../models/service-notification-event.model';


export class DataBackendProvider implements IDataBackendProvider{
    constructor(serviceNotificationModel : ServiceNotificationEventModel[]){
        this.notifications=serviceNotificationModel;
    }

    notifications : ServiceNotificationEventModel[];
    login(userName: string, password: string): Observable<any> {
        throw new Error("Method not implemented.");
    }
   
}