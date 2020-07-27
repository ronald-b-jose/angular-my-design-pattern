import { Subject } from "rxjs";
import { NotificationSource,ServiceNotificationModel } from './service-notification.model';
export class ServiceNotificationEventModel{
    constructor(public eventSource : NotificationSource,
                public notify : Subject<ServiceNotificationModel>){
            this.eventSource = eventSource;
            this.notify=notify;
    }
}