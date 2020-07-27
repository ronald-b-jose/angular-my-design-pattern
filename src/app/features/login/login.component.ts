import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service : DataService) { }

  loginForm : FormGroup ;
  loginStatus = {validated:false,authenticated:false};

  @ViewChild("loading") _loading: ElementRef;  
  
  ngOnInit(): void {            
    this.loginForm = new FormGroup({
      username : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required)      
    });    
    
    this.loginForm.valueChanges.subscribe(text=>{
      this.loginStatus.validated=false;
      this.loginStatus.authenticated= false;
    });
  }

  onSubmit(){    
        
    this._loading.nativeElement.style.display = "block";
    console.log(this.loginForm); 
    this.service.provider.login(this.loginForm.get('username').value,
                                this.loginForm.get('password').value)
                         .subscribe(data=>{
      console.log(data);
      this.loginStatus.validated=true;
      this.loginStatus.authenticated= data.OK;    
      this._loading.nativeElement.style.display = "none";
    });
  }  

}
