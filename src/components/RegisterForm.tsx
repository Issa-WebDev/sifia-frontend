
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'sonner';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterForm: React.FC = () => {
  const { t } = useLanguage();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    participationType: 'visitor',
    sector: '',
    additionalInfo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setFormStep(prev => prev + 1);
  };

  const prevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a real implementation, we would send the data to a backend API
      // const response = await fetch('/api/inscription', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // const result = await response.json();
      
      // For demonstration, just show a success message
      toast.success("Form submitted successfully! Redirecting to payment...");
      console.log("Form data:", formData);
      
      // Simulate redirect to CinetPay
      setTimeout(() => {
        toast.info("Redirecting to payment gateway...");
        // In a real implementation, we would redirect to CinetPay
        // window.location.href = result.redirectUrl;
      }, 2000);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  const validateStep1 = () => {
    return formData.participationType !== '';
  };

  const validateStep2 = () => {
    return (
      formData.firstName !== '' &&
      formData.lastName !== '' &&
      formData.email !== '' &&
      formData.phone !== '' &&
      formData.country !== ''
    );
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className={`w-10 h-10 rounded-full ${formStep === 1 ? 'bg-sifia-blue' : 'bg-sifia-blue/50'} text-white flex items-center justify-center font-bold mr-2`}>1</div>
        <div className="h-1 w-12 bg-gray-300 mr-2"></div>
        <div className={`w-10 h-10 rounded-full ${formStep === 2 ? 'bg-sifia-blue' : 'bg-sifia-blue/50'} text-white flex items-center justify-center font-bold mr-2`}>2</div>
        <div className="h-1 w-12 bg-gray-300 mr-2"></div>
        <div className={`w-10 h-10 rounded-full ${formStep === 3 ? 'bg-sifia-blue' : 'bg-sifia-blue/50'} text-white flex items-center justify-center font-bold`}>3</div>
      </div>
    );
  };

  return (
    <section className="sifia-section bg-gray-50" id="register">
      <div className="sifia-container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="sifia-heading">{t('registerTitle')}</h2>
          <p className="sifia-subheading">{t('registerSubtitle')}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          {renderStepIndicator()}
          
          <form onSubmit={formStep === 3 ? handleSubmit : (e) => e.preventDefault()} className="space-y-6">
            {formStep === 1 && (
              <>
                <div>
                  <Label className="block text-sifia-blue font-medium mb-2" htmlFor="participationType">
                    {t('participationTypeLabel')} *
                  </Label>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.participationType === 'visitor' ? 'border-sifia-blue bg-sifia-blue/5' : 'border-gray-300 hover:border-gray-400'}`}
                      onClick={() => setFormData(prev => ({ ...prev, participationType: 'visitor' }))}
                    >
                      <div className="flex items-center justify-center h-12 mb-2 text-2xl">🧑</div>
                      <h3 className="font-medium text-center">{t('visitor')}</h3>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.participationType === 'exhibitor' ? 'border-sifia-blue bg-sifia-blue/5' : 'border-gray-300 hover:border-gray-400'}`}
                      onClick={() => setFormData(prev => ({ ...prev, participationType: 'exhibitor' }))}
                    >
                      <div className="flex items-center justify-center h-12 mb-2 text-2xl">🏢</div>
                      <h3 className="font-medium text-center">{t('exhibitor')}</h3>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.participationType === 'sponsor' ? 'border-sifia-blue bg-sifia-blue/5' : 'border-gray-300 hover:border-gray-400'}`}
                      onClick={() => setFormData(prev => ({ ...prev, participationType: 'sponsor' }))}
                    >
                      <div className="flex items-center justify-center h-12 mb-2 text-2xl">🤝</div>
                      <h3 className="font-medium text-center">{t('sponsor')}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="button"
                    className={`sifia-button-primary w-full ${!validateStep1() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!validateStep1()}
                    onClick={nextStep}
                  >
                    {t('submitBtn')}
                  </button>
                </div>
              </>
            )}
            
            {formStep === 2 && (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sifia-blue font-medium mb-2" htmlFor="firstName">
                      {t('firstNameLabel')} *
                    </Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="block text-sifia-blue font-medium mb-2" htmlFor="lastName">
                      {t('lastNameLabel')} *
                    </Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sifia-blue font-medium mb-2" htmlFor="email">
                      {t('emailLabel')} *
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="block text-sifia-blue font-medium mb-2" htmlFor="phone">
                      {t('phoneLabel')} *
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sifia-blue font-medium mb-2" htmlFor="company">
                      {t('companyLabel')}
                    </Label>
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label className="block text-sifia-blue font-medium mb-2" htmlFor="country">
                      {t('countryLabel')} *
                    </Label>
                    <Input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="block text-sifia-blue font-medium mb-2" htmlFor="sector">
                    Sector d'activité
                  </Label>
                  <Input
                    type="text"
                    id="sector"
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  
                  <button
                    type="button"
                    className={`sifia-button-primary ${!validateStep2() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!validateStep2()}
                    onClick={nextStep}
                  >
                    {t('submitBtn')}
                  </button>
                </div>
              </>
            )}
            
            {formStep === 3 && (
              <>
                {formData.participationType === 'exhibitor' && (
                  <div>
                    <Label className="block text-sifia-blue font-medium mb-2" htmlFor="additionalInfo">
                      Additional Information (Stand requirements)
                    </Label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sifia-blue focus:border-transparent outline-none"
                      rows={4}
                    ></textarea>
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-bold mb-2">Registration Summary</h3>
                  <p><strong>Type:</strong> {formData.participationType}</p>
                  <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Country:</strong> {formData.country}</p>
                  {formData.company && <p><strong>Company:</strong> {formData.company}</p>}
                  {formData.sector && <p><strong>Sector:</strong> {formData.sector}</p>}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    By clicking "Submit", you agree to the terms and conditions of SIFIA 2025.
                  </p>
                </div>
                
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    className="sifia-button-primary"
                  >
                    Submit and Pay
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
