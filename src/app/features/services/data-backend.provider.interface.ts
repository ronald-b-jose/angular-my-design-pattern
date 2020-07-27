import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ServiceNotificationModel, NotificationSource } from '../models/service-notification.model';
import { ServiceNotificationEventModel } from '../models/service-notification-event.model';
export interface IDataBackendProvider{
    notifications :ServiceNotificationEventModel[];
    login(userName : string , password : string) : Observable<any>;        
}

