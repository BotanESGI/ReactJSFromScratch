# Utilisez l'image Nginx officielle
FROM nginx:alpine

# Supprimez les fichiers par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiez les fichiers de votre projet dans le répertoire web de Nginx
COPY . /usr/share/nginx/html

# Copiez la configuration personnalisée de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposez le port 80
EXPOSE 80
