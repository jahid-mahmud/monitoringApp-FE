import { Component, OnInit } from '@angular/core';
import { ErrorService } from './services/error.service';
import { Socket } from 'ngx-socket-io';
import { Errors } from './models/error.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  

  displayedColumns: string[] = ['namespace', 'name', 'reason','time','source','message'];
  dataSource=new MatTableDataSource<Errors>();
  errors:Errors [] = [];
  constructor(private service:ErrorService,private socket: Socket,private _snackBar: MatSnackBar) {
    this.service.getMessage().subscribe((res:Errors) => {
      this.dataSource.data = []
      let errorName = res.name || ''
      console.log(res)
      this.errors.unshift(res)
      this.dataSource.data = this.errors
      this.openSnackBar(errorName,'X')
    })
   }

  ngOnInit(): void {
    this.getRecordedErrors()
  }
  getRecordedErrors() {
    this.service.getPreviousErrors().subscribe((res:any) => {
      this.errors.push(...res)
      this.dataSource.data = this.errors
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}
