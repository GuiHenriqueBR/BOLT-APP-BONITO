import React, { useState } from 'react';
import { CreditCard, Lock, Calendar, User, AlertCircle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentData: any) => void;
  onError: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    installments: '1'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const paymentData = {
        id: Date.now().toString(),
        amount,
        method: paymentMethod,
        status: 'completed',
        transactionId: `TXN_${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      onSuccess(paymentData);
    } catch (error) {
      onError('Erro no processamento do pagamento');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Método de Pagamento
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'credit_card', name: 'Cartão de Crédito', icon: CreditCard },
            { id: 'pix', name: 'PIX', icon: Lock },
            { id: 'bank_slip', name: 'Boleto', icon: AlertCircle }
          ].map((method) => (
            <label
              key={method.id}
              className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                paymentMethod === method.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="sr-only"
              />
              <method.icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">{method.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Credit Card Form */}
      {paymentMethod === 'credit_card' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Número do Cartão *
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="cardNumber"
                value={formatCardNumber(formData.cardNumber)}
                onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value.replace(/\s/g, '') }))}
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nome no Cartão *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                placeholder="Nome como está no cartão"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Validade *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="expiryDate"
                  value={formatExpiryDate(formData.expiryDate)}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  placeholder="MM/AA"
                  maxLength={5}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                CVV *
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="000"
                maxLength={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Parcelas
            </label>
            <select
              name="installments"
              value={formData.installments}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="1">1x de R$ {amount.toFixed(2)} (à vista)</option>
              <option value="2">2x de R$ {(amount / 2).toFixed(2)}</option>
              <option value="3">3x de R$ {(amount / 3).toFixed(2)}</option>
              <option value="6">6x de R$ {(amount / 6).toFixed(2)}</option>
              <option value="12">12x de R$ {(amount / 12).toFixed(2)}</option>
            </select>
          </div>
        </div>
      )}

      {/* PIX Instructions */}
      {paymentMethod === 'pix' && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-blue-900 dark:text-blue-100">Pagamento via PIX</span>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Após confirmar, você receberá o código PIX para pagamento instantâneo.
          </p>
        </div>
      )}

      {/* Bank Slip Instructions */}
      {paymentMethod === 'bank_slip' && (
        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span className="font-medium text-orange-900 dark:text-orange-100">Pagamento via Boleto</span>
          </div>
          <p className="text-sm text-orange-700 dark:text-orange-300">
            O boleto será gerado após a confirmação. Prazo de vencimento: 3 dias úteis.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <LoadingSpinner size="sm" />
            <span>Processando...</span>
          </div>
        ) : (
          <>
            <Lock className="w-5 h-5 mr-2" />
            Pagar R$ {amount.toFixed(2)}
          </>
        )}
      </button>

      {/* Security Info */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        <Lock className="w-4 h-4 inline mr-1" />
        Pagamento 100% seguro e protegido
      </div>
    </form>
  );
};

export default PaymentForm;