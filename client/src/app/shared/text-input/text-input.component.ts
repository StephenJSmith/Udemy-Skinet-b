import { Component, OnInit, ViewChild, ElementRef, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() type = 'text';
  @Input() label: string;

  get isPending(): boolean {
    return this.controlDir
      && this.controlDir.control
      && this.controlDir.control.status === 'PENDING';
  }

  get isInvalidFeedback(): boolean {
    return this.controlDir
      && this.controlDir.control
      && this.controlDir.control.invalid
      && this.controlDir.control.touched;
  }

  get isRequired(): boolean {
    return this.isInvalidFeedback
      && this.controlDir.control.errors?.required;
  }

  get isInvalidFormat(): boolean {
    return this.isInvalidFeedback
      && this.controlDir.control.errors?.pattern;
  }

  get isEmailExists(): boolean {
    return (this.isInvalidFeedback
      || this.controlDir.control.dirty)
      && this.controlDir.control.errors?.emailExists;
  }

  get controlClass(): string {
    if (!this.controlDir
      || !this.controlDir.control
      || !this.controlDir.control.touched) {
      return null;
    }
    if (this.isInvalidFeedback) {
      return 'is-invalid';
    }

    return 'is-valid';
  }

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control.validator
      ? [control.validator]
      : [];
    const asyncValidators = control.asyncValidator
      ? [control.asyncValidator]
      : [];

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);
    control.updateValueAndValidity();
  }

  onChange(event) { }

  onTouched() { }

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
