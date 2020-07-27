import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { IDataBackendProvider } from './data-backend.provider.interface';
import { Subject } from 'rxjs';
import { ServiceNotificationModel, NotificationSource, NotificationStatus } from '../models/service-notification.model';
import { DataBackendMockProvider } from './data-backend.mock.provider';
import { ServiceNotificationEventModel } from './../models/service-notification-event.model';
@Injectable({
    'providedIn':"root"
})
export class DataService {        
    provider : IDataBackendProvider;    
    storage = sessionStorage;    
    constructor(){                   
    var notifications :  ServiceNotificationEventModel[]=[new ServiceNotificationEventModel(NotificationSource.Login, new  Subject<ServiceNotificationModel>())];
    
    //this.setProvider(new DataBackendProvider(this.http, notifications));    
    this.setProvider(new DataBackendMockProvider(notifications));        
    }

    setProvider(_provider : IDataBackendProvider){
        this.provider=_provider;
        this._notify();
    }

    private _notify(){
        this.notify(NotificationSource.Login).subscribe(g=>{
            if(this.isCompleted(g)){                        
                this.storage.setItem('access_token', g.result.token);                      
             }    
        });
    }

    notify(notifSource: NotificationSource){
        return this.provider.notifications.find(f=>f.eventSource==notifSource).notify;
    }

    private isCompleted(service :ServiceNotificationModel){
        return service.status==NotificationStatus.Completed;
    }

}
