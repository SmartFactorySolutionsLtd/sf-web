import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  private fb = new FormBuilder();
  submitted = signal(false);
  sending = signal(false);
  error = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    phone: [''],
    message: ['', Validators.required],
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.error.set(false);

    const { name, email, company, phone, message } = this.form.getRawValue();
    const { serviceId, templateId, publicKey } = environment.emailjs;

    try {
      await emailjs.send(serviceId, templateId, {
        from_name: name,
        from_email: email,
        company,
        phone,
        message,
      }, publicKey);

      this.submitted.set(true);
      this.form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      this.error.set(true);
    } finally {
      this.sending.set(false);
    }
  }
}
