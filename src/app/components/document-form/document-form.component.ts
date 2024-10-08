import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './document-form.component.html',
  styleUrl: './document-form.component.css'
})
export class DocumentFormComponent {
  title: string = '';
  selectedFile: File | null = null;

  constructor(private router: Router, private documentService: DocumentService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadDocument() {
    if (this.title && this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('file', this.selectedFile);
      formData.append('file_type', this.selectedFile.name.split('.').pop() || '');

      this.documentService.uploadDocument(formData).subscribe(
        (response) => {
          console.log('Document uploaded successfully', response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error uploading document:', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}