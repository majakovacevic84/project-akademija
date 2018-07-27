import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatInputModule, MatTableModule, MatToolbarModule, MatSortModule  } from '@angular/material';

@NgModule({
    imports: [CommonModule, MatToolbarModule, MatInputModule, MatTableModule,MatSortModule ],
    exports: [CommonModule, MatToolbarModule, MatInputModule, MatTableModule, MatSortModule ],
})
export class CustomMaterialModule { }
