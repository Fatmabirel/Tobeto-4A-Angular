import { CategoriesService } from './../../services/categories.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewCategory } from '../../models/new-category';
import { FormControlErrorMessagePipe } from '../../pipes/formControlErrorMessage.pipe';
import { AppNoCharacterInputDirective } from '../../directives/appNoCharacterInput.directive';

@Component({
  selector: 'app-new-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlErrorMessagePipe,
    AppNoCharacterInputDirective
  ],
  templateUrl: './new-category-form.component.html',
  styleUrl: './new-category-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCategoryFormComponent implements OnInit {

  newCategoryFormGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.newCategoryFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  add() {
    const newCategory: NewCategory = {
      name: this.newCategoryFormGroup.value.name,
      description: this.newCategoryFormGroup.value.description,
    };
    this.categoriesService.add(newCategory).subscribe({
      next: (addedCategory) => {
        // Next: Observable yapı herhangi bir değer döndürdüğünde çalışır.
        console.log('Category added', addedCategory);
      },
      error: (error) => {
        // Error: Observable yapı hata verdiğinde çalışır.
        console.error('Error adding category', error);
      },
      complete: () => {
        // Complete: Observable yapı tamamen bittiğinde, bir daha next çalışmayacağında, çalışır.
        console.log('Add category complete');
      },
    });
  }

  onFormSubmit() {
    if (this.newCategoryFormGroup.invalid) {
      console.error('Form is invalid');
      return;
    }

    this.add();
  }
}