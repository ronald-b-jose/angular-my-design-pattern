import { TestBed, async, ComponentFixture } from "@angular/core/testing";

import { LoginComponent } from './../login/login.component';
import { DataService } from '../services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataBackendProvider } from '../services/data-backend.provider';
import { DataBackendMockProvider } from '../services/data-backend.mock.provider';
import { NotificationSource, ServiceNotificationModel, NotificationStatus } from '../models/service-notification.model';
import { Observable, Observer, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ɵConsole, ElementRef } from '@angular/core';
import { ServiceNotificationEventModel } from '../models/service-notification-event.model';
export class div extends ElementRef{    
    constructor(){
        super(new HTMLDivElement());
    }
    nativeElement: any ;    
}
describe('Login Component',()=>{
    let component : LoginComponent;
    let service : DataService;    
    let backendMock : DataBackendMockProvider;
    let fixture : ComponentFixture<LoginComponent>;
    beforeEach(async(()=>{
        TestBed.configureTestingModule({      
            imports:[ HttpClientTestingModule ],
            providers:[DataService]
        }).compileComponents();
       
        fixture = TestBed.createComponent(LoginComponent);    
        component = fixture.componentInstance;        
        service = TestBed.get(DataService);   
        var notifications=[new ServiceNotificationEventModel(NotificationSource.Login, new  Subject<ServiceNotificationModel>())];     
        backendMock = new DataBackendMockProvider(notifications);
        service.setProvider(backendMock);       
        component.ngOnInit(); 
    }));
    
    it('should create component',()=>{
        expect(component).toBeTruthy();               
    });

    it('should get user login status in progress',(done)=>{
        spyOn(backendMock,'login').and.callFake((user :string , pass: string)=>{
            return new Observable((obs:Observer<any>)=>{
                obs.next('test');
            }).pipe(tap(result=>{
                service.provider.notifications.find(f=>f.eventSource==NotificationSource.Login).notify.next(new ServiceNotificationModel(NotificationSource.Login,NotificationStatus.InProgress,result))
            }));
        });

        service.provider.notifications.find(f=>f.eventSource==NotificationSource.Login).notify.subscribe(g=>{            
            done();            
            expect(g.status==NotificationStatus.InProgress).toBeTruthy();
        });
        service.provider.login('','').subscribe();       
    });

    it('should validate user and store token on session storage',(done)=>{      
        spyOn(service.provider,'login').and.callThrough();
        service.provider.notifications.find(f=>f.eventSource==NotificationSource.Login).notify.subscribe(g=>{
            if(g.status==NotificationStatus.Completed){                                
                done();                                      
                expect(service.storage.getItem("access_token")).toBeTruthy();
                expect(g.result.OK).toBeTruthy();
            }            
        });
        service.provider.login('ronald@domain.com','P@$$w0rd123').subscribe();       
        expect(service.provider.login).toHaveBeenCalled();
    });

    it('should deny user on login',(done)=>{     
        spyOn(service.provider,'login').and.callThrough();
        service.provider.notifications.find(f=>f.eventSource==NotificationSource.Login).notify.subscribe(g=>{
            if(g.status==NotificationStatus.Completed){                                
                done();                                                      
                expect(g.result.OK).toBeFalsy();
            }            
        });
        service.provider.login('ronald','P@$$w0rd123').subscribe();       
        expect(service.provider.login).toHaveBeenCalled();
    });

    it('should validate user on form submit',(done)=>{           
        fixture.detectChanges();        
        component.loginForm.get('username').setValue('ronald@domain.com');
        component.loginForm.get('password').setValue('P@$$w0rd123');
        spyOn(component,'onSubmit').and.callThrough();
        service.provider.notifications.find(f=>f.eventSource==NotificationSource.Login).notify.subscribe(g=>{
            if(g.status==NotificationStatus.Completed){                                
                done();                                      
                expect(service.storage.getItem("access_token")).toBeTruthy();
                expect(g.result.OK).toBeTruthy();
            }            
        });
        component.onSubmit();    
        expect(component.onSubmit).toHaveBeenCalled();
    });
});