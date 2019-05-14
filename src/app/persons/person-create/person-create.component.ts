import { Component, OnInit } from '@angular/core';
import { CanDeactivateGuard } from "./../../shared/guards/can-deactivate.guard";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PersonService } from "./../../shared/services/person.service";
import { Router } from '@angular/router';
import { MessagesService } from  "./../../shared/services/messages.service";

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.sass']
})
export class PersonCreateComponent implements OnInit {
  createForm: FormGroup;
  avatarUrl: string = '';
  public editInProgress = false;
  
  constructor(  
    private fb:FormBuilder,
    private personService: PersonService,
    private router: Router,
    private msgService: MessagesService
    
    ) { }

  ngOnInit() {
   setTimeout( () => {this.editInProgress= true}, 1000) 
   this.buildForm();
  }

  buildForm() {
    this.createForm = this.fb.group({
      avatar: [''],
      email:     ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name:  ['', [Validators.required]],
      password:  ['', [Validators.required]],
    })

    this.createForm.valueChanges.subscribe(() => {
      if (this.createForm.touched || this.createForm.dirty) {
        this.editInProgress = true;
      }
    }
  );
  }

  save(e) {
    e.preventDefault();
    this.editInProgress = false;
    let mockObj = {"name": "morpheus","job": "leader"};
    let newPerson = {...this.createForm.value,  avatar: this.avatarUrl }
    this.personService.createPersone(newPerson, mockObj )
      .subscribe( () => { 
        this.msgService.setMessage({
          type: 'success',
          body: 'Пользователь успешно создан!'
        });

        setTimeout(() => {
          this.router.navigate(['/persons']);
        }, 1800);
    })
  }

  
  onAttachPic(e){
    console.log('photo', e.target.files)
    if(e.target.files && e.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])

      reader.onload = (e) => {
        // console.log("event.target['result']", event.target['result'] )
        this.avatarUrl = event.target['result']
      }

    }
  }
}
