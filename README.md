# Medieinstitutet-API-Bortakvall

## Betyg: G

## Express, Prisma, Typescript, CRUD, MySQL

Ladda ner och: 
1. Kör `npm install`
2. Kopiera `.env.example` till `.env` 
3. Ladda ner och installera mamp och ställ in till MySQL
4. Kör `npm install -g env-cmd`
5. Kör `npx prisma migrate dev` 
6. Kör `npm run build` 
7. Kör `npm run start` 



## Uppgiftsbeskrivning

Bedömningskriterier
På denna uppgiften kan ni få IG/G

# Om uppgiften 
Varje student jobbar enskilt med att skapa en backend för Bortakväll som ska fungera som en ren “drop-in replacement”. 

# Man kan bara få godkänt på uppgiften!


# Hygienkrav
Nedan hygienkrav ska vara uppfyllda oavsett betygsnivå.

Använder Express och Prisma

Vara skriven i TypeScript

Följa CRUD och Resource Controller mönster

Validering av inkommande data

Alla svar följer jSend-specifikationen

Publicerad (plattform TBD)


# Man ska kunna:

Hämta alla produkter
Hämta en enskild produkt
Skapa en ny produkt
Hämta alla ordrar
Hämta en enskild order (samt dess OrderItems)
Skapa en ny order (samt dess OrderItems)
Grundläggande validering av produktdetaljer och kundinformationen ska ske.
Fel i valideringen ska (precis som allting annat) returneras enligt jSend-format, men behöver för övrigt inte matcha hur Bortakväll-API:et returnerade valideringsfel.

 

# Models
# Product
id

name (string)

description (text)

price (integer, min 1)

images (json)

stock_status (string)

stock_quantity (integer, min 0)

Följande fält behövs inte (men det är helt okej att ha dem)

on_sale
En Product har flera OrderItem.

 

# Order
id

customer_first_name (string)

customer_last_name (string)

customer_address (string)

customer_postcode (string, max 6)

customer_city (string)

customer_email (email)

customer_phone (optional)

order_total (integer, min 1)

Följande fält behövs inte (men det är helt okej att ha dem)

order_date

created_at

updated_at

En Order har flera OrderItems.


# OrderItems
product_id (integer, min 1)

qty (integer, min 1)

item_price (integer, min 1)

item_total (integer, min 1)

En OrderItem tillhör en Order.

En OrderItem tillhör en Product.

# Endpoints
# GET /products
Returnerar alla produkter 

# GET /products/:productId
Returnerar en enskild produkt.

# POST /products
Skapar en ny produkt.
Returnerar den skapade produkten.

# GET /orders
Returnerar alla ordrar (OrderItems exkluderat).

# GET /orders/:orderId
Returnerar en enskild order, inkl. dess OrderItems.

# POST /orders
Skapar en ny order.
Returnerar den skapade ordern.
