export const validation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  password: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Senha deve ter pelo menos 8 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Senha deve conter pelo menos uma letra maiúscula');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Senha deve conter pelo menos um número');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  phone: (phone: string): boolean => {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
  },

  cpf: (cpf: string): boolean => {
    const cleanCpf = cpf.replace(/\D/g, '');
    return cleanCpf.length === 11;
  },

  required: (value: string): boolean => {
    return value.trim().length > 0;
  },

  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },

  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },

  fileSize: (file: File, maxSizeMB: number): boolean => {
    return file.size <= maxSizeMB * 1024 * 1024;
  },

  fileType: (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type);
  }
};

export const formatters = {
  phone: (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  },

  cpf: (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },

  currency: (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  },

  date: (date: string | Date): string => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  },

  dateTime: (date: string | Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }
};