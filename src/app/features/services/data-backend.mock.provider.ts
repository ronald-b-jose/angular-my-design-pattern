import { IDataBackendProvider } from "./data-backend.provider.interface";
import { Observable, Observer, Subject, of } from "rxjs";
import { tap, delay } from "rxjs/operators";
import { ServiceNotificationModel, NotificationSource, NotificationStatus } from '../models/service-notification.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ServiceNotificationEventModel } from '../models/service-notification-event.model';

export class DataBackendMockProvider implements IDataBackendProvider{
    constructor(private serviceNotificationModel :  ServiceNotificationEventModel[]){
        this.notifications=serviceNotificationModel;
    }

    fakeUsers = [{
        userName:'ronald@domain.com',
        password:'P@$$w0rd123'
    },{
        userName:'user@domain.com',
        password:'1234'
    }];

    notifications : ServiceNotificationEventModel[];
    
    login(userName: string, password: string): Observable<any> {
        console.log('local');
        this.notifications.find(f=>f.eventSource==NotificationSource.Login)
                         .notify
                         .next(new ServiceNotificationModel(NotificationSource.Login,
                                                            NotificationStatus.InProgress,
                                                            null));
        return new Observable((obs:Observer<any>)=>{
            var result :any = this.fakeUsers.find(f=>f.userName==userName && f.password==password) ? 
            { token:'asdasdasjkjdeqweu08302174234kjdas8dy1232asd', 
              OK: true } : 
            { message : 'invalid username or password', 
              response : new HttpErrorResponse({error:'invalid username or password',status:401}),
              OK:false };   
                       
            obs.next(result);
            return result;           
        }).pipe(
            delay(3000),
            tap((result)=>this.notifications.find(f=>f.eventSource==NotificationSource.Login)
                                           .notify
                                           .next(new ServiceNotificationModel(NotificationSource.Login,
                                                                              NotificationStatus.Completed,
                                                                              result))));
    }
}