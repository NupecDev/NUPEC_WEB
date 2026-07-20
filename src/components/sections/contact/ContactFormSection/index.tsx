'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const MEXICO_STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango',
  'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco',
  'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
  'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora',
  'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas',
] as const;

type FormState = {
  name: string;
  email: string;
  phone: string;
  state: string;
  contactType: 'consumer' | 'vet';
  subject: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  phone: '',
  state: '',
  contactType: 'consumer',
  subject: '',
  message: '',
};

export default function ContactFormSection() {
  const t = useTranslations('contacto.form');
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData(INITIAL_STATE);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    /*
      Reutiliza contact-section / default-form del template (contact.css),
      extendido con los campos reales del formulario de nupec.com/contacto.
    */
    <section className="contact-section sec-pad">
      <div
        className="pattern-layer"
        style={{ backgroundImage: 'url(/assets/images/shape/shape-42.png)' }}
      />
      <div className="auto-container">
        <div className="inner-box">
          <h2>{t('title')}</h2>
          <form onSubmit={handleSubmit} className="default-form">
            <div className="row clearfix">
              <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('namePlaceholder')}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('emailPlaceholder')}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('phonePlaceholder')}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                <select name="state" required value={formData.state} onChange={handleChange}>
                  <option value="" disabled>
                    {t('statePlaceholder')}
                  </option>
                  {MEXICO_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                <label className="contact-form__radio-label">{t('contactTypeLabel')}</label>
                <div className="contact-form__radio-group">
                  <label className="contact-form__radio">
                    <input
                      type="radio"
                      name="contactType"
                      value="consumer"
                      checked={formData.contactType === 'consumer'}
                      onChange={handleChange}
                    />
                    {t('contactTypeConsumer')}
                  </label>
                  <label className="contact-form__radio">
                    <input
                      type="radio"
                      name="contactType"
                      value="vet"
                      checked={formData.contactType === 'vet'}
                      onChange={handleChange}
                    />
                    {t('contactTypeVet')}
                  </label>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('subjectPlaceholder')}
                />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('messagePlaceholder')}
                />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                <button type="submit" className="theme-btn btn-two" disabled={status === 'loading'}>
                  <span>{status === 'loading' ? t('sending') : t('submit')}</span>
                </button>
              </div>
            </div>

            {status === 'success' && <p className="contact-form__status contact-form__status--ok">{t('success')}</p>}
            {status === 'error' && <p className="contact-form__status contact-form__status--error">{t('error')}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
