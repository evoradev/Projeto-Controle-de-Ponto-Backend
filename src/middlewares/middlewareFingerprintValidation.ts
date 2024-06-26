import { Request, Response, NextFunction } from 'express';
import { db } from '../db/firebase';
import { ref, get } from 'firebase/database';

class MiddlewareFingerprintValidation {
    private readonly dbRef = ref(db, '/fingerprint');
    private readonly limiarSimilaridade: number;

    constructor(limiarSimilaridade: number = 0.8) {
        this.limiarSimilaridade = limiarSimilaridade;
    }

    compareFingerprintHashes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const hashCapturada = req.body.hashCapturada; // Supondo que a hash capturada está no corpo da requisição

            const hashArmazenada = await this.getStoredFingerprintHash();

            if (!hashArmazenada) {
                res.status(404).json({ error: 'Hash não encontrada no banco de dados' });
                return;
            }

            // Verifica se as hashes têm o mesmo comprimento
            if (hashCapturada.length !== hashArmazenada.length) {
                res.status(400).json({ error: 'As hashes não têm o mesmo comprimento' });
                return;
            }

            // Calcula o número de caracteres coincidentes
            let caracteresCoincidentes = 0;
            for (let i = 0; i < hashCapturada.length; i++) {
                if (hashCapturada[i] === hashArmazenada[i]) {
                    caracteresCoincidentes++;
                }
            }

            // Calcula a similaridade como a proporção de caracteres coincidentes
            const similaridade = caracteresCoincidentes / hashCapturada.length;

            // Verifica se a similaridade atinge o limiar definido
            if (similaridade >= this.limiarSimilaridade) {
                next(); // Chama o próximo middleware
            } else {
                res.status(403).json({ error: 'A similaridade da impressão digital não é suficiente' });
            }
        } catch (error) {
            console.error('Erro ao comparar impressões digitais:', error);
            res.status(500).json({ error: 'Erro interno ao comparar impressões digitais' });
        }
    }

    private async getStoredFingerprintHash(): Promise<string | null> {
        try {
            const snapshot = await get(this.dbRef);
            const hashArmazenada = snapshot.val();
            return hashArmazenada || null;
        } catch (error) {
            console.error('Erro ao obter hash armazenada:', error);
            return null;
        }
    }
}

export default MiddlewareFingerprintValidation