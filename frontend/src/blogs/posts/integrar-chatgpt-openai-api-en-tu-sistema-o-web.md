Integrar modelos de IA generativa a través de la API de OpenAI (GPT-4o, GPT-4o-mini, DALL-E 3) permite dotar a cualquier aplicación web o sistema de gestión de capacidades avanzadas de redacción, clasificación de tickets, resúmenes ejecutivos y análisis predictivo.

En esta guía para desarrolladores y líderes de tecnología te explicamos la implementación paso a paso utilizando **Node.js, Express y React**.

---

## 1. Configuración de Credenciales y Buenas Prácticas de Seguridad

### REGLA DE ORO DE SEGURIDAD
> **NUNCA expongas tu `OPENAI_API_KEY` en el código frontend de React.**
> Si la clave se incluye en el bundle cliente, cualquier usuario malintencionado podrá extraerla del inspector web y agotar tus créditos en minutos.

---

## 2. Creación del Servidor Backend Seguro (Node.js / Express)

Instala la librería oficial de OpenAI:
```bash
npm install openai express dotenv cors
```

Código del servidor en Node.js (`server.js`):

```javascript
import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'https-[#182A2C]-tudominio.com' }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/analizar-consulta', async (req, res) => {
  try {
    const { mensaje } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Rápido y económico para tareas estándar
      messages: [
        {
          role: 'system',
          content: 'Eres un analista comercial senior. Extrae la intención principal del cliente y sugiere los 2 mejores servicios.'
        },
        { role: 'user', content: mensaje }
      ],
      max_tokens: 300,
      temperature: 0.3,
    });

    res.json({ respuesta: response.choices[0].message.content });
  } catch (error) {
    console.error('Error OpenAI API:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud con IA' });
  }
});

app.listen(5000, () => console.log('Servidor de IA activo en puerto 5000'));
```

---

## 3. Conexión desde el Frontend en React

```javascript
import React, { useState } from 'react';

export const ModuloIA = () => {
  const [prompt, setPrompt] = useState('');
  const [resultado, setResultado] = useState('');
  const [cargando, setCargando] = useState(false);

  const procesarConIA = async () => {
    setCargando(true);
    try {
      const res = await fetch('/api/analizar-consulta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: prompt })
      });
      const data = await res.json();
      setResultado(data.respuesta);
    } catch (err) {
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 border border-gray-200">
      <textarea 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Escribe la consulta comercial aquí..."
        className="w-full p-3 border border-gray-300 rounded mb-4"
      />
      <button 
        onClick={procesarConIA}
        disabled={cargando}
        className="bg-[#182A2C] text-white font-bold px-6 py-3"
      >
        {cargando ? 'Procesando con IA...' : 'Analizar con GPT-4o'}
      </button>
      {resultado && (
        <div className="mt-6 p-4 bg-[#182A2C] text-white">
          <h4 className="text-[#d9fb06] font-bold mb-2">Resultado de la IA:</h4>
          <p>{resultado}</p>
        </div>
      )}
    </div>
  );
};
```

---

## 4. Control de Costos y Rate Limits en Producción

1. **Configura Soft and Hard Limits**: Establece presupuestos mensuales máximos en el panel de facturación de OpenAI.
2. **Implementa Cache con Redis**: Si muchos usuarios hacen la misma pregunta, responde desde el cache sin llamar nuevamente a la API.
3. **Utiliza GPT-4o-mini**: Es hasta un 90% más económico que GPT-4o original y ofrece rendimiento superior para clasificaciones y resúmenes.

---

En [Websy realizamos integraciones profesionales con OpenAI y arquitecturas Serverless](/servicios/automatizaciones-ia). ¿Querés dotar a tu software de Inteligencia Artificial? [Contactate con nuestro equipo técnico](/contacto).
