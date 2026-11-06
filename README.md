# ClimaSmart App 

Aplicación web frontend desarrollada con React y Tailwind CSS, conectada a la API REST pública de Open-Meteo para la consulta meteorológica en tiempo real con un asistente de recomendaciones adaptativo.

## Integrantes
- Juan Sánchez Posada

## Tecnologías Utilizadas
- React (v18.3+): Biblioteca principal basada en componentes para la interfaz de usuario.
- Vite (v5.4+): Entorno de desarrollo y empaquetador de módulos de alta velocidad.
- Tailwind CSS: Framework CSS utilitario para maquetación limpia y responsiva.
- Open-Meteo API: Consumo de servicios REST externos para datos de geolocalización y variables meteorológicas sin necesidad de API Keys ni errores de CORS.
- Git & GitHub: Control de versiones con un historial distribuido de commits.
- Vercel: Despliegue continuo en la nube para la demo accesible en línea.

## Enlaces Oficiales de Entrega
- **Repositorio en GitHub**: [https://github.com/MonetJuan/clima-smart-app](https://github.com/MonetJuan/clima-smart-app)
- **Demo Funcional en Vercel**: [https://clima-smart-app.vercel.app/](https://clima-smart-app.vercel.app/)

## Arquitectura Técnica y Funcionalidades
La solución adopta una arquitectura desacoplada basada en componentes React:
1. **Geocodificación REST**: Transforma el nombre de la ciudad consultada en coordenadas geográficas (latitud y longitud).
2. **Pronóstico en Tiempo Real**: Consulta la API meteorológica extrayendo la temperatura y la velocidad del viento.
3. **Motor de Análisis Adaptativo**: Evalúa la temperatura y despliega recomendaciones de vestimenta/actividades.
4. **Historial de Consultas**: Mantiene un registro en memoria de las búsquedas previas realizadas durante la sesión.

## Instalación y Ejecución Local
1. Clona el repositorio:
   ```bash
   git clone [https://github.com/MonetJuan/clima-smart-app.git](https://github.com/MonetJuan/clima-smart-app.git)
