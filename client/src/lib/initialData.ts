import type { Product } from './pricingStorage';

/** 65 seed products from the original HTML pricing system */
export const INITIAL_PRODUCTS: Product[] = [
  // Primos Peças
  { id: 'p001', name: 'Turbina NSK PANA-MAX II', supplier: 'Primos Peças', category: 'Turbinas', cost: 280, freight: 25, tax: 12, qty: 8, ncm: '9018.49.20' },
  { id: 'p002', name: 'Contra Ângulo NSK Ti-Max Z300L', supplier: 'Primos Peças', category: 'Contra Ângulos', cost: 320, freight: 20, tax: 12, qty: 5, ncm: '9018.49.20' },
  { id: 'p003', name: 'Micromotor NSK NLX Nano', supplier: 'Primos Peças', category: 'Micromotores', cost: 450, freight: 30, tax: 12, qty: 3, ncm: '9018.49.20' },
  { id: 'p004', name: 'Peça de Mão Reta NSK', supplier: 'Primos Peças', category: 'Peças de Mão', cost: 180, freight: 15, tax: 12, qty: 10, ncm: '9018.49.20' },
  { id: 'p005', name: 'Turbina NSK S-Max M500', supplier: 'Primos Peças', category: 'Turbinas', cost: 380, freight: 25, tax: 12, qty: 4, ncm: '9018.49.20' },
  { id: 'p006', name: 'Contra Ângulo W&H Synea', supplier: 'Primos Peças', category: 'Contra Ângulos', cost: 290, freight: 20, tax: 12, qty: 6, ncm: '9018.49.20' },
  { id: 'p007', name: 'Turbina Kavo Multiflex Plus', supplier: 'Primos Peças', category: 'Turbinas', cost: 420, freight: 28, tax: 12, qty: 2, ncm: '9018.49.20' },
  { id: 'p008', name: 'Rotor NSK PANA-MAX', supplier: 'Primos Peças', category: 'Rotores', cost: 85, freight: 10, tax: 12, qty: 15, ncm: '9018.49.90' },
  { id: 'p009', name: 'Rolamento NSK Turbina', supplier: 'Primos Peças', category: 'Rolamentos', cost: 45, freight: 8, tax: 12, qty: 20, ncm: '8482.10.10' },
  { id: 'p010', name: 'Buchas de Turbina NSK (kit 5)', supplier: 'Primos Peças', category: 'Acessórios', cost: 35, freight: 5, tax: 12, qty: 25, ncm: '9018.49.90' },

  // NSK Nakanishi
  { id: 'p011', name: 'NSK Ti-Max X500L Turbina', supplier: 'NSK Nakanishi', category: 'Turbinas', cost: 520, freight: 35, tax: 12, qty: 3, ncm: '9018.49.20' },
  { id: 'p012', name: 'NSK Ti-Max Z95L Contra Ângulo', supplier: 'NSK Nakanishi', category: 'Contra Ângulos', cost: 480, freight: 30, tax: 12, qty: 4, ncm: '9018.49.20' },
  { id: 'p013', name: 'NSK Endo-Mate TC2 Motor', supplier: 'NSK Nakanishi', category: 'Motores Endo', cost: 890, freight: 45, tax: 12, qty: 2, ncm: '9018.49.20' },
  { id: 'p014', name: 'NSK Varios 970 Ultra Scaler', supplier: 'NSK Nakanishi', category: 'Ultrassônicos', cost: 750, freight: 40, tax: 12, qty: 3, ncm: '9018.49.90' },
  { id: 'p015', name: 'NSK Pana-Spray Plus Lubrificante', supplier: 'NSK Nakanishi', category: 'Lubrificantes', cost: 45, freight: 8, tax: 12, qty: 30, ncm: '3403.19.00' },
  { id: 'p016', name: 'NSK Ti-Max S900L Turbina LED', supplier: 'NSK Nakanishi', category: 'Turbinas', cost: 620, freight: 38, tax: 12, qty: 2, ncm: '9018.49.20' },
  { id: 'p017', name: 'NSK Rotor Completo Ti-Max', supplier: 'NSK Nakanishi', category: 'Rotores', cost: 120, freight: 12, tax: 12, qty: 10, ncm: '9018.49.90' },
  { id: 'p018', name: 'NSK Cabeça Turbina S-Max M600', supplier: 'NSK Nakanishi', category: 'Cabeças', cost: 280, freight: 20, tax: 12, qty: 5, ncm: '9018.49.90' },

  // VC E-Commerce
  { id: 'p019', name: 'Cadeira Odontológica DentFlex Pro', supplier: 'VC E-Commerce', category: 'Cadeiras', cost: 3200, freight: 250, tax: 0, qty: 1, ncm: '9402.10.10' },
  { id: 'p020', name: 'Fotopolimerizador LED Valo Grand', supplier: 'VC E-Commerce', category: 'Fotopolimerizadores', cost: 580, freight: 40, tax: 12, qty: 4, ncm: '9018.49.90' },
  { id: 'p021', name: 'Amalgamador Capsulado Digital', supplier: 'VC E-Commerce', category: 'Amalgamadores', cost: 320, freight: 30, tax: 12, qty: 3, ncm: '9018.49.90' },
  { id: 'p022', name: 'Autoclave 12L Vertical', supplier: 'VC E-Commerce', category: 'Esterilização', cost: 1800, freight: 120, tax: 0, qty: 2, ncm: '8419.20.00' },
  { id: 'p023', name: 'Compressor Odontológico 1HP', supplier: 'VC E-Commerce', category: 'Compressores', cost: 1200, freight: 100, tax: 0, qty: 2, ncm: '8414.80.19' },
  { id: 'p024', name: 'Sugador Cirúrgico com Motor', supplier: 'VC E-Commerce', category: 'Equipamentos', cost: 850, freight: 70, tax: 0, qty: 2, ncm: '8414.59.90' },
  { id: 'p025', name: 'Refletor LED de Cadeira', supplier: 'VC E-Commerce', category: 'Iluminação', cost: 280, freight: 25, tax: 12, qty: 5, ncm: '9405.40.90' },
  { id: 'p026', name: 'Cuspideira com Torneira', supplier: 'VC E-Commerce', category: 'Acessórios', cost: 180, freight: 20, tax: 0, qty: 4, ncm: '9402.10.90' },
  { id: 'p027', name: 'Mesa Auxiliar Inox 3 Bandejas', supplier: 'VC E-Commerce', category: 'Mobiliário', cost: 480, freight: 50, tax: 0, qty: 3, ncm: '9402.90.00' },
  { id: 'p028', name: 'Foco Bucal com Fibra Óptica', supplier: 'VC E-Commerce', category: 'Iluminação', cost: 120, freight: 15, tax: 12, qty: 8, ncm: '9405.40.90' },
  { id: 'p029', name: 'Escaler Ultrassônico Cavitron P10', supplier: 'VC E-Commerce', category: 'Ultrassônicos', cost: 420, freight: 35, tax: 12, qty: 3, ncm: '9018.49.90' },
  { id: 'p030', name: 'Amalgamador Vibratório', supplier: 'VC E-Commerce', category: 'Amalgamadores', cost: 280, freight: 25, tax: 12, qty: 4, ncm: '9018.49.90' },

  // Schuster
  { id: 'p031', name: 'Turbina Kavo Multiflex LUX', supplier: 'Schuster', category: 'Turbinas', cost: 580, freight: 40, tax: 12, qty: 3, ncm: '9018.49.20' },
  { id: 'p032', name: 'Micro Motor Schuster com Peça Reta', supplier: 'Schuster', category: 'Micromotores', cost: 380, freight: 30, tax: 12, qty: 4, ncm: '9018.49.20' },
  { id: 'p033', name: 'Contra Ângulo Kavo Intra LUX', supplier: 'Schuster', category: 'Contra Ângulos', cost: 420, freight: 28, tax: 12, qty: 5, ncm: '9018.49.20' },
  { id: 'p034', name: 'Motor Endodôntico Schuster iRoot', supplier: 'Schuster', category: 'Motores Endo', cost: 920, freight: 50, tax: 12, qty: 2, ncm: '9018.49.20' },
  { id: 'p035', name: 'Turbina Synea Fusion W&H', supplier: 'Schuster', category: 'Turbinas', cost: 680, freight: 42, tax: 12, qty: 2, ncm: '9018.49.20' },
  { id: 'p036', name: 'Peça de Mão Schuster 1:2.5', supplier: 'Schuster', category: 'Peças de Mão', cost: 250, freight: 20, tax: 12, qty: 6, ncm: '9018.49.20' },
  { id: 'p037', name: 'Spray de Limpeza Aero-S Kavo', supplier: 'Schuster', category: 'Lubrificantes', cost: 55, freight: 8, tax: 12, qty: 25, ncm: '3403.19.00' },
  { id: 'p038', name: 'Rotor Kavo Multiflex Completo', supplier: 'Schuster', category: 'Rotores', cost: 145, freight: 12, tax: 12, qty: 8, ncm: '9018.49.90' },
  { id: 'p039', name: 'Brocas Carbide FG Ponta (kit 10)', supplier: 'Schuster', category: 'Brocas', cost: 65, freight: 8, tax: 12, qty: 20, ncm: '8207.70.00' },
  { id: 'p040', name: 'Pontas Ultrassônicas Cavi-Jet (kit 5)', supplier: 'Schuster', category: 'Pontas', cost: 95, freight: 10, tax: 12, qty: 15, ncm: '9018.49.90' },

  // GRC Dental
  { id: 'p041', name: 'Broca Diamantada FG 1012 (kit 10)', supplier: 'GRC Dental', category: 'Brocas', cost: 38, freight: 5, tax: 12, qty: 30, ncm: '8207.70.00' },
  { id: 'p042', name: 'Sugador Descartável 100un', supplier: 'GRC Dental', category: 'Descartáveis', cost: 18, freight: 5, tax: 12, qty: 50, ncm: '3926.90.90' },
  { id: 'p043', name: 'Luva Látex M (cx 100)', supplier: 'GRC Dental', category: 'EPI', cost: 22, freight: 5, tax: 12, qty: 40, ncm: '4015.11.00' },
  { id: 'p044', name: 'Máscara Descartável (cx 50)', supplier: 'GRC Dental', category: 'EPI', cost: 16, freight: 5, tax: 12, qty: 60, ncm: '6307.90.10' },
  { id: 'p045', name: 'Óculos de Proteção Clear', supplier: 'GRC Dental', category: 'EPI', cost: 12, freight: 5, tax: 12, qty: 35, ncm: '9004.90.00' },
  { id: 'p046', name: 'Resina Composta Charisma A2 (4g)', supplier: 'GRC Dental', category: 'Materiais', cost: 45, freight: 8, tax: 12, qty: 20, ncm: '3006.40.00' },
  { id: 'p047', name: 'Broca Esférica FG 1014 (kit 10)', supplier: 'GRC Dental', category: 'Brocas', cost: 32, freight: 5, tax: 12, qty: 28, ncm: '8207.70.00' },
  { id: 'p048', name: 'Ácido Fosfórico 37% Seringa (3g)', supplier: 'GRC Dental', category: 'Materiais', cost: 8, freight: 3, tax: 12, qty: 45, ncm: '3006.40.00' },
  { id: 'p049', name: 'Adesivo Single Bond Universal 8ml', supplier: 'GRC Dental', category: 'Materiais', cost: 85, freight: 8, tax: 12, qty: 12, ncm: '3506.10.00' },
  { id: 'p050', name: 'Cimento Ionômero Vitremer (15g)', supplier: 'GRC Dental', category: 'Materiais', cost: 62, freight: 8, tax: 12, qty: 18, ncm: '3006.40.00' },

  // Importados
  { id: 'p051', name: 'Lâmpada LED Turbina NSK (kit 2)', supplier: 'Primos Peças', category: 'Acessórios', cost: 28, freight: 5, tax: 12, qty: 22, ncm: '9018.49.90' },
  { id: 'p052', name: 'O-ring Turbina NSK (kit 10)', supplier: 'Primos Peças', category: 'Acessórios', cost: 15, freight: 4, tax: 12, qty: 40, ncm: '9018.49.90' },
  { id: 'p053', name: 'Chave Allen Set para Turbinas', supplier: 'Primos Peças', category: 'Ferramentas', cost: 18, freight: 5, tax: 12, qty: 18, ncm: '8204.11.00' },
  { id: 'p054', name: 'Turbina Gnatus E9000', supplier: 'VC E-Commerce', category: 'Turbinas', cost: 185, freight: 18, tax: 12, qty: 5, ncm: '9018.49.20' },
  { id: 'p055', name: 'Contra Ângulo Gnatus CR-310', supplier: 'VC E-Commerce', category: 'Contra Ângulos', cost: 145, freight: 15, tax: 12, qty: 6, ncm: '9018.49.20' },
  { id: 'p056', name: 'Micromotor Gnatus M-300', supplier: 'VC E-Commerce', category: 'Micromotores', cost: 220, freight: 20, tax: 12, qty: 4, ncm: '9018.49.20' },
  { id: 'p057', name: 'Aparelho de Raio X Digital', supplier: 'VC E-Commerce', category: 'Imagem', cost: 2800, freight: 200, tax: 0, qty: 1, ncm: '9022.90.10' },
  { id: 'p058', name: 'Sensor Intraoral RVG Digital', supplier: 'VC E-Commerce', category: 'Imagem', cost: 3500, freight: 250, tax: 0, qty: 1, ncm: '9022.90.10' },
  { id: 'p059', name: 'Fotopolimerizador Dabi Espec Plus', supplier: 'VC E-Commerce', category: 'Fotopolimerizadores', cost: 320, freight: 28, tax: 12, qty: 4, ncm: '9018.49.90' },
  { id: 'p060', name: 'Amalgamador Rolante Dabi', supplier: 'VC E-Commerce', category: 'Amalgamadores', cost: 180, freight: 18, tax: 12, qty: 5, ncm: '9018.49.90' },
  { id: 'p061', name: 'Turbina Dabi Extra Torque 200', supplier: 'VC E-Commerce', category: 'Turbinas', cost: 175, freight: 15, tax: 12, qty: 5, ncm: '9018.49.20' },
  { id: 'p062', name: 'Contra Ângulo Dabi Speed 1:5', supplier: 'VC E-Commerce', category: 'Contra Ângulos', cost: 195, freight: 18, tax: 12, qty: 4, ncm: '9018.49.20' },
  { id: 'p063', name: 'Estufa de Secagem 27L', supplier: 'GRC Dental', category: 'Esterilização', cost: 320, freight: 35, tax: 0, qty: 3, ncm: '8419.20.00' },
  { id: 'p064', name: 'Caixa para Esterilização (kit 3)', supplier: 'GRC Dental', category: 'Esterilização', cost: 45, freight: 8, tax: 12, qty: 15, ncm: '3926.90.90' },
  { id: 'p065', name: 'Saliva Ejector Descartável 100un', supplier: 'GRC Dental', category: 'Descartáveis', cost: 14, freight: 5, tax: 12, qty: 55, ncm: '3926.90.90' },
];
