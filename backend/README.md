
``` bash
docker network create traefik-homelab
```

``` bash
docker-compose -f docker-compose-traefik.yml --env-file ./.env up -d
docker-compose -f docker-compose.yml --env-file ./.env up -d
```


``` bash
docker-compose -f docker-compose-traefik.yml --env-file ./.env restart
docker-compose -f docker-compose.yml --env-file ./.env restart
```

``` bash
docker-compose -f docker-compose-traefik.yml --env-file ./.env down
docker-compose -f docker-compose.yml --env-file ./.env down
```

``` bash
docker-compose -f docker-compose-traefik.yml --env-file ./.env down
docker-compose -f docker-compose.yml --env-file ./.env down
docker-compose -f docker-compose-traefik.yml --env-file ./.env up -d
docker-compose -f docker-compose.yml --env-file ./.env up -d
```