import { Component,Inject,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.scss']
})
export class EmpComponent implements OnInit {
  empForm:FormGroup;
  education:string[]=['Matric','Intermediate','Dipolama','Graduate','PostGraduate'];
  constructor(private _fb:FormBuilder,
    private _empService:EmployeeService,
    private _dialogRef:MatDialogRef<EmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ){
    this.empForm=this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
    })
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }


  onFormSubmit(){
    if(this.empForm.valid){
      this._empService.addEmployee(this.empForm.value).subscribe({
        next:(val:any) =>{
alert('Employee added successfully');
this._dialogRef.close();
        },
        error: (err:any)=>{
          console.error(err)
        }
      }) ;
        } else {
          this._empService.addEmployee(this.empForm.value).subscribe({
            next: (val: any) => {
              alert('Employee added successfully');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }
      }
  
  }

