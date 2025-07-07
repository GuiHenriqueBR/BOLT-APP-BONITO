import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText, 
  Camera,
  Plus,
  X,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import FileUpload from '../../components/common/FileUpload';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const CreateRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [attachments, setAttachments] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    description: '',
    type: 'presential' as 'online' | 'presential',
    budget: '',
    budgetType: 'fixed' as 'fixed' | 'range' | 'negotiable',
    budgetMax: '',
    desiredDate: '',
    urgency: 'normal' as 'low' | 'normal' | 'high' | 'urgent',
    location: {
      city: '',
      state: '',
      neighborhood: '',
      address: ''
    },
    requirements: [] as string[],
    newRequirement: ''
  });

  const categories = [
    {
      id: 'eletrica',
      name: 'Elétrica',
      subcategories: ['Instalação', 'Reparo', 'Manutenção', 'Projeto Elétrico']
    },
    {
      id: 'hidraulica',
      name: 'Hidráulica',
      subcategories: ['Vazamento', 'Entupimento', 'Instalação', 'Reparo']
    },
    {
      id: 'marcenaria',
      name: 'Marcenaria',
      subcategories: ['Móveis Planejados', 'Reparo', 'Restauração', 'Instalação']
    },
    {
      id: 'limpeza',
      name: 'Limpeza',
      subcategories: ['Residencial', 'Comercial', 'Pós-obra', 'Profunda']
    },
    {
      id: 'jardinagem',
      name: 'Jardinagem',
      subcategories: ['Paisagismo', 'Manutenção', 'Poda', 'Plantio']
    },
    {
      id: 'pintura',
      name: 'Pintura',
      subcategories: ['Residencial', 'Comercial', 'Textura', 'Decorativa']
    }
  ];

  const selectedCategoryData = categories.find(cat => cat.id === formData.category);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addRequirement = () => {
    if (formData.newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, prev.newRequirement.trim()],
        newRequirement: ''
      }));
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/request-success');
    } catch (error) {
      alert('Erro ao publicar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.category && formData.description;
      case 2:
        return formData.type === 'online' || (formData.location.city && formData.location.state);
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Publicar Pedido</h1>
          <p className="text-gray-600">Descreva seu projeto e receba propostas de profissionais qualificados</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
              {step < 3 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step ? 'bg-primary-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card-modern p-8">
            
            {/* Step 1: Project Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detalhes do Projeto</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título do Projeto *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ex: Instalação de pontos elétricos na sala"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Selecione uma categoria</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategoria
                    </label>
                    <select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      disabled={!selectedCategoryData}
                    >
                      <option value="">Selecione uma subcategoria</option>
                      {selectedCategoryData?.subcategories.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição Detalhada *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Descreva seu projeto em detalhes: o que precisa ser feito, materiais necessários, prazo, etc."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Tipo de Serviço *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all duration-300 ${
                      formData.type === 'presential' 
                        ? 'border-primary-600 bg-primary-50 text-primary-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="type"
                        value="presential"
                        checked={formData.type === 'presential'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-semibold">Presencial</div>
                      <div className="text-sm text-gray-500">O profissional vai até você</div>
                    </label>

                    <label className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all duration-300 ${
                      formData.type === 'online' 
                        ? 'border-primary-600 bg-primary-50 text-primary-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="type"
                        value="online"
                        checked={formData.type === 'online'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <FileText className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-semibold">Online</div>
                      <div className="text-sm text-gray-500">Serviço remoto ou consultoria</div>
                    </label>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requisitos Específicos
                  </label>
                  <div className="space-y-3">
                    {formData.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <span className="flex-1 text-sm">{req}</span>
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={formData.newRequirement}
                        onChange={(e) => setFormData(prev => ({ ...prev, newRequirement: e.target.value }))}
                        placeholder="Adicionar requisito..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addRequirement();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={addRequirement}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location & Schedule */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Localização e Agendamento</h2>
                
                {formData.type === 'presential' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Localização do Serviço</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cidade *
                        </label>
                        <input
                          type="text"
                          name="location.city"
                          value={formData.location.city}
                          onChange={handleChange}
                          placeholder="São Paulo"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estado *
                        </label>
                        <select
                          name="location.state"
                          value={formData.location.state}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        >
                          <option value="">Selecione</option>
                          <option value="SP">São Paulo</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="PR">Paraná</option>
                          <option value="SC">Santa Catarina</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bairro
                        </label>
                        <input
                          type="text"
                          name="location.neighborhood"
                          value={formData.location.neighborhood}
                          onChange={handleChange}
                          placeholder="Vila Madalena"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Endereço Completo
                        </label>
                        <input
                          type="text"
                          name="location.address"
                          value={formData.location.address}
                          onChange={handleChange}
                          placeholder="Rua das Flores, 123"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Prazo e Urgência</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data Desejada
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="date"
                          name="desiredDate"
                          value={formData.desiredDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Urgência
                      </label>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="low">Baixa - Posso esperar</option>
                        <option value="normal">Normal - Algumas semanas</option>
                        <option value="high">Alta - Alguns dias</option>
                        <option value="urgent">Urgente - Hoje/amanhã</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Budget & Attachments */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Orçamento e Anexos</h2>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Orçamento</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Orçamento
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { id: 'fixed', name: 'Valor Fixo', desc: 'Tenho um valor específico' },
                          { id: 'range', name: 'Faixa de Valores', desc: 'Tenho um intervalo' },
                          { id: 'negotiable', name: 'Negociável', desc: 'Quero receber propostas' }
                        ].map((type) => (
                          <label
                            key={type.id}
                            className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all duration-300 ${
                              formData.budgetType === type.id 
                                ? 'border-primary-600 bg-primary-50 text-primary-700' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <input
                              type="radio"
                              name="budgetType"
                              value={type.id}
                              checked={formData.budgetType === type.id}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <DollarSign className="w-6 h-6 mx-auto mb-2" />
                            <div className="font-semibold text-sm">{type.name}</div>
                            <div className="text-xs text-gray-500">{type.desc}</div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {formData.budgetType === 'fixed' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor (R$)
                        </label>
                        <input
                          type="number"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          placeholder="500"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    )}

                    {formData.budgetType === 'range' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor Mínimo (R$)
                          </label>
                          <input
                            type="number"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            placeholder="300"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor Máximo (R$)
                          </label>
                          <input
                            type="number"
                            name="budgetMax"
                            value={formData.budgetMax}
                            onChange={handleChange}
                            placeholder="800"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Anexos</h3>
                  <FileUpload
                    accept="image/*,.pdf,.doc,.docx"
                    multiple
                    maxSize={10}
                    onFilesChange={setAttachments}
                    label="Adicione fotos, plantas, documentos ou qualquer arquivo que ajude a entender seu projeto"
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Próximo
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading && <LoadingSpinner size="sm" />}
                  <span>{loading ? 'Publicando...' : 'Publicar Pedido'}</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequestPage;