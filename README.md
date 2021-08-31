# AppRickAndMortyJavaScript
 Aplicación para consumir el API de rick y morty usando 
 JavaScript 

 La app 

 * Permite buscar personajes usando la api.
 * Filtrar por género usando la api.
 * Permitir guardar los personajes en favorito.
 * Mostrar detalle del personaje en un modal.
 * Sección de Personajes interesantes aleatoria.

 # Documentación del API
 (https://rickandmortyapi.com/documentation/#rest) 


 # Clase UI
 Se encarga de la generación de interfaz grafica y de comunica con 
 la clase Business si requiere datos del servidor

 Médotos y Funciones

 1. getFilters(), se usa para obtener los valores de filtrado al momento de 
 mostrar los personajes

 2. printInteresantingCharacters(), se usa para pintar en pantalla 3
 personajes aleatorios como 'personajes interesantes' en la ventana modal

 3. unCheckFavoritesBtn(), quita la selección del switch 

 4. removeAllChilds(), recibe como parametro el identifica dor de una etiqueta
 para remover cada uno de los hijos que contiene

 5. addCharacter(character, parent), se usa para crear el elemento 'Card' y recibe como parametros el objeto (personaje), y el identificador de la etiqueta donde se va a pintar en pantalla

 6. printModal(), pinta en pantalla el elemento modal y recibe como parametro el personaje que se va a mostrar 

 7. printEpisode(episode), se usa para imprimir parte de la información de un episodio en la ventana modal

# Clase Business
Se encarga de la comunicación de la UI con el Dao 

# Clase Dao 
Se encarga de la comunicación con el API y transmite los datos a la UI a través de 
la clase Business

# Vista Previa
![Resume cv](/preview.png)