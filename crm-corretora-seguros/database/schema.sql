CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    login VARCHAR(50) UNIQUE,
    senha_hash VARCHAR(255)
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    cpf_cnpj VARCHAR(20) UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    endereco TEXT,
    tags VARCHAR(100),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE propostas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    ramo VARCHAR(50),
    seguradora VARCHAR(100),
    valor DECIMAL(10,2),
    comissao DECIMAL(10,2),
    status ENUM('Pendente', 'Emitida', 'Rejeitada'),
    data_emissao DATE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

CREATE TABLE apolices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proposta_id INT,
    numero_apolice VARCHAR(50),
    inicio DATE,
    fim DATE,
    valor_total DECIMAL(10,2),
    status ENUM('Ativa', 'Inativa'),
    FOREIGN KEY (proposta_id) REFERENCES propostas(id) ON DELETE CASCADE
);

CREATE TABLE pagamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    apolice_id INT,
    valor_primeira_parcela DECIMAL(10,2),
    vencimento DATE,
    status ENUM('Pago', 'Pendente'),
    FOREIGN KEY (apolice_id) REFERENCES apolices(id) ON DELETE CASCADE
);

CREATE TABLE renovacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    apolice_id INT,
    data_prevista DATE,
    data_execucao DATE,
    status ENUM('Pendente', 'Executada', 'Cancelada'),
    FOREIGN KEY (apolice_id) REFERENCES apolices(id) ON DELETE CASCADE
);

CREATE TABLE documentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    apolice_id INT,
    proposta_id INT,
    tipo VARCHAR(50),
    caminho_arquivo VARCHAR(255),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL,
    FOREIGN KEY (apolice_id) REFERENCES apolices(id) ON DELETE SET NULL,
    FOREIGN KEY (proposta_id) REFERENCES propostas(id) ON DELETE SET NULL
);