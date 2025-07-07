import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, GraduationCap, Shield, CheckCircle } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import FileUpload from '../../components/common/FileUpload';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Personal Data
    phone: '',
    city: '',
    cpf: '',
    
    // Step 2: Professional Experience
    experience: '',
    specialties: [] as string[],
    description: '',
    
    // Step 3: Education (optional)
    education: '',
    institution: '',
    graduationYear: '',
    
    // Step 4: Documents
    acceptTerms: false
  });

  const [files, setFiles] = useState({
    avatar: [] as File[],
    documents: [] as File[]
  });

  const steps = [
    { id: 1, title: 'Dados Pessoais', icon: User },
    { id: 2, title: 'Experiência', icon: FileText },
    { id: 3, title: 'Formação', icon: GraduationCap },
    { id: 4, title: 'Documentos', icon: Shield }
  ];

  const specialtyOptions = [
    'Elétrica Residencial', 'Elétrica Comercial', 'Elétrica Industrial',
    'Hidráulica Residencial', 'Hidráulica Comercial', 'Encanamento',
    'Marcenaria', 'Móveis Planejados', 'Restauração',
    'Limpeza Residencial', 'Limpeza Comercial', 'Limpeza Pós-Obra',
    'Jardinagem', 'Paisagismo', 'Manutenção de Jardins',
    'Pintura Residencial', 'Pintura Comercial', 'Textura'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSpecialtyChange = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      navigate('/dashboard');
    } catch (error) {
      alert('Erro ao finalizar cadastro');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.phone && formData.city && formData.cpf;
      case 2:
        return formData.experience && formData.specialties.length > 0 && formData.description;
      case 3:
        return true; // Optional step
      case 4:
        return formData.acceptTerms && files.avatar.length > 0 && files.documents.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete seu cadastro profissional
          </h1>
          <p className="text-gray-600">
            Preencha as informações para começar a receber trabalhos
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep >= step.id ? 'text-primary-600' : 'text-gray-400'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-primary-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-card p-8">
          {/* Step 1: Personal Data */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Dados Pessoais
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="São Paulo, SP"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPF/CNPJ *
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    placeholder="000.000.000-00"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Experience */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Experiência Profissional
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anos de experiência *
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Selecione</option>
                  <option value="1-2">1-2 anos</option>
                  <option value="3-5">3-5 anos</option>
                  <option value="6-10">6-10 anos</option>
                  <option value="10+">Mais de 10 anos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especialidades * (selecione pelo menos uma)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {specialtyOptions.map(specialty => (
                    <label key={specialty} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.specialties.includes(specialty)}
                        onChange={() => handleSpecialtyChange(specialty)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição profissional *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Conte sobre sua experiência, diferenciais e tipo de trabalho que realiza..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          )}

          {/* Step 3: Education */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Formação Acadêmica (Opcional)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Curso
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="Ex: Engenharia Elétrica"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instituição
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="Ex: USP"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ano de conclusão
                  </label>
                  <input
                    type="number"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    placeholder="2020"
                    min="1950"
                    max={new Date().getFullYear()}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Documents */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Documentos e Verificação
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto de perfil *
                </label>
                <FileUpload
                  accept="image/*"
                  maxSize={5}
                  onFilesChange={(files) => setFiles(prev => ({ ...prev, avatar: files }))}
                  label="Adicione uma foto profissional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Documentos de identificação * (RG, CPF, CNH)
                </label>
                <FileUpload
                  accept="image/*,.pdf"
                  multiple
                  maxSize={5}
                  onFilesChange={(files) => setFiles(prev => ({ ...prev, documents: files }))}
                  label="Adicione seus documentos (frente e verso)"
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                  Li e aceito os{' '}
                  <a href="/terms" className="text-primary-600 hover:text-primary-700">
                    Termos de Uso
                  </a>{' '}
                  e{' '}
                  <a href="/privacy" className="text-primary-600 hover:text-primary-700">
                    Política de Privacidade
                  </a>
                  . Autorizo o tratamento dos meus dados pessoais conforme a LGPD.
                </label>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Próximo
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid() || loading}
                className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading && <LoadingSpinner size="sm" />}
                <span>{loading ? 'Finalizando...' : 'Finalizar Cadastro'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;