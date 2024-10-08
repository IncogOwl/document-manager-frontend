import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule 
  ],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  documents: any[] = [];

  constructor(private router: Router, private documentService: DocumentService) {}

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {
    this.documentService.getDocuments().subscribe(
      (data) => {
        this.documents = data;
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  goToAddDocument() {
    this.router.navigate(['/document']);
  }

  deleteDocument(id: number) {
    this.documentService.deleteDocument(id).subscribe(
      () => {
        this.loadDocuments();
      },
      (error) => {
        console.error('Error deleting document:', error);
      }
    );
  }
}