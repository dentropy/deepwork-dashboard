
``` bash
docker-network create traefik-homelab
docker-compose -f docker-compose-traefik.yml --env-file ./.env up
docker-compose -f docker-compose.yml --env-file ./.env up
```
