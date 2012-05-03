- documentar
- hacer


- Slider: verticales, autoplay
- controlar mejor las alturas en layout.
- Pages, History, Nofitication
- Ajustar defaults en clases ya creadas
solo cargar iscroll si $(.scroll).length > 0


---------------------------------------------------
En el módulo de Páginas:
---------------------------------------------------

cuando se pasa de una url (con hash): http://0.0.0.0:4567/demos/pages/moves.page.html#pagina_2
a una (sin hash): http://0.0.0.0:4567/demos/pages/moves.page.html

Haciendo click en el Atrás del navegador.
NO se dispara ningun evento, ni el statechange ni el anchorchange


--


Si la url tiene un hash inicial http://0.0.0.0:4567/demos/pages/moves.page.html#pagina_2
y vas por showPage a otro hash de la misma #pagina_4, hace un loop infinito.
---------------------------------------------------








---------------------------------------------------
En el módulo de Layout:
---------------------------------------------------

hacer un metodo destroy;
---------------------------------------------------

creo que el iScroll se instancia multiples veces: mirar http://0.0.0.0:4567/demos/pages/moves.page.1.html#pagina_3








