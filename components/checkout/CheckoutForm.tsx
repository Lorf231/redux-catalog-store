'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Loader from '@/components/ui/Loader';

export interface CheckoutFormData {
  name: string;
  email: string;
  address: string;
}

interface CheckoutFormProps {
  isSubmitting: boolean;
  onSubmit: (data: CheckoutFormData) => void;
}

export default function CheckoutForm({ isSubmitting, onSubmit }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({ 
    name: '', 
    email: '', 
    address: '' 
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="form-control">
        <label className="label"><span className="label-text font-medium">Ім`я</span></label>
        <input 
          name="name" 
          type="text" 
          placeholder="Іван" 
          className="input input-bordered bg-white" 
          required 
          value={formData.name} 
          onChange={handleChange} 
          disabled={isSubmitting} 
        />
      </div>
      
      <div className="form-control">
        <label className="label"><span className="label-text font-medium">Email</span></label>
        <input 
          name="email" 
          type="email" 
          placeholder="ivan@mail.com" 
          className="input input-bordered bg-white" 
          required 
          value={formData.email} 
          onChange={handleChange} 
          disabled={isSubmitting} 
        />
      </div>

      <div className="form-control">
        <label className="label"><span className="label-text font-medium">Адреса</span></label>
        <textarea 
          name="address" 
          className="textarea textarea-bordered bg-white h-24" 
          placeholder="Місто, вулиця..." 
          required 
          value={formData.address} 
          onChange={handleChange} 
          disabled={isSubmitting}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary mt-4 w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader variant="spinner" size="sm" className="text-white" /> : 'Підтвердити замовлення'}
      </button>
    </form>
  );
}