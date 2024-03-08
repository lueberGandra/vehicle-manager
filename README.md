# Vehicle Manager!
---
# Orientações
<details>
  <summary>
    <strong>🤝 Passo a Passo</strong>
  </summary><br>

  1. Clone o repositório

  - Use o comando: `git clone git@github.com:lueberGandra/vehicle-manager.git`
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd vehicle-manager`

  2. Instale as dependências

  - Usando o comando: `npm install`
  
  4. Inicie a aplicação

  - Usando o comando: `npm run start`
  
</details>

</details>

---

  
# Documentação

---
####  1 - Cadastrar motorista
- (POST): `http://localhost:3000/driver`
<details>

- Payload:
 
    ```json
    {
        "name": "Rocket Raccoon"
    }
    ``` 

- Response:

    ```json
    {
        "name": "Rocket Raccoon",
        "id": 4,
        "createdAt": "2024-03-08T00:55:09.000Z",
        "updatedAt": "2024-03-08T00:55:09.000Z",
        "deletedAt": null
    }
    ``` 
</details>

####  2 - Atualizar motorista
- (PUT): `http://localhost:3000/driver/:id`
<details>
- Payload:

    ```json
    {
        "name": "Star Lord"
    }
    ```

- Response:
    ```json
    {
        "id": 4,
        "name": "Star Lord",
        "createdAt": "2024-03-08T00:55:09.000Z",
        "updatedAt": "2024-03-08T00:56:09.000Z",
        "deletedAt": null
    }
    ``` 
</details>

####  3 - Buscar motorista por número de identificação
- (GET): `http://localhost:3000/driver/:id`
<details>
- Response:

    ```json
    {
        "id": 1,
        "name": "Din Djarin",
        "createdAt": "2024-03-07T18:41:36.000Z",
        "updatedAt": "2024-03-07T18:41:36.000Z",
        "deletedAt": null
    }
    ``` 
</details>


####  4 - Buscar todos os motoristas
- (GET): `http://localhost:3000/driver?page=1&limit=10`
<details>
- Response:

    ```json
    {
        "items": 
        [
          {
            "drivers_id": 1,
            "drivers_name": "Din Djarin",
            "drivers_createdAt": "2024-03-07 18:41:36",
            "drivers_updatedAt": "2024-03-07 18:41:36",
            "drivers_deletedAt": null
          },
          {
            "drivers_id": 4,
            "drivers_name": "Star Lord",
            "drivers_createdAt": "2024-03-08 00:55:09",
            "drivers_updatedAt": "2024-03-08 00:56:09",
            "drivers_deletedAt": null
          }
        ],
        "meta": 
        {
            "totalItems": 4,
            "itemCount": 4,
            "itemsPerPage": 10,
            "totalPages": 1,
            "currentPage": 1
        }
    }
    
    ``` 
</details>

####  4 - Buscar motorista utilizando o nome ou parte dele
- (GET): `http://localhost:3000/driver?name=Din&page=1&limit=10`
<details>
- Response:

    ```json
     {
        "items": 
        [
          {
            "drivers_id": 1,
            "drivers_name": "Din Djarin",
            "drivers_createdAt": "2024-03-07 18:41:36",
            "drivers_updatedAt": "2024-03-07 18:41:36",
            "drivers_deletedAt": null
          },          
        ],
        "meta": 
        {
            "totalItems": 4,
            "itemCount": 4,
            "itemsPerPage": 10,
            "totalPages": 1,
            "currentPage": 1
        }
    }
    ``` 
</details>

####  5 - Deletar motorista com o número de identificação
- (DELETE): `http://localhost:3000/driver/:id`
<details>

- Response: 

    ```json
    {
        "msg": "Driver {id} successfully deleted!"
    }
    ```
</details>

####  6 - Cadastrar veículo
- (POST): `http://localhost:3000/vehicle`
<details>
- Regras: 
    - Não é possível cadastrar mais de um carro com a mesma placa;
    - A placa cadastrada deve ser no padrão brasileiro

- Payload: 

    ```json
    {
        "brand":"Renault",
        "color":"silver",
        "plate":"HEM-6817"
    }
    ``` 

- Response:

    ```json
    {
        "brand": "Renault",
        "color": "#fff",
        "plate": "HEM-6817",
        "id": 4,
        "createdAt": "2024-03-08T01:03:53.000Z",
        "updatedAt": "2024-03-08T01:03:53.000Z",
        "deletedAt": null
    }
    ``` 

</details>

####  7 - Atualizar veículo
- (PUT): `http://localhost:3000/vehicle/:id`
<details>
- Regras: 
    - Não é possível cadastrar mais de um carro com a mesma placa;
    - A placa cadastrada deve ser no padrão brasileiro
- Payload:

    ```json
    {
        "color":"orange",
    }
    ``` 

- Response:

    ```json
    {
        "id": 4,
        "color": "orange",
        "brand": "fiat",
        "plate": "HEM-6818",
        "createdAt": "2024-03-08T01:03:53.000Z",
        "updatedAt": "2024-03-08T01:04:55.000Z",
        "deletedAt": null
    }
    ``` 

</details>

####  8 - Buscar veículo por número de identificação
- (GET): `http://localhost:3000/vehicle/:id`
<details>
- Response:

    ```json
    {
        "id": 4,
        "color": "orange",
        "brand": "fiat",
        "plate": "HEM-6818",
        "createdAt": "2024-03-08T01:03:53.000Z",
        "updatedAt": "2024-03-08T01:04:55.000Z",
        "deletedAt": null
    }
    ``` 

</details>

####  9 - Buscar todos os veículos
- (GET): `http://localhost:3000/vehicle`
<details>
- Response:

    ```json
    {
    "items": [
        {
            "vehicles_id": 1,
            "vehicles_color": "#fff",
            "vehicles_brand": "GM",
            "vehicles_plate": "IAP-5559",
            "vehicles_createdAt": "2024-03-07 18:47:44",
            "vehicles_updatedAt": "2024-03-07 18:47:44",
            "vehicles_deletedAt": null
        },
        {
            "vehicles_id": 2,
            "vehicles_color": "#fff",
            "vehicles_brand": "Jeep",
            "vehicles_plate": "MQA-0922",
            "vehicles_createdAt": "2024-03-07 18:48:09",
            "vehicles_updatedAt": "2024-03-07 18:48:09",
            "vehicles_deletedAt": null
        },
        {
            "vehicles_id": 3,
            "vehicles_color": "#fff",
            "vehicles_brand": "Renault",
            "vehicles_plate": "HEM-6817",
            "vehicles_createdAt": "2024-03-07 18:48:22",
            "vehicles_updatedAt": "2024-03-07 18:48:22",
            "vehicles_deletedAt": null
        },
        {
            "vehicles_id": 4,
            "vehicles_color": "Orange",
            "vehicles_brand": "fiat",
            "vehicles_plate": "HEM-6818",
            "vehicles_createdAt": "2024-03-08 01:03:53",
            "vehicles_updatedAt": "2024-03-08 01:04:55",
            "vehicles_deletedAt": null
        }
    ],
    "meta": {
        "totalItems": 4,
        "itemCount": 4,
        "itemsPerPage": 10,
        "totalPages": 1,
        "currentPage": 1
    }
}
    ``` 

</details>

####  10 - Buscar veículos por filtro de cor e/ou marca
- (GET): `http://localhost:3000/vehicle?color=orange&brand=fiat`
<details>
- Response:

    ```json
   {
    "items": [
        {
            "vehicles_id": 4,
            "vehicles_color": "Orange",
            "vehicles_brand": "fiat",
            "vehicles_plate": "HEM-6818",
            "vehicles_createdAt": "2024-03-08 01:03:53",
            "vehicles_updatedAt": "2024-03-08 01:04:55",
            "vehicles_deletedAt": null
        }
    ],
    "meta": {
        "totalItems": 1,
        "itemCount": 1,
        "itemsPerPage": 10,
        "totalPages": 1,
        "currentPage": 1
    }
}
    ``` 

</details>

####  11 - Deletar veículo com o número de identificação
- (DELETE): `http://localhost:3000/vehicle/:id`
<details>


- Response: 

    ```json
    {
        "msg": "Vehicle {id} successfully deleted!"
    }
    ```

</details>

####  12 - Criar uma alocação de veículo
- (POST): `http://localhost:3000/car-utilization-record`
<details>
- Regras: 
    - Só é possível criar uma alocação, caso nem o motorista nem o veículo estão com finalização de alguma alocação pendente;

- Payload:
    ```json
    {
      "vehicleId":4,
      "driverId": 4,
      "reason": "part",
      "utilizationStartDate":"2024-03-07"
    }
    ``` 

- Response:

    ```json
    {
    "driver": {
        "id": 4,
        "name": "Star Lord",
        "createdAt": "2024-03-08T00:55:09.000Z",
        "updatedAt": "2024-03-08T00:56:09.000Z",
        "deletedAt": null
    },
    "vehicle": {
        "id": 4,
        "color": "Orange",
        "brand": "fiat",
        "plate": "HEM-6818",
        "createdAt": "2024-03-08T01:03:53.000Z",
        "updatedAt": "2024-03-08T01:04:55.000Z",
        "deletedAt": null
    },
    "reason": "party",
    "utilizationStartDate": "2024-03-07T00:00:00.000Z",
    "utilizationEndDate": null,
    "id": 8,
    "createdAt": "2024-03-08T01:12:40.000Z",
    "updatedAt": "2024-03-08T01:12:40.000Z",
    "deletedAt": null
}
    ``` 
</details>

####  13 - Finalizar uma relação entre o motorista e um veículo
- (POST): `http://localhost:3000/car-utilization-record/finish/8`
<details>
- Payload:

    ```json
    {
       "utilizationEndDate": "2024-03-08"
    }
    ``` 

- Response:

    ```json
    {
       "id": 8,
      "reason": "party",
      "utilizationStartDate": "2024-03-07T00:00:00.000Z",
      "utilizationEndDate": "2024-03-08T00:00:00.000Z",
      "createdAt": "2024-03-08T01:12:40.000Z",
      "updatedAt": "2024-03-08T01:15:36.000Z",
      "deletedAt": null
    }
    ``` 
</details>
