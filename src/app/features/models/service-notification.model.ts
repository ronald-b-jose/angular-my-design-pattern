export class ServiceNotificationModel{
    constructor(public source? : NotificationSource, 
                public status? : NotificationStatus, 
                public result? : any){
        this.status=status;
        this.result=result;
    }
}

export enum NotificationSource{
    Login = 0
}

export enum NotificationStatus{
    NotStarted=0,
    InProgress=1,
    Completed=2,
    Error=3
}